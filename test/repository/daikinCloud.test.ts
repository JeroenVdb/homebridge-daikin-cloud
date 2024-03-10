import {althermaHeatPump, dx23Airco, dx4Airco} from './../devices';
import {DaikinCloudRepo} from '../../src/repository/daikinCloudRepo';

test.each<Array<string | any>>([
    ['dx4', dx4Airco],
    ['dx23', dx23Airco],
    ['altherma', althermaHeatPump],
])('Clean cloud device data for %s device', (name, deviceJson) => {
    expect(DaikinCloudRepo.maskSensitiveCloudDeviceData([deviceJson])).toMatchSnapshot();
});
