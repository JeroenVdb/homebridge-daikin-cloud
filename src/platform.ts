import {API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic} from 'homebridge';

import {PLATFORM_NAME, PLUGIN_NAME} from './settings';
import {DaikinCloudAirConditioningAccessory} from './accessory';

import DaikinCloudController from 'daikin-controller-cloud';
import path from 'path';
import fs from 'fs';

import type * as Device from './../node_modules/daikin-controller-cloud/lib/device.js';
import type * as DaikinCloud from './../node_modules/daikin-controller-cloud/index.js';

export class DaikinCloudPlatform implements DynamicPlatformPlugin {
    public readonly Service: typeof Service = this.api.hap.Service;
    public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

    public readonly accessories: PlatformAccessory[] = [];

    public readonly storagePath: string = '';

    constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
    ) {
        this.log.debug('Finished initializing platform:', this.config.name);

        this.storagePath = api.user.storagePath();

        this.api.on('didFinishLaunching', () => {
            log.debug('Executed didFinishLaunching callback');
            this.discoverDevices(this.config.username, this.config.password);
        });
    }

    configureAccessory(accessory: PlatformAccessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        this.accessories.push(accessory);
    }

    async discoverDevices(username: string, password: string) {
        let devices: Device[] = [];

        this.log.info('---------- Daikin info for debugging reasons --------------------');

        try {
            devices = await this.getCloudDevices(username, password);
        } catch (error) {
            if (error instanceof Error) {
                error.message = `Failed to get cloud devices from Daikin Cloud: ${error.message}`;
                this.log.error(error.message);
            }
        }

        devices.forEach(device => {
            this.log.info('Device found with id: ' + device.getId() + ' Data:');
            this.log.info('    name: ' + device.getData('climateControlMainZone', 'name').value);
            this.log.info('    last updated: ' + device.getLastUpdated());
            this.log.info('    modelInfo: ' + device.getData('gateway', 'modelInfo').value);
            this.log.info('    config.showExtraFeatures: ' + this.config.showExtraFeatures);

            const uuid = this.api.hap.uuid.generate(device.getId());

            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            if (existingAccessory) {
                this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
                existingAccessory.context.device = device;
                this.api.updatePlatformAccessories([existingAccessory]);
                new DaikinCloudAirConditioningAccessory(this, existingAccessory);
            } else {
                this.log.info('Adding new accessory:', device.getData('climateControlMainZone', 'name').value);
                const accessory = new this.api.platformAccessory(device.getData('climateControlMainZone', 'name').value, uuid);
                //this.log.info("acc info", accessory);
                accessory.context.device = device;
                new DaikinCloudAirConditioningAccessory(this, accessory);
                this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
            }
        });

        this.log.info('---------- End Daikin info for debugging reasons ---------------');
    }

    async getCloudDevices(username: string, password: string): Promise<Device[]> {
        const daikinCloud = await this.initiateDaikinCloudController(username, password);
        const devices: Device[] = await daikinCloud.getCloudDevices();

        this.log.info(`Found ${devices.length} devices in your Daikin Cloud`);

        if (devices.length === 0) {
            return devices;
        }

        const cloudDetails = await daikinCloud.getCloudDeviceDetails();
        this.log.info(JSON.stringify(cloudDetails));

        return devices;
    }

    async initiateDaikinCloudController(username, password) {
        let tokenSet;
        const options = {
            logger: this.log.info,          // optional, logger function used to log details depending on loglevel
            logLevel: 'info',               // optional, Loglevel of Library, default 'warn' (logs nothing by default)
            proxyOwnIp: '192.168.xxx.xxx',  // required, if proxy needed: provide own IP or hostname to later access the proxy
            proxyPort: 8888,                // required: use this port for the proxy and point your client device to this port
            proxyWebPort: 8889,             // required: use this port for the proxy web interface to get the certificate and start Link for login
            proxyListenBind: '0.0.0.0',     // optional: set this to bind the proxy to a special IP, default is '0.0.0.0'
            proxyDataDir: this.storagePath, // Directory to store certificates and other proxy relevant data to
            communicationTimeout: 10000,    // Amount of ms to wait for request and responses before timeout
            communicationRetries: 3,        // Amount of retries when connection timed out
        };

        const tokenFile = path.join(this.storagePath, 'daikincloudtokenset.json');
        this.log.info(`Write/read Daikin Cloud tokenset from ${tokenFile}`);

        if (fs.existsSync(tokenFile)) {
            try {
                this.log.debug(`Daikin Cloud tokenset found at ${tokenFile}`);
                tokenSet = JSON.parse(fs.readFileSync(tokenFile).toString());
            } catch (e) {
                this.log.debug(`Daikin Cloud could not get tokenset: ${e}`);
            }
        }

        const daikinCloud: DaikinCloud = new DaikinCloudController(tokenSet, options);

        daikinCloud.on('token_update', tokenSet => {
            this.log.info(`UPDATED Daikin Cloud tokenset, use for future and wrote to ${tokenFile}`);
            fs.writeFileSync(tokenFile, JSON.stringify(tokenSet));
        });

        try {
            await daikinCloud.login(username, password);
        } catch (error) {
            if (error instanceof Error) {
                error.message = `Failed to login to Daikin Cloud with ${username}: ${error.message}`;
            }
            throw error;
        }

        return daikinCloud;
    }
}
