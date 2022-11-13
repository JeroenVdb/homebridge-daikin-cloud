import {Service, PlatformAccessory, CharacteristicValue} from 'homebridge';
import {DaikinCloudPlatform} from './platform';

export class DaikinCloudAirConditioningAccessory {
    private extraServices = {
        POWERFUL_MODE: 'Powerful mode',
        ECONO_MODE: 'Econo mode',
        STREAMER_MODE: 'Streamer mode',
        OUTDOUR_SILENT_MODE: 'Outdoor silent mode',
    };

    private readonly name: string;
    private service: Service;
    private switchServicePowerfulMode = this.accessory.getService(this.extraServices.POWERFUL_MODE);
    private switchServiceEconoMode = this.accessory.getService(this.extraServices.ECONO_MODE);
    private switchServiceStreamerMode = this.accessory.getService(this.extraServices.STREAMER_MODE);
    private switchServiceOutdoorSilentMode = this.accessory.getService(this.extraServices.OUTDOUR_SILENT_MODE);

    constructor(
        private readonly platform: DaikinCloudPlatform,
        private readonly accessory: PlatformAccessory,
    ) {
        //this.platform.log.info("all: ", accessory.context.device.getData())
        //this.platform.log.info("temp: ", accessory.context.device.getData('climateControlMainZone','consumptionData'))
        this.platform.log.info(`Registering accessory YYY ${DaikinCloudTemperatureAccessory.name}`);
        this.name = accessory.context.device.getData('climateControlMainZone', 'name').value;

        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Daikin')
            .setCharacteristic(this.platform.Characteristic.Model, accessory.context.device.getData('gateway', 'modelInfo').value)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.context.device.getData('gateway', 'serialNumber') ? accessory.context.device.getData('gateway', 'serialNumber').value : 'NOT_AVAILABLE');

        //we specify here accessory service, in this case "HeaterCooler";
        this.service = this.accessory.getService(this.platform.Service.HeaterCooler) || this.accessory.addService(this.platform.Service.HeaterCooler);

        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

        this.service.getCharacteristic(this.platform.Characteristic.Active)
            .onSet(this.handleActiveStateSet.bind(this))
            .onGet(this.handleActiveStateGet.bind(this));

        //current temperature = leaving water temperature
        this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .setProps({ minStep: 1, minValue: 0, maxValue: 70 })
            .onGet(this.handlePumpLeavingWaterTemperatureGet.bind(this));

        //leaving water temp - we use TargetTemp for this purpose
        //this.service.getCharacteristic(this.platform.Characteristic.TargetTemperature)
        //    .setProps({ minStep: 1, minValue: 0, maxValue: 200 })
        //    .onGet(this.handlePumpLeavingWaterTemperatureGet.bind(this));
        //this.service.getCharacteristic(this.platform.Characteristic.TargetTemperature)



        ///leavingWaterTemperature
        //this.service.getCharacteristic(this.platform.Characteristic.CurrentLeavingTemperature)
        //    .onGet(this.handleCurrentLeavingTemperatureGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.TargetHeaterCoolerState)
            .onGet(this.handleTargetHeaterCoolerStateGet.bind(this))
            .onSet(this.handleTargetHeaterCoolerStateSet.bind(this));

        //this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
        //    .setProps({
        //        minStep: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minStep,
        //        minValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minValue,
        //        maxValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').maxValue,
        //    })
        //    .onGet(this.handleCoolingThresholdTemperatureGet.bind(this))
        //    .onSet(this.handleCoolingThresholdTemperatureSet.bind(this));

        //this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
        //    .setProps({
        //        minStep: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').minStep,
        //        minValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').minValue,
        //        maxValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').maxValue,
        //    })
        //    .onGet(this.handleHeatingThresholdTemperatureGet.bind(this))
        //    .onSet(this.handleHeatingThresholdTemperatureSet.bind(this));

        //we use this for leaving water temp while heating
        this.platform.log.info('7');
        this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
            .setProps({ minStep: 1, minValue: -10, maxValue: 10 })
            .onGet(this.handlePumpHeatingOffsetGet.bind(this))
            .onSet(this.handlePumpHeatingOffsetSet.bind(this));

        this.platform.log.info('8');
        this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
            .setProps({ minStep: 1, minValue: -10, maxValue: 10 })
            .onGet(this.handlePumpCoolingOffsetGet.bind(this));


        //this.service.getCharacteristic(this.platform.Characteristic.RotationSpeed)
        //.setProps({
        //    minStep: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').minStep,
        //    minValue: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').minValue,
        //    maxValue: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').maxValue,
        //})
        //show percentage of a button....
        //.onGet(this.handleRotationSpeedGet.bind(this))
        //.onSet(this.handleRotationSpeedSet.bind(this));

        //if (this.hasSwingModeFeature()) {
        //    this.platform.log.info(`[${this.name}] Device has SwingMode, add Characteristic`);
        //    this.service.getCharacteristic(this.platform.Characteristic.SwingMode)
        //        .onGet(this.handleSwingModeGet.bind(this))
        //        .onSet(this.handleSwingModeSet.bind(this));
        //}

