import {CharacteristicProps, CharacteristicValue, PartialAllowingNull, PlatformAccessory, Service} from 'homebridge';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from './platform';
import {DaikinCloudRepo} from './repository/daikinCloudRepo';
import {DaikinPowerfulModes} from './climateControlService';

export class HotWaterTankService {
    readonly platform: DaikinCloudPlatform;
    readonly accessory: PlatformAccessory<DaikinCloudAccessoryContext>;
    private readonly managementPointId: string;

    private extraServices = {
        POWERFUL_MODE: 'Powerful mode',
    };

    private readonly name: string;

    private readonly hotWaterTankService: Service;
    private readonly switchServicePowerfulMode?: Service;

    constructor(
        platform: DaikinCloudPlatform,
        accessory: PlatformAccessory<DaikinCloudAccessoryContext>,
        managementPointId: string,
    ) {
        this.platform = platform;
        this.accessory = accessory;
        this.managementPointId = managementPointId;
        this.name = 'Hot water tank';

        this.switchServicePowerfulMode = this.accessory.getService(this.extraServices.POWERFUL_MODE);

        this.hotWaterTankService = this.accessory.getService('Hot water tank') || accessory.addService(this.platform.Service.Thermostat, 'Hot water tank', 'hot_water_tank');
        this.hotWaterTankService.setCharacteristic(this.platform.Characteristic.Name, 'Hot water tank');

        this.hotWaterTankService
            .addOptionalCharacteristic(this.platform.Characteristic.ConfiguredName);
        this.hotWaterTankService
            .setCharacteristic(this.platform.Characteristic.ConfiguredName, 'Hot water tank');

        this.hotWaterTankService.getCharacteristic(this.platform.Characteristic.CurrentHeatingCoolingState)
            .onGet(this.handleHotWaterTankCurrentHeatingCoolingStateGet.bind(this));

        this.hotWaterTankService.getCharacteristic(this.platform.Characteristic.CurrentTemperature)
            .onGet(this.handleHotWaterTankCurrentTemperatureGet.bind(this));

        const temperatureControl = accessory.context.device.getData(this.managementPointId, 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature');
        const targetTemperature = this.hotWaterTankService.getCharacteristic(this.platform.Characteristic.TargetTemperature);
        targetTemperature.setProps({
            minStep: temperatureControl.stepValue,
            minValue: temperatureControl.minValue,
            maxValue: temperatureControl.maxValue,
        })
            .onGet(this.handleHotWaterTankHeatingTargetTemperatureGet.bind(this))
            .onSet(this.handleHotWaterTankHeatingTargetTemperatureSet.bind(this));

        // remove the set handler if the temperature is not settable
        if (temperatureControl.settable === false) {
            targetTemperature.removeOnSet();
        }

        this.hotWaterTankService.getCharacteristic(this.platform.Characteristic.TargetHeatingCoolingState)
            .setProps(this.getTargetHeatingCoolingStateProps())
            .onGet(this.handleHotWaterTankTargetHeatingCoolingStateGet.bind(this))
            .onSet(this.handleHotWaterTankTargetHeatingCoolingStateSet.bind(this));

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

    }

    async handleHotWaterTankCurrentHeatingCoolingStateGet(): Promise<CharacteristicValue> {
        const state = this.accessory.context.device.getData(this.managementPointId, 'onOffMode', undefined).value;
        this.platform.log.debug(`[${this.name}] GET ActiveState, state: ${state}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        const val = state === DaikinOnOffModes.ON ? this.platform.Characteristic.CurrentHeatingCoolingState.HEAT : this.platform.Characteristic.CurrentHeatingCoolingState.OFF;
        this.platform.log.debug(`[${this.name}] GET ActiveState going to return ${val}`);
        return val;
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
        this.platform.log.debug(`[${this.name}] SET HeatingTargetTemperature domesticHotWaterTank, temperature to: ${temperature}`);
        try {
            const temperatureControl = this.accessory.context.device.getData(this.managementPointId, 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature');
            if (temperatureControl.settable === false) {
                this.platform.log.warn(`[${this.name}] SET HeatingTargetTemperature domesticHotWaterTank is not possible because temperatureControl isn't settable`, temperatureControl);
            }

            await this.accessory.context.device.setData(this.managementPointId, 'temperatureControl', '/operationModes/heating/setpoints/domesticHotWaterTemperature', temperature);
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }
        this.platform.forceUpdateDevices();
    }

