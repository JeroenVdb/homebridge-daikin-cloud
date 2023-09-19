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

        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Daikin')
            .setCharacteristic(this.platform.Characteristic.Model, accessory.context.device.getData('gateway', 'modelInfo').value)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.context.device.getData('gateway', 'serialNumber') ? accessory.context.device.getData('gateway', 'serialNumber').value : 'NOT_AVAILABLE');
    }

    printDeviceInfo(uuid, name, lastUpdated, modelInfo, deviceModel, showExtraFeatures, excludedDevicesByDeviceId) {
        this.platform.log.info('Device found with id: ' + uuid);
        this.platform.log.info('    id: ' + uuid);
        this.platform.log.info('    name: ' + name);
        this.platform.log.info('    last updated: ' + lastUpdated);
        this.platform.log.info('    modelInfo: ' + modelInfo);
        this.platform.log.info('    deviceModel: ' + deviceModel);
        this.platform.log.info('    config.showExtraFeatures: ' + showExtraFeatures);
        this.platform.log.info('    config.excludedDevicesByDeviceId: ' + excludedDevicesByDeviceId);
    }
}
