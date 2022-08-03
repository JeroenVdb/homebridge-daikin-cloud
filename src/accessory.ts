import {Service, PlatformAccessory, CharacteristicValue} from 'homebridge';
import {DaikinCloudPlatform} from './platform';

export class DaikinCloudAirConditioningAccessory {
    private readonly name: string;
    private service: Service;
    private switchServicePowerfulMode: Service | undefined;
    private switchServiceEconoMode: Service | undefined;
    private switchServiceStreamerMode: Service | undefined;
    private switchServiceOutdoorSilentMode: Service | undefined;

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

        if (this.hasSwingModeFeature()) {
            this.platform.log.info(`[${this.name}] Device has SwingMode, add Characteristic`);
            this.service.getCharacteristic(this.platform.Characteristic.SwingMode)
                .onGet(this.handleSwingModeGet.bind(this))
                .onSet(this.handleSwingModeSet.bind(this));
        }

        if (this.hasPowerfulModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.info(`[${this.name}] Device has PowerfulMode, add Switch Service`);

            this.switchServicePowerfulMode = this.accessory.getService('Powerful mode') || this.accessory.addService(this.platform.Service.Switch, 'Powerful mode', 'powerful_mode');
            this.switchServicePowerfulMode.setCharacteristic(this.platform.Characteristic.Name, 'Powerful mode');

            this.switchServicePowerfulMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handlePowerfulModeGet.bind(this))
                .onSet(this.handlePowerfulModeSet.bind(this));

        }

        if (this.hasEconoModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.info(`[${this.name}] Device has EconoMode, add Switch Service`);

            this.switchServiceEconoMode = this.accessory.getService('Econo mode') || this.accessory.addService(this.platform.Service.Switch, 'Econo mode', 'econo_mode');
            this.switchServiceEconoMode.setCharacteristic(this.platform.Characteristic.Name, 'Econo mode');

            this.switchServiceEconoMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleEconoModeGet.bind(this))
                .onSet(this.handleEconoModeSet.bind(this));

        }

        if (this.hasStreamerModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.info(`[${this.name}] Device has StreamerMode, add Switch Service`);

            this.switchServiceStreamerMode = this.accessory.getService('Streamer mode') || this.accessory.addService(this.platform.Service.Switch, 'Streamer mode', 'streamer_mode');
            this.switchServiceStreamerMode.setCharacteristic(this.platform.Characteristic.Name, 'Streamer mode');

            this.switchServiceStreamerMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleStreamerModeGet.bind(this))
                .onSet(this.handleStreamerModeSet.bind(this));

        }

        if (this.hasOutdoorSilentModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.info(`[${this.name}] Device has StreamerMode, add Switch Service`);

            this.switchServiceOutdoorSilentMode = this.accessory.getService('Outdoor silent mode') || this.accessory.addService(this.platform.Service.Switch, 'Outdoor silent mode', 'outdoor_silent_mode');
            this.switchServiceOutdoorSilentMode.setCharacteristic(this.platform.Characteristic.Name, 'Outdoor silent mode');

            this.switchServiceOutdoorSilentMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleOutdoorSilentModeGet.bind(this))
                .onSet(this.handleOutdoorSilentModeSet.bind(this));

        }
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
        const temperature = Math.round(value*2)/2 as number;
        // const temperature = value as number;
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
        const temperature = Math.round(value*2)/2 as number;
        // const temperature = value as number;
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
        await this.accessory.context.device.setData('climateControl', 'onOffMode', 'on');
        await this.accessory.context.device.updateData();
    }

    async handleSwingModeSet(value: CharacteristicValue) {
        const swingMode = value as number;
        const daikinSwingMode = swingMode === 1 ? 'swing' : 'stop';
        this.platform.log.info(`[${this.name}] SET SwingMode, swingmode to: ${swingMode}/${daikinSwingMode}`);

        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/horizontal/currentMode`, daikinSwingMode);
        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`, daikinSwingMode);
        await this.accessory.context.device.updateData();
    }

    async handleSwingModeGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();

        const verticalSwingMode = this.accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        const horizontalSwingMode = this.accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        this.platform.log.info(`[${this.name}] GET SwingMode, verticalSwingMode: ${verticalSwingMode}`);
        this.platform.log.info(`[${this.name}] GET SwingMode, horizontalSwingMode: ${horizontalSwingMode}`);

        if (horizontalSwingMode === 'stop' || verticalSwingMode === 'stop') {
            return this.platform.Characteristic.SwingMode.SWING_DISABLED;
        }

        return this.platform.Characteristic.SwingMode.SWING_ENABLED;
    }

    async handlePowerfulModeGet() {
        this.platform.log.info(`[${this.name}] GET PowerfulMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControl', 'powerfulMode').value === 'on';
    }

    async handlePowerfulModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET PowerfulMode to: ${value}`);
        const daikinPowerfulMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControl', 'powerfulMode', daikinPowerfulMode);
    }

    async handleEconoModeGet() {
        this.platform.log.info(`[${this.name}] GET EconoMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControl', 'econoMode').value === 'on';
    }

    async handleEconoModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET EconoMode to: ${value}`);
        const daikinEconoMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControl', 'econoMode', daikinEconoMode);
    }

    async handleStreamerModeGet() {
        this.platform.log.info(`[${this.name}] GET StreamerMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControl', 'streamerMode').value === 'on';
    }

    async handleStreamerModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET streamerMode to: ${value}`);
        const daikinStreamerMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControl', 'streamerMode', daikinStreamerMode);
    }

    async handleOutdoorSilentModeGet() {
        this.platform.log.info(`[${this.name}] GET OutdoorSilentMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControl', 'outdoorSilentMode').value === 'on';
    }

    async handleOutdoorSilentModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET outdoorSilentMode to: ${value}`);
        const daikinOutdoorSilentMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControl', 'outdoorSilentMode', daikinOutdoorSilentMode);
    }

    getCurrentOperationMode() {
        return this.accessory.context.device.getData('climateControl', 'operationMode').value;
    }

    hasSwingModeFeature() {
        const verticalSwing = this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/heating/fanDirection/vertical/currentMode');
        const horizontalSwing = this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/heating/fanDirection/horizontal/currentMode');
        this.platform.log.info(`[${this.name}] hasSwingModeFeature, verticalSwing: ${Boolean(verticalSwing)}`);
        this.platform.log.info(`[${this.name}] hasSwingModeFeature, horizontalSwing: ${Boolean(horizontalSwing)}`);
        return Boolean(verticalSwing || horizontalSwing);
    }

    hasPowerfulModeFeature() {
        const powerfulMode = this.accessory.context.device.getData('climateControl', 'powerfulMode');
        this.platform.log.info(`[${this.name}] hasPowerfulModeFeature, powerfulMode: ${Boolean(powerfulMode)}`);
        return Boolean(powerfulMode);
    }

    hasEconoModeFeature() {
        const econoMode = this.accessory.context.device.getData('climateControl', 'econoMode');
        this.platform.log.info(`[${this.name}] hasEconoModeFeature, econoMode: ${Boolean(econoMode)}`);
        return Boolean(econoMode);
    }

    hasStreamerModeFeature() {
        const streamerMode = this.accessory.context.device.getData('climateControl', 'streamerMode');
        this.platform.log.info(`[${this.name}] hasStreamerModeFeature, streamerMode: ${Boolean(streamerMode)}`);
        return Boolean(streamerMode);
    }

    hasOutdoorSilentModeFeature() {
        const OutdoorSilentMode = this.accessory.context.device.getData('climateControl', 'outdoorSilentMode');
        this.platform.log.info(`[${this.name}] hasOutdoorSilentModeFeature, outdoorSilentMode: ${Boolean(OutdoorSilentMode)}`);
        return Boolean(OutdoorSilentMode);
    }
}
