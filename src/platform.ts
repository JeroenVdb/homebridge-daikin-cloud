import {API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic} from 'homebridge';

import {PLATFORM_NAME, PLUGIN_NAME} from './settings';
import {daikinAirConditioningAccessory} from './daikinAirConditioningAccessory';

import {DaikinCloudController} from 'daikin-controller-cloud';

import {daikinAlthermaAccessory} from './daikinAlthermaAccessory';
import {resolve} from 'node:path';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {StringUtils} from './utils/strings';

const ONE_SECOND = 1000;
const ONE_MINUTE = ONE_SECOND * 60;

export type DaikinCloudAccessoryContext = {
    device: DaikinCloudDevice;
};

export class DaikinCloudPlatform implements DynamicPlatformPlugin {
    public readonly Service: typeof Service;
    public readonly Characteristic: typeof Characteristic;

    public readonly accessories: PlatformAccessory<DaikinCloudAccessoryContext>[] = [];

    public readonly storagePath: string = '';
    public controller: DaikinCloudController;

    public readonly updateIntervalDelay = ONE_MINUTE * 15;
    public updateInterval: NodeJS.Timeout | undefined;
    public forceUpdateTimeout: NodeJS.Timeout | undefined;

    constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
    ) {
        this.log.debug('[Platform] Finished initializing platform:', this.config.name);

        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;
        this.storagePath = api.user.storagePath();
        this.updateIntervalDelay = ONE_MINUTE * (this.config.updateIntervalInMinutes || 15);
        this.controller = new DaikinCloudController({
            oidcClientId: this.config.clientId,
            oidcClientSecret: this.config.clientSecret,
            oidcCallbackServerBindAddr: this.config.oidcCallbackServerBindAddr,
            oidcCallbackServerExternalAddress: this.config.callbackServerExternalAddress,
            oidcCallbackServerPort: this.config.callbackServerPort,
            oidcTokenSetFilePath: resolve(this.storagePath, '.daikin-controller-cloud-tokenset'),
            oidcAuthorizationTimeoutS: 60 * 5,
        });


        this.api.on('didFinishLaunching', async () => {
            this.controller.on('authorization_request', (url) => {
                this.log.warn(`
                    Please navigate to ${url} to start the authorisation flow. If it is the first time you open this url you will need to accept a security warning.
                    
                    Important: Make sure your Daikin app Redirect URI is set to ${url} in the Daikin Developer Portal.
                `);
            });

            this.controller.on('rate_limit_status', (rateLimitStatus) => {
                if (rateLimitStatus.remainingDay && rateLimitStatus.remainingDay <= 20) {
                    this.log.warn(`[Rate Limit] Rate limit almost reached, you only have ${rateLimitStatus.remainingDay} calls left today`);
                }
                this.log.debug(`[Rate Limit] Remaining calls today: ${rateLimitStatus.remainingDay}/${rateLimitStatus.limitDay} -- this minute: ${rateLimitStatus.remainingMinute}/${rateLimitStatus.limitMinute}`);
            });

            await this.discoverDevices(this.controller);
            this.startUpdateDevicesInterval();
        });
    }

    public configureAccessory(accessory: PlatformAccessory<DaikinCloudAccessoryContext>) {
        this.log.info('[Platform] Loading accessory from cache:', accessory.displayName);
        this.accessories.push(accessory);
    }

    private async discoverDevices(controller: DaikinCloudController) {
        let devices: DaikinCloudDevice[] = [];

        this.log.info('--- Daikin info for debugging reasons (enable Debug Mode for more logs) ---');

        this.log.debug('[Config] User config', this.getPrivacyFriendlyConfig(this.config));

        try {
            devices = await controller.getCloudDevices();
        } catch (error) {
            if (error instanceof Error) {
                error.message = `[API Syncing] Failed to get cloud devices from Daikin Cloud: ${error.message}`;
                this.log.error(error.message);
            }
        }

        devices.forEach(device => {
            try {
                const uuid = this.api.hap.uuid.generate(device.getId());
                const deviceModel: string = device.getDescription().deviceModel;

                const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

                if (this.isExcludedDevice(this.config.excludedDevicesByDeviceId, uuid)) {
                    this.log.info(`[Platform] Device with id ${uuid} is excluded, don't add accessory`);
                    if (existingAccessory) {
                        this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
                    }
                    return;
                }

                if (existingAccessory) {
                    this.log.info('[Platform] Restoring existing accessory from cache:', existingAccessory.displayName);
                    existingAccessory.context.device = device;
                    this.api.updatePlatformAccessories([existingAccessory]);

                    if (deviceModel === 'Altherma') {
                        new daikinAlthermaAccessory(this, existingAccessory);
                    } else {
                        new daikinAirConditioningAccessory(this, existingAccessory);
                    }

                } else {
                    const climateControlEmbeddedId = device.desc.managementPoints.find(mp => mp.managementPointType === 'climateControl')?.embeddedId;
                    const name: string = device.getData(climateControlEmbeddedId, 'name', undefined).value;
                    this.log.info('[Platform] Adding new accessory, deviceModel:', StringUtils.isEmpty(name) ? deviceModel : name);
                    const accessory = new this.api.platformAccessory<DaikinCloudAccessoryContext>(StringUtils.isEmpty(name) ? deviceModel : name, uuid);
                    accessory.context.device = device;

                    if (deviceModel === 'Altherma') {
                        new daikinAlthermaAccessory(this, accessory);
                    } else {
                        new daikinAirConditioningAccessory(this, accessory);
                    }

                    this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
                }
            } catch (error) {
                // eslint-disable-next-line no-console
                console.error(error);

                if (error instanceof Error) {
                    this.log.error(`[Platform] Failed to create HeaterCooler accessory from device, only HeaterCooler is supported at the moment: ${error.message}, device JSON: ${JSON.stringify(device)}`);
                }
            }
        });

        this.log.info('--------------- End Daikin info for debugging reasons --------------------');
    }

    private async updateDevices() {
        try {
            await this.controller.updateAllDeviceData();
        } catch (error) {
            this.log.error(`[API Syncing] Failed to update devices data: ${JSON.stringify(error)}`);
        }
    }

    forceUpdateDevices(delay: number = this.config.forceUpdateDelay || ONE_SECOND * 60) {
        this.log.debug(`[API Syncing] Force update devices data (delayed by ${delay}, update pending: ${this.forceUpdateTimeout || 'no update pending'})`);

        clearInterval(this.updateInterval);
        clearTimeout(this.forceUpdateTimeout);

        this.forceUpdateTimeout = setTimeout(async () => {
            await this.updateDevices();
            this.startUpdateDevicesInterval();
        }, delay);
    }

    private startUpdateDevicesInterval() {
        this.log.debug(`[API Syncing] (Re)starting update devices interval every ${this.updateIntervalDelay / ONE_MINUTE} minutes`);
        this.updateInterval = setInterval(async () => {
            await this.updateDevices();
        }, this.updateIntervalDelay);
    }

    private isExcludedDevice(excludedDevicesByDeviceId: Array<string>, deviceId: string): boolean {
        return typeof excludedDevicesByDeviceId !== 'undefined' && excludedDevicesByDeviceId.includes(deviceId);
    }

    private getPrivacyFriendlyConfig(config: PlatformConfig): object {
        return {
            ...config,
            clientId: StringUtils.mask(config.clientId),
            clientSecret: StringUtils.mask(config.clientSecret),
            excludedDevicesByDeviceId: config.excludedDevicesByDeviceId ? config.excludedDevicesByDeviceId.map(deviceId => StringUtils.mask(deviceId)) : [],
        };
    }
}
