import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from '../src/platform';
import {API, Logger} from 'homebridge';
import {MockHomebridge, MockLogger, MockPlatformAccessory, MockPlatformConfig, Switch} from './mocks';
import {daikinAirConditioningAccessory} from '../src/daikinAirConditioningAccessory';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {DaikinCloudController} from 'daikin-controller-cloud/dist/index.js';
import {OnectaClient} from 'daikin-controller-cloud/dist/onecta/oidc-client';
import {unknownJan} from './fixtures/unknown-jan';
import {unknownKitchenGuests} from './fixtures/unknown-kitchen-guests';
import {dx23Airco} from './fixtures/dx23-airco';
import {dx4Airco} from './fixtures/dx4-airco';
import {dx23Airco2} from './fixtures/dx23-airco-2';

type DeviceState = {
	activeState: boolean;
	currentTemperature: number;
	targetHeaterCoolerState: string;
	coolingThresholdTemperature: number;
	heatingThresholdTemperature: number;
	rotationSpeed: number;
	swingMode: number;
	powerfulMode: number;
	econoMode: number;
	streamerMode: number;
	outdoorSilentMode: number;
	indoorSilentMode: number;
	dryOperationMode: number;
	fanOnlyOperationMode: number;
};

test.each<Array<string | string | any | DeviceState>>([
    [
        'dx4',
        'climateControl',
        dx4Airco,
        {
            activeState: true,
            currentTemperature: 25,
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: 25,
            heatingThresholdTemperature: 22,
            rotationSpeed: 2,
            swingMode: 0,
            powerfulMode: false,
            econoMode: false,
            streamerMode: false,
            outdoorSilentMode: false,
            indoorSilentMode: false,
            dryOperationMode: false,
            fanOnlyOperationMode: false,
        },
    ],
    [
        'dx23',
        'climateControl',
        dx23Airco,
        {
            activeState: false,
            currentTemperature: 27,
            targetHeaterCoolerState: 2,
            coolingThresholdTemperature: 17,
            heatingThresholdTemperature: 17,
            rotationSpeed: 3,
            swingMode: 1,
            powerfulMode: undefined,
            econoMode: undefined,
            streamerMode: undefined,
            outdoorSilentMode: undefined,
            indoorSilentMode: undefined,
            dryOperationMode: false,
            fanOnlyOperationMode: false,
        },
    ],
    [
        'dx23-2',
        'climateControl',
        dx23Airco2,
        {
            activeState: true,
            currentTemperature: 19,
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: 25,
            heatingThresholdTemperature: 13,
            rotationSpeed: 4,
            swingMode: 0,
            powerfulMode: false,
            econoMode: undefined,
            streamerMode: undefined,
            outdoorSilentMode: undefined,
            indoorSilentMode: false,
            dryOperationMode: false,
            fanOnlyOperationMode: false,
        },
    ],
    [
        'unknown',
        'climateControl',
        unknownKitchenGuests,
        {
            activeState: false,
            currentTemperature: 30.1,
            targetHeaterCoolerState: 2,
            coolingThresholdTemperature: 23.5,
            heatingThresholdTemperature: undefined,
            rotationSpeed: 1,
            swingMode: 1,
            powerfulMode: undefined,
            econoMode: undefined,
            streamerMode: undefined,
            outdoorSilentMode: undefined,
            indoorSilentMode: undefined,
            dryOperationMode: false,
            fanOnlyOperationMode: false,
        },
    ],
    [
        'unknown2',
        'climateControl',
        unknownJan,
        {
            activeState: false,
            currentTemperature: 27,
            targetHeaterCoolerState: 2,
            coolingThresholdTemperature: 26.1,
            heatingThresholdTemperature: undefined,
            rotationSpeed: 1,
            swingMode: 1,
            powerfulMode: undefined,
            econoMode: undefined,
            streamerMode: undefined,
            outdoorSilentMode: undefined,
            indoorSilentMode: undefined,
            dryOperationMode: false,
            fanOnlyOperationMode: false,
        },
    ],
])('Create DaikinCloudAirConditioningAccessory with %s device', async (name: string, climateControlEmbeddedId: string, deviceJson, state: DeviceState) => {
    const device = new DaikinCloudDevice(deviceJson, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const config = new MockPlatformConfig(true);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData(climateControlEmbeddedId, 'name', undefined).value, uuid);
    accessory.context['device'] = device;

    expect(() => {
        new daikinAirConditioningAccessory(new DaikinCloudPlatform(MockLogger as unknown as Logger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);
    }).not.toThrow();

    const homebridgeAccessory = new daikinAirConditioningAccessory(new DaikinCloudPlatform(MockLogger as unknown as Logger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

    if (state.activeState) {
        expect(await homebridgeAccessory.service.handleActiveStateGet()).toBe(state.activeState);
        expect(async () => {
            await homebridgeAccessory.service.handleActiveStateSet(1);
        }).not.toThrow();
        expect(async () => {
            await homebridgeAccessory.service.handleActiveStateSet(0);
        }).not.toThrow();
    }

    expect(await homebridgeAccessory.service.handleCurrentTemperatureGet()).toBe(state.currentTemperature);

    if (state.coolingThresholdTemperature) {
        expect(await homebridgeAccessory.service.handleCoolingThresholdTemperatureGet()).toBe(state.coolingThresholdTemperature);
        expect(async () => {
            await homebridgeAccessory.service.handleCoolingThresholdTemperatureSet(21);
        }).not.toThrow();
    }

    if (state.heatingThresholdTemperature) {
        expect(await homebridgeAccessory.service.handleHeatingThresholdTemperatureGet()).toBe(state.heatingThresholdTemperature);
        expect(async () => {
            await homebridgeAccessory.service.handleHeatingThresholdTemperatureSet(25);
        }).not.toThrow();
    }

    if (state.rotationSpeed) {
        expect(await homebridgeAccessory.service.handleRotationSpeedGet()).toBe(state.rotationSpeed);
        expect(async () => {
            await homebridgeAccessory.service.handleRotationSpeedSet(50);
        }).not.toThrow();
    }

    if (state.targetHeaterCoolerState) {
        expect(await homebridgeAccessory.service.handleTargetHeaterCoolerStateGet()).toBe(state.targetHeaterCoolerState);
        expect(async () => {
            await homebridgeAccessory.service.handleTargetHeaterCoolerStateSet(1);
        }).not.toThrow();
    }

    if (state.swingMode) {
        expect(await homebridgeAccessory.service.handleSwingModeGet()).toBe(state.swingMode);
        expect(async () => {
            await homebridgeAccessory.service.handleSwingModeSet(1);
        }).not.toThrow();
    }

    if (state.powerfulMode) {
        expect(await homebridgeAccessory.service.handlePowerfulModeGet()).toBe(state.powerfulMode);
        expect(async () => {
            await homebridgeAccessory.service.handlePowerfulModeSet(1);
        }).not.toThrow();
    }

    if (state.econoMode) {
        expect(await homebridgeAccessory.service.handleEconoModeGet()).toBe(state.econoMode);
        expect(async () => {
            await homebridgeAccessory.service.handleEconoModeSet(1);
        }).not.toThrow();
    }

    if (state.streamerMode) {
        expect(await homebridgeAccessory.service.handleStreamerModeGet()).toBe(state.streamerMode);
        expect(async () => {
            await homebridgeAccessory.service.handleStreamerModeSet(1);
        }).not.toThrow();
    }

    if (state.outdoorSilentMode) {
        expect(await homebridgeAccessory.service.handleOutdoorSilentModeGet()).toBe(state.outdoorSilentMode);
        expect(async () => {
            await homebridgeAccessory.service.handleOutdoorSilentModeSet(1);
        }).not.toThrow();
    }

    if (state.indoorSilentMode) {
        expect(await homebridgeAccessory.service.handleIndoorSilentModeGet()).toBe(state.indoorSilentMode);
        expect(async () => {
            await homebridgeAccessory.service.handleIndoorSilentModeSet(1);
        }).not.toThrow();
    }

    if (state.dryOperationMode) {
        expect(await homebridgeAccessory.service.handleDryOperationModeGet()).toBe(state.dryOperationMode);
    }

    if (state.fanOnlyOperationMode) {
        expect(await homebridgeAccessory.service.handleFanOnlyOperationModeGet()).toBe(state.fanOnlyOperationMode);
    }
});

test.each<Array<string | string | any>>([
    ['dx4', 'climateControl', dx4Airco],
    ['dx23', 'climateControl', dx23Airco],
])('Create DaikinCloudAirConditioningAccessory with %s device, showExtraFeatures disabled', async (name, climateControlEmbeddedId, deviceJson) => {
    const device = new DaikinCloudDevice(deviceJson, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const removeServiceSpy = jest.spyOn(MockPlatformAccessory.prototype, 'removeService').mockImplementation();

    const config = new MockPlatformConfig(false);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData(climateControlEmbeddedId, 'name', undefined).value, uuid);
    accessory.addService(Switch, 'Powerful mode');
    accessory.addService(Switch, 'Econo mode');
    accessory.addService(Switch, 'Streamer mode');
    accessory.addService(Switch, 'Outdoor silent mode');
    accessory.addService(Switch, 'Indoor silent mode');
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAirConditioningAccessory(new DaikinCloudPlatform(MockLogger as unknown as Logger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

    expect(removeServiceSpy).toHaveBeenNthCalledWith(1, new Switch('Powerful mode'));
    expect(removeServiceSpy).toHaveBeenNthCalledWith(2, new Switch('Econo mode'));
    expect(removeServiceSpy).toHaveBeenNthCalledWith(3, new Switch('Streamer mode'));
    expect(removeServiceSpy).toHaveBeenNthCalledWith(4, new Switch('Outdoor silent mode'));
    expect(removeServiceSpy).toHaveBeenNthCalledWith(5, new Switch('Indoor silent mode'));
    removeServiceSpy.mockReset();
});

test('DaikinCloudAirConditioningAccessory Getters', async () => {
    const device = new DaikinCloudDevice(dx4Airco, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const config = new MockPlatformConfig(false);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData('climateControl', 'name', undefined).value, uuid);
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAirConditioningAccessory(new DaikinCloudPlatform(MockLogger as unknown as Logger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

    expect(await homebridgeAccessory.service.handleActiveStateGet()).toEqual(true);
    expect(await homebridgeAccessory.service.handleCurrentTemperatureGet()).toEqual(25);
    expect(await homebridgeAccessory.service.handleCoolingThresholdTemperatureGet()).toEqual(25);
    expect(await homebridgeAccessory.service.handleRotationSpeedGet()).toEqual(2);
    expect(await homebridgeAccessory.service.handleHeatingThresholdTemperatureGet()).toEqual(22);
    expect(await homebridgeAccessory.service.handleTargetHeaterCoolerStateGet()).toEqual(1);
    expect(await homebridgeAccessory.service.handleSwingModeGet()).toEqual(0);
    expect(await homebridgeAccessory.service.handlePowerfulModeGet()).toEqual(false);
    expect(await homebridgeAccessory.service.handleEconoModeGet()).toEqual(false);
    expect(await homebridgeAccessory.service.handleStreamerModeGet()).toEqual(false);
    expect(await homebridgeAccessory.service.handleOutdoorSilentModeGet()).toEqual(false);
    expect(await homebridgeAccessory.service.handleIndoorSilentModeGet()).toEqual(false);
});

test('DaikinCloudAirConditioningAccessory Setters', async () => {
    const device = new DaikinCloudDevice(dx4Airco, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const setDataSpy = jest.spyOn(DaikinCloudDevice.prototype, 'setData').mockImplementation();

    const config = new MockPlatformConfig(false);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData('climateControl', 'name', undefined).value, uuid);
    // device.updateData = () => jest.fn();
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAirConditioningAccessory(new DaikinCloudPlatform(MockLogger as unknown as Logger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

    await homebridgeAccessory.service.handleActiveStateSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(1, 'climateControl', 'onOffMode', 'on', undefined);

    await homebridgeAccessory.service.handleActiveStateSet(0);
    expect(setDataSpy).toHaveBeenNthCalledWith(2, 'climateControl', 'onOffMode', 'off', undefined);

    await homebridgeAccessory.service.handleCoolingThresholdTemperatureSet(21);
    expect(setDataSpy).toHaveBeenNthCalledWith(3, 'climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', 21);

    await homebridgeAccessory.service.handleRotationSpeedSet(50);
    expect(setDataSpy).toHaveBeenNthCalledWith(4, 'climateControl', 'fanControl', '/operationModes/heating/fanSpeed/currentMode', 'fixed');
    expect(setDataSpy).toHaveBeenNthCalledWith(5, 'climateControl', 'fanControl', '/operationModes/heating/fanSpeed/modes/fixed', 50);

    await homebridgeAccessory.service.handleHeatingThresholdTemperatureSet(25);
    expect(setDataSpy).toHaveBeenNthCalledWith(6, 'climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature', 25);

    await homebridgeAccessory.service.handleTargetHeaterCoolerStateSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(7, 'climateControl', 'operationMode', 'heating', undefined);
    expect(setDataSpy).toHaveBeenNthCalledWith(8, 'climateControl', 'onOffMode', 'on', undefined);

    await homebridgeAccessory.service.handleSwingModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(9, 'climateControl', 'fanControl', '/operationModes/heating/fanDirection/horizontal/currentMode', 'swing');
    expect(setDataSpy).toHaveBeenNthCalledWith(10, 'climateControl', 'fanControl', '/operationModes/heating/fanDirection/vertical/currentMode', 'swing');

    await homebridgeAccessory.service.handlePowerfulModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(11, 'climateControl', 'powerfulMode', 'on', undefined);

    await homebridgeAccessory.service.handleEconoModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(12, 'climateControl', 'econoMode', 'on', undefined);

    await homebridgeAccessory.service.handleStreamerModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(13, 'climateControl', 'streamerMode', 'on', undefined);

    await homebridgeAccessory.service.handleOutdoorSilentModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(14, 'climateControl', 'outdoorSilentMode', 'on', undefined);

    await homebridgeAccessory.service.handleIndoorSilentModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(15, 'climateControl', 'fanControl', '/operationModes/heating/fanSpeed/currentMode', 'quiet');
});
