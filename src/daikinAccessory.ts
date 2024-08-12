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
            this.platform.log.debug(`[API Syncing] Updated ${this.accessory.displayName} (${this.accessory.UUID}), LastUpdated: ${this.accessory.context.device.getLastUpdated()}`);
        });
    }

    printDeviceInfo() {
        this.platform.log.info('[Platform] Device found with id: ' + this.accessory.UUID);
        this.platform.log.info('[Platform]     id: ' + this.accessory.UUID);
        this.platform.log.info('[Platform]     name: ' + this.accessory.displayName);
        this.platform.log.info('[Platform]     last updated: ' + this.accessory.context.device.getLastUpdated());
        this.platform.log.info('[Platform]     modelInfo: ' + this.accessory.context.device.getData('gateway', 'modelInfo', undefined).value);
        this.platform.log.info('[Platform]     deviceModel: ' + this.accessory.context.device.getDescription().deviceModel);
    }

    getEmbeddedIdByManagementPointType(managementPointType: string): string | null {
        const managementPoints = this.accessory.context.device.desc.managementPoints.filter((managementPoint) => (managementPoint).managementPointType === managementPointType);

        if (managementPoints.length === 0) {
            this.platform.log.error(`[Platform] No management point found for managementPointType ${managementPointType}`);
            return null;
        }

        if (managementPoints.length >= 2) {
            this.platform.log.warn(`[Platform] Found more then one management point for managementPointType ${managementPointType}, we don't expect this, please open an issue on https://github.com/JeroenVdb/homebridge-daikin-cloud/issues`);
            return null;
        }

        return managementPoints[0].embeddedId;
    }
}
