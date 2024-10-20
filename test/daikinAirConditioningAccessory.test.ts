import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from '../src/platform';
import {API, Logger} from 'homebridge';
import {MockHomebridge, MockLogger, MockPlatformAccessory, MockPlatformConfig, Switch} from './mocks';
import {daikinAirConditioningAccessory} from '../src/daikinAirConditioningAccessory';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {DaikinCloudController} from 'daikin-controller-cloud/dist/index.js';
import {OnectaClient} from 'daikin-controller-cloud/dist/onecta/oidc-client';
import {unknownJan} from "./fixtures/unknown-jan";
import {unknownKitchenGuests} from "./fixtures/unknown-kitchen-guests";
import {dx23Airco} from "./fixtures/dx23-airco";
import {dx4Airco} from "./fixtures/dx4-airco";

test.each<Array<string | string | any>>([
    ['dx4', 'climateControl', dx4Airco],
    ['dx23', 'climateControl', dx23Airco],
    ['unknown', 'climateControl', unknownKitchenGuests],
    ['unknown2', 'climateControl', unknownJan],
])('Create DaikinCloudAirConditioningAccessory with %s device', async (name: string, climateControlEmbeddedId, deviceJson) => {
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

    expect(await homebridgeAccessory.service?.handleActiveStateGet()).toBeDefined();
    expect(await homebridgeAccessory.service?.handleCurrentTemperatureGet()).toBeDefined();
    expect(await homebridgeAccessory.service?.handleTargetHeaterCoolerStateGet()).toBeDefined();

    if (!name.includes('unknown')) {
        expect(await homebridgeAccessory.service?.handleHeatingThresholdTemperatureGet()).toBeDefined();
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