        //if (this.hasPowerfulModeFeature() && this.platform.config.showExtraFeatures) {
        //    this.platform.log.info(`[${this.name}] Device has PowerfulMode, add Switch Service`);

        //    this.switchServicePowerfulMode = this.switchServicePowerfulMode || this.accessory.addService(this.platform.Service.Switch, this.extraServices.POWERFUL_MODE, 'powerful_mode');
        //    this.switchServicePowerfulMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.POWERFUL_MODE);

        //   this.switchServicePowerfulMode.getCharacteristic(this.platform.Characteristic.On)
        //        .onGet(this.handlePowerfulModeGet.bind(this))
        //        .onSet(this.handlePowerfulModeSet.bind(this));

        //} else {
        //    if (this.switchServicePowerfulMode) {
        //        this.accessory.removeService(this.switchServicePowerfulMode);
        //    }
        //}

        //if (this.hasEconoModeFeature() && this.platform.config.showExtraFeatures) {
        //    this.platform.log.info(`[${this.name}] Device has EconoMode, add Switch Service`);

        //    this.switchServiceEconoMode = this.switchServiceEconoMode || this.accessory.addService(this.platform.Service.Switch, this.extraServices.ECONO_MODE, 'econo_mode');
        //    this.switchServiceEconoMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.ECONO_MODE);

        //    this.switchServiceEconoMode.getCharacteristic(this.platform.Characteristic.On)
        //        .onGet(this.handleEconoModeGet.bind(this))
        //        .onSet(this.handleEconoModeSet.bind(this));
        //} else {
        //    if (this.switchServiceEconoMode) {
        //        this.accessory.removeService(this.switchServiceEconoMode);
        //    }
        //}

        //if (this.hasStreamerModeFeature() && this.platform.config.showExtraFeatures) {
        //    this.platform.log.info(`[${this.name}] Device has StreamerMode, add Switch Service`);

        //    this.switchServiceStreamerMode = this.switchServiceStreamerMode || this.accessory.addService(this.platform.Service.Switch, this.extraServices.STREAMER_MODE, 'streamer_mode');
        //    this.switchServiceStreamerMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.STREAMER_MODE);

        //    this.switchServiceStreamerMode.getCharacteristic(this.platform.Characteristic.On)
        //        .onGet(this.handleStreamerModeGet.bind(this))
        //        .onSet(this.handleStreamerModeSet.bind(this));

        //} else {
        //    if (this.switchServiceStreamerMode) {
        //        this.accessory.removeService(this.switchServiceStreamerMode);
        //    }
        //}

        //if (this.hasOutdoorSilentModeFeature() && this.platform.config.showExtraFeatures) {
        //    this.platform.log.info(`[${this.name}] Device has StreamerMode, add Switch Service`);

        //    this.switchServiceOutdoorSilentMode = this.switchServiceOutdoorSilentMode || this.accessory.addService(this.platform.Service.Switch, this.extraServices.OUTDOUR_SILENT_MODE, 'outdoor_silent_mode');
        //    this.switchServiceOutdoorSilentMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.OUTDOUR_SILENT_MODE);

