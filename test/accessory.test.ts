import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import DaikinCloudDevice from 'daikin-controller-cloud/lib/device.js';
import DaikinCloudController from 'daikin-controller-cloud/index.js';
import {althermaHeatPump, dx23Airco, dx4Airco} from './devices';
import {DaikinCloudPlatform} from '../src/platform';
import {API} from 'homebridge';
import {MockHomebridge, MockLog, MockPlatformAccessory, MockPlatformConfig, Switch} from './mocks';
import {daikinAirConditioningAccessory} from '../src/daikinAirConditioningAccessory';
import {daikinAlthermaAccessory} from '../src/daikinAlthermaAccessory';

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

    const homebridgeAccessory = new daikinAirConditioningAccessory(new DaikinCloudPlatform(MockLog, config, api as unknown as API), accessory as unknown as PlatformAccessory);

    expect(homebridgeAccessory).toMatchSnapshot();
});

test.each<Array<string | string | any>>([
    ['dx4', 'climateControl', dx4Airco],
    ['dx23', 'climateControl', dx23Airco],
])('Create DaikinCloudAirConditioningAccessory with %s device, showExtraFeatures disabled', (name, climateControlEmbeddedId, deviceJson) => {
    const device = new DaikinCloudDevice(deviceJson, new DaikinCloudController());

    jest.spyOn(DaikinCloudPlatform.prototype, 'getCloudDevices').mockImplementation(async (username, password) => {
        return [device];
    });

    const removeServiceSpy = jest.spyOn(MockPlatformAccessory.prototype, 'removeService').mockImplementation();

    const config = new MockPlatformConfig(false);
    const api = new MockHomebridge();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData(climateControlEmbeddedId, 'name').value, uuid);
    accessory.addService(Switch, 'Powerful mode');
    accessory.addService(Switch, 'Econo mode');
    accessory.addService(Switch, 'Streamer mode');
    accessory.addService(Switch, 'Outdoor silent mode');
    accessory.addService(Switch, 'Indoor silent mode');
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAirConditioningAccessory(new DaikinCloudPlatform(MockLog, config, api as unknown as API), accessory as unknown as PlatformAccessory);

    expect(homebridgeAccessory).toMatchSnapshot();
    expect(removeServiceSpy).toHaveBeenNthCalledWith(1, new Switch('Powerful mode'));
    expect(removeServiceSpy).toHaveBeenNthCalledWith(2, new Switch('Econo mode'));
    expect(removeServiceSpy).toHaveBeenNthCalledWith(3, new Switch('Streamer mode'));
    expect(removeServiceSpy).toHaveBeenNthCalledWith(4, new Switch('Outdoor silent mode'));
    expect(removeServiceSpy).toHaveBeenNthCalledWith(5, new Switch('Indoor silent mode'));
    removeServiceSpy.mockReset();
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

    const homebridgeAccessory = new daikinAlthermaAccessory(new DaikinCloudPlatform(MockLog, config, api as unknown as API), accessory as unknown as PlatformAccessory);

    expect(homebridgeAccessory).toMatchSnapshot();
});
