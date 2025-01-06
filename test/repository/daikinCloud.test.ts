import {DaikinCloudRepo} from '../../src/repository/daikinCloudRepo';
import {dx4Airco} from '../fixtures/dx4-airco';
import {dx23Airco} from '../fixtures/dx23-airco';
import {althermaHeatPump} from '../fixtures/altherma-heat-pump';

test.each<Array<string | any>>([
    ['dx4', dx4Airco],
    ['dx23', dx23Airco],
    ['altherma', althermaHeatPump],
])('Clean cloud device data for %s device', (name, deviceJson) => {
    expect(DaikinCloudRepo.maskSensitiveCloudDeviceData(deviceJson)).toMatchSnapshot();
});