        //    this.switchServiceOutdoorSilentMode.getCharacteristic(this.platform.Characteristic.On)
        //        .onGet(this.handleOutdoorSilentModeGet.bind(this))
        //        .onSet(this.handleOutdoorSilentModeSet.bind(this));
        //} else {
        //    if (this.switchServiceOutdoorSilentMode) {
        //        this.accessory.removeService(this.switchServiceOutdoorSilentMode);
        //    }
        //}
    }

    async handleActiveStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const state = this.accessory.context.device.getData('climateControlMainZone', 'onOffMode').value;
        this.platform.log.info(`[${this.name}] GET ActiveState, state: ${state}`);
        return state === 'on';
    }

    async handleActiveStateSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET ActiveState, state: ${value}`);
        const state = value as boolean;
        await this.accessory.context.device.setData('climateControlMainZone', 'onOffMode', state ? 'on' : 'off');
        await this.accessory.context.device.updateData();
    }

    async handleCurrentTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControlMainZone', 'sensoryData', '/outdoorTemperature').value;
        this.platform.log.info(`[${this.name}] GET CurrentTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handlePumpLeavingWaterTemperatureGet(): Promise<CharacteristicValue> {
        //for my use it is leaing water temp
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControlMainZone', 'sensoryData', '/leavingWaterTemperature').value;
        this.platform.log.info(`[${this.name}] GET Leaving water Temperature, temperature: ${temperature}`);
        return temperature;
    }

    //handlePumpHeatingOffsetGet
    async handlePumpHeatingOffsetGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        this.platform.log.info('9');
        //this.platform.log.info("XXX", this.accessory.context.device.dev.getData('climateControlMainZone', 'temperatureControl', '/operationModes', 'heating', 'setpoints').heating.setpoints.leavingWaterOffset.value);
        this.platform.log.info('XXX', this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/leavingWaterOffset').value);
        //const offset = this.accessory.context.device.dev.getData('climateControlMainZone', 'temperatureControl', '/operationModes', 'heating', 'setpoints').heating.setpoints.leavingWaterOffset.value;
        const offset = this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/leavingWaterOffset').value;
        this.platform.log.info(`[${this.name}] GET CurrentPumpHeatingOffsetGet, offset: ${offset}`);
        this.platform.log.info('9');
        return offset;
    }

    async handlePumpHeatingOffsetSet(value: CharacteristicValue) {
        //this.platform.log.info("Changing hot water threshold!!!")
        //const temperature = Math.round(value as number * 2) / 2;
        const temperature = Math.round(value as number);//we want int - minstep
        //const temperature = value as number;
        //this.platform.Characteristic.TargetHeaterCoolerState.HEAT;//we may have this added, or it gent unresponsive
        this.platform.log.info(`[${this.name}] SET HeatingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/leavingWaterOffset', temperature);
        await this.accessory.context.device.updateData();
    }

    //handlePumpHeatingOffsetGet
    async handlePumpCoolingOffsetGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        this.platform.log.info('9');
        //this.platform.log.info("XXX", this.accessory.context.device.dev.getData('climateControlMainZone', 'temperatureControl', '/operationModes', 'heating', 'setpoints').heating.setpoints.leavingWaterOffset.value);
        this.platform.log.info('XXX', this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/leavingWaterOffset').value);
        //const offset = this.accessory.context.device.dev.getData('climateControlMainZone', 'temperatureControl', '/operationModes', 'heating', 'setpoints').heating.setpoints.leavingWaterOffset.value;
        const offset = this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/leavingWaterOffset').value;
        this.platform.log.info(`[${this.name}] GET CurrentPumpCoolingOffsetGet, offset: ${offset}`);
        this.platform.log.info('9');
        return offset;
    }

    async handlePumpCoolingOffsetSet(value: CharacteristicValue) {
        //this.platform.log.info("Changing hot water threshold!!!")
        //const temperature = Math.round(value as number * 2) / 2;
        const temperature = Math.round(value as number);//we want int - minstep
        //const temperature = value as number;
        //this.platform.Characteristic.TargetHeaterCoolerState.HEAT;//we may have this added, or it gent unresponsive
        this.platform.log.info(`[${this.name}] SET CoolingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'temperatureControl', '/operationModes/Cooling/setpoints/leavingWaterOffset', temperature);
        await this.accessory.context.device.updateData();
    }

    //leavingWaterTemperature
    //async handleCurrentLeavingTemperatureGet(): Promise<CharacteristicValue> {
    //    await this.accessory.context.device.updateData();
    //    const temperature = this.accessory.context.device.getData('climateControlMainZone', 'sensoryData', 'leavingWaterTemperature').value;
    //    this.platform.log.info(`[${this.name}] GET CurrentLeavingTemperature, temperature: ${temperature}`);
    //    return temperature;
    //}

    /*async handleCoolingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').value;
        this.platform.log.info(`[${this.name}] GET CoolingThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }
*/
    /*    async handleCoolingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        // const temperature = value as number;
        this.platform.log.info(`[${this.name}] SET CoolingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }
*/
    //async handleRotationSpeedGet(): Promise<CharacteristicValue> {
    //await this.accessory.context.device.updateData();
    //const speed = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).value;
    //this.platform.log.info(`[${this.name}] GET RotationSpeed, speed: ${speed}`);
    //    return 100//speed;
    //}

    /*    async handleRotationSpeedSet(value: CharacteristicValue) {
        const speed = value as number;
        this.platform.log.info(`[${this.name}] SET RotationSpeed, speed to: ${speed}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`, 'fixed');
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`, speed);
        await this.accessory.context.device.updateData();
    }
*/
    /*    async handleHeatingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        //await this.accessory.context.device.updateData();
        //const temperature = this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature').value;
        //this.platform.log.info(`[${this.name}] GET HeatingThresholdTemperature, temperature: ${temperature}`);
        return 0//temperature;
    }
*/
    /*    async handleHeatingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        // const temperature = value as number;
        this.platform.log.info(`[${this.name}] SET HeatingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }
*/
    async handleTargetHeaterCoolerStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const operationMode = this.accessory.context.device.getData('climateControlMainZone', 'operationMode').value;
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
        await this.accessory.context.device.setData('climateControlMainZone', 'operationMode', daikinOperationMode);
        await this.accessory.context.device.setData('climateControlMainZone', 'onOffMode', 'on');
        await this.accessory.context.device.updateData();
    }

    /*    async handleSwingModeSet(value: CharacteristicValue) {
        const swingMode = value as number;
        const daikinSwingMode = swingMode === 1 ? 'swing' : 'stop';
        this.platform.log.info(`[${this.name}] SET SwingMode, swingmode to: ${swingMode}/${daikinSwingMode}`);

        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/horizontal/currentMode`, daikinSwingMode);
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`, daikinSwingMode);
        await this.accessory.context.device.updateData();
    }
*/
    /*    async handleSwingModeGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();

        const verticalSwingMode = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        const horizontalSwingMode = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        this.platform.log.info(`[${this.name}] GET SwingMode, verticalSwingMode: ${verticalSwingMode}`);
        this.platform.log.info(`[${this.name}] GET SwingMode, horizontalSwingMode: ${horizontalSwingMode}`);

        if (horizontalSwingMode === 'stop' || verticalSwingMode === 'stop') {
            return this.platform.Characteristic.SwingMode.SWING_DISABLED;
        }

        return this.platform.Characteristic.SwingMode.SWING_ENABLED;
    }
*/
    /*    async handlePowerfulModeGet() {
        this.platform.log.info(`[${this.name}] GET PowerfulMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControlMainZone', 'powerfulMode').value === 'on';
    }
*/
    /*    async handlePowerfulModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET PowerfulMode to: ${value}`);
        const daikinPowerfulMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControlMainZone', 'powerfulMode', daikinPowerfulMode);
    }
*/
    /*    async handleEconoModeGet() {
        this.platform.log.info(`[${this.name}] GET EconoMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControlMainZone', 'econoMode').value === 'on';
    }
*/
    /*   async handleEconoModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET EconoMode to: ${value}`);
        const daikinEconoMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControlMainZone', 'econoMode', daikinEconoMode);
    }
*/
    /*    async handleStreamerModeGet() {
        this.platform.log.info(`[${this.name}] GET StreamerMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControlMainZone', 'streamerMode').value === 'on';
    }
*/
    /*    async handleStreamerModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET streamerMode to: ${value}`);
        const daikinStreamerMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControlMainZone', 'streamerMode', daikinStreamerMode);
    }
*/
    /*    async handleOutdoorSilentModeGet() {
        this.platform.log.info(`[${this.name}] GET OutdoorSilentMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControlMainZone', 'outdoorSilentMode').value === 'on';
    }
*/
    /*    async handleOutdoorSilentModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET outdoorSilentMode to: ${value}`);
        const daikinOutdoorSilentMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControlMainZone', 'outdoorSilentMode', daikinOutdoorSilentMode);
    }
*/
    getCurrentOperationMode() {
        return this.accessory.context.device.getData('climateControlMainZone', 'operationMode').value;
    }

    //handleHeatingThresholdTemperatureGet(){
    //    return 4;
    //}

    /*
    hasSwingModeFeature() {
        const verticalSwing = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/heating/fanDirection/vertical/currentMode');
        const horizontalSwing = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/heating/fanDirection/horizontal/currentMode');
        this.platform.log.info(`[${this.name}] hasSwingModeFeature, verticalSwing: ${Boolean(verticalSwing)}`);
        this.platform.log.info(`[${this.name}] hasSwingModeFeature, horizontalSwing: ${Boolean(horizontalSwing)}`);
        return Boolean(verticalSwing || horizontalSwing);
    }
*/
    /*    hasPowerfulModeFeature() {
        const powerfulMode = this.accessory.context.device.getData('climateControlMainZone', 'powerfulMode');
        this.platform.log.info(`[${this.name}] hasPowerfulModeFeature, powerfulMode: ${Boolean(powerfulMode)}`);
        return Boolean(powerfulMode);
    }
*/
    /*    hasEconoModeFeature() {
        const econoMode = this.accessory.context.device.getData('climateControlMainZone', 'econoMode');
        this.platform.log.info(`[${this.name}] hasEconoModeFeature, econoMode: ${Boolean(econoMode)}`);
        return Boolean(econoMode);
    }
*/
    /*    hasStreamerModeFeature() {
        const streamerMode = this.accessory.context.device.getData('climateControlMainZone', 'streamerMode');
        this.platform.log.info(`[${this.name}] hasStreamerModeFeature, streamerMode: ${Boolean(streamerMode)}`);
        return Boolean(streamerMode);
    }
*/
/*    hasOutdoorSilentModeFeature() {
        const OutdoorSilentMode = this.accessory.context.device.getData('climateControlMainZone', 'outdoorSilentMode');
        this.platform.log.info(`[${this.name}] hasOutdoorSilentModeFeature, outdoorSilentMode: ${Boolean(OutdoorSilentMode)}`);
        return Boolean(OutdoorSilentMode);
    }
*/
}

