import {Service, PlatformAccessory, CharacteristicValue} from 'homebridge';
import {DaikinCloudPlatform} from './platform';
import {daikinAccessory} from './daikinAccessory';

export class daikinAirConditioningAccessory extends daikinAccessory{
    private extraServices = {
        POWERFUL_MODE: 'Powerful mode',
        ECONO_MODE: 'Econo mode',
        STREAMER_MODE: 'Streamer mode',
        OUTDOUR_SILENT_MODE: 'Outdoor silent mode',
        INDOOR_SILENT_MODE: 'Indoor silent mode',
    };

    private readonly name: string;
    private service: Service;

    private switchServicePowerfulMode = this.accessory.getService(this.extraServices.POWERFUL_MODE);
    private switchServiceEconoMode = this.accessory.getService(this.extraServices.ECONO_MODE);
    private switchServiceStreamerMode = this.accessory.getService(this.extraServices.STREAMER_MODE);
    private switchServiceOutdoorSilentMode = this.accessory.getService(this.extraServices.OUTDOUR_SILENT_MODE);
    private switchServiceIndoorSilentMode = this.accessory.getService(this.extraServices.INDOOR_SILENT_MODE);

    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory,
    ) {
        super(platform, accessory);

        this.name = accessory.displayName;

        this.service = this.accessory.getService(this.platform.Service.HeaterCooler) || this.accessory.addService(this.platform.Service.HeaterCooler);

        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

        this.service.getCharacteristic(this.platform.Characteristic.Active)
            .onSet(this.handleActiveStateSet.bind(this))
            .onGet(this.handleActiveStateGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .onGet(this.handleCurrentTemperatureGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.TargetHeaterCoolerState)
            .setProps({
                minStep: 1,
                minValue: 0,
                maxValue: 2,
            })
            .onGet(this.handleTargetHeaterCoolerStateGet.bind(this))
            .onSet(this.handleTargetHeaterCoolerStateSet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
            .setProps({
                minStep: accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minStep,
                minValue: accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minValue,
                maxValue: accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').maxValue,
            })
            .onGet(this.handleCoolingThresholdTemperatureGet.bind(this))
            .onSet(this.handleCoolingThresholdTemperatureSet.bind(this));


        this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
            .setProps({
                minStep: accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').minStep,
                minValue: accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').minValue,
                maxValue: accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').maxValue,
            })
            .onGet(this.handleHeatingThresholdTemperatureGet.bind(this))
            .onSet(this.handleHeatingThresholdTemperatureSet.bind(this));


        this.service.getCharacteristic(this.platform.Characteristic.RotationSpeed)
            .setProps({
                minStep: accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).minStep,
                minValue: accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).minValue,
                maxValue: accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).maxValue,
            })
            .onGet(this.handleRotationSpeedGet.bind(this))
            .onSet(this.handleRotationSpeedSet.bind(this));

        if (this.hasSwingModeFeature()) {
            this.platform.log.debug(`[${this.name}] Device has SwingMode, add Characteristic`);
            this.service.getCharacteristic(this.platform.Characteristic.SwingMode)
                .onGet(this.handleSwingModeGet.bind(this))
                .onSet(this.handleSwingModeSet.bind(this));
        }

        if (this.hasPowerfulModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.debug(`[${this.name}] Device has PowerfulMode, add Switch Service`);

            this.switchServicePowerfulMode = this.switchServicePowerfulMode || accessory.addService(this.platform.Service.Switch, this.extraServices.POWERFUL_MODE, 'powerful_mode');
            this.switchServicePowerfulMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.POWERFUL_MODE);

            this.switchServicePowerfulMode
                .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
            this.switchServicePowerfulMode
                .setCharacteristic(this.platform.Characteristic.ConfiguredName, this.extraServices.POWERFUL_MODE);

            this.switchServicePowerfulMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handlePowerfulModeGet.bind(this))
                .onSet(this.handlePowerfulModeSet.bind(this));

        } else {
            if (this.switchServicePowerfulMode) {
                accessory.removeService(this.switchServicePowerfulMode);
            }
        }

        if (this.hasEconoModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.debug(`[${this.name}] Device has EconoMode, add Switch Service`);

            this.switchServiceEconoMode = this.switchServiceEconoMode || accessory.addService(this.platform.Service.Switch, this.extraServices.ECONO_MODE, 'econo_mode');
            this.switchServiceEconoMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.ECONO_MODE);

            this.switchServiceEconoMode
                .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
            this.switchServiceEconoMode
                .setCharacteristic(this.platform.Characteristic.ConfiguredName, this.extraServices.ECONO_MODE);

            this.switchServiceEconoMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleEconoModeGet.bind(this))
                .onSet(this.handleEconoModeSet.bind(this));
        } else {
            if (this.switchServiceEconoMode) {
                accessory.removeService(this.switchServiceEconoMode);
            }
        }

        if (this.hasStreamerModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.debug(`[${this.name}] Device has StreamerMode, add Switch Service`);

            this.switchServiceStreamerMode = this.switchServiceStreamerMode || accessory.addService(this.platform.Service.Switch, this.extraServices.STREAMER_MODE, 'streamer_mode');
            this.switchServiceStreamerMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.STREAMER_MODE);

            this.switchServiceStreamerMode
                .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
            this.switchServiceStreamerMode
                .setCharacteristic(this.platform.Characteristic.ConfiguredName, this.extraServices.STREAMER_MODE);

            this.switchServiceStreamerMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleStreamerModeGet.bind(this))
                .onSet(this.handleStreamerModeSet.bind(this));

        } else {
            if (this.switchServiceStreamerMode) {
                accessory.removeService(this.switchServiceStreamerMode);
            }
        }

        if (this.hasOutdoorSilentModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.debug(`[${this.name}] Device has StreamerMode, add Switch Service`);

            this.switchServiceOutdoorSilentMode = this.switchServiceOutdoorSilentMode || accessory.addService(this.platform.Service.Switch, this.extraServices.OUTDOUR_SILENT_MODE, 'outdoor_silent_mode');
            this.switchServiceOutdoorSilentMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.OUTDOUR_SILENT_MODE);

            this.switchServiceOutdoorSilentMode
                .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
            this.switchServiceOutdoorSilentMode
                .setCharacteristic(this.platform.Characteristic.ConfiguredName, this.extraServices.OUTDOUR_SILENT_MODE);

            this.switchServiceOutdoorSilentMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleOutdoorSilentModeGet.bind(this))
                .onSet(this.handleOutdoorSilentModeSet.bind(this));
        } else {
            if (this.switchServiceOutdoorSilentMode) {
                accessory.removeService(this.switchServiceOutdoorSilentMode);
            }
        }

        if (this.hasIndoorSilentModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.debug(`[${this.name}] Device has IndoorSilentMode, add Switch Service`);

            this.switchServiceIndoorSilentMode = this.switchServiceIndoorSilentMode || accessory.addService(this.platform.Service.Switch, this.extraServices.INDOOR_SILENT_MODE, 'indoor_silent_mode');
            this.switchServiceIndoorSilentMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.INDOOR_SILENT_MODE);

            this.switchServiceIndoorSilentMode
                .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
            this.switchServiceIndoorSilentMode
                .setCharacteristic(this.platform.Characteristic.ConfiguredName, this.extraServices.INDOOR_SILENT_MODE);

            this.switchServiceIndoorSilentMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleIndoorSilentModeGet.bind(this))
                .onSet(this.handleIndoorSilentModeSet.bind(this));
        } else {
            if (this.switchServiceIndoorSilentMode) {
                accessory.removeService(this.switchServiceIndoorSilentMode);
            }
        }
    }

    async handleActiveStateGet(): Promise<CharacteristicValue> {
        const state = this.accessory.context.device.getData('climateControl', 'onOffMode').value;
        this.platform.log.debug(`[${this.name}] GET ActiveState, state: ${state}`);
        return state === DaikinOnOffModes.ON;
    }

    async handleActiveStateSet(value: CharacteristicValue) {
        this.platform.log.debug(`[${this.name}] SET ActiveState, state: ${value}`);
        const state = value as boolean;
        await this.accessory.context.device.setData('climateControl', 'onOffMode', state ? DaikinOnOffModes.ON : DaikinOnOffModes.OFF);
    }

    async handleCurrentTemperatureGet(): Promise<CharacteristicValue> {
        const temperature = this.accessory.context.device.getData('climateControl', 'sensoryData', '/roomTemperature').value;
        this.platform.log.debug(`[${this.name}] GET CurrentTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleCoolingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        const temperature = this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').value;
        this.platform.log.debug(`[${this.name}] GET CoolingThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleCoolingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        // const temperature = value as number;
        this.platform.log.debug(`[${this.name}] SET CoolingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', temperature);
    }

    async handleRotationSpeedGet(): Promise<CharacteristicValue> {
        const speed = this.accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).value;
        this.platform.log.debug(`[${this.name}] GET RotationSpeed, speed: ${speed}`);
        return speed;
    }

    async handleRotationSpeedSet(value: CharacteristicValue) {
        const speed = value as number;
        this.platform.log.debug(`[${this.name}] SET RotationSpeed, speed to: ${speed}`);
        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`, 'fixed');
        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`, speed);
    }

    async handleHeatingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        const temperature = this.accessory.context.device.getData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').value;
        this.platform.log.debug(`[${this.name}] GET HeatingThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleHeatingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        // const temperature = value as number;
        this.platform.log.debug(`[${this.name}] SET HeatingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature', temperature);
    }

    async handleTargetHeaterCoolerStateGet(): Promise<CharacteristicValue> {
        const operationMode: DaikinOperationModes = this.accessory.context.device.getData('climateControl', 'operationMode').value;
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
        await this.accessory.context.device.setData('climateControl', 'operationMode', daikinOperationMode);
        await this.accessory.context.device.setData('climateControl', 'onOffMode', DaikinOnOffModes.ON);
    }

    async handleSwingModeSet(value: CharacteristicValue) {
        const swingMode = value as number;
        const daikinSwingMode = swingMode === 1 ? DaikinFanDirectionHorizontalModes.SWING : DaikinFanDirectionHorizontalModes.STOP;
        this.platform.log.debug(`[${this.name}] SET SwingMode, swingmode to: ${swingMode}/${daikinSwingMode}`);

        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/horizontal/currentMode`, daikinSwingMode);
        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`, daikinSwingMode);
    }

    async handleSwingModeGet(): Promise<CharacteristicValue> {

        const verticalSwingMode = this.accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        const horizontalSwingMode = this.accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        this.platform.log.debug(`[${this.name}] GET SwingMode, verticalSwingMode: ${verticalSwingMode}`);
        this.platform.log.debug(`[${this.name}] GET SwingMode, horizontalSwingMode: ${horizontalSwingMode}`);

        if (horizontalSwingMode === DaikinFanDirectionHorizontalModes.STOP || verticalSwingMode === DaikinFanDirectionVerticalModes.STOP) {
            return this.platform.Characteristic.SwingMode.SWING_DISABLED;
        }

        return this.platform.Characteristic.SwingMode.SWING_ENABLED;
    }

    async handlePowerfulModeGet() {
        this.platform.log.debug(`[${this.name}] GET PowerfulMode`);

        return this.accessory.context.device.getData('climateControl', 'powerfulMode').value === DaikinPowerfulModes.ON;
    }

    async handlePowerfulModeSet(value: CharacteristicValue) {
        this.platform.log.debug(`[${this.name}] SET PowerfulMode to: ${value}`);
        const daikinPowerfulMode = value as boolean ? DaikinPowerfulModes.ON : DaikinPowerfulModes.OFF;
        await this.accessory.context.device.setData('climateControl', 'powerfulMode', daikinPowerfulMode);
    }

    async handleEconoModeGet() {
        this.platform.log.debug(`[${this.name}] GET EconoMode`);

        return this.accessory.context.device.getData('climateControl', 'econoMode').value === DaikinEconoModes.ON;
    }

    async handleEconoModeSet(value: CharacteristicValue) {
        this.platform.log.debug(`[${this.name}] SET EconoMode to: ${value}`);
        const daikinEconoMode = value as boolean ? DaikinEconoModes.ON : DaikinEconoModes.OFF;
        await this.accessory.context.device.setData('climateControl', 'econoMode', daikinEconoMode);
    }

    async handleStreamerModeGet() {
        this.platform.log.debug(`[${this.name}] GET StreamerMode`);

        return this.accessory.context.device.getData('climateControl', 'streamerMode').value === DaikinStreamerModes.ON;
    }

    async handleStreamerModeSet(value: CharacteristicValue) {
        this.platform.log.debug(`[${this.name}] SET streamerMode to: ${value}`);
        const daikinStreamerMode = value as boolean ? DaikinStreamerModes.ON : DaikinStreamerModes.OFF;
        await this.accessory.context.device.setData('climateControl', 'streamerMode', daikinStreamerMode);
    }

    async handleOutdoorSilentModeGet() {
        this.platform.log.debug(`[${this.name}] GET OutdoorSilentMode`);

        return this.accessory.context.device.getData('climateControl', 'outdoorSilentMode').value === 'on';
    }

    async handleOutdoorSilentModeSet(value: CharacteristicValue) {
        this.platform.log.debug(`[${this.name}] SET outdoorSilentMode to: ${value}`);
        const daikinOutdoorSilentMode = value as boolean ? DaikinOutdoorSilentModes.ON : DaikinOutdoorSilentModes.OFF;
        await this.accessory.context.device.setData('climateControl', 'outdoorSilentMode', daikinOutdoorSilentMode);
    }

    async handleIndoorSilentModeGet() {
        this.platform.log.debug(`[${this.name}] GET IndoorSilentMode`);

        return this.accessory.context.device.getData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`).value === DaikinFanSpeedModes.QUIET;
    }

    async handleIndoorSilentModeSet(value: CharacteristicValue) {
        this.platform.log.debug(`[${this.name}] SET indoorSilentMode to: ${value}`);
        const daikinFanSpeedMode = value as boolean ? DaikinFanSpeedModes.QUIET : DaikinFanSpeedModes.FIXED;
        await this.accessory.context.device.setData('climateControl', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`, daikinFanSpeedMode);
    }

    getCurrentOperationMode() {
        return this.accessory.context.device.getData('climateControl', 'operationMode').value;
    }

    hasSwingModeFeature() {
        const verticalSwing = this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/heating/fanDirection/vertical/currentMode');
        const horizontalSwing = this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/heating/fanDirection/horizontal/currentMode');
        this.platform.log.debug(`[${this.name}] hasSwingModeFeature, verticalSwing: ${Boolean(verticalSwing)}`);
        this.platform.log.debug(`[${this.name}] hasSwingModeFeature, horizontalSwing: ${Boolean(horizontalSwing)}`);
        return Boolean(verticalSwing || horizontalSwing);
    }

    hasPowerfulModeFeature() {
        const powerfulMode = this.accessory.context.device.getData('climateControl', 'powerfulMode');
        this.platform.log.debug(`[${this.name}] hasPowerfulModeFeature, powerfulMode: ${Boolean(powerfulMode)}`);
        return Boolean(powerfulMode);
    }

    hasEconoModeFeature() {
        const econoMode = this.accessory.context.device.getData('climateControl', 'econoMode');
        this.platform.log.debug(`[${this.name}] hasEconoModeFeature, econoMode: ${Boolean(econoMode)}`);
        return Boolean(econoMode);
    }

    hasStreamerModeFeature() {
        const streamerMode = this.accessory.context.device.getData('climateControl', 'streamerMode');
        this.platform.log.debug(`[${this.name}] hasStreamerModeFeature, streamerMode: ${Boolean(streamerMode)}`);
        return Boolean(streamerMode);
    }

    hasOutdoorSilentModeFeature() {
        const OutdoorSilentMode = this.accessory.context.device.getData('climateControl', 'outdoorSilentMode');
        this.platform.log.debug(`[${this.name}] hasOutdoorSilentModeFeature, outdoorSilentMode: ${Boolean(OutdoorSilentMode)}`);
        return Boolean(OutdoorSilentMode);
    }

    hasIndoorSilentModeFeature() {
        const fanSpeedValues: Array<string> = this.accessory.context.device.getData('climateControl', 'fanControl', '/operationModes/heating/fanSpeed/currentMode').values;
        this.platform.log.debug(`[${this.name}] hasIndoorSilentModeFeature, indoorSilentMode: ${fanSpeedValues.includes(DaikinFanSpeedModes.QUIET)}`);
        return fanSpeedValues.includes(DaikinFanSpeedModes.QUIET);
    }
}

enum DaikinFanSpeedModes {
    AUTO = 'auto',
    QUIET = 'quiet',
    FIXED = 'fixed',
}

enum DaikinOutdoorSilentModes {
    ON = 'on',
    OFF = 'off',
}

enum DaikinOnOffModes {
    ON = 'on',
    OFF = 'off',
}

enum DaikinStreamerModes {
    ON = 'on',
    OFF = 'off',
}

enum DaikinEconoModes {
    ON = 'on',
    OFF = 'off',
}
enum DaikinPowerfulModes {
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

export type DaikinClimateControlEmbeddedId = 'climateControl' | 'climateControlMainZone';
