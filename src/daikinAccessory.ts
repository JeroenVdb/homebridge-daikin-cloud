import {PlatformAccessory} from 'homebridge';
import {DaikinCloudPlatform} from './platform';

export class daikinAccessory {
    readonly platform: DaikinCloudPlatform;
    readonly accessory: PlatformAccessory;
    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory,
    ) {
        this.platform = platform;
        this.accessory = accessory;

        this.printDeviceInfo();

        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Daikin')
            .setCharacteristic(this.platform.Characteristic.Model, accessory.context.device.getData('gateway', 'modelInfo').value)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.context.device.getData('gateway', 'serialNumber') ? accessory.context.device.getData('gateway', 'serialNumber').value : 'NOT_AVAILABLE');
    }

    printDeviceInfo() {
        this.platform.log.info('Device found with id: ' + this.accessory.UUID);
        this.platform.log.info('    id: ' + this.accessory.UUID);
        this.platform.log.info('    name: ' + this.accessory.displayName);
        this.platform.log.info('    last updated: ' + this.accessory.context.device.getLastUpdated());
        this.platform.log.info('    modelInfo: ' + this.accessory.context.device.getData('gateway', 'modelInfo').value);
        this.platform.log.info('    deviceModel: ' + this.accessory.context.device.getDescription().deviceModel);
        this.platform.log.info('    config.showExtraFeatures: ' + this.platform.config.showExtraFeatures);
        this.platform.log.info('    config.excludedDevicesByDeviceId: ' + this.platform.config.showExtraFeatures);
    }
}
