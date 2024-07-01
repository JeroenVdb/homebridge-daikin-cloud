import {API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic} from 'homebridge';

import {PLATFORM_NAME, PLUGIN_NAME} from './settings';
import {DaikinClimateControlEmbeddedId, daikinAirConditioningAccessory} from './daikinAirConditioningAccessory';

import DaikinCloudController from 'daikin-controller-cloud';
import path from 'path';
import fs from 'fs';

import type * as Device from './../node_modules/daikin-controller-cloud/lib/device.js';
import type * as DaikinCloud from './../node_modules/daikin-controller-cloud/index.js';
import {daikinAlthermaAccessory} from './daikinAlthermaAccessory';

export class DaikinCloudPlatform implements DynamicPlatformPlugin {
    public readonly Service: typeof Service;
    public readonly Characteristic: typeof Characteristic;

    public readonly accessories: PlatformAccessory[] = [];

    public readonly storagePath: string = '';

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
            log.debug('Executed didFinishLaunching callback');
            await this.discoverDevices(this.config.clientId, this.config.clientSecret, this.config.accessToken, this.config.refreshToken, this.config.authenticationToken);
        });
    }

    configureAccessory(accessory: PlatformAccessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        this.accessories.push(accessory);
    }

    async discoverDevices(clientId: string, clientSecret: string, accessToken: string, refreshToken: string, authenticationToken: string) {
        let devices: Device[] = [];

        this.log.info('--- Daikin info for debugging reasons (enable Debug Mode for more logs) ---');

        try {
            devices = await this.getCloudDevices(clientId, clientSecret, accessToken, refreshToken, authenticationToken);
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
                const name: string = device.getData(climateControlEmbeddedId, 'name').value;
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

    async getCloudDevices(clientId: string, clientSecret: string, accessToken: string, refreshToken: string, authenticationToken: string): Promise<Device[]> {
        const daikinCloud = await this.initiateDaikinCloudController(clientId, clientSecret, accessToken, refreshToken, authenticationToken);
        const devices: Device[] = await daikinCloud.getCloudDevices();

        this.log.info(`Found ${devices.length} devices in your Daikin Cloud`);

        if (devices.length === 0) {
            return devices;
        }


        return devices;
    }

    async initiateDaikinCloudController(clientId: string, clientSecret: string, accessToken: string, refreshToken: string, authenticationToken: string) {
        let tokenSet;

        const tokenFile = path.join(this.storagePath, 'daikincloudtokenset_onectaapi.json');
        this.log.debug(`Write/read Daikin Cloud tokenset from ${tokenFile}`);

        if (fs.existsSync(tokenFile)) {
            try {
                this.log.debug(`Daikin Cloud tokenset found at ${tokenFile}`);
                tokenSet = JSON.parse(fs.readFileSync(tokenFile).toString());
            } catch (e) {
                this.log.debug(`Daikin Cloud could not get tokenset: ${e}`);
            }
        } else if (authenticationToken) {
            this.log.debug(`Got authenticationToken from config: ${authenticationToken}`);
            tokenSet = await DaikinCloudController.getAccessTokenFromAuthToken(clientId, clientSecret, authenticationToken, 'https://www.jeroenvdb.be');
            this.log.debug(`Got new tokenSet from Daikin Cloud: ${JSON.stringify(tokenSet)}`);
            fs.writeFileSync(tokenFile, JSON.stringify(tokenSet));
        } else if (accessToken && refreshToken) {
            this.log.debug('Got accessToken and refreshToken from config');
            tokenSet = {
                access_token: accessToken,
                refresh_token: refreshToken,
            };
        } else {
            throw new Error('Not the right configuration for Daikin Cloud found. Please provide either accessToken and refreshToken or authenticationToken.');
        }

        const daikinCloud: DaikinCloud = new DaikinCloudController(clientId, clientSecret, tokenSet, {});

        daikinCloud.on('token_update', tokenSet => {
            this.log.info('Retrieved new credentials from Daikin Cloud');
            fs.writeFileSync(tokenFile, JSON.stringify(tokenSet));
        });

        return daikinCloud;
    }

    private isExcludedDevice(excludedDevicesByDeviceId: Array<string>, deviceId): boolean {
        return typeof excludedDevicesByDeviceId !== 'undefined' && excludedDevicesByDeviceId.includes(deviceId);
    }
}
