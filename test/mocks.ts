// https://github.com/timcharper/homebridge-vivint/blob/5b3bfa4cc886c5680af3b2e31706ef9b1bf2705f/test/device_set_test.js
// https://github.com/break-pointer/homebridge-tion/blob/13f1c410c6ee8ca13b41b8700c4b1de96e04b263/test/mocks.ts#L49

import {EventEmitter} from 'events';
import {createHash} from 'crypto';

export const MockLog = (...args) => jest.fn();
MockLog.debug = MockLog;
MockLog.info = MockLog;
MockLog.warn = MockLog;
MockLog.error = MockLog;
MockLog.log = MockLog;

export class MockPlatformConfig {
    name: string;
    platform: string;
    username: string;
    password: string;
    showExtraFeatures: boolean;

    constructor(showExtraFeatures = false) {
        this.name = 'Home';
        this.platform = 'Home';
        this.username = 'test';
        this.password = 'test';
        this.showExtraFeatures = showExtraFeatures;
    }
}

export class MockPlatformAccessory {
    private services: MockServiceBase[];
    private displayName: string;
    private UUID: string;
    public context = {};

    constructor(displayName: string, uuid: string) {
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

    getService(sClass: typeof MockServiceBase): MockServiceBase | undefined {
        return this.services.find(s => s instanceof sClass);
    }

    // eslint-disable-next-line @typescript-eslint/ban-types,@typescript-eslint/no-empty-function
    on = jest.fn((event: string, callback: () => {}) => {});
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
                console.log(characteristic);
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



export class MockHomebridge {
    private eventEmitter = new EventEmitter();

    public hap = {
        Service: {
            AccessoryInformation,
            CarbonDioxideSensor,
            TemperatureSensor,
            HumiditySensor,
            AirPurifier,
            FilterMaintenance,
            HeaterCooler,
            Switch,
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
            CurrentRelativeHumidity,
            Active,
            StatusActive,
            CurrentAirPurifierState,
            TargetAirPurifierState,
            RotationSpeed,
            FilterChangeIndication,
            FilterLifeLevel,
            CurrentHeaterCoolerState,
            TargetHeaterCoolerState,
            HeatingThresholdTemperature,
            CoolingThresholdTemperature,
            On,
            Name,
            SwingMode,
            ConfiguredName,
        },
        uuid: {
            generate: (x: string) =>
                createHash('md5')
                    .update(x)
                    .digest('hex'),
        },
    };

    public user = {
        storagePath: () => { return 'storagePath' }
    };

    public on(eventName: 'didFinishLaunching' | 'shutdown', callback: () => void) {
        this.eventEmitter.on(eventName, callback);
    }

    public send(event: 'didFinishLaunching' | 'shutdown') {
        this.eventEmitter.emit(event);
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

class Switch extends MockServiceBase {}

// CHARACTERISTICS

class Manufacturer extends MockCharacteristicBase {}

class Model extends MockCharacteristicBase {}

class SerialNumber extends MockCharacteristicBase {}

class FirmwareRevision extends MockCharacteristicBase {}

class HardwareRevision extends MockCharacteristicBase {}

class CarbonDioxideLevel extends MockCharacteristicBase {}

class CarbonDioxideDetected extends MockCharacteristicBase {}

class CurrentTemperature extends MockCharacteristicBase {}

class CurrentRelativeHumidity extends MockCharacteristicBase {}

class Active extends MockCharacteristicBase {}

class StatusActive extends MockCharacteristicBase {}

class CurrentAirPurifierState extends MockCharacteristicBase {}

class TargetAirPurifierState extends MockCharacteristicBase {}

class RotationSpeed extends MockCharacteristicBase {}

class FilterChangeIndication extends MockCharacteristicBase {}

class FilterLifeLevel extends MockCharacteristicBase {}

class CurrentHeaterCoolerState extends MockCharacteristicBase {}

class TargetHeaterCoolerState extends MockCharacteristicBase {}

class HeatingThresholdTemperature extends MockCharacteristicBase {}

class CoolingThresholdTemperature extends MockCharacteristicBase {}

class SwingMode extends MockCharacteristicBase {}

class ConfiguredName extends MockCharacteristicBase {}

class On extends MockCharacteristicBase {}

class Name extends MockCharacteristicBase {}