////////////XXXXXXXXXX
export class DaikinCloudWaterTankAccessory {

    private readonly name: string;
    private service: Service;
    //private switchServicePowerfulMode = this.accessory.getService(this.extraServices.POWERFUL_MODE);

    constructor(
        private readonly platform: DaikinCloudPlatform,
        private readonly accessory: PlatformAccessory,
    ) {
        //this.platform.log.info("all: ", accessory.context.device.getData())
        //this.platform.log.info("temp: ", accessory.context.device.getData('climateControlMainZone','consumptionData'))
        this.platform.log.info(`Registering accessory YYY ${DaikinCloudWaterTankAccessory.name}`);
        this.name = accessory.context.device.getData('domesticHotWaterTank', 'name').value || 'Hot Water Tank';
        //this.name = DaikinCloudWaterTankAccessory.name;

        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Daikin')
            .setCharacteristic(this.platform.Characteristic.Model, accessory.context.device.getData('gateway', 'modelInfo').value)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.context.device.getData('gateway', 'serialNumber') ? accessory.context.device.getData('gateway', 'serialNumber').value : 'NOT_AVAILABLE');

        //we specify here accessory service, in this case "HeaterCooler";
        this.service = this.accessory.getService(this.platform.Service.HeaterCooler) || this.accessory.addService(this.platform.Service.HeaterCooler);

        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

