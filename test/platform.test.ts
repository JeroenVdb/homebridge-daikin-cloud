import {DaikinCloudPlatform} from "../src/platform";
import {MockHomebridge, MockLogger, MockPlatformConfig} from "./mocks";
import {API} from "homebridge";
import {althermaHeatPump, dx23Airco, dx4Airco} from "./devices";
import {DaikinCloudDevice} from "daikin-controller-cloud/dist/device";
import {DaikinCloudController} from "daikin-controller-cloud/dist/index.js";
import {OnectaClient} from "daikin-controller-cloud/dist/onecta/oidc-client";


test('Initialize platform', async () => {
    const api = new MockHomebridge()

    const platform = new DaikinCloudPlatform(MockLogger, new MockPlatformConfig(), api as unknown as API);
    expect(platform.updateIntervalDelay).toBe(900000);
    api.signalFinished();

});

test.each<Array<string | any | jest.DoneCallback>>([
    ['dx4', dx4Airco],
    ['dx23', dx23Airco],
    ['altherma', althermaHeatPump],
    // ['altherma2', althermaHeatPump2],
])('Create DaikinCloudPlatform with %s device', (name, deviceJson, done: jest.DoneCallback) => {

    const device = new DaikinCloudDevice(deviceJson, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const config = new MockPlatformConfig(true);
    const api = new MockHomebridge();

    const registerPlatformAccessoriesSpy = jest.spyOn(api, 'registerPlatformAccessories');

    new DaikinCloudPlatform(MockLogger, config, api as unknown as API);
    api.signalFinished();

    setTimeout(() => {
        expect(registerPlatformAccessoriesSpy).toBeCalledWith('homebridge-daikin-cloud', 'DaikinCloud', expect.anything());
        done();
    }, 10);
});
