import {DaikinCloudPlatform} from '../src/platform';
import {MockPlatformConfig} from './mocks';
import {DaikinCloudController} from 'daikin-controller-cloud';
import {daikinAirConditioningAccessory} from '../src/daikinAirConditioningAccessory';
import {daikinAlthermaAccessory} from '../src/daikinAlthermaAccessory';
import {HomebridgeAPI} from 'homebridge/lib/api.js';
import {Logger} from 'homebridge/lib/logger.js';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';

jest.mock('daikin-controller-cloud');
jest.mock('homebridge');
jest.mock('../src/daikinAirConditioningAccessory');
jest.mock('../src/daikinAlthermaAccessory');
jest.mock('daikin-controller-cloud/dist/device');

afterEach(() => {
    jest.resetAllMocks();
});

test('Initialize platform', async () => {
    const api = new HomebridgeAPI();
    const platform = new DaikinCloudPlatform(new Logger(), new MockPlatformConfig(), api);

    expect(DaikinCloudController).toHaveBeenCalledWith({
        'oidcAuthorizationTimeoutS': 300,
        'oidcCallbackServerBindAddr': 'SERVER_BIND_ADDRESS',
        'oidcCallbackServerExternalAddress': 'SERVER_EXTERNAL_ADDRESS',
        'oidcCallbackServerPort': 'SERVER_PORT',
        'oidcClientId': 'CLIENT_ID',
        'oidcClientSecret': 'CLIENT_SECRET',
        'oidcTokenSetFilePath': `${api.user.storagePath()}/.daikin-controller-cloud-tokenset`,
    });
    expect(platform.updateIntervalDelay).toBe(900000);
});

test('DaikinCloudPlatform with new Aircondition accessory', (done) => {
    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockResolvedValue([{
        getId: () => 'MOCK_ID',
        getDescription: () => {
            return {
                deviceModel: 'Airco',
            };
        },
        getData: () => 'MOCK_DATE',
        desc: {
            managementPoints: [
                {
                    'embeddedId': 'climateControl',
                    'managementPointType': 'climateControl',
                },
            ],
        },
    } as unknown as DaikinCloudDevice]);

    const api = new HomebridgeAPI();

    const registerPlatformAccessoriesSpy = jest.spyOn(api, 'registerPlatformAccessories');

    new DaikinCloudPlatform(new Logger(), new MockPlatformConfig(true), api);
    api.signalFinished();

    setTimeout(() => {
        expect(daikinAirConditioningAccessory).toHaveBeenCalled();
        expect(daikinAlthermaAccessory).not.toHaveBeenCalled();
        expect(registerPlatformAccessoriesSpy).toBeCalledWith('homebridge-daikin-cloud', 'DaikinCloud', expect.anything());
        done();
    }, 10);
});

test('DaikinCloudPlatform with new Altherma accessory', (done) => {
    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockResolvedValue([{
        getId: () => 'MOCK_ID',
        getDescription: () => {
            return {
                deviceModel: 'Altherma',
            };
        },
        getData: () => 'MOCK_DATE',
        desc: {
            managementPoints: [
                {
                    'embeddedId': 'climateControl',
                    'managementPointType': 'climateControl',
                },
            ],
        },
    } as unknown as DaikinCloudDevice]);

    const api = new HomebridgeAPI();

    const registerPlatformAccessoriesSpy = jest.spyOn(api, 'registerPlatformAccessories');

    new DaikinCloudPlatform(new Logger(), new MockPlatformConfig(true), api);
    api.signalFinished();

    setTimeout(() => {
        expect(daikinAlthermaAccessory).toHaveBeenCalled();
        expect(daikinAirConditioningAccessory).not.toHaveBeenCalled();
        expect(registerPlatformAccessoriesSpy).toHaveBeenCalledWith('homebridge-daikin-cloud', 'DaikinCloud', expect.anything());
        done();
    }, 10);
});
