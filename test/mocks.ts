// https://github.com/timcharper/homebridge-vivint/blob/5b3bfa4cc886c5680af3b2e31706ef9b1bf2705f/test/device_set_test.js
// https://github.com/break-pointer/homebridge-tion/blob/13f1c410c6ee8ca13b41b8700c4b1de96e04b263/test/mocks.ts#L49

import {EventEmitter} from 'events';
import {createHash} from 'crypto';
import {API, PlatformConfig} from "homebridge";
import {User} from "homebridge/lib/user.js";
import {PlatformAccessory, UnknownContext} from "homebridge/lib/platformAccessory";
import {HAP, HAPLegacyTypes} from "homebridge/lib/api";

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

export class MockPlatformAccessory<T extends UnknownContext> extends EventEmitter implements DeepPartial<PlatformAccessory<T>> {
    services: MockServiceBase[];
    displayName: string;
    UUID: string;
    context = {};

    constructor(displayName: string, uuid: string) {
        super();
        this.displayName = displayName;
        this.UUID = uuid;
        this.services = [];
        this.services.push(new AccessoryInformation(displayName));
    }

    addService(service: typeof MockServiceBase, name: string): MockServiceBase {
        const ret = new service(name);
        this.services.push(ret);
        return ret;
    }

    getService(sClass: typeof MockServiceBase | string): MockServiceBase | undefined {
        if (typeof sClass === 'string') {
            return this.services.find(s => s.name === sClass);
        }
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return this.services.find(s => s instanceof sClass);
    }

    removeService(_sClass) {
        return;
    }
}

class MockServiceBase {
    name: string;
    characteristics: MockCharacteristicBase[];
    optionalCharacteristics: MockCharacteristicBase[];
    linkedServices: MockServiceBase[];

    constructor(name: string) {
        this.name = name;
        this.characteristics = [];
        this.optionalCharacteristics = [];
        this.linkedServices = [];
    }

    addCharacteristic(characteristic: typeof MockCharacteristicBase): MockServiceBase {
        this.characteristics.push(new characteristic(''));
        return this;
    }

    removeCharacteristic(_characteristic: typeof MockCharacteristicBase): MockServiceBase {
        return this;
    }

    addOptionalCharacteristic(characteristic: typeof MockCharacteristicBase): MockServiceBase {
        this.optionalCharacteristics.push(new characteristic(''));
        return this;
    }

    getCharacteristic(characteristic: typeof MockCharacteristicBase): MockCharacteristicBase {
        let ret = this.characteristics.find(ch => ch instanceof characteristic);
        if (!ret) {
            try {
                ret = new characteristic('');
                this.characteristics.push(ret);
            } catch (err) {
                throw new Error(`No characteristic ${characteristic}`);
            }
        }
        return ret;
    }

    setCharacteristic(chClass: typeof MockCharacteristicBase, value: string | number): MockServiceBase {
        const ret = this.getCharacteristic(chClass);
        ret.value = value;
        return this;
    }

    updateCharacteristic(chClass: typeof MockCharacteristicBase, value: string | number): MockServiceBase {
        const ret = this.getCharacteristic(chClass);
        ret.value = value;
        return this;
    }

    addLinkedService(linkedService: MockServiceBase): void {
        this.linkedServices.push(linkedService);
    }
}



class MockCharacteristicBase {
    value: string | number;
    // eslint-disable-next-line @typescript-eslint/ban-types
    events: {};
    // eslint-disable-next-line @typescript-eslint/ban-types
    props: {};

    constructor(value: string | number) {
        this.value = value;
        this.events = {};
        this.props = {};
    }

    on(direction: 'get' | 'set', fn: any) {
        this.events[direction] = fn;
        return this;
    }

    onSet(fn: any) {
        this.on('set', fn);
        return this;
    }

    removeOnSet() {
        delete this.events['set'];
        return this;
    }

    onGet(fn: any) {
        this.events['get'] = fn;
        return this;
    }

    setValue(value: string | number) {
        this.value = value;
    }

    setProps(props) {
        Object.assign(this.props, props);
        return this;
    }
}


type DeepPartial<T> = { [P in keyof T]?: DeepPartial<T[P]> };

export class MockHomebridge extends EventEmitter implements DeepPartial<API> {
    constructor() {
        super();
    }

