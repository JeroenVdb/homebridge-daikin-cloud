import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from '../src/platform';
import {MockPlatformConfig} from './mocks';
import {daikinAlthermaAccessory} from '../src/daikinAlthermaAccessory';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {OnectaClient} from 'daikin-controller-cloud/dist/onecta/oidc-client';
import {DaikinCloudController} from 'daikin-controller-cloud/dist/index.js';
import {althermaV1ckoeln} from './fixtures/altherma-v1ckoeln';
import {althermaCrSense2} from './fixtures/altherma-crSense-2';
import {althermaWithEmbeddedIdZero} from './fixtures/altherma-with-embedded-id-zero';
import {althermaHeatPump} from './fixtures/altherma-heat-pump';
import {althermaHeatPump2} from './fixtures/altherma-heat-pump-2';
import {althermaFraction} from './fixtures/altherma-fraction';
import {althermaMiladcerkic} from './fixtures/altherma-miladcerkic';

import {HomebridgeAPI} from 'homebridge/lib/api.js';
import { Logger } from 'homebridge/lib/logger.js';

type DeviceState = {
    activeState: boolean;
    currentTemperature: number;
    targetHeaterCoolerState: string;
    coolingThresholdTemperature: number;
    heatingThresholdTemperature: number;
    hotWaterTankCurrentHeatingCoolingState: number;
    hotWaterTankCurrentTemperature: number;
    hotWaterTankHeatingTargetTemperature: number;
    hotWaterTankTargetHeaterCoolerState: number;
    powerfulMode: number;
};

