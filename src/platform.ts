import {API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic} from 'homebridge';

import {PLATFORM_NAME, PLUGIN_NAME} from './settings';
import {DaikinCloudAirConditioningAccessory} from './accessory';

import DaikinCloudController from 'daikin-controller-cloud';
import path from 'path';
import fs from 'fs';

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
        const daikinCloud = await this.initiateDaikinCloudController(username, password);
        const devices = await daikinCloud.getCloudDevices();

        if (devices.length === 0) {
            this.log.info('No devices found');
            return;
        }

        const cloudDetails = await daikinCloud.getCloudDeviceDetails();
        this.log.info('---------- Daikin info for debugging reasons --------------------');
        this.log.info(JSON.stringify(cloudDetails));

        devices.forEach(device => {
            this.log.info('Device found with id: ' + device.getId() + ' Data:');
            this.log.info('    name: ' + device.getData('climateControl', 'name').value);
            this.log.info('    last updated: ' + device.getLastUpdated());
            this.log.info('    modelInfo: ' + device.getData('gateway', 'modelInfo').value);

            const uuid = this.api.hap.uuid.generate(device.getId());

            const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);
            if (existingAccessory) {
                this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
                existingAccessory.context.device = device;
                this.api.updatePlatformAccessories([existingAccessory]);
                new DaikinCloudAirConditioningAccessory(this, existingAccessory);
            } else {
                this.log.info('Adding new accessory:', device.getData('climateControl', 'name').value);
                const accessory = new this.api.platformAccessory(device.getData('climateControl', 'name').value, uuid);
                accessory.context.device = device;
                new DaikinCloudAirConditioningAccessory(this, accessory);
                this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
            }
        });

        this.log.info('---------- End Daikin info for debugging reasons ---------------');
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

        const daikinCloud = new DaikinCloudController(tokenSet, options);

        daikinCloud.on('token_update', tokenSet => {
            this.log.info(`UPDATED Daikin Cloud tokenset, use for future and wrote to ${tokenFile}`);
            fs.writeFileSync(tokenFile, JSON.stringify(tokenSet));
        });

        await daikinCloud.login(username, password);

        return daikinCloud;
    }
}
