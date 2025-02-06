import {CharacteristicValue, PlatformAccessory, Service} from 'homebridge';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from './platform';
import {DaikinCloudRepo} from './repository/daikinCloudRepo';

export class ClimateControlService {
    readonly platform: DaikinCloudPlatform;
    readonly accessory: PlatformAccessory<DaikinCloudAccessoryContext>;
    readonly managementPointId: string;

    private extraServices = {
        POWERFUL_MODE: 'Powerful mode',
        ECONO_MODE: 'Econo mode',
        STREAMER_MODE: 'Streamer mode',
        OUTDOUR_SILENT_MODE: 'Outdoor silent mode',
        INDOOR_SILENT_MODE: 'Indoor silent mode',
        DRY_OPERATION_MODE: 'Dry operation mode',
        FAN_ONLY_OPERATION_MODE: 'Fan only operation mode',
    };

    private readonly name: string;

    private readonly service?: Service;
    private readonly switchServicePowerfulMode?: Service;
    private readonly switchServiceEconoMode?: Service;
    private readonly switchServiceStreamerMode?: Service;
    private readonly switchServiceOutdoorSilentMode?: Service;
    private readonly switchServiceIndoorSilentMode?: Service;
    private readonly switchServiceDryOperationMode?: Service;
    private readonly switchServiceFanOnlyOperationMode?: Service;

    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory<DaikinCloudAccessoryContext>,
        managementPointId: string,
    ) {
        this.platform = platform;
        this.accessory = accessory;
        this.managementPointId = managementPointId;

        this.service = this.accessory.getService(this.platform.Service.HeaterCooler);
        this.switchServicePowerfulMode = this.accessory.getService(this.extraServices.POWERFUL_MODE);
        this.switchServiceEconoMode = this.accessory.getService(this.extraServices.ECONO_MODE);
        this.switchServiceStreamerMode = this.accessory.getService(this.extraServices.STREAMER_MODE);
        this.switchServiceOutdoorSilentMode = this.accessory.getService(this.extraServices.OUTDOUR_SILENT_MODE);
        this.switchServiceIndoorSilentMode = this.accessory.getService(this.extraServices.INDOOR_SILENT_MODE);
        this.switchServiceDryOperationMode = this.accessory.getService(this.extraServices.DRY_OPERATION_MODE);
        this.switchServiceFanOnlyOperationMode = this.accessory.getService(this.extraServices.FAN_ONLY_OPERATION_MODE);

        this.name = this.accessory.displayName;

        this.service = this.service || this.accessory.addService(this.platform.Service.HeaterCooler);

        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

        // Required characteristic
        this.service.getCharacteristic(this.platform.Characteristic.Active)
            .onSet(this.handleActiveStateSet.bind(this))
            .onGet(this.handleActiveStateGet.bind(this));

        // Required characteristic
        this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .onGet(this.handleCurrentTemperatureGet.bind(this));

        // Required characteristic
        this.service.getCharacteristic(this.platform.Characteristic.TargetHeaterCoolerState)
            .setProps({
                minStep: 1,
                minValue: 0,
                maxValue: 2,
            })
            .onGet(this.handleTargetHeaterCoolerStateGet.bind(this))
            .onSet(this.handleTargetHeaterCoolerStateSet.bind(this));

        const roomTemperatureControlForCooling = accessory.context.device.getData(this.managementPointId, 'temperatureControl', `/operationModes/${DaikinOperationModes.COOLING}/setpoints/${this.getSetpoint(DaikinOperationModes.COOLING)}`);
        if (roomTemperatureControlForCooling) {
            this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
                .setProps({
                    minStep: roomTemperatureControlForCooling.stepValue,
                    minValue: roomTemperatureControlForCooling.minValue,
                    maxValue: roomTemperatureControlForCooling.maxValue,
                })
                .onGet(this.handleCoolingThresholdTemperatureGet.bind(this))
                .onSet(this.handleCoolingThresholdTemperatureSet.bind(this));

        } else {
            this.service.removeCharacteristic(this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature));
        }

        const roomTemperatureControlForHeating = accessory.context.device.getData(this.managementPointId, 'temperatureControl', `/operationModes/${DaikinOperationModes.HEATING}/setpoints/${this.getSetpoint(DaikinOperationModes.HEATING)}`);
        if (roomTemperatureControlForHeating) {
            this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
                .setProps({
                    minStep: roomTemperatureControlForHeating.stepValue,
                    minValue: roomTemperatureControlForHeating.minValue,
                    maxValue: roomTemperatureControlForHeating.maxValue,
                })
                .onGet(this.handleHeatingThresholdTemperatureGet.bind(this))
                .onSet(this.handleHeatingThresholdTemperatureSet.bind(this));
        } else {
            this.service.removeCharacteristic(this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature));
        }

        this.addOrUpdateCharacteristicRotationSpeed();

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

        if (this.hasDryOperationModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.debug(`[${this.name}] Device has DryOperationMode, add Switch Service`);

            this.switchServiceDryOperationMode = this.switchServiceDryOperationMode || accessory.addService(this.platform.Service.Switch, this.extraServices.DRY_OPERATION_MODE, 'dry_operation_mode');
            this.switchServiceDryOperationMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.DRY_OPERATION_MODE);

            this.switchServiceDryOperationMode
                .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
            this.switchServiceDryOperationMode
                .setCharacteristic(this.platform.Characteristic.ConfiguredName, this.extraServices.DRY_OPERATION_MODE);

            this.switchServiceDryOperationMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleDryOperationModeGet.bind(this))
                .onSet(this.handleDryOperationModeSet.bind(this));
        } else {
            if (this.switchServiceDryOperationMode) {
                accessory.removeService(this.switchServiceDryOperationMode);
            }
        }

        if (this.hasFanOnlyOperationModeFeature() && this.platform.config.showExtraFeatures) {
            this.platform.log.debug(`[${this.name}] Device has FanOnlyOperationMode, add Switch Service`);

            this.switchServiceFanOnlyOperationMode = this.switchServiceFanOnlyOperationMode || accessory.addService(this.platform.Service.Switch, this.extraServices.FAN_ONLY_OPERATION_MODE, 'fan_only_operation_mode');
            this.switchServiceFanOnlyOperationMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.FAN_ONLY_OPERATION_MODE);

            this.switchServiceFanOnlyOperationMode
                .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
            this.switchServiceFanOnlyOperationMode
                .setCharacteristic(this.platform.Characteristic.ConfiguredName, this.extraServices.FAN_ONLY_OPERATION_MODE);

            this.switchServiceFanOnlyOperationMode.getCharacteristic(this.platform.Characteristic.On)
                .onGet(this.handleFanOnlyOperationModeGet.bind(this))
                .onSet(this.handleFanOnlyOperationModeSet.bind(this));
        } else {
            if (this.switchServiceFanOnlyOperationMode) {
                accessory.removeService(this.switchServiceFanOnlyOperationMode);
            }
        }
    }

    addOrUpdateCharacteristicRotationSpeed() {
        if (!this.service) {
            throw Error('Service not initialized');
        }

        const fanControl = this.accessory.context.device.getData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`);

        if (fanControl) {
            this.service.getCharacteristic(this.platform.Characteristic.RotationSpeed)
                .setProps({
                    minStep: fanControl.stepValue,
                    minValue: fanControl.minValue,
                    maxValue: fanControl.maxValue,
                })
                .onGet(this.handleRotationSpeedGet.bind(this))
                .onSet(this.handleRotationSpeedSet.bind(this));
        } else {
            this.service.removeCharacteristic(this.service.getCharacteristic(this.platform.Characteristic.RotationSpeed));
        }
    }

    async handleActiveStateGet(): Promise<CharacteristicValue> {
        const state = this.accessory.context.device.getData(this.managementPointId, 'onOffMode', undefined).value;
        this.platform.log.debug(`[${this.name}] GET ActiveState, state: ${state}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return state === DaikinOnOffModes.ON;
    }

    async handleActiveStateSet(value: CharacteristicValue) {
        this.platform.log.debug(`[${this.name}] SET ActiveState, state: ${value}`);
        const state = value as boolean;
        try {
            await this.accessory.context.device.setData(this.managementPointId, 'onOffMode', state ? DaikinOnOffModes.ON : DaikinOnOffModes.OFF, undefined);
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
        this.platform.forceUpdateDevices();
    }

    async handleCurrentTemperatureGet(): Promise<CharacteristicValue> {
        const temperature = this.accessory.context.device.getData(this.managementPointId, 'sensoryData', '/' + this.getCurrentControlMode()).value;
        this.platform.log.debug(`[${this.name}] GET CurrentTemperature, temperature: ${temperature}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return temperature;
    }

    async handleCoolingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        const temperature = this.accessory.context.device.getData(this.managementPointId, 'temperatureControl', `/operationModes/${DaikinOperationModes.COOLING}/setpoints/${this.getSetpoint(DaikinOperationModes.COOLING)}`).value;
        this.platform.log.debug(`[${this.name}] GET CoolingThresholdTemperature, temperature: ${temperature}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return temperature;
    }

    async handleCoolingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        // const temperature = value as number;
        this.platform.log.debug(`[${this.name}] SET CoolingThresholdTemperature, temperature to: ${temperature}`);
        try {
            await this.accessory.context.device.setData(this.managementPointId, 'temperatureControl', `/operationModes/${DaikinOperationModes.COOLING}/setpoints/${this.getSetpoint(DaikinOperationModes.COOLING)}`, temperature);
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }

        this.platform.forceUpdateDevices();
    }

    async handleRotationSpeedGet(): Promise<CharacteristicValue> {
        const speed = this.accessory.context.device.getData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).value;
        this.platform.log.debug(`[${this.name}] GET RotationSpeed, speed: ${speed}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return speed;
    }

    async handleRotationSpeedSet(value: CharacteristicValue) {
        const speed = value as number;
        this.platform.log.debug(`[${this.name}] SET RotationSpeed, speed to: ${speed}`);
        try {
            await this.accessory.context.device.setData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`, 'fixed');
            await this.accessory.context.device.setData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`, speed);
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }

        this.platform.forceUpdateDevices();
    }

    async handleHeatingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        const temperature = this.accessory.context.device.getData(this.managementPointId, 'temperatureControl', `/operationModes/${DaikinOperationModes.HEATING}/setpoints/${this.getSetpoint(DaikinOperationModes.HEATING)}`).value;
        this.platform.log.debug(`[${this.name}] GET HeatingThresholdTemperature, temperature: ${temperature}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return temperature;
    }

    async handleHeatingThresholdTemperatureSet(value: CharacteristicValue) {
        try {
            const temperature = Math.round(value as number * 2) / 2;
            // const temperature = value as number;
            this.platform.log.debug(`[${this.name}] SET HeatingThresholdTemperature, temperature to: ${temperature}`);
            await this.accessory.context.device.setData(this.managementPointId, 'temperatureControl', `/operationModes/${DaikinOperationModes.HEATING}/setpoints/${this.getSetpoint(DaikinOperationModes.HEATING)}`, temperature);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleTargetHeaterCoolerStateGet(): Promise<CharacteristicValue> {
        const operationMode: DaikinOperationModes = this.getCurrentOperationMode();
        this.platform.log.debug(`[${this.name}] GET TargetHeaterCoolerState, operationMode: ${operationMode}, last update: ${this.accessory.context.device.getLastUpdated()}`);

        switch (operationMode) {
            case DaikinOperationModes.COOLING:
                return this.platform.Characteristic.TargetHeaterCoolerState.COOL;
            case DaikinOperationModes.HEATING:
                return this.platform.Characteristic.TargetHeaterCoolerState.HEAT;
            case DaikinOperationModes.DRY:
                this.addOrUpdateCharacteristicRotationSpeed();
                return this.platform.Characteristic.TargetHeaterCoolerState.AUTO;
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

        try {
            this.platform.log.debug(`[${this.name}] SET TargetHeaterCoolerState, daikinOperationMode to: ${daikinOperationMode}`);
            await this.accessory.context.device.setData(this.managementPointId, 'operationMode', daikinOperationMode, undefined);
            await this.accessory.context.device.setData(this.managementPointId, 'onOffMode', DaikinOnOffModes.ON, undefined);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleSwingModeSet(value: CharacteristicValue) {
        try {
            const swingMode = value as number;
            const daikinSwingMode = swingMode === 1 ? DaikinFanDirectionHorizontalModes.SWING : DaikinFanDirectionHorizontalModes.STOP;
            this.platform.log.debug(`[${this.name}] SET SwingMode, swingmode to: ${swingMode}/${daikinSwingMode}`);

            if (this.hasSwingModeHorizontalFeature()) {
                await this.accessory.context.device.setData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/horizontal/currentMode`, daikinSwingMode);
            }

            if (this.hasSwingModeVerticalFeature()) {
                await this.accessory.context.device.setData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`, daikinSwingMode);
            }

            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleSwingModeGet(): Promise<CharacteristicValue> {
        const verticalSwingMode = this.hasSwingModeVerticalFeature() ? this.accessory.context.device.getData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value : null;
        const horizontalSwingMode = this.hasSwingModeHorizontalFeature() ? this.accessory.context.device.getData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/horizontal/currentMode`).value : null;
        this.platform.log.debug(`[${this.name}] GET SwingMode, verticalSwingMode: ${verticalSwingMode}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        this.platform.log.debug(`[${this.name}] GET SwingMode, horizontalSwingMode: ${horizontalSwingMode}, last update: ${this.accessory.context.device.getLastUpdated()}`);

        if (horizontalSwingMode === DaikinFanDirectionHorizontalModes.STOP || verticalSwingMode === DaikinFanDirectionVerticalModes.STOP) {
            return this.platform.Characteristic.SwingMode.SWING_DISABLED;
        }

        return this.platform.Characteristic.SwingMode.SWING_ENABLED;
    }

    async handlePowerfulModeGet() {
        const powerfulModeOn = this.accessory.context.device.getData(this.managementPointId, 'powerfulMode', undefined).value === DaikinPowerfulModes.ON;
        this.platform.log.debug(`[${this.name}] GET PowerfulMode, powerfulModeOn: ${powerfulModeOn}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return powerfulModeOn;
    }

    async handlePowerfulModeSet(value: CharacteristicValue) {
        try {
            this.platform.log.debug(`[${this.name}] SET PowerfulMode to: ${value}`);
            const daikinPowerfulMode = value as boolean ? DaikinPowerfulModes.ON : DaikinPowerfulModes.OFF;
            await this.accessory.context.device.setData(this.managementPointId, 'powerfulMode', daikinPowerfulMode, undefined);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleEconoModeGet() {
        const econoModeOn = this.accessory.context.device.getData(this.managementPointId, 'econoMode', undefined).value === DaikinEconoModes.ON;
        this.platform.log.debug(`[${this.name}] GET EconoMode, econoModeOn: ${econoModeOn}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return econoModeOn;
    }

    async handleEconoModeSet(value: CharacteristicValue) {
        try {
            this.platform.log.debug(`[${this.name}] SET EconoMode to: ${value}`);
            const daikinEconoMode = value as boolean ? DaikinEconoModes.ON : DaikinEconoModes.OFF;
            await this.accessory.context.device.setData(this.managementPointId, 'econoMode', daikinEconoMode, undefined);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleStreamerModeGet() {
        const streamerModeOn = this.accessory.context.device.getData(this.managementPointId, 'streamerMode', undefined).value === DaikinStreamerModes.ON;
        this.platform.log.debug(`[${this.name}] GET StreamerMode, streamerModeOn: ${streamerModeOn}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return streamerModeOn;
    }

    async handleStreamerModeSet(value: CharacteristicValue) {
        try {
            this.platform.log.debug(`[${this.name}] SET streamerMode to: ${value}`);
            const daikinStreamerMode = value as boolean ? DaikinStreamerModes.ON : DaikinStreamerModes.OFF;
            await this.accessory.context.device.setData(this.managementPointId, 'streamerMode', daikinStreamerMode, undefined);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleOutdoorSilentModeGet() {
        const outdoorSilentModeOn = this.accessory.context.device.getData(this.managementPointId, 'outdoorSilentMode', undefined).value === DaikinOutdoorSilentModes.ON;
        this.platform.log.debug(`[${this.name}] GET OutdoorSilentMode, outdoorSilentModeOn: ${outdoorSilentModeOn}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return outdoorSilentModeOn;
    }

    async handleOutdoorSilentModeSet(value: CharacteristicValue) {
        try {
            this.platform.log.debug(`[${this.name}] SET outdoorSilentMode to: ${value}`);
            const daikinOutdoorSilentMode = value as boolean ? DaikinOutdoorSilentModes.ON : DaikinOutdoorSilentModes.OFF;
            await this.accessory.context.device.setData(this.managementPointId, 'outdoorSilentMode', daikinOutdoorSilentMode, undefined);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleIndoorSilentModeGet() {
        const indoorSilentModeOn = this.accessory.context.device.getData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`).value === DaikinFanSpeedModes.QUIET;
        this.platform.log.debug(`[${this.name}] GET IndoorSilentMode, indoorSilentModeOn: ${indoorSilentModeOn}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return indoorSilentModeOn;
    }

    async handleIndoorSilentModeSet(value: CharacteristicValue) {
        try {
            this.platform.log.debug(`[${this.name}] SET indoorSilentMode to: ${value}`);
            const daikinFanSpeedMode = value as boolean ? DaikinFanSpeedModes.QUIET : DaikinFanSpeedModes.FIXED;
            await this.accessory.context.device.setData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`, daikinFanSpeedMode);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleDryOperationModeGet() {
        const dryOperationModeOn = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined).value === DaikinOperationModes.DRY;
        this.platform.log.debug(`[${this.name}] GET DryOperationMode, dryOperationModeOn: ${dryOperationModeOn}, last update: ${this.accessory.context.device.getLastUpdated()}`);

        return dryOperationModeOn;
    }

    async handleDryOperationModeSet(value: CharacteristicValue) {
        try {
            this.platform.log.debug(`[${this.name}] SET DryOperationMode to: ${value}`);
            const daikinOperationMode = value as boolean ? DaikinOperationModes.DRY : DaikinOperationModes.AUTO;
            await this.accessory.context.device.setData(this.managementPointId, 'operationMode', daikinOperationMode, undefined);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    async handleFanOnlyOperationModeGet() {
        const fanOnlyOperationModeOn = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined).value === DaikinOperationModes.FAN_ONLY;
        this.platform.log.debug(`[${this.name}] GET FanOnlyOperationMode, fanOnlyOperationModeOn: ${fanOnlyOperationModeOn}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return fanOnlyOperationModeOn;
    }

    async handleFanOnlyOperationModeSet(value: CharacteristicValue) {
        try {
            this.platform.log.debug(`[${this.name}] SET FanOnlyOperationMode to: ${value}`);
            const daikinOperationMode = value as boolean ? DaikinOperationModes.FAN_ONLY : DaikinOperationModes.AUTO;
            await this.accessory.context.device.setData(this.managementPointId, 'operationMode', daikinOperationMode, undefined);
            this.platform.forceUpdateDevices();
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
    }

    getCurrentOperationMode(): DaikinOperationModes {
        return this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined).value;
    }

    getCurrentControlMode(): DaikinControlModes {
        const controlMode = this.accessory.context.device.getData(this.managementPointId, 'controlMode', undefined);

        // Only Altherma devices have a controlMode, others have a fixed controlMode of ROOM_TEMPERATURE AFAIK
        if (!controlMode) {
            return DaikinControlModes.ROOM_TEMPERATURE;
        }

        return controlMode.value;
    }

    getSetpointMode(): DaikinSetpointModes | null {
        const setpointMode = this.accessory.context.device.getData(this.managementPointId, 'setpointMode', undefined);
        if (!setpointMode) {
            return null;
        }
        return setpointMode.value;
    }

    getSetpoint(operationMode: DaikinOperationModes): DaikinTemperatureControlSetpoints {
        // depending on the settings of the device the temperatureControl can be set in different ways "DaikinTemperatureControlSetpoints"
        // Docs: https://developer.cloud.daikineurope.com/docs/b0dffcaa-7b51-428a-bdff-a7c8a64195c0/supported_features
        // Looks like the setpointMode is the most important one to determine the setpoint,
        // then the controleMode and in case of weatherDependentHeatingFixedCooling also the operation mode
        // If the setpointMode is not available (in case on non-Althermas), we can use the controlMode to determine the setpoint

        const setpointMode = this.getSetpointMode();
        const controlMode = this.getCurrentControlMode();

        if (setpointMode) {
            switch (setpointMode) {
                case DaikinSetpointModes.FIXED:
                    switch (controlMode) {
                        case DaikinControlModes.LEAVING_WATER_TEMPERATURE:
                            return DaikinTemperatureControlSetpoints.LEAVING_WATER_TEMPERATURE;
                        default:
                            return DaikinTemperatureControlSetpoints.ROOM_TEMPERATURE;
                    }
                case DaikinSetpointModes.WEATHER_DEPENDENT:
                    switch (controlMode) {
                        case DaikinControlModes.LEAVING_WATER_TEMPERATURE:
                            return DaikinTemperatureControlSetpoints.LEAVING_WATER_OFFSET;
                        default:
                            return DaikinTemperatureControlSetpoints.ROOM_TEMPERATURE;
                    }
                case DaikinSetpointModes.WEATHER_DEPENDENT_HEATING_FIXED_COOLING:
                    switch (controlMode) {
                        case DaikinControlModes.ROOM_TEMPERATURE:
                            return DaikinTemperatureControlSetpoints.ROOM_TEMPERATURE;
                        case DaikinControlModes.LEAVING_WATER_TEMPERATURE:
                            switch (operationMode) {
                                case DaikinOperationModes.HEATING:
                                    return DaikinTemperatureControlSetpoints.LEAVING_WATER_OFFSET;
                                case DaikinOperationModes.COOLING:
                                    return DaikinTemperatureControlSetpoints.LEAVING_WATER_TEMPERATURE;
                            }
                    }
            }


            throw new Error(`Could not determine the TemperatureControlSetpoint for operationMode: ${operationMode}, setpointMode: ${setpointMode}, controlMode: ${controlMode}, for device: ${JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4)}`);
        }

        switch (controlMode) {
            case DaikinControlModes.LEAVING_WATER_TEMPERATURE:
                return DaikinTemperatureControlSetpoints.LEAVING_WATER_OFFSET;
            default:
                return DaikinTemperatureControlSetpoints.ROOM_TEMPERATURE;
        }
    }

    hasSwingModeVerticalFeature() {
        const verticalSwing = this.accessory.context.device.getData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`);
        this.platform.log.debug(`[${this.name}] hasSwingModeFeature, verticalSwing: ${Boolean(verticalSwing)}`);
        return Boolean(verticalSwing);
    }

    hasSwingModeHorizontalFeature() {
        const horizontalSwing = this.accessory.context.device.getData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/horizontal/currentMode`);
        this.platform.log.debug(`[${this.name}] hasSwingModeFeature, horizontalSwing: ${Boolean(horizontalSwing)}`);
        return Boolean(horizontalSwing);
    }

    hasSwingModeFeature() {
        return Boolean(this.hasSwingModeVerticalFeature() || this.hasSwingModeHorizontalFeature());
    }

    hasPowerfulModeFeature() {
        const powerfulMode = this.accessory.context.device.getData(this.managementPointId, 'powerfulMode', undefined);
        this.platform.log.debug(`[${this.name}] hasPowerfulModeFeature, powerfulMode: ${Boolean(powerfulMode)}`);
        return Boolean(powerfulMode);
    }

    hasEconoModeFeature() {
        const econoMode = this.accessory.context.device.getData(this.managementPointId, 'econoMode', undefined);
        this.platform.log.debug(`[${this.name}] hasEconoModeFeature, econoMode: ${Boolean(econoMode)}`);
        return Boolean(econoMode);
    }

    hasStreamerModeFeature() {
        const streamerMode = this.accessory.context.device.getData(this.managementPointId, 'streamerMode', undefined);
        this.platform.log.debug(`[${this.name}] hasStreamerModeFeature, streamerMode: ${Boolean(streamerMode)}`);
        return Boolean(streamerMode);
    }

    hasOutdoorSilentModeFeature() {
        const OutdoorSilentMode = this.accessory.context.device.getData(this.managementPointId, 'outdoorSilentMode', undefined);
        this.platform.log.debug(`[${this.name}] hasOutdoorSilentModeFeature, outdoorSilentMode: ${Boolean(OutdoorSilentMode)}`);
        return Boolean(OutdoorSilentMode);
    }

    hasIndoorSilentModeFeature() {
        const currentModeFanControl = this.accessory.context.device.getData(this.managementPointId, 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`);
        if (!currentModeFanControl) {
            return false;
        }
        const fanSpeedValues: Array<string> = currentModeFanControl.values;
        this.platform.log.debug(`[${this.name}] hasIndoorSilentModeFeature, indoorSilentMode: ${fanSpeedValues.includes(DaikinFanSpeedModes.QUIET)}`);
        return fanSpeedValues.includes(DaikinFanSpeedModes.QUIET);
    }

    hasOperationMode(operationMode: DaikinOperationModes) {
        const operationModeValues: Array<string> = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined).values;
        this.platform.log.debug(`[${this.name}] has ${operationMode}: ${operationModeValues.includes(operationMode)}`);
        return operationModeValues.includes(operationMode);
    }

    hasDryOperationModeFeature() {
        return this.hasOperationMode(DaikinOperationModes.DRY);
    }

    hasFanOnlyOperationModeFeature() {
        return this.hasOperationMode(DaikinOperationModes.FAN_ONLY);
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

export enum DaikinPowerfulModes {
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
    DRY = 'dry',
}

enum DaikinControlModes {
    ROOM_TEMPERATURE = 'roomTemperature',
    LEAVING_WATER_TEMPERATURE = 'leavingWaterTemperature',
    EXTERNAL_ROOM_TEMPERATURE = 'externalRoomTemperature',
}

enum DaikinTemperatureControlSetpoints {
    ROOM_TEMPERATURE = 'roomTemperature',
    LEAVING_WATER_OFFSET = 'leavingWaterOffset',
    LEAVING_WATER_TEMPERATURE = 'leavingWaterTemperature',
}

enum DaikinSetpointModes {
    FIXED = 'fixed',
    WEATHER_DEPENDENT_HEATING_FIXED_COOLING = 'weatherDependentHeatingFixedCooling',
    WEATHER_DEPENDENT = 'weatherDependent'
}
