import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import DaikinCloudDevice from 'daikin-controller-cloud/lib/device.js';
import DaikinCloudController from 'daikin-controller-cloud/index.js';
import {althermaHeatPump, dx23Airco, dx4Airco} from './devices';
import {DaikinCloudPlatform} from "../src/platform";
import {API} from "homebridge";
import {MockHomebridge, MockLog, MockPlatformConfig} from "./mocks";
import {DaikinCloudAirConditioningAccessory} from "../src/accessory";
import {DaikinCloudAirThermostatAccessory} from "../src/daikinThermostatAccessory";

test.each<Array<string | string | any>>([
    ['dx4', 'climateControl', dx4Airco],
    ['dx23', 'climateControl', dx23Airco],
])('Create DaikinCloudAirConditioningAccessory with %s device', (name, climateControlEmbeddedId, deviceJson) => {
    const device = new DaikinCloudDevice(deviceJson, new DaikinCloudController());

    jest.spyOn(DaikinCloudPlatform.prototype, 'getCloudDevices').mockImplementation(async (username, password) => {
        return [device];
    });

    const config = new MockPlatformConfig(true);
    const api = new MockHomebridge();



    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData(climateControlEmbeddedId, 'name').value, uuid);
    accessory.context['device'] = device;

    const homebridgeAccessory = new DaikinCloudAirConditioningAccessory(new DaikinCloudPlatform(MockLog, config, api as unknown as API), accessory as unknown as PlatformAccessory);

    expect(homebridgeAccessory).toMatchSnapshot();
});

test.each<Array<string | string | any>>([
    ['altherma', 'climateControlMainZone', althermaHeatPump],
])('Create DaikinCloudThermostatAccessory with %s device', (name, climateControlEmbeddedId, deviceJson) => {
    const device = new DaikinCloudDevice(deviceJson, new DaikinCloudController());

    jest.spyOn(DaikinCloudPlatform.prototype, 'getCloudDevices').mockImplementation(async (username, password) => {
        return [device];
    });

    const config = new MockPlatformConfig(true);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData(climateControlEmbeddedId, 'name').value, uuid);
    accessory.context['device'] = device;

    const homebridgeAccessory = new DaikinCloudAirThermostatAccessory(new DaikinCloudPlatform(MockLog, config, api as unknown as API), accessory as unknown as PlatformAccessory);

    expect(homebridgeAccessory).toMatchSnapshot();
});
