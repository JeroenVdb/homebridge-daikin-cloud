import {PlatformAccessory} from 'homebridge/lib/platformAccessory';
import DaikinCloudDevice from 'daikin-controller-cloud/lib/device.js';
import DaikinCloudController from 'daikin-controller-cloud/index.js';
import {althermaHeatPump, dx4Airco} from './devices';

it('Get deviceModel from device %s', async () => {
    const accessory = new PlatformAccessory('NAME', 'efd08509-2edb-41d0-a9ab-ce913323d811');
    accessory.context.device = new DaikinCloudDevice(dx4Airco, new DaikinCloudController());
    expect(accessory.context.device.getDescription().deviceModel).toEqual('dx4');
});

it('Get name from device %s', async () => {
    const accessory = new PlatformAccessory('NAME', 'efd08509-2edb-41d0-a9ab-ce913323d811');
    accessory.context.device = new DaikinCloudDevice(dx4Airco, new DaikinCloudController());
    expect(accessory.context.device.getData('climateControl', 'name').value).toEqual('Zolder');
});

it('Get name from device %s', async () => {
    const accessory = new PlatformAccessory('NAME', 'efd08509-2edb-41d0-a9ab-ce913323d811');
    accessory.context.device = new DaikinCloudDevice(althermaHeatPump, new DaikinCloudController());
    expect(accessory.context.device.getData('climateControlMainZone', 'name').value).toEqual('Altherma');
});
