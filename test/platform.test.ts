import {DaikinCloudPlatform} from '../src/platform';
import {MockHomebridge, MockLogger, MockPlatformConfig} from './mocks';
import {API} from 'homebridge';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {DaikinCloudController} from 'daikin-controller-cloud';
import {OnectaClient} from 'daikin-controller-cloud/dist/onecta/oidc-client';
import Path from 'node:path';
import {daikinAirConditioningAccessory} from '../src/daikinAirConditioningAccessory'
import {daikinAlthermaAccessory} from "../src/daikinAlthermaAccessory";
import spyOn = jest.spyOn;
import {dx4Airco} from "./devices";

jest.mock('daikin-controller-cloud');
jest.mock('node:path');
jest.mock('homebridge');
jest.mock('../src/daikinAirConditioningAccessory');
jest.mock('../src/daikinAlthermaAccessory');
jest.mock('daikin-controller-cloud/dist/device');

afterEach(() => {
    jest.resetAllMocks();
});

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

test('DaikinCloudPlatform with new Aircondition accessory', (done) => {
    // @ts-ignore
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
                    'managementPointType': 'climateControl'
                }
            ]
        }
    }]);

    const config = new MockPlatformConfig(true);
    const api = new MockHomebridge();

    const registerPlatformAccessoriesSpy = jest.spyOn(api, 'registerPlatformAccessories');

    new DaikinCloudPlatform(MockLogger, config, api as unknown as API);
    api.signalFinished();

    setTimeout(() => {
        expect(daikinAirConditioningAccessory).toHaveBeenCalled();
        expect(daikinAlthermaAccessory).not.toHaveBeenCalled();
        expect(registerPlatformAccessoriesSpy).toBeCalledWith('homebridge-daikin-cloud', 'DaikinCloud', expect.anything());
        done();
    }, 10);
});

test('DaikinCloudPlatform with new Altherma accessory', (done) => {
    // @ts-ignore
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
                    'managementPointType': 'climateControl'
                }
            ]
        }
    }]);

    const config = new MockPlatformConfig(true);
    const api = new MockHomebridge();

    const registerPlatformAccessoriesSpy = jest.spyOn(api, 'registerPlatformAccessories');

    new DaikinCloudPlatform(MockLogger, config, api as unknown as API);
    api.signalFinished();

    setTimeout(() => {
        expect(daikinAlthermaAccessory).toHaveBeenCalled();
        expect(daikinAirConditioningAccessory).not.toHaveBeenCalled();
        expect(registerPlatformAccessoriesSpy).toHaveBeenCalledWith('homebridge-daikin-cloud', 'DaikinCloud', expect.anything());
        done();
    }, 10);
});