    async handleHotWaterTankTargetHeatingCoolingStateGet(): Promise<CharacteristicValue> {
        const operationMode: DaikinOperationModes = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined).value;
        const state = this.accessory.context.device.getData(this.managementPointId, 'onOffMode', undefined).value;
        this.platform.log.debug(`[${this.name}] GET TankTargetHeatingCoolingState, operationMode: ${operationMode}, state: ${state}`);

        if (state === DaikinOnOffModes.OFF) {
            return this.platform.Characteristic.TargetHeatingCoolingState.OFF;
        }

        switch (operationMode) {
            case DaikinOperationModes.COOLING:
                return this.platform.Characteristic.TargetHeatingCoolingState.COOL;
            case DaikinOperationModes.HEATING:
                return this.platform.Characteristic.TargetHeatingCoolingState.HEAT;
            default:
                return this.platform.Characteristic.TargetHeatingCoolingState.AUTO;
        }
    }

    async handleHotWaterTankTargetHeatingCoolingStateSet(value: CharacteristicValue) {
        const operationMode = value as number;
        this.platform.log.debug(`[${this.name}] SET TargetHeatingCoolingState, OperationMode to: ${value}`);
        let daikinOperationMode: DaikinOperationModes = DaikinOperationModes.COOLING;

        if (operationMode === this.platform.Characteristic.TargetHeatingCoolingState.OFF) {
            try {
                await this.accessory.context.device.setData(this.managementPointId, 'onOffMode', DaikinOnOffModes.OFF, undefined);
            } catch (e) {
                this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
            }
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

        this.platform.log.debug(`[${this.name}] SET TargetHeatingCoolingState, daikinOperationMode to: ${daikinOperationMode}`);

        try {
            // turn on the device as well because there is no specific on/off characteristic in Homebridge, while targetState/operationMode and onOffMode are separate with the Daikin API
            await this.accessory.context.device.setData(this.managementPointId, 'onOffMode', DaikinOnOffModes.ON, undefined);

            const operationMode = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined);
            if (operationMode.settable === false) {
                this.platform.log.warn(`[${this.name}] SET TargetHeatingCoolingState is not possible because operationMode isn't settable`, operationMode);
                return;
            }

            await this.accessory.context.device.setData(this.managementPointId, 'operationMode', daikinOperationMode, undefined);
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }

        this.platform.forceUpdateDevices();
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

    getTargetHeatingCoolingStateProps(): PartialAllowingNull<CharacteristicProps> {
        const operationMode = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined);
        this.platform.log.debug('OperationMode', JSON.stringify(operationMode, null, 4));

        if (operationMode.settable === false) {
            if (operationMode.value === DaikinOperationModes.HEATING) {
                return {
                    validValues: [this.platform.Characteristic.TargetHeatingCoolingState.OFF, this.platform.Characteristic.TargetHeatingCoolingState.HEAT],
                };
            } else if (operationMode.value === DaikinOperationModes.COOLING) {
                return {
                    validValues: [this.platform.Characteristic.TargetHeatingCoolingState.OFF, this.platform.Characteristic.TargetHeatingCoolingState.COOL],
                };
            } else if (operationMode.value === DaikinOperationModes.AUTO) {
                return {
                    validValues: [this.platform.Characteristic.TargetHeatingCoolingState.OFF, this.platform.Characteristic.TargetHeatingCoolingState.AUTO],
                };
            } else {
                return {
                    minValue: 0,
                    maxValue: 3,
                    minStep: 1,
                };
            }
        }

        return {
            minValue: 0,
            maxValue: 3,
            minStep: 1,
        };
    }

    hasPowerfulModeFeature() {
        const powerfulMode = this.accessory.context.device.getData(this.managementPointId, 'powerfulMode', undefined);
        this.platform.log.debug(`[${this.name}] hasPowerfulModeFeature, powerfulMode: ${Boolean(powerfulMode)}`);
        return Boolean(powerfulMode);
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
