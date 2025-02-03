// import {HotWaterTankService} from '../src/hotWaterTankService';
// import {DaikinCloudDevice} from 'daikin-controller-cloud/dist/device';
// import {MockHomebridge, MockLogger, MockPlatformConfig} from './mocks';
// import {DaikinCloudAccessoryContext, DaikinCloudPlatform} from '../src/platform';
// import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
// import { Characteristic, Service, uuid } from 'hap-nodejs';
//
// describe('HotWaterTankService', () => {
//     let device: DaikinCloudDevice;
//     let homebridgeAccessory: HotWaterTankService;
//     let config: MockPlatformConfig ;
//
//     let platform: DaikinCloudPlatform = {
//         log: MockLogger,
//         config: new MockPlatformConfig(true),
//     } as unknown as DaikinCloudPlatform;
//     let accessory: PlatformAccessory<DaikinCloudAccessoryContext>;
//     let service: HotWaterTankService;
//
//     const EMBEDDED_ID = 'managementPointId';
//
//     beforeEach(() => {
//         accessory = new PlatformAccessory<DaikinCloudAccessoryContext>('ACCESSORY_NAME', uuid.generate('ACCESSORY_UUID'));
//         accessory.context['device'] = {} as unknown as DaikinCloudDevice;
//
//         accessory.context.device.getLastUpdated = jest.fn().mockReturnValue(new Date());
//         accessory.context.device.getData = jest.fn().mockImplementation((param1, param2, param3) => {
//             console.log('getData', param1, param2, param3);
//             if (param2 === 'operationMode') {
//                 return { value: 'on' };
//             }
//         });
//
//         config = new MockPlatformConfig(true);
//         service = new HotWaterTankService(platform, accessory, EMBEDDED_ID);
//     });
//
//     it('should get the current heating cooling state', async () => {
//         const stateOn = await service.handleHotWaterTankCurrentHeatingCoolingStateGet();
//         expect(stateOn).toBe(Characteristic.CurrentHeatingCoolingState.HEAT);
//         expect(accessory.context.device.getData).toHaveBeenCalledWith(EMBEDDED_ID, 'operationMode', undefined);
//
//         accessory.context.device.getData = jest.fn().mockReturnValueOnce({ value: 'off' });
//         const stateOff = await service.handleHotWaterTankTargetHeatingCoolingStateGet();
//         expect(stateOff).toBe(0);
//
//         expect(accessory.context.device.getData).toHaveBeenCalledTimes(2);
//         expect(accessory.context.device.getData).toHaveBeenCalledWith(EMBEDDED_ID, 'operationMode', undefined);
//     });
//
//
// });