        this.service.getCharacteristic(this.platform.Characteristic.Active)
            .onSet(this.handleActiveStateSet.bind(this))
            .onGet(this.handleActiveStateGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .onGet(this.handleCurrentTemperatureGet.bind(this));

        //leaving water temp - we use TargetTemp for this purpose
        //this.service.getCharacteristic(this.platform.Characteristic.TargetTemperature)
        //    .setProps({ minStep: 1, minValue: 0, maxValue: 200 })
        //    .onGet(this.handlePumpLeavingWaterTemperatureGet.bind(this));
        //this.service.getCharacteristic(this.platform.Characteristic.TargetTemperature)



        ///leavingWaterTemperature
        //this.service.getCharacteristic(this.platform.Characteristic.CurrentLeavingTemperature)
        //    .onGet(this.handleCurrentLeavingTemperatureGet.bind(this));

        this.service.getCharacteristic(this.platform.Characteristic.TargetHeaterCoolerState)
            .setProps({
                minValue: platform.Characteristic.TargetHeatingCoolingState.HEAT,
                maxValue: platform.Characteristic.TargetHeatingCoolingState.HEAT,
            })
            .onGet(this.handleTargetHotWaterStateGet.bind(this))
            .onSet(this.handleTargetHotWaterStateSet.bind(this));

        //this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
        //    .setProps({
        //        minStep: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minStep,
        //        minValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').minValue,
        //        maxValue: this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').maxValue,
        //    })
        //    .onGet(this.handleCoolingThresholdTemperatureGet.bind(this))
        //    .onSet(this.handleCoolingThresholdTemperatureSet.bind(this));

        //if (this.accessory.context.device.getData('domesticHotWaterTank', 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature')){

        this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
            .setProps({
                minStep: this.accessory.context.device.getData('domesticHotWaterTank', 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature').minStep,
                minValue: this.accessory.context.device.getData('domesticHotWaterTank', 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature').minValue,
                maxValue: this.accessory.context.device.getData('domesticHotWaterTank', 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature').maxValue,
            })
            .onGet(this.handleHotWaterThresholdTemperatureGet.bind(this))
            .onSet(this.handleHotWaterThresholdTemperatureSet.bind(this));


        //we use this for leaving water temp while heating
        //this.service.getCharacteristic(this.platform.Characteristic.HeatingThresholdTemperature)
        //    .setProps({ minStep: 1, minValue: 0, maxValue: 50 })
        //    .onGet(this.handlePumpLeavingWaterTemperatureGet.bind(this));

        //this.service.getCharacteristic(this.platform.Characteristic.CoolingThresholdTemperature)
        //    .setProps({ minStep: 1, minValue: 0, maxValue: 50 })
        //    .onGet(this.handlePumpLeavingWaterTemperatureGet.bind(this));


        //this.service.getCharacteristic(this.platform.Characteristic.RotationSpeed)
        //.setProps({
        //    minStep: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').minStep,
        //    minValue: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').minValue,
        //    maxValue: this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/cooling/fanSpeed/modes/fixed').maxValue,
        //})
        //show percentage of a button....
        //.onGet(this.handleRotationSpeedGet.bind(this))
        //.onSet(this.handleRotationSpeedSet.bind(this));

        //if (this.hasSwingModeFeature()) {
        //    this.platform.log.info(`[${this.name}] Device has SwingMode, add Characteristic`);
        //    this.service.getCharacteristic(this.platform.Characteristic.SwingMode)
        //        .onGet(this.handleSwingModeGet.bind(this))
        //        .onSet(this.handleSwingModeSet.bind(this));
        //}

        //if (this.hasPowerfulModeFeature() && this.platform.config.showExtraFeatures) {
        //    this.platform.log.info(`[${this.name}] Device has PowerfulMode, add Switch Service`);

        //    this.switchServicePowerfulMode = this.switchServicePowerfulMode || this.accessory.addService(this.platform.Service.Switch, this.extraServices.POWERFUL_MODE, 'powerful_mode');
        //    this.switchServicePowerfulMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.POWERFUL_MODE);

        //   this.switchServicePowerfulMode.getCharacteristic(this.platform.Characteristic.On)
        //        .onGet(this.handlePowerfulModeGet.bind(this))
        //        .onSet(this.handlePowerfulModeSet.bind(this));

        //} else {
        //    if (this.switchServicePowerfulMode) {
        //        this.accessory.removeService(this.switchServicePowerfulMode);
        //    }
        //}

        //if (this.hasEconoModeFeature() && this.platform.config.showExtraFeatures) {
        //    this.platform.log.info(`[${this.name}] Device has EconoMode, add Switch Service`);

        //    this.switchServiceEconoMode = this.switchServiceEconoMode || this.accessory.addService(this.platform.Service.Switch, this.extraServices.ECONO_MODE, 'econo_mode');
        //    this.switchServiceEconoMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.ECONO_MODE);

        //    this.switchServiceEconoMode.getCharacteristic(this.platform.Characteristic.On)
        //        .onGet(this.handleEconoModeGet.bind(this))
        //        .onSet(this.handleEconoModeSet.bind(this));
        //} else {
        //    if (this.switchServiceEconoMode) {
        //        this.accessory.removeService(this.switchServiceEconoMode);
        //    }
        //}

        //if (this.hasStreamerModeFeature() && this.platform.config.showExtraFeatures) {
        //    this.platform.log.info(`[${this.name}] Device has StreamerMode, add Switch Service`);

        //    this.switchServiceStreamerMode = this.switchServiceStreamerMode || this.accessory.addService(this.platform.Service.Switch, this.extraServices.STREAMER_MODE, 'streamer_mode');
        //    this.switchServiceStreamerMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.STREAMER_MODE);

        //    this.switchServiceStreamerMode.getCharacteristic(this.platform.Characteristic.On)
        //        .onGet(this.handleStreamerModeGet.bind(this))
        //        .onSet(this.handleStreamerModeSet.bind(this));

        //} else {
        //    if (this.switchServiceStreamerMode) {
        //        this.accessory.removeService(this.switchServiceStreamerMode);
        //    }
        //}

        //if (this.hasOutdoorSilentModeFeature() && this.platform.config.showExtraFeatures) {
        //    this.platform.log.info(`[${this.name}] Device has StreamerMode, add Switch Service`);

        //    this.switchServiceOutdoorSilentMode = this.switchServiceOutdoorSilentMode || this.accessory.addService(this.platform.Service.Switch, this.extraServices.OUTDOUR_SILENT_MODE, 'outdoor_silent_mode');
        //    this.switchServiceOutdoorSilentMode.setCharacteristic(this.platform.Characteristic.Name, this.extraServices.OUTDOUR_SILENT_MODE);

        //    this.switchServiceOutdoorSilentMode.getCharacteristic(this.platform.Characteristic.On)
        //        .onGet(this.handleOutdoorSilentModeGet.bind(this))
        //        .onSet(this.handleOutdoorSilentModeSet.bind(this));
        //} else {
        //    if (this.switchServiceOutdoorSilentMode) {
        //        this.accessory.removeService(this.switchServiceOutdoorSilentMode);
        //    }
        //}
    }

    async handleActiveStateGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const state = this.accessory.context.device.getData('domesticHotWaterTank', 'onOffMode').value;
        this.platform.log.info(`[${this.name}] GET ActiveState, state: ${state}`);
        return state === 'on';
    }

    async handleActiveStateSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET ActiveState, state: ${value}`);
        const state = value as boolean;
        await this.accessory.context.device.setData('domesticHotWaterTank', 'onOffMode', state ? 'on' : 'off');
        await this.accessory.context.device.updateData();
    }

    async handleCurrentTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('domesticHotWaterTank', 'sensoryData', '/tankTemperature').value;
        this.platform.log.info(`[${this.name}] GET Current Hot Water Temperature, temperature: ${temperature}`);
        return temperature;
    }

    //async handlePumpLeavingWaterTemperatureGet(): Promise<CharacteristicValue> {
    //    //for my use it is leaing water temp
    //    await this.accessory.context.device.updateData();
    //    const temperature = this.accessory.context.device.getData('climateControlMainZone', 'sensoryData', '/leavingWaterTemperature').value;
    //    this.platform.log.info(`[${this.name}] GET Leaving water Temperature, temperature: ${temperature}`);
    //    return temperature;
    //}
    //leavingWaterTemperature
    //async handleCurrentLeavingTemperatureGet(): Promise<CharacteristicValue> {
    //    await this.accessory.context.device.updateData();
    //    const temperature = this.accessory.context.device.getData('climateControlMainZone', 'sensoryData', 'leavingWaterTemperature').value;
    //    this.platform.log.info(`[${this.name}] GET CurrentLeavingTemperature, temperature: ${temperature}`);
    //    return temperature;
    //}

    /*async handleCoolingThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature').value;
        this.platform.log.info(`[${this.name}] GET CoolingThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }
*/
    /*    async handleCoolingThresholdTemperatureSet(value: CharacteristicValue) {
        const temperature = Math.round(value as number * 2) / 2;
        // const temperature = value as number;
        this.platform.log.info(`[${this.name}] SET CoolingThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', temperature);
        await this.accessory.context.device.updateData();
    }
*/
    //async handleRotationSpeedGet(): Promise<CharacteristicValue> {
    //await this.accessory.context.device.updateData();
    //const speed = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`).value;
    //this.platform.log.info(`[${this.name}] GET RotationSpeed, speed: ${speed}`);
    //    return 100//speed;
    //}

    /*    async handleRotationSpeedSet(value: CharacteristicValue) {
        const speed = value as number;
        this.platform.log.info(`[${this.name}] SET RotationSpeed, speed to: ${speed}`);
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/currentMode`, 'fixed');
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanSpeed/modes/fixed`, speed);
        await this.accessory.context.device.updateData();
    }
*/

    async handleHotWaterThresholdTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('domesticHotWaterTank', 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature').value;
        this.platform.log.info(`[${this.name}] GET HotWaterThresholdTemperature, temperature: ${temperature}`);
        return temperature;
    }

    async handleHotWaterThresholdTemperatureSet(value: CharacteristicValue) {
        //this.platform.log.info("Changing hot water threshold!!!")
        //const temperature = Math.round(value as number * 2) / 2;
        const temperature = Math.round(value as number);//we want int - minstep
        //const temperature = value as number;
        //this.platform.Characteristic.TargetHeaterCoolerState.HEAT;//we may have this added, or it gent unresponsive
        this.platform.log.info(`[${this.name}] SET HotWaterThresholdTemperature, temperature to: ${temperature}`);
        await this.accessory.context.device.setData('domesticHotWaterTank', 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature', temperature);
        await this.accessory.context.device.updateData();
    }

    async handleTargetHotWaterStateGet(): Promise<CharacteristicValue> {
        return this.platform.Characteristic.TargetHeaterCoolerState.HEAT;
        //we have only hreating, there is no need to check anything else,.,.
    }

    async handleTargetHotWaterStateSet(value: CharacteristicValue) {
        //const operationMode = value as number;
        this.platform.log.info(`[${this.name}] SET TargetHotWaterState, OperationMode to: ${value}`);
        //we manually set it to heating, because hot water tank can't do anything else...
        //const daikinOperationMode = 'heating';//we may have this added, or it gent unresponsive
        //this.platform.Characteristic.TargetHeaterCoolerState.HEAT;
        //switch (operationMode) {
        //    case this.platform.Characteristic.TargetHeaterCoolerState.COOL:
        //        daikinOperationMode = 'cooling';
        //        break;
        //    case this.platform.Characteristic.TargetHeaterCoolerState.HEAT:
        //        daikinOperationMode = 'heating';
        //        break;
        //    case this.platform.Characteristic.TargetHeaterCoolerState.AUTO:
        //        daikinOperationMode = 'auto';
        //        break;
        //}

        //this.platform.log.info(`[${this.name}] SET TargetHotWaterState, daikinOperationMode to: ${daikinOperationMode}`);
        await this.accessory.context.device.setData('domesticHotWaterTank', 'onOffMode', 'on');
        await this.accessory.context.device.updateData();
    }

    /*    async handleSwingModeSet(value: CharacteristicValue) {
        const swingMode = value as number;
        const daikinSwingMode = swingMode === 1 ? 'swing' : 'stop';
        this.platform.log.info(`[${this.name}] SET SwingMode, swingmode to: ${swingMode}/${daikinSwingMode}`);

        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/horizontal/currentMode`, daikinSwingMode);
        await this.accessory.context.device.setData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`, daikinSwingMode);
        await this.accessory.context.device.updateData();
    }
*/
    /*    async handleSwingModeGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();

        const verticalSwingMode = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        const horizontalSwingMode = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', `/operationModes/${this.getCurrentOperationMode()}/fanDirection/vertical/currentMode`).value;
        this.platform.log.info(`[${this.name}] GET SwingMode, verticalSwingMode: ${verticalSwingMode}`);
        this.platform.log.info(`[${this.name}] GET SwingMode, horizontalSwingMode: ${horizontalSwingMode}`);

        if (horizontalSwingMode === 'stop' || verticalSwingMode === 'stop') {
            return this.platform.Characteristic.SwingMode.SWING_DISABLED;
        }

        return this.platform.Characteristic.SwingMode.SWING_ENABLED;
    }
*/
    /*    async handlePowerfulModeGet() {
        this.platform.log.info(`[${this.name}] GET PowerfulMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControlMainZone', 'powerfulMode').value === 'on';
    }
*/
    /*    async handlePowerfulModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET PowerfulMode to: ${value}`);
        const daikinPowerfulMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControlMainZone', 'powerfulMode', daikinPowerfulMode);
    }
*/
    /*    async handleEconoModeGet() {
        this.platform.log.info(`[${this.name}] GET EconoMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControlMainZone', 'econoMode').value === 'on';
    }
*/
    /*   async handleEconoModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET EconoMode to: ${value}`);
        const daikinEconoMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControlMainZone', 'econoMode', daikinEconoMode);
    }
*/
    /*    async handleStreamerModeGet() {
        this.platform.log.info(`[${this.name}] GET StreamerMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControlMainZone', 'streamerMode').value === 'on';
    }
*/
    /*    async handleStreamerModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET streamerMode to: ${value}`);
        const daikinStreamerMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControlMainZone', 'streamerMode', daikinStreamerMode);
    }
*/
    /*    async handleOutdoorSilentModeGet() {
        this.platform.log.info(`[${this.name}] GET OutdoorSilentMode`);
        await this.accessory.context.device.updateData();

        return this.accessory.context.device.getData('climateControlMainZone', 'outdoorSilentMode').value === 'on';
    }
*/
    /*    async handleOutdoorSilentModeSet(value: CharacteristicValue) {
        this.platform.log.info(`[${this.name}] SET outdoorSilentMode to: ${value}`);
        const daikinOutdoorSilentMode = value as boolean ? 'on' : 'off';
        await this.accessory.context.device.setData('climateControlMainZone', 'outdoorSilentMode', daikinOutdoorSilentMode);
    }
*/
    getCurrentOperationMode() {
        return this.accessory.context.device.getData('climateControlMainZone', 'operationMode').value;
    }

    //handleHeatingThresholdTemperatureGet(){
    //    return 4;
    //}

    /*
    hasSwingModeFeature() {
        const verticalSwing = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/heating/fanDirection/vertical/currentMode');
        const horizontalSwing = this.accessory.context.device.getData('climateControlMainZone', 'fanControl', '/operationModes/heating/fanDirection/horizontal/currentMode');
        this.platform.log.info(`[${this.name}] hasSwingModeFeature, verticalSwing: ${Boolean(verticalSwing)}`);
        this.platform.log.info(`[${this.name}] hasSwingModeFeature, horizontalSwing: ${Boolean(horizontalSwing)}`);
        return Boolean(verticalSwing || horizontalSwing);
    }
*/
    /*    hasPowerfulModeFeature() {
        const powerfulMode = this.accessory.context.device.getData('climateControlMainZone', 'powerfulMode');
        this.platform.log.info(`[${this.name}] hasPowerfulModeFeature, powerfulMode: ${Boolean(powerfulMode)}`);
        return Boolean(powerfulMode);
    }
*/
    /*    hasEconoModeFeature() {
        const econoMode = this.accessory.context.device.getData('climateControlMainZone', 'econoMode');
        this.platform.log.info(`[${this.name}] hasEconoModeFeature, econoMode: ${Boolean(econoMode)}`);
        return Boolean(econoMode);
    }
*/
    /*    hasStreamerModeFeature() {
        const streamerMode = this.accessory.context.device.getData('climateControlMainZone', 'streamerMode');
        this.platform.log.info(`[${this.name}] hasStreamerModeFeature, streamerMode: ${Boolean(streamerMode)}`);
        return Boolean(streamerMode);
    }
*/
/*    hasOutdoorSilentModeFeature() {
        const OutdoorSilentMode = this.accessory.context.device.getData('climateControlMainZone', 'outdoorSilentMode');
        this.platform.log.info(`[${this.name}] hasOutdoorSilentModeFeature, outdoorSilentMode: ${Boolean(OutdoorSilentMode)}`);
        return Boolean(OutdoorSilentMode);
    }
*/
}




export class DaikinCloudTemperatureAccessory {

    private readonly name: string;
    private service: Service;
    //private switchServicePowerfulMode = this.accessory.getService(this.extraServices.POWERFUL_MODE);
    //private switchServiceEconoMode = this.accessory.getService(this.extraServices.ECONO_MODE);
    //private switchServiceStreamerMode = this.accessory.getService(this.extraServices.STREAMER_MODE);
    //private switchServiceOutdoorSilentMode = this.accessory.getService(this.extraServices.OUTDOUR_SILENT_MODE);

    constructor(
        private readonly platform: DaikinCloudPlatform,
        private readonly accessory: PlatformAccessory,
    ) {
        //this.platform.log.info("all: ", accessory.context.device.getData())
        //this.platform.log.info(`Registering accessory ${DaikinCloudTemperatureAccessory.name}`)
        //this.platform.log.info("temp: ", accessory.context.device.getData('climateControlMainZone','consumptionData'))

        //this.name = accessory.context.device.getData('climateControlMainZone', 'name').value;
        this.name = DaikinCloudTemperatureAccessory.name;
        this.platform.log.info(`Registering accessory ${this.name}`);

        this.accessory.getService(this.platform.Service.AccessoryInformation)!
            .setCharacteristic(this.platform.Characteristic.Manufacturer, 'Daikin')
            .setCharacteristic(this.platform.Characteristic.Model, accessory.context.device.getData('gateway', 'modelInfo').value)
            .setCharacteristic(this.platform.Characteristic.SerialNumber, accessory.context.device.getData('gateway', 'serialNumber') ? accessory.context.device.getData('gateway', 'serialNumber').value : 'NOT_AVAILABLE');

        //we specify here accessory service, in this case "HeaterCooler";
        this.service = this.accessory.getService(this.platform.Service.TemperatureSensor) || this.accessory.addService(this.platform.Service.TemperatureSensor);

        this.service.setCharacteristic(this.platform.Characteristic.Name, this.name);

        this.service.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .onGet(this.handleCurrentTemperatureGet.bind(this));
    }

    async handleCurrentTemperatureGet(): Promise<CharacteristicValue> {
        await this.accessory.context.device.updateData();
        const temperature = this.accessory.context.device.getData('climateControlMainZone', 'sensoryData', '/outdoorTemperature').value;
        this.platform.log.debug(`[${this.name}] GET CurrentTemperature, temperature: ${temperature}`);
        return temperature;
    }

}
