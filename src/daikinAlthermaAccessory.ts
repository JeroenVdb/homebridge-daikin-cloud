import {PlatformAccessory} from 'homebridge';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from './platform';
import {daikinAccessory} from './daikinAccessory';
import {ClimateControlService} from './climateControlService';
import {HotWaterTankService} from './hotWaterTankService';

export class daikinAlthermaAccessory extends daikinAccessory{
    private readonly name: string;
    service?: ClimateControlService;
    hotWaterTankService?: HotWaterTankService;

    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory<DaikinCloudAccessoryContext>,
    ) {
        super(platform, accessory);

        this.name = this.accessory.displayName;

        const climateControlEmbeddedId = this.getEmbeddedIdByManagementPointType('climateControl');
        const domesticHotWaterTankEmbeddedId = this.getEmbeddedIdByManagementPointType('domesticHotWaterTank');

        if (climateControlEmbeddedId !== null) {
            this.service = new ClimateControlService(this.platform, this.accessory, climateControlEmbeddedId);
        } else {
            this.platform.log.warn(`[${this.name}] No climate control management point found`);
        }

        if (domesticHotWaterTankEmbeddedId !== null) {
            this.hotWaterTankService = new HotWaterTankService(this.platform, this.accessory, domesticHotWaterTankEmbeddedId);
        } else {
            this.platform.log.warn(`[${this.name}] No domestic hot water tank management point found`);
        }

    }
}
