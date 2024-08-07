import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import {dx23Airco, dx4Airco, unknownJan, unknownKitchenGuests} from './devices';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from '../src/platform';
import {API, Logger} from 'homebridge';
import {MockHomebridge, MockLogger, MockPlatformAccessory, MockPlatformConfig, Switch} from './mocks';
import {daikinAirConditioningAccessory} from '../src/daikinAirConditioningAccessory';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {DaikinCloudController} from 'daikin-controller-cloud/dist/index.js';
import {OnectaClient} from 'daikin-controller-cloud/dist/onecta/oidc-client';

test.each<Array<string | string | any>>([
    ['dx4', 'climateControl', dx4Airco],
    ['dx23', 'climateControl', dx23Airco],
    ['unknown', 'climateControl', unknownKitchenGuests],
    ['unknown2', 'climateControl', unknownJan],
])('Create DaikinCloudAirConditioningAccessory with %s device', (name, climateControlEmbeddedId, deviceJson) => {
    const device = new DaikinCloudDevice(deviceJson, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const config = new MockPlatformConfig(true);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData(climateControlEmbeddedId, 'name', undefined).value, uuid);
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAirConditioningAccessory(new DaikinCloudPlatform(MockLogger as unknown as Logger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

    expect(JSON.stringify(homebridgeAccessory, null, 4)).toMatchSnapshot();
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

    expect(JSON.stringify(homebridgeAccessory, null, 4)).toMatchSnapshot();
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

    expect(await homebridgeAccessory.handleActiveStateGet()).toEqual(true);
    expect(await homebridgeAccessory.handleCurrentTemperatureGet()).toEqual(25);
    expect(await homebridgeAccessory.handleCoolingThresholdTemperatureGet()).toEqual(25);
    expect(await homebridgeAccessory.handleRotationSpeedGet()).toEqual(2);
    expect(await homebridgeAccessory.handleHeatingThresholdTemperatureGet()).toEqual(22);
    expect(await homebridgeAccessory.handleTargetHeaterCoolerStateGet()).toEqual(1);
    expect(await homebridgeAccessory.handleSwingModeGet()).toEqual(0);
    expect(await homebridgeAccessory.handlePowerfulModeGet()).toEqual(false);
    expect(await homebridgeAccessory.handleEconoModeGet()).toEqual(false);
    expect(await homebridgeAccessory.handleStreamerModeGet()).toEqual(false);
    expect(await homebridgeAccessory.handleOutdoorSilentModeGet()).toEqual(false);
    expect(await homebridgeAccessory.handleIndoorSilentModeGet()).toEqual(false);
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

    await homebridgeAccessory.handleActiveStateSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(1, 'climateControl', 'onOffMode', 'on', undefined);

    await homebridgeAccessory.handleActiveStateSet(0);
    expect(setDataSpy).toHaveBeenNthCalledWith(2, 'climateControl', 'onOffMode', 'off', undefined);

    await homebridgeAccessory.handleCoolingThresholdTemperatureSet(21);
    expect(setDataSpy).toHaveBeenNthCalledWith(3, 'climateControl', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', 21);

    await homebridgeAccessory.handleRotationSpeedSet(50);
    expect(setDataSpy).toHaveBeenNthCalledWith(4, 'climateControl', 'fanControl', '/operationModes/heating/fanSpeed/currentMode', 'fixed');
    expect(setDataSpy).toHaveBeenNthCalledWith(5, 'climateControl', 'fanControl', '/operationModes/heating/fanSpeed/modes/fixed', 50);

    await homebridgeAccessory.handleHeatingThresholdTemperatureSet(25);
    expect(setDataSpy).toHaveBeenNthCalledWith(6, 'climateControl', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature', 25);

    await homebridgeAccessory.handleTargetHeaterCoolerStateSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(7, 'climateControl', 'operationMode', 'heating', undefined);
    expect(setDataSpy).toHaveBeenNthCalledWith(8, 'climateControl', 'onOffMode', 'on', undefined);

    await homebridgeAccessory.handleSwingModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(9, 'climateControl', 'fanControl', '/operationModes/heating/fanDirection/horizontal/currentMode', 'swing');
    expect(setDataSpy).toHaveBeenNthCalledWith(10, 'climateControl', 'fanControl', '/operationModes/heating/fanDirection/vertical/currentMode', 'swing');

    await homebridgeAccessory.handlePowerfulModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(11, 'climateControl', 'powerfulMode', 'on', undefined);

    await homebridgeAccessory.handleEconoModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(12, 'climateControl', 'econoMode', 'on', undefined);

    await homebridgeAccessory.handleStreamerModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(13, 'climateControl', 'streamerMode', 'on', undefined);

    await homebridgeAccessory.handleOutdoorSilentModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(14, 'climateControl', 'outdoorSilentMode', 'on', undefined);

    await homebridgeAccessory.handleIndoorSilentModeSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(15, 'climateControl', 'fanControl', '/operationModes/heating/fanSpeed/currentMode', 'quiet');
});
