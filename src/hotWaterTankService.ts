import {CharacteristicValue, Perms, PlatformAccessory, Service} from 'homebridge';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from './platform';
import {DaikinCloudRepo} from './repository/daikinCloudRepo';
import {PartialAllowingNull} from "hap-nodejs/dist/types";
import {CharacteristicProps} from "hap-nodejs/dist/lib/Characteristic";

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
        this.name = 'Hot water tank';


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
            .onGet(this.handleHotWaterTankTargetHeaterCoolerStateGet.bind(this))
            .onSet(this.handleHotWaterTankTargetHeaterCoolerStateSet.bind(this));

    }

    async handleHotWaterTankCurrentHeatingCoolingStateGet(): Promise<CharacteristicValue> {
        const state = this.accessory.context.device.getData(this.managementPointId, 'onOffMode', undefined).value;
        this.platform.log.debug(`[${this.name}] GET ActiveState, state: ${state}, last update: ${this.accessory.context.device.getLastUpdated()}`);
        return state === DaikinOnOffModes.ON ? this.platform.Characteristic.CurrentHeatingCoolingState.HEAT : this.platform.Characteristic.CurrentHeatingCoolingState.OFF;
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

        this.platform.log.debug(`[${this.name}] SET TargetHeaterCoolerState, daikinOperationMode to: ${daikinOperationMode}`);

        try {
            // turn on the device as well because there is no specific on/off characteristic in Homebridge, while targetState/operationMode and onOffMode are separate with the Daikin API
            await this.accessory.context.device.setData(this.managementPointId, 'onOffMode', DaikinOnOffModes.ON, undefined);

            const operationMode = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined);
            if (operationMode.settable === false) {
                this.platform.log.warn(`[${this.name}] SET TargetHeaterCoolerState is not possible because operationMode isn't settable`, operationMode);
                return;
            }

            await this.accessory.context.device.setData(this.managementPointId, 'operationMode', daikinOperationMode, undefined);
        } catch (e) {
            this.platform.log.error('Failed to set', e, JSON.stringify(DaikinCloudRepo.maskSensitiveCloudDeviceData(this.accessory.context.device.desc), null, 4));
        }

        this.platform.forceUpdateDevices();
    }

    getTargetHeatingCoolingStateProps(): PartialAllowingNull<CharacteristicProps> {
        const operationMode = this.accessory.context.device.getData(this.managementPointId, 'operationMode', undefined);
        this.platform.log.debug('OperationMode', JSON.stringify(operationMode, null, 4));

        if (operationMode.settable === false) {
            if (operationMode.value === DaikinOperationModes.HEATING) {
                return {
                    validValues: [0, 1],
                };
            } else if (operationMode.value === DaikinOperationModes.COOLING) {
                return {
                    validValues: [0, 2],
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
