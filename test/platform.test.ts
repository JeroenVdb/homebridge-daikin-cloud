import DaikinCloudDevice from 'daikin-controller-cloud/lib/device.js';
import DaikinCloudController from 'daikin-controller-cloud/index.js';
import {althermaHeatPump, dx23Airco, dx4Airco} from './devices';
import {DaikinCloudPlatform} from "../src/platform";
import {API} from "homebridge";
import {MockHomebridge, MockLog, MockPlatformConfig} from "./mocks";

test.each<Array<string | any | jest.DoneCallback>>([
    ['dx4', dx4Airco],
    ['dx23', dx23Airco],
    ['altherma', althermaHeatPump],
])('Create DaikinCloudPlatform with %s device', (name, deviceJson, done: jest.DoneCallback) => {
    const device = new DaikinCloudDevice(deviceJson, new DaikinCloudController());

    jest.spyOn(DaikinCloudPlatform.prototype, 'getCloudDevices').mockImplementation(async (username, password) => {
        return [device];
    });

    const config = new MockPlatformConfig(true);
    const api = new MockHomebridge();

    const registerPlatformAccessoriesSpy = jest.spyOn(api, 'registerPlatformAccessories');

    new DaikinCloudPlatform(MockLog, config, api as unknown as API);
    api.send('didFinishLaunching');

    setTimeout(() => {
        expect(registerPlatformAccessoriesSpy).toBeCalledWith('homebridge-daikin-cloud', 'DaikinCloud', expect.anything());
        done();
    }, 10);
});
