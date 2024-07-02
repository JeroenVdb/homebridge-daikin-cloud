import {API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic} from 'homebridge';

import {PLATFORM_NAME, PLUGIN_NAME} from './settings';
import {DaikinClimateControlEmbeddedId, daikinAirConditioningAccessory} from './daikinAirConditioningAccessory';

import {DaikinCloudController} from 'daikin-controller-cloud/dist/index.js';

import {daikinAlthermaAccessory} from './daikinAlthermaAccessory';
import {resolve} from 'node:path';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';

export class DaikinCloudPlatform implements DynamicPlatformPlugin {
    public readonly Service: typeof Service;
    public readonly Characteristic: typeof Characteristic;

    public readonly accessories: PlatformAccessory[] = [];

    public readonly storagePath: string = '';
    public controller: DaikinCloudController | undefined;

    constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
    ) {
        this.Service = this.api.hap.Service;
        this.Characteristic = this.api.hap.Characteristic;

        this.log.debug('Finished initializing platform:', this.config.name);

        this.storagePath = api.user.storagePath();

        this.api.on('didFinishLaunching', async () => {
            const controller = new DaikinCloudController({
                /* OIDC client id */
                oidc_client_id: this.config.clientId,
                /* OIDC client secret */
                oidc_client_secret: this.config.clientSecret,
                /* network interface that the HTTP server should bind to */
                oidc_callback_server_addr: '0.0.0.0',
                /* port that the HTTP server should bind to */
                oidc_callback_server_port: this.config.port,
                /* OIDC Redirect URI */
                oidc_callback_server_baseurl: this.config.redirectUri,
                /* path of file used to cache the OIDC tokenset */
                oidc_tokenset_file_path: resolve(this.storagePath, '.daikin-controller-cloud-tokenset'),
                /* time to wait for the user to go through the authorization grant flow before giving up (in seconds) */
                oidc_authorization_timeout: 60 * 5,
            });

            controller.on('authorization_request', (url) => {
                this.log.warn('Please navigate to %s', url);
            });

            log.debug('Executed didFinishLaunching callback');
            await this.discoverDevices(controller);
        });
    }

    configureAccessory(accessory: PlatformAccessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        this.accessories.push(accessory);
    }

    async discoverDevices(controller: DaikinCloudController) {
        let devices: DaikinCloudDevice[] = [];

        this.log.info('--- Daikin info for debugging reasons (enable Debug Mode for more logs) ---');

        try {
            devices = await controller.getCloudDevices();
        } catch (error) {
            if (error instanceof Error) {
                error.message = `Failed to get cloud devices from Daikin Cloud: ${error.message}`;
                this.log.error(error.message);
            }
        }

        devices.forEach(device => {
            try {
                const uuid = this.api.hap.uuid.generate(device.getId());
                const climateControlEmbeddedId: DaikinClimateControlEmbeddedId = device.getDescription().deviceModel === 'Altherma' ? 'climateControlMainZone' : 'climateControl';
                const name: string = device.getData(climateControlEmbeddedId, 'name', undefined).value;
                const deviceModel: string = device.getDescription().deviceModel;

                const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

                if (this.isExcludedDevice(this.config.excludedDevicesByDeviceId, uuid)) {
                    this.log.info(`Device with id ${uuid} is excluded, don't add accessory`);
                    if (existingAccessory) {
                        this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
                    }
                    return;
                }

                if (existingAccessory) {
                    this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
                    existingAccessory.context.device = device;
                    this.api.updatePlatformAccessories([existingAccessory]);

                    if (deviceModel === 'Altherma') {
                        new daikinAlthermaAccessory(this, existingAccessory);
                    } else {
                        new daikinAirConditioningAccessory(this, existingAccessory);
                    }

                } else {
                    this.log.info('Adding new accessory:', name);
                    const accessory = new this.api.platformAccessory(name, uuid);
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
                    this.log.error(`Failed to create HeaterCooler accessory from device, only HeaterCooler is supported at the moment: ${error.message}, device JSON: ${JSON.stringify(device)}`);
                }
            }
        });

        this.log.info('--------------- End Daikin info for debugging reasons --------------------');
    }

    private isExcludedDevice(excludedDevicesByDeviceId: Array<string>, deviceId: string): boolean {
        return typeof excludedDevicesByDeviceId !== 'undefined' && excludedDevicesByDeviceId.includes(deviceId);
    }
}
