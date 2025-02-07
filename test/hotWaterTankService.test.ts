import {HotWaterTankService} from '../src/hotWaterTankService';
import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
import {MockPlatformConfig} from './mocks';
import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from '../src/platform';
import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import {Characteristic, uuid} from 'hap-nodejs';
import {OnectaClient} from 'daikin-controller-cloud/dist/onecta/oidc-client';
import {althermaHeatPump} from './fixtures/altherma-heat-pump';

import {HomebridgeAPI} from 'homebridge/lib/api.js';
import {Logger} from 'homebridge/lib/logger.js';

describe('HotWaterTankService', () => {
    let accessory: PlatformAccessory<DaikinCloudAccessoryContext>;
    let service: HotWaterTankService;

    const EMBEDDED_ID = 'domesticHotWaterTank';

    beforeEach(() => {
        accessory = new PlatformAccessory<DaikinCloudAccessoryContext>('ACCESSORY_NAME', uuid.generate('ACCESSORY_UUID'));
        accessory.context['device'] = new DaikinCloudDevice(althermaHeatPump, undefined as unknown as OnectaClient);
        accessory.context.device.getLastUpdated = jest.fn().mockReturnValue(new Date(1987, 0, 19, 0, 0, 0, 0));

        const platform = new DaikinCloudPlatform(new Logger(), new MockPlatformConfig(true), new HomebridgeAPI());

        service = new HotWaterTankService(platform, accessory, EMBEDDED_ID);
    });

    it('should get the current heating cooling state', async () => {
        expect(await service.handleHotWaterTankCurrentHeatingCoolingStateGet()).toBe(Characteristic.CurrentHeatingCoolingState.HEAT);

        accessory.context.device.managementPoints[EMBEDDED_ID]['onOffMode'] = { value: 'off' };

        expect(await service.handleHotWaterTankTargetHeatingCoolingStateGet()).toBe(Characteristic.CurrentHeatingCoolingState.OFF);
    });

    it('should get the current temperature', async () => {
        expect(await service.handleHotWaterTankCurrentTemperatureGet()).toBe(48);
    });

    it('should get the target heating cooling temperature', async () => {
        expect(await service.handleHotWaterTankHeatingTargetTemperatureGet()).toBe(48);
    });

    it('should get the target heating cooling state', async () => {
        expect(await service.handleHotWaterTankTargetHeatingCoolingStateGet()).toBe(Characteristic.TargetHeatingCoolingState.HEAT);

        accessory.context.device.managementPoints[EMBEDDED_ID]['operationMode'] = {
            'settable': true,
            'values': [
                'auto',
                'dry',
                'cooling',
                'heating',
                'fanOnly',
            ],
            'value': 'cooling',
        };
        expect(await service.handleHotWaterTankTargetHeatingCoolingStateGet()).toBe(Characteristic.TargetHeatingCoolingState.COOL);

        accessory.context.device.managementPoints[EMBEDDED_ID]['operationMode'] = {
            'settable': true,
            'values': [
                'auto',
                'dry',
                'cooling',
                'heating',
                'fanOnly',
            ],
            'value': 'auto',
        };
        expect(await service.handleHotWaterTankTargetHeatingCoolingStateGet()).toBe(Characteristic.TargetHeatingCoolingState.AUTO);

        accessory.context.device.managementPoints[EMBEDDED_ID]['operationMode'] = {
            'settable': true,
            'values': [
                'auto',
                'dry',
                'cooling',
                'heating',
                'fanOnly',
            ],
            'value': 'fanOnly',
        };
        expect(await service.handleHotWaterTankTargetHeatingCoolingStateGet()).toBe(Characteristic.TargetHeatingCoolingState.AUTO);

        accessory.context.device.managementPoints[EMBEDDED_ID]['operationMode'] = {
            'settable': true,
            'values': [
                'auto',
                'dry',
                'cooling',
                'heating',
                'fanOnly',
            ],
            'value': 'dry',
        };
        expect(await service.handleHotWaterTankTargetHeatingCoolingStateGet()).toBe(Characteristic.TargetHeatingCoolingState.AUTO);

        accessory.context.device.managementPoints[EMBEDDED_ID]['onOffMode'] = { value: 'off' };
        expect(await service.handleHotWaterTankTargetHeatingCoolingStateGet()).toBe(Characteristic.TargetHeatingCoolingState.OFF);
    });

    it('should get the powerful mode', async () => {
        expect(await service.handlePowerfulModeGet()).toBe(false);
    });
});
