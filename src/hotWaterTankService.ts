import {CharacteristicValue, PlatformAccessory, Service} from 'homebridge';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from './platform';

export class HotWaterTankService {
    readonly platform: DaikinCloudPlatform;
    readonly accessory: PlatformAccessory<DaikinCloudAccessoryContext>;
    private readonly managementPointId: string;
    private readonly name: string;
    private hotWaterTankService: Service;

    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory<DaikinCloudAccessoryContext>,
        managementPointId: string,
    ) {
        this.platform = platform;
        this.accessory = accessory;
        this.managementPointId = managementPointId;
        this.name = this.accessory.displayName;


        this.hotWaterTankService = this.accessory.getService('Hot water tank') || accessory.addService(this.platform.Service.Thermostat, 'Hot water tank', 'hot_water_tank');
        this.hotWaterTankService.setCharacteristic(this.platform.Characteristic.Name, 'Hot water tank');

        this.hotWaterTankService
            .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
        this.hotWaterTankService
            .setCharacteristic(this.platform.Characteristic.ConfiguredName, 'Hot water tank');

        this.hotWaterTankService.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .onGet(this.handleHotWaterTankCurrentTemperatureGet.bind(this));

        this.hotWaterTankService.getCharacteristic(this.platform.Characteristic.TargetTemperature)
            .setProps({
                minStep: accessory.context.device.getData(this.managementPointId, 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature').minStep,
                minValue: accessory.context.device.getData(this.managementPointId, 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature').minValue,
                maxValue: accessory.context.device.getData(this.managementPointId, 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature').maxValue,
            })
            .onGet(this.handleHotWaterTankHeatingTargetTemperatureGet.bind(this))
            .onSet(this.handleHotWaterTankHeatingTargetTemperatureSet.bind(this));

        this.hotWaterTankService.getCharacteristic(this.platform.Characteristic.TargetHeatingCoolingState)
            .setProps({
                minStep: 1,
                minValue: 0,
                maxValue: 1,
            })
            .onGet(this.handleHotWaterTankTargetHeaterCoolerStateGet.bind(this))
            .onSet(this.handleHotWaterTankTargetHeaterCoolerStateSet.bind(this));

    }

    async handleHotWaterTankCurrentTemperatureGet(): Promise<CharacteristicValue> {
        const temperature = this.accessory.context.device.getData(this.managementPointId, 'sensoryData', '/tankTemperature').value;
        this.platform.log.debug(`[${this.name}] GET CurrentTemperature for hot water tank, temperature: ${temperature}`);
        return temperature;
    }

    async handleHotWaterTankHeatingTargetTemperatureGet(): Promise<CharacteristicValue> {
        const temperature = this.accessory.context.device.getData(this.managementPointId, 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature').value;
        this.platform.log.debug(`[${this.name}] GET HeatingThresholdTemperature domesticHotWaterTank, temperature: ${temperature}`);
        return temperature;
    }

    async handleHotWaterTankHeatingTargetTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        this.platform.log.debug(`[${this.name}] SET HeatingThresholdTemperature domesticHotWaterTank, temperature to: ${temperature}`);
        await this.accessory.context.device.setData(this.managementPointId, 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature', temperature);
        this.platform.forceUpdateDevices();
    }

    async handleHotWaterTankTargetHeaterCoolerStateGet(): Promise<CharacteristicValue> {
        const operationMode: DaikinOperationModes = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined).value;
        this.platform.log.debug(`[${this.name}] GET TargetHeaterCoolerState, operationMode: ${operationMode}`);

        switch (operationMode) {
            case DaikinOperationModes.COOLING:
                return this.platform.Characteristic.TargetHeatingCoolingState.COOL;
            case DaikinOperationModes.HEATING:
                return this.platform.Characteristic.TargetHeatingCoolingState.HEAT;
            default:
                return this.platform.Characteristic.TargetHeatingCoolingState.AUTO;
        }
    }

    async handleHotWaterTankTargetHeaterCoolerStateSet(value: CharacteristicValue) {
        const operationMode = value as number;
        this.platform.log.debug(`[${this.name}] SET TargetHeaterCoolerState, OperationMode to: ${value}`);
        let daikinOperationMode: DaikinOperationModes = DaikinOperationModes.COOLING;

        if (operationMode === this.platform.Characteristic.TargetHeatingCoolingState.OFF) {
            await this.accessory.context.device.setData(this.managementPointId, 'onOffMode', DaikinOnOffModes.OFF, undefined);

            return;
        }

        switch (operationMode) {
            case this.platform.Characteristic.TargetHeatingCoolingState.COOL:
                daikinOperationMode = DaikinOperationModes.COOLING;
                break;
            case this.platform.Characteristic.TargetHeatingCoolingState.HEAT:
                daikinOperationMode = DaikinOperationModes.HEATING;
                break;
            case this.platform.Characteristic.TargetHeatingCoolingState.AUTO:
                daikinOperationMode = DaikinOperationModes.AUTO;
                break;
        }

        this.platform.log.debug(`[${this.name}] SET TargetHeaterCoolerState, daikinOperationMode to: ${daikinOperationMode}`);
        await this.accessory.context.device.setData(this.managementPointId, 'onOffMode', DaikinOnOffModes.ON, undefined);
        await this.accessory.context.device.setData(this.managementPointId, 'operationMode', daikinOperationMode, undefined);
        this.platform.forceUpdateDevices();
    }

    hasOnlyHeating() {
        const operationModes: Array<string> = this.accessory.context.device.getData('climateControlMainZone', 'operationMode', undefined).values;
        this.platform.log.debug(`[${this.name}] hasOnlyHeating, operationModes: ${operationModes.join(', ')}`);
        return operationModes.length === 1 && operationModes[0] === 'heating';
    }
}

enum DaikinOnOffModes {
    ON = 'on',
    OFF = 'off',
}

enum DaikinOperationModes {
    FAN_ONLY = 'fanOnly',
    HEATING = 'heating',
    COOLING = 'cooling',
    AUTO = 'auto',
    DRY = 'dry'
}
