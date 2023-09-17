import {PlatformAccessory} from 'homebridge';
import {DaikinCloudPlatform} from './platform';

export class DaikinCloudAccessory {
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

export enum DaikinFanSpeedModes {
    AUTO = 'auto',
    QUIET = 'quiet',
    FIXED = 'fixed',
}

export enum DaikinOutdoorSilentModes {
    ON = 'on',
    OFF = 'off',
}

export enum DaikinOnOffModes {
    ON = 'on',
    OFF = 'off',
}

export enum DaikinStreamerModes {
    ON = 'on',
    OFF = 'off',
}

export enum DaikinEconoModes {
    ON = 'on',
    OFF = 'off',
}
export enum DaikinPowerfulModes {
    ON = 'on',
    OFF = 'off',
}

export enum DaikinFanDirectionHorizontalModes {
    STOP = 'stop',
    SWING = 'swing',
}

export enum DaikinFanDirectionVerticalModes {
    STOP = 'stop',
    SWING = 'swing',
    WIND_NICE = 'windNice',
}

export enum DaikinOperationModes {
    FAN_ONLY = 'fanOnly',
    HEATING = 'heating',
    COOLING = 'cooling',
    AUTO = 'auto',
    DRY = 'dry'
}

export type DaikinClimateControlEmbeddedId = 'climateControl' | 'climateControlMainZone';
