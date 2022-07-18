import {Service, PlatformAccessory, CharacteristicValue} from 'homebridge';
import {DaikinCloudPlatform} from './platform';

export class DaikinCloudAirConditioningAccessory {
    private service: Service;
    private readonly name: string;

    constructor(
        private readonly platform: DaikinCloudPlatform,
        private readonly accessory: PlatformAccessory,
    ) {
        this.name = accessory.context.device.getData('climateControl', 'name').value;

        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Daikin')
            .setCharacteristic(this.platform.Characteristic.Model, accessory.context.device.getData('gateway', 'modelInfo').value)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.context.device.getData('gateway', 'serialNumber') ? accessory.context.device.getData('gateway', 'serialNumber').value : 'NOT_AVAILABLE');

        this.service = this.accessory.getService(this.platform.Service.HeaterCooler) || this.accessory.addService(this.platform.Service.HeaterCooler);

        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

        this.service.getCharacteristic(this.platform.Characteristic.Active)
            .onSet(this.handleActiveStateSet.bind(this))
            .onGet(this.handleActiveStateGet.bind(this));

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

    async handleActiveStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const state = this.accessory.context.device.getData('climateControl', 'onOffMode').value;
        this.platform.log.info(`[${this.name}] GET ActiveState, state: ${state}`);
        return state === 'on';
    }

    async handleActiveStateSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET ActiveState, state: ${value}`);
        const state = value as boolean;
        await this.accessory.context.device.setData('climateControl', 'onOffMode', state ? 'on' : 'off');
        await this.accessory.context.device.updateData();
    }

    async handleCurrentTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControl', 'sensoryData', '/roomTemperature').value;
        this.platform.log.info(`[${this.name}] GET CurrentTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleCoolingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').value;
        this.platform.log.info(`[${this.name}] GET CoolingThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleCoolingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = value as number;
        this.platform.log.info(`[${this.name}] SET CoolingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }

    async handleRotationSpeedGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const speed = this.accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).value;
        this.platform.log.info(`[${this.name}] GET RotationSpeed, speed: ${speed}`);
        return speed;
    }

    async handleRotationSpeedSet(value: CharacteristicValue) {
        const speed = value as number;
        this.platform.log.info(`[${this.name}] SET RotationSpeed, speed to: ${speed}`);
        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`, 'fixed');
        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`, speed);
        await this.accessory.context.device.updateData();
    }

    async handleHeatingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').value;
        this.platform.log.info(`[${this.name}] GET HeatingThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleHeatingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = value as number;
        this.platform.log.info(`[${this.name}] SET HeatingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }

    async handleTargetHeaterCoolerStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const operationMode = this.accessory.context.device.getData('climateControl', 'operationMode').value;
        this.platform.log.info(`[${this.name}] GET TargetHeaterCoolerState, operationMode: ${operationMode}`);

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
        this.platform.log.info(`[${this.name}] SET TargetHeaterCoolerState, OperationMode to: ${value}`);
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

        this.platform.log.info(`[${this.name}] SET TargetHeaterCoolerState, daikinOperationMode to: ${daikinOperationMode}`);
        await this.accessory.context.device.setData('climateControl', 'operationMode', daikinOperationMode);
        await this.accessory.context.device.updateData();
        await this.accessory.context.device.setData('climateControl', 'onOffMode', 'on');
        await this.accessory.context.device.updateData();
    }

    getCurrentOperationMode() {
        return this.accessory.context.device.getData('climateControl', 'operationMode').value;
    }
}
