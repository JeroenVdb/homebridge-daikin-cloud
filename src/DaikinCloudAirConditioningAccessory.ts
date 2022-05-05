import {Service, PlatformAccessory, CharacteristicValue} from 'homebridge';
import {DaikinCloudPlatform} from './platform';

export class DaikinCloudAirConditioningAccessory {
    private service: Service;

    constructor(
        private readonly platform: DaikinCloudPlatform,
        private readonly accessory: PlatformAccessory,
    ) {

        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Default-Manufacturer')
            .setCharacteristic(this.platform.Characteristic.Model, 'Default-Model')
            .setCharacteristic(this.platform.Characteristic.SerialNumber, 'Default-Serial');

        this.service = this.accessory.getService(this.platform.Service.HeaterCooler) || this.accessory.addService(this.platform.Service.HeaterCooler);

        this.service.setCharacteristic(this.platform.Characteristic.Name, accessory.context.device.getData('climateControl', 'name').value);

        this.service.getCharacteristic(this.platform.Characteristic.Active)
            .onSet(this.handleStateSet.bind(this))
            .onGet(this.handleStateGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .onGet(this.handleCurrentTemperatureGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.TargetHeaterCoolerState)
            .onGet(this.handleTargetHeaterCoolerStateGet.bind(this))
            .onSet(this.handleTargetHeaterCoolerStateSet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
            .setProps({
                minStep: this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minStep,
                minValue: this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minValue,
                maxValue: this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').maxValue,
            })
            .onGet(this.handleCoolingThresholdTemperatureGet.bind(this))
            .onSet(this.handleCoolingThresholdTemperatureSet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
            .setProps({
                minStep: this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').minStep,
                minValue: this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').minValue,
                maxValue: this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').maxValue,
            })
            .onGet(this.handleHeatingThresholdTemperatureGet.bind(this))
            .onSet(this.handleHeatingThresholdTemperatureSet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.RotationSpeed)
            .setProps({
                minStep: this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').minStep,
                minValue: this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').minValue,
                maxValue: this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').maxValue,
            })
            .onGet(this.handleRotationSpeedGet.bind(this))
            .onSet(this.handleRotationSpeedSet.bind(this));
    }

    async handleStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const state = this.accessory.context.device.getData('climateControl', 'onOffMode').value;
        this.platform.log.debug('Characteristic getOn, state ->', state);
        return state === 'on';
    }

    async handleStateSet(value: CharacteristicValue) {
        this.platform.log.debug('Characteristic handleStateSet, value', value);
        const state = value as boolean;
        await this.accessory.context.device.setData('climateControl', 'onOffMode', state ? 'on' : 'off');
        await this.accessory.context.device.updateData();
    }

    async handleCurrentTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControl', 'sensoryData', '/roomTemperature').value;
        this.platform.log.debug('Characteristic handleCurrentTemperatureGet, temperature ->', temperature);
        return temperature;
    }

    async handleCoolingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').value;
        this.platform.log.debug('Characteristic handleCoolingThresholdTemperatureGet, temperature ->', temperature);
        return temperature;
    }

    async handleCoolingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = value as number;
        this.platform.log.debug('Characteristic handleCoolingThresholdTemperatureSet, temperature ->', temperature);
        await this.accessory.context.device.setData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }

    async handleRotationSpeedGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const speed = this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').value;
        this.platform.log.debug('Characteristic handleRotationSpeedGet, speed ->', speed);
        return speed;
    }

    async handleRotationSpeedSet(value: CharacteristicValue) {
        const speed = value as number;
        this.platform.log.debug('Characteristic handleRotationSpeedSet, speed ->', speed);
        await this.accessory.context.device.setData('climateControl', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed', speed);
        await this.accessory.context.device.updateData();
    }

    async handleHeatingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').value;
        this.platform.log.debug('Characteristic handleHeatingThresholdTemperatureGet, temperature ->', temperature);
        return temperature;
    }

    async handleHeatingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = value as number;
        this.platform.log.debug('Characteristic handleHeatingThresholdTemperatureSet, temperature ->', temperature);
        await this.accessory.context.device.setData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }

    async handleTargetHeaterCoolerStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const operationMode = this.accessory.context.device.getData('climateControl', 'operationMode').value;
        this.platform.log.debug('Characteristic handleTargetHeaterCoolerStateGet, operationMode ->', operationMode);

        switch (operationMode) {
            case 'cooling':
                return this.platform.Characteristic.TargetHeaterCoolerState.COOL;
            case 'heating':
                return this.platform.Characteristic.TargetHeaterCoolerState.HEAT;
            default:
                return this.platform.Characteristic.TargetHeaterCoolerState.AUTO;
        }
    }

    async handleTargetHeaterCoolerStateSet(value: CharacteristicValue) {
        const operationMode = value as number;
        this.platform.log.debug('Characteristic handleTargetHeaterCoolerStateSet, OperationMode ->', value);
        let daikinOperationMode = 'cooling';

        switch (operationMode) {
            case this.platform.Characteristic.TargetHeaterCoolerState.COOL:
                daikinOperationMode = 'cooling';
                break;
            case this.platform.Characteristic.TargetHeaterCoolerState.HEAT:
                daikinOperationMode = 'heating';
                break;
            case this.platform.Characteristic.TargetHeaterCoolerState.AUTO:
                daikinOperationMode = 'auto';
                break;

        }

        this.platform.log.debug('Characteristic handleTargetHeaterCoolerStateSet, daikinOperationMode ->', daikinOperationMode);
        await this.accessory.context.device.setData('climateControl', 'operationMode', daikinOperationMode);
        await this.accessory.context.device.updateData();
    }
}
