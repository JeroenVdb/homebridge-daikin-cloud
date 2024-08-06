import {Service, PlatformAccessory, CharacteristicValue} from 'homebridge';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from './platform';
import {daikinAccessory} from './daikinAccessory';
import {ClimateControlService} from "./climateControlService";
import {HotWaterTankService} from "./hotWaterTankService";

export class daikinAlthermaAccessory extends daikinAccessory{
    private readonly name: string;
    private service: ClimateControlService;
    private hotWaterTankService: HotWaterTankService;

    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory<DaikinCloudAccessoryContext>,
    ) {
        super(platform, accessory);

        this.name = this.accessory.displayName;

        this.service = new ClimateControlService(this.platform, this.accessory, 'climateControl');
        this.hotWaterTankService = new HotWaterTankService(this.platform, this.accessory);

    }


}
