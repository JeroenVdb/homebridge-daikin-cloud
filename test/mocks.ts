// https://github.com/timcharper/homebridge-vivint/blob/5b3bfa4cc886c5680af3b2e31706ef9b1bf2705f/test/device_set_test.js
// https://github.com/break-pointer/homebridge-tion/blob/13f1c410c6ee8ca13b41b8700c4b1de96e04b263/test/mocks.ts#L49

import {PlatformConfig} from "homebridge";

export const MockLogger = (...args) => jest.fn();
MockLogger.debug = MockLogger;
MockLogger.info = MockLogger;
MockLogger.success = MockLogger;
MockLogger.warn = MockLogger;
MockLogger.error = MockLogger;
MockLogger.log = MockLogger;

export class MockPlatformConfig implements PlatformConfig {
    name = 'Home';
    platform = 'DaikinCloud';
    clientId = 'CLIENT_ID';
    clientSecret = 'CLIENT_SECRET';
    oidcCallbackServerBindAddr = 'SERVER_BIND_ADDRESS';
    callbackServerExternalAddress = 'SERVER_EXTERNAL_ADDRESS';
    callbackServerPort = 'SERVER_PORT';
    showExtraFeatures: boolean;

    constructor(showExtraFeatures = false) {
        this.showExtraFeatures = showExtraFeatures;
    }
}
