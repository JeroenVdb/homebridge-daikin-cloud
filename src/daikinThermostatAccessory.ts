import {Service, PlatformAccessory, CharacteristicValue} from 'homebridge';
import {DaikinCloudPlatform} from './platform';
import {DaikinCloudAccessory} from './daikinAccessory';

export class DaikinCloudAirThermostatAccessory extends DaikinCloudAccessory{
    private readonly name: string;
    private service: Service;

    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory,
    ) {
        super(platform, accessory);

        this.name = this.accessory.context.device.getData('climateControlMainZone', 'name').value;

        this.printDeviceInfo(
            this.accessory.UUID,
            this.accessory.context.device.getData('climateControlMainZone', 'name').value,
            this.accessory.context.device.getLastUpdated(),
            this.accessory.context.device.getData('gateway', 'modelInfo').value,
            this.accessory.context.device.getDescription().deviceModel,
            this.platform.config.showExtraFeatures,
            this.platform.config.excludedDevicesByDeviceId,
        );

        this.service = this.accessory.getService(this.platform.Service.HeaterCooler) || this.accessory.addService(this.platform.Service.HeaterCooler);

        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

        this.service.getCharacteristic(this.platform.Characteristic.Active)
            .onSet(this.handleActiveStateSet.bind(this))
            .onGet(this.handleActiveStateGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .onGet(this.handleCurrentTemperatureGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.TargetHeaterCoolerState)
            .setProps(this.getTargetOperationModes())
            .onGet(this.handleTargetHeaterCoolerStateGet.bind(this))
            .onSet(this.handleTargetHeaterCoolerStateSet.bind(this));

        if (this.hasClimateControlCoolingFeature()) {
            this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
                .setProps({
                    minStep: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minStep,
                    minValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minValue,
                    maxValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').maxValue,
                })
                .onGet(this.handleCoolingThresholdTemperatureGet.bind(this))
                .onSet(this.handleCoolingThresholdTemperatureSet.bind(this));
        }

        this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
            .setProps({
                minStep: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').minStep,
                minValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').minValue,
                maxValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').maxValue,
            })
            .onGet(this.handleHeatingThresholdTemperatureGet.bind(this))
            .onSet(this.handleHeatingThresholdTemperatureSet.bind(this));

        if (this.hasFanControl()) {
            this.service.getCharacteristic(this.platform.Characteristic.RotationSpeed)
                .setProps({
                    minStep: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).minStep,
                    minValue: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).minValue,
                    maxValue: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).maxValue,
                })
                .onGet(this.handleRotationSpeedGet.bind(this))
                .onSet(this.handleRotationSpeedSet.bind(this));
        }

        if (this.hasSwingModeFeature()) {
            this.platform.log.debug(`[${this.name}] Device has SwingMode, add Characteristic`);
            this.service.getCharacteristic(this.platform.Characteristic.SwingMode)
                .onGet(this.handleSwingModeGet.bind(this))
                .onSet(this.handleSwingModeSet.bind(this));
        }
    }

    async handleActiveStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const state = this.accessory.context.device.getData('climateControlMainZone', 'onOffMode').value;
        this.platform.log.debug(`[${this.name}] GET ActiveState, state: ${state}`);
        return state === DaikinOnOffModes.ON;
    }

    async handleActiveStateSet(value: CharacteristicValue) {
        this.platform.log.debug(`[${this.name}] SET ActiveState, state: ${value}`);
        const state = value as boolean;
        await this.accessory.context.device.setData('climateControlMainZone', 'onOffMode', state ? DaikinOnOffModes.ON : DaikinOnOffModes.OFF);
        await this.accessory.context.device.updateData();
    }

    async handleCurrentTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControlMainZone', 'sensoryData', '/roomTemperature').value;
        this.platform.log.debug(`[${this.name}] GET CurrentTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleCoolingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').value;
        this.platform.log.debug(`[${this.name}] GET CoolingThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleCoolingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        // const temperature = value as number;
        this.platform.log.debug(`[${this.name}] SET CoolingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }

    async handleRotationSpeedGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const speed = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).value;
        this.platform.log.debug(`[${this.name}] GET RotationSpeed, speed: ${speed}`);
        return speed;
    }

    async handleRotationSpeedSet(value: CharacteristicValue) {
        const speed = value as number;
        this.platform.log.debug(`[${this.name}] SET RotationSpeed, speed to: ${speed}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`, 'fixed');
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`, speed);
        await this.accessory.context.device.updateData();
    }

    async handleHeatingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').value;
        this.platform.log.debug(`[${this.name}] GET HeatingThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleHeatingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        // const temperature = value as number;
        this.platform.log.debug(`[${this.name}] SET HeatingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }

    async handleTargetHeaterCoolerStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const operationMode: DaikinOperationModes = this.accessory.context.device.getData('climateControlMainZone', 'operationMode').value;
        this.platform.log.debug(`[${this.name}] GET TargetHeaterCoolerState, operationMode: ${operationMode}`);

        switch (operationMode) {
            case DaikinOperationModes.COOLING:
                return this.platform.Characteristic.TargetHeaterCoolerState.COOL;
            case DaikinOperationModes.HEATING:
                return this.platform.Characteristic.TargetHeaterCoolerState.HEAT;
            default:
                return this.platform.Characteristic.TargetHeaterCoolerState.AUTO;
        }
    }

    async handleTargetHeaterCoolerStateSet(value: CharacteristicValue) {
        const operationMode = value as number;
        this.platform.log.debug(`[${this.name}] SET TargetHeaterCoolerState, OperationMode to: ${value}`);
        let daikinOperationMode: DaikinOperationModes = DaikinOperationModes.COOLING;

        switch (operationMode) {
            case this.platform.Characteristic.TargetHeaterCoolerState.COOL:
                daikinOperationMode = DaikinOperationModes.COOLING;
                break;
            case this.platform.Characteristic.TargetHeaterCoolerState.HEAT:
                daikinOperationMode = DaikinOperationModes.HEATING;
                break;
            case this.platform.Characteristic.TargetHeaterCoolerState.AUTO:
                daikinOperationMode = DaikinOperationModes.AUTO;
                break;
        }

        this.platform.log.debug(`[${this.name}] SET TargetHeaterCoolerState, daikinOperationMode to: ${daikinOperationMode}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'operationMode', daikinOperationMode);
        await this.accessory.context.device.setData('climateControlMainZone', 'onOffMode', DaikinOnOffModes.ON);
        await this.accessory.context.device.updateData();
    }

    async handleSwingModeSet(value: CharacteristicValue) {
        const swingMode = value as number;
        const daikinSwingMode = swingMode === 1 ? DaikinFanDirectionHorizontalModes.SWING : DaikinFanDirectionHorizontalModes.STOP;
        this.platform.log.debug(`[${this.name}] SET SwingMode, swingmode to: ${swingMode}/${daikinSwingMode}`);

        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/horizontal/currentMode`, daikinSwingMode);
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`, daikinSwingMode);
        await this.accessory.context.device.updateData();
    }

    async handleSwingModeGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();

        const verticalSwingMode = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        const horizontalSwingMode = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        this.platform.log.debug(`[${this.name}] GET SwingMode, verticalSwingMode: ${verticalSwingMode}`);
        this.platform.log.debug(`[${this.name}] GET SwingMode, horizontalSwingMode: ${horizontalSwingMode}`);

        if (horizontalSwingMode === DaikinFanDirectionHorizontalModes.STOP || verticalSwingMode === DaikinFanDirectionVerticalModes.STOP) {
            return this.platform.Characteristic.SwingMode.SWING_DISABLED;
        }

        return this.platform.Characteristic.SwingMode.SWING_ENABLED;
    }

    getCurrentOperationMode() {
        return this.accessory.context.device.getData('climateControlMainZone', 'operationMode').value;
    }

    hasClimateControlCoolingFeature() {
        const cooling = this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature');
        this.platform.log.debug(`[${this.name}] hasClimateControlCoolingFeature, coolingFeature: ${Boolean(cooling)}`);
        return Boolean(cooling);
    }

    hasOnlyHeating() {
        const operationModes: Array<string> = this.accessory.context.device.getData('climateControlMainZone', 'operationMode').values;
        this.platform.log.debug(`[${this.name}] hasOnlyHeating, operationModes: ${operationModes.join(', ')}`);
        return operationModes === ['heating'];
    }

    hasFanControl() {
        const fanControl = this.accessory.context.device.getData('climateControlMainZone', 'fanControl');
        this.platform.log.debug(`[${this.name}] hasFanControl, hasFanControl: ${Boolean(fanControl)}`);
        return Boolean(fanControl);
    }

    getTargetOperationModes() {
        if (this.hasOnlyHeating()) {
            return {
                minStep: 1,
                minValue: 1,
                maxValue: 1,
            };
        }

        return {
            minStep: 1,
            minValue: 0,
            maxValue: 2,
        };
    }

    hasSwingModeFeature() {
        const verticalSwing = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/heating/fanDirection/vertical/currentMode');
        const horizontalSwing = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/heating/fanDirection/horizontal/currentMode');
        this.platform.log.debug(`[${this.name}] hasSwingModeFeature, verticalSwing: ${Boolean(verticalSwing)}`);
        this.platform.log.debug(`[${this.name}] hasSwingModeFeature, horizontalSwing: ${Boolean(horizontalSwing)}`);
        return Boolean(verticalSwing || horizontalSwing);
    }
}

enum DaikinOnOffModes {
    ON = 'on',
    OFF = 'off',
}

enum DaikinFanDirectionHorizontalModes {
    STOP = 'stop',
    SWING = 'swing',
}

enum DaikinFanDirectionVerticalModes {
    STOP = 'stop',
    SWING = 'swing',
    WIND_NICE = 'windNice',
}

enum DaikinOperationModes {
    FAN_ONLY = 'fanOnly',
    HEATING = 'heating',
    COOLING = 'cooling',
    AUTO = 'auto',
    DRY = 'dry'
}
