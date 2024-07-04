import {PlatformAccessory} from 'homebridge';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from './platform';

export class daikinAccessory {
    readonly platform: DaikinCloudPlatform;
    readonly accessory: PlatformAccessory<DaikinCloudAccessoryContext>;
    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory<DaikinCloudAccessoryContext>,
    ) {
        this.platform = platform;
        this.accessory = accessory;

        this.printDeviceInfo();

        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Daikin')
            .setCharacteristic(this.platform.Characteristic.Model, accessory.context.device.getData('gateway', 'modelInfo', undefined).value)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.context.device.getData('gateway', 'serialNumber', undefined) ? accessory.context.device.getData('gateway', 'serialNumber', undefined).value : 'NOT_AVAILABLE');

        this.accessory.context.device.on('updated', () => {
            this.platform.log.debug(`Updated ${this.accessory.displayName} (${this.accessory.UUID})`);
        });
    }

    printDeviceInfo() {
        this.platform.log.info('Device found with id: ' + this.accessory.UUID);
        this.platform.log.info('    id: ' + this.accessory.UUID);
        this.platform.log.info('    name: ' + this.accessory.displayName);
        this.platform.log.info('    last updated: ' + this.accessory.context.device.getLastUpdated());
        this.platform.log.info('    modelInfo: ' + this.accessory.context.device.getData('gateway', 'modelInfo', undefined).value);
        this.platform.log.info('    deviceModel: ' + this.accessory.context.device.getDescription().deviceModel);
        this.platform.log.info('    config.showExtraFeatures: ' + this.platform.config.showExtraFeatures);
        this.platform.log.info('    config.excludedDevicesByDeviceId: ' + this.platform.config.showExtraFeatures);
    }
}