    public hap= {
        Service: {
            AccessoryInformation,
            CarbonDioxideSensor,
            TemperatureSensor,
            HumiditySensor,
            AirPurifier,
            FilterMaintenance,
            HeaterCooler,
            Switch,
            Thermostat,
        },
        Characteristic: {
            Manufacturer,
            Model,
            SerialNumber,
            FirmwareRevision,
            HardwareRevision,
            CarbonDioxideLevel,
            CarbonDioxideDetected,
            CurrentTemperature,
            TargetTemperature,
            CurrentRelativeHumidity,
            CurrentHeatingCoolingState,
            Active,
            StatusActive,
            CurrentAirPurifierState,
            TargetAirPurifierState,
            RotationSpeed,
            FilterChangeIndication,
            FilterLifeLevel,
            CurrentHeaterCoolerState,
            TargetHeaterCoolerState,
            TargetHeatingCoolingState,
            HeatingThresholdTemperature,
            CoolingThresholdTemperature,
            On,
            Name,
            SwingMode,
            ConfiguredName,
        },
        uuid: {
            generate: (x: string) => {
                return x;
            },
        },
    };

    public user = {
        storagePath: () => { return 'storagePath' }
    };

    public signalFinished() {
        this.emit('didFinishLaunching');
    }

    public signalShutdown() {
        this.emit('shutdown');
    }

    public platformAccessory = MockPlatformAccessory;

    public registerPlatform = jest.fn(
        // eslint-disable-next-line @typescript-eslint/no-empty-function
        (identifier: string, name: string, platform: unknown, dynamic: boolean) => {}
    );

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public registerPlatformAccessories = jest.fn((identifier: string, name: string, accessories: any[]) => {});

    // eslint-disable-next-line @typescript-eslint/no-empty-function
    public unregisterPlatformAccessories = jest.fn((identifier: string, name: string, accessories: any[]) => {});
}

// SERVICES

class AccessoryInformation extends MockServiceBase {}

class CarbonDioxideSensor extends MockServiceBase {}

class TemperatureSensor extends MockServiceBase {}

class HumiditySensor extends MockServiceBase {}

class AirPurifier extends MockServiceBase {}

class FilterMaintenance extends MockServiceBase {}

class HeaterCooler extends MockServiceBase {}

class Thermostat extends MockServiceBase {}

export class Switch extends MockServiceBase {}

// CHARACTERISTICS

class Manufacturer extends MockCharacteristicBase {}

class Model extends MockCharacteristicBase {}

class SerialNumber extends MockCharacteristicBase {}

class FirmwareRevision extends MockCharacteristicBase {}

class HardwareRevision extends MockCharacteristicBase {}

class CarbonDioxideLevel extends MockCharacteristicBase {}

class CarbonDioxideDetected extends MockCharacteristicBase {}

class CurrentTemperature extends MockCharacteristicBase {}

class TargetTemperature extends MockCharacteristicBase {}

class CurrentRelativeHumidity extends MockCharacteristicBase {}

class Active extends MockCharacteristicBase {}

class StatusActive extends MockCharacteristicBase {}

class CurrentAirPurifierState extends MockCharacteristicBase {}

class TargetAirPurifierState extends MockCharacteristicBase {}

class RotationSpeed extends MockCharacteristicBase {}

class FilterChangeIndication extends MockCharacteristicBase {}

class FilterLifeLevel extends MockCharacteristicBase {}

class CurrentHeaterCoolerState extends MockCharacteristicBase {}

class CurrentHeatingCoolingState extends MockCharacteristicBase {
    public static OFF = 0 as const;
    public static HEAT = 1 as const;
    public static COOL = 2 as const;
}

class TargetHeaterCoolerState extends MockCharacteristicBase {
    public static AUTO = 0 as const;
    public static HEAT = 1 as const;
    public static COOL = 2 as const;
}

class TargetHeatingCoolingState extends MockCharacteristicBase {
    public static OFF = 0 as const;
    public static HEAT = 1 as const;
    public static COOL = 2 as const;
    public static AUTO = 3 as const;
}

class HeatingThresholdTemperature extends MockCharacteristicBase {}

class CoolingThresholdTemperature extends MockCharacteristicBase {}

class SwingMode extends MockCharacteristicBase {
    public static SWING_DISABLED = 0 as const;
    public static SWING_ENABLED = 1 as const;
}

class ConfiguredName extends MockCharacteristicBase {}

class On extends MockCharacteristicBase {}

class Name extends MockCharacteristicBase {}