test.each<Array<string | string | any | DeviceState>>([
    [
        'altherma',
        'climateControlMainZone',
        althermaHeatPump,
        {
            activeState: true,
            currentTemperature: 22.4,
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: undefined,
            heatingThresholdTemperature: 22,
            hotWaterTankCurrentHeatingCoolingState: 1,
            hotWaterTankCurrentTemperature: 48,
            hotWaterTankHeatingTargetTemperature: 48,
            hotWaterTankTargetHeaterCoolerState: 1,
            powerfulMode: false,

        },
    ],
    [
        'altherma',
        'climateControlMainZone',
        althermaHeatPump2,
        {
            activeState: false,
            currentTemperature: 33,
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: 0,
            heatingThresholdTemperature: 0,
            hotWaterTankCurrentHeatingCoolingState: 1,
            hotWaterTankCurrentTemperature: 50,
            hotWaterTankHeatingTargetTemperature: 50,
            hotWaterTankTargetHeaterCoolerState: 1,
            powerfulMode: false,

        },
    ],
    [
        'altherma2',
        '1',
        althermaWithEmbeddedIdZero,
        {
            activeState: false,
            currentTemperature: 27.7,
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: 20,
            heatingThresholdTemperature: 21,
            hotWaterTankCurrentHeatingCoolingState: 1,
            hotWaterTankCurrentTemperature: 42,
            hotWaterTankHeatingTargetTemperature: 45,
            hotWaterTankTargetHeaterCoolerState: 1,
            powerfulMode: false,

        },
    ],
    [
        'altherma3',
        '1',
        althermaCrSense2,
        {
            activeState: false,
            currentTemperature: 27.8,
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: 20,
            heatingThresholdTemperature: 21,
            hotWaterTankCurrentHeatingCoolingState: 1,
            hotWaterTankCurrentTemperature: 45,
            hotWaterTankHeatingTargetTemperature: 45,
            hotWaterTankTargetHeaterCoolerState: 1,
            powerfulMode: false,

        },
    ],
    [
        'altherma4',
        'climateControlMainZone',
        althermaV1ckoeln,
        {
            activeState: false,
            currentTemperature: 34, // or should we always show the roomTemperature here which is 27.5
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: 20,
            heatingThresholdTemperature: 0,
            hotWaterTankCurrentHeatingCoolingState: 1,
            hotWaterTankCurrentTemperature: 42,
            hotWaterTankHeatingTargetTemperature: 46,
            hotWaterTankTargetHeaterCoolerState: 1,
            powerfulMode: false,

        },
    ],
    [
        'althermaFraction',
        'climateControlMainZone',
        althermaFraction,
        {
            activeState: true,
            currentTemperature: 35, // has no roomTemperature :(
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: 0,
            heatingThresholdTemperature: 0,
            hotWaterTankCurrentHeatingCoolingState: 1,
            hotWaterTankCurrentTemperature: 45,
            hotWaterTankHeatingTargetTemperature: 47,
            hotWaterTankTargetHeaterCoolerState: 1,
            powerfulMode: false,

        },
    ],
    [
        'althermaMiladcerkic',
        'climateControlMainZone',
        althermaMiladcerkic,
        {
            activeState: true,
            currentTemperature: 45,
            targetHeaterCoolerState: 1,
            coolingThresholdTemperature: 20,
            heatingThresholdTemperature: 45,
            hotWaterTankCurrentHeatingCoolingState: 1,
            hotWaterTankCurrentTemperature: 49,
            hotWaterTankHeatingTargetTemperature: 50,
            hotWaterTankTargetHeaterCoolerState: 1,
            powerfulMode: false,
        },
    ],
])('Create DaikinCloudThermostatAccessory with %s device', async (name, climateControlEmbeddedId, deviceJson, state) => {
    const device = new DaikinCloudDevice(deviceJson, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const config = new MockPlatformConfig(true);
    const api = new HomebridgeAPI();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory("NAME_FOR_TEST", uuid);
    accessory.context['device'] = device;

    expect(() => {
        new daikinAlthermaAccessory(new DaikinCloudPlatform(new Logger(), config, api), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);
    }).not.toThrow();

    const homebridgeAccessory = new daikinAlthermaAccessory(new DaikinCloudPlatform(new Logger(), config, api), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);


    if (typeof state.activeState !== 'undefined') {
        expect(await homebridgeAccessory.service?.handleActiveStateGet()).toBe(state.activeState);
        expect(async () => {
            await homebridgeAccessory.service?.handleActiveStateSet(1);
        }).not.toThrow();
        expect(async () => {
            await homebridgeAccessory.service?.handleActiveStateSet(0);
        }).not.toThrow();
    }

    expect(await homebridgeAccessory.service?.handleCurrentTemperatureGet()).toBe(state.currentTemperature);

    if (typeof state.coolingThresholdTemperature !== 'undefined') {
        expect(await homebridgeAccessory.service?.handleCoolingThresholdTemperatureGet()).toBe(state.coolingThresholdTemperature);
        expect(async () => {
            await homebridgeAccessory.service?.handleCoolingThresholdTemperatureSet(21);
        }).not.toThrow();
    }

    if (typeof state.heatingThresholdTemperature !== 'undefined') {
        expect(await homebridgeAccessory.service?.handleHeatingThresholdTemperatureGet()).toBe(state.heatingThresholdTemperature);
        expect(async () => {
            await homebridgeAccessory.service?.handleHeatingThresholdTemperatureSet(25);
        }).not.toThrow();
    }

    if (typeof state.targetHeaterCoolerState !== 'undefined') {
        expect(await homebridgeAccessory.service?.handleTargetHeaterCoolerStateGet()).toBe(state.targetHeaterCoolerState);
        expect(async () => {
            await homebridgeAccessory.service?.handleTargetHeaterCoolerStateSet(1);
        }).not.toThrow();
    }


    if (typeof state.hotWaterTankCurrentHeatingCoolingState !== 'undefined') {
        expect(await homebridgeAccessory.hotWaterTankService?.handleHotWaterTankCurrentHeatingCoolingStateGet()).toBe(state.hotWaterTankCurrentHeatingCoolingState);
    }
    if (typeof state.hotWaterTankCurrentTemperature !== 'undefined') {
        expect(await homebridgeAccessory.hotWaterTankService?.handleHotWaterTankCurrentTemperatureGet()).toBe(state.hotWaterTankCurrentTemperature);
    }
    if (typeof state.hotWaterTankHeatingTargetTemperature !== 'undefined') {
        expect(await homebridgeAccessory.hotWaterTankService?.handleHotWaterTankHeatingTargetTemperatureGet()).toBe(state.hotWaterTankHeatingTargetTemperature);
    }
    if (typeof state.hotWaterTankTargetHeaterCoolerState !== 'undefined') {
        expect(await homebridgeAccessory.hotWaterTankService?.handleHotWaterTankTargetHeatingCoolingStateGet()).toBe(state.hotWaterTankTargetHeaterCoolerState);
    }
    if (typeof state.powerfulMode !== 'undefined') {
        expect(await homebridgeAccessory.hotWaterTankService?.handlePowerfulModeGet()).toBe(state.powerfulMode);
    }

});

test('DaikinCloudAirConditioningAccessory Getters', async () => {
    const device = new DaikinCloudDevice(althermaHeatPump, undefined as unknown as OnectaClient);

    jest.spyOn(DaikinCloudController.prototype, 'getCloudDevices').mockImplementation(async () => {
        return [device];
    });

    const config = new MockPlatformConfig(false);
    const api = new HomebridgeAPI();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData('climateControlMainZone', 'name', undefined).value, uuid);
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAlthermaAccessory(new DaikinCloudPlatform(new Logger(), config, api), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

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
    const api = new HomebridgeAPI();

    const uuid = api.hap.uuid.generate(device.getId());
    const accessory = new api.platformAccessory(device.getData('climateControlMainZone', 'name', undefined).value, uuid);
    accessory.context['device'] = device;

    const homebridgeAccessory = new daikinAlthermaAccessory(new DaikinCloudPlatform(new Logger(), config, api), accessory as unknown as PlatformAccessory<DaikinCloudAccessoryContext>);

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
