import {DaikinCloudPlatform} from '../src/platform';
import {MockHomebridge, MockLogger, MockPlatformConfig} from './mocks';
import {Logger, API} from 'homebridge';
import {althermaHeatPump, dx23Airco, dx4Airco} from './devices';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {DaikinCloudController} from 'daikin-controller-cloud';
import {OnectaClient} from 'daikin-controller-cloud/dist/onecta/oidc-client';
import Path from 'node:path';
import spyOn = jest.spyOn;

jest.mock('daikin-controller-cloud');
jest.mock('node:path');
jest.mock('homebridge');

test('Initialize platform', async () => {
    const resolveSpy = spyOn(Path, 'resolve').mockImplementation((...args) => {
        return args.join('/')
    });

    const api = new MockHomebridge();
    const platform = new DaikinCloudPlatform(MockLogger, new MockPlatformConfig(), api as unknown as API);

    expect(resolveSpy).toHaveBeenCalledWith('storagePath', '.daikin-controller-cloud-tokenset')
    expect(DaikinCloudController).toHaveBeenCalledWith({
        'oidcAuthorizationTimeoutS': 300,
        'oidcCallbackServerBindAddr': 'SERVER_BIND_ADDRESS',
        'oidcCallbackServerExternalAddress': 'SERVER_EXTERNAL_ADDRESS',
        'oidcCallbackServerPort': 'SERVER_PORT',
        'oidcClientId': 'CLIENT_ID',
        'oidcClientSecret': 'CLIENT_SECRET',
        'oidcTokenSetFilePath': 'storagePath/.daikin-controller-cloud-tokenset',
    });
    expect(platform.updateIntervalDelay).toBe(900000);
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
