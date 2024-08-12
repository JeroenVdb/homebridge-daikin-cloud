import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import {althermaHeatPump} from './devices';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from '../src/platform';
import {API} from 'homebridge';
import {MockHomebridge, MockLogger, MockPlatformConfig} from './mocks';
import {daikinAlthermaAccessory} from '../src/daikinAlthermaAccessory';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {OnectaClient} from 'daikin-controller-cloud/dist/onecta/oidc-client';
import {DaikinCloudController} from 'daikin-controller-cloud/dist/index.js';
import exp = require("node:constants");


test.each<Array<string | string | any>>([
    ['altherma', 'climateControlMainZone', althermaHeatPump],
])('Create DaikinCloudThermostatAccessory with %s device', (name, climateControlEmbeddedId, deviceJson) => {
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
        new daikinAlthermaAccessory(new DaikinCloudPlatform(MockLogger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);
    }).not.toThrow();
});

test('DaikinCloudAirConditioningAccessory Getters', async () => {
    const device = new DaikinCloudDevice(althermaHeatPump, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const config = new MockPlatformConfig(false);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData('climateControlMainZone', 'name', undefined).value, uuid);
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAlthermaAccessory(new DaikinCloudPlatform(MockLogger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

    expect(await homebridgeAccessory.service?.handleActiveStateGet()).toEqual(true);
    expect(await homebridgeAccessory.service?.handleCurrentTemperatureGet()).toEqual(22.4);
    expect(await homebridgeAccessory.service?.handleHeatingThresholdTemperatureGet()).toEqual(22);
    expect(await homebridgeAccessory.service?.handleTargetHeaterCoolerStateGet()).toEqual(1);
});

test('DaikinCloudAirConditioningAccessory Setters', async () => {
    const device = new DaikinCloudDevice(althermaHeatPump, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const setDataSpy = jest.spyOn(DaikinCloudDevice.prototype, 'setData').mockImplementation();

    const config = new MockPlatformConfig(false);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData('climateControlMainZone', 'name', undefined).value, uuid);
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAlthermaAccessory(new DaikinCloudPlatform(MockLogger, config, api as unknown as API), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

    await homebridgeAccessory.service?.handleActiveStateSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(1, 'climateControlMainZone', 'onOffMode', 'on', undefined);

    await homebridgeAccessory.service?.handleActiveStateSet(0);
    expect(setDataSpy).toHaveBeenNthCalledWith(2, 'climateControlMainZone', 'onOffMode', 'off', undefined);

    await homebridgeAccessory.service?.handleCoolingThresholdTemperatureSet(21);
    expect(setDataSpy).toHaveBeenNthCalledWith(3, 'climateControlMainZone', 'temperatureControl', '/operationModes/cooling/setpoints/roomTemperature', 21);

    await homebridgeAccessory.service?.handleHeatingThresholdTemperatureSet(25);
    expect(setDataSpy).toHaveBeenNthCalledWith(4, 'climateControlMainZone', 'temperatureControl', '/operationModes/heating/setpoints/roomTemperature', 25);

    await homebridgeAccessory.service?.handleTargetHeaterCoolerStateSet(1);
    expect(setDataSpy).toHaveBeenNthCalledWith(5, 'climateControlMainZone', 'operationMode', 'heating', undefined);
    expect(setDataSpy).toHaveBeenNthCalledWith(6, 'climateControlMainZone', 'onOffMode', 'on', undefined);


});
