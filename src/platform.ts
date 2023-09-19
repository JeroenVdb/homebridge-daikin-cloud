import {API, DynamicPlatformPlugin, Logger, PlatformAccessory, PlatformConfig, Service, Characteristic} from 'homebridge';

import {PLATFORM_NAME, PLUGIN_NAME} from './settings';
import {DaikinClimateControlEmbeddedId, daikinAirConditioningAccessory} from './daikinAirConditioningAccessory';

import DaikinCloudController from 'daikin-controller-cloud';
import path from 'path';
import fs from 'fs';

import type * as Device from './../node_modules/daikin-controller-cloud/lib/device.js';
import type * as DaikinCloud from './../node_modules/daikin-controller-cloud/index.js';
import {daikinAlthermaAccessory} from './daikinAlthermaAccessory';

export class DaikinCloudPlatform implements DynamicPlatformPlugin {
    public readonly Service: typeof Service = this.api.hap.Service;
    public readonly Characteristic: typeof Characteristic = this.api.hap.Characteristic;

    public readonly accessories: PlatformAccessory[] = [];

    public readonly storagePath: string = '';

    constructor(
        public readonly log: Logger,
        public readonly config: PlatformConfig,
        public readonly api: API,
    ) {
        this.log.debug('Finished initializing platform:', this.config.name);

        this.storagePath = api.user.storagePath();

        this.api.on('didFinishLaunching', async () => {
            log.debug('Executed didFinishLaunching callback');
            await this.discoverDevices(this.config.username, this.config.password);
        });
    }

    configureAccessory(accessory: PlatformAccessory) {
        this.log.info('Loading accessory from cache:', accessory.displayName);
        this.accessories.push(accessory);
    }

    async discoverDevices(username: string, password: string) {
        let devices: Device[] = [];

        this.log.info('--- Daikin info for debugging reasons (enable Debug Mode for more logs) ---');

        try {
            devices = await this.getCloudDevices(username, password);
        } catch (error) {
            if (error instanceof Error) {
                error.message = `Failed to get cloud devices from Daikin Cloud: ${error.message}`;
                this.log.error(error.message);
            }
        }

        // TODO remove, for testing only!!
        // const alt = new DaikinCloudDevice({
        //     "_id": "10b029e7-484c-4519-b22e-c14be4b7a71c",
        //     "deviceModel": "Altherma",
        //     "type": "heating-wlan",
        //     "isCloudConnectionUp": {
        //         "settable": false,
        //         "value": true
        //     },
        //     "managementPoints": [
        //         {
        //             "embeddedId": "gateway",
        //             "managementPointType": "gateway",
        //             "managementPointCategory": "secondary",
        //             "firmwareVersion": {
        //                 "settable": false,
        //                 "value": "3.2.4",
        //                 "maxLength": 8
        //             },
        //             "ipAddress": {
        //                 "settable": false,
        //                 "value": "192.168.1.10",
        //                 "maxLength": 15
        //             },
        //             "iconId": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": 3
        //             },
        //             "isFirmwareUpdateSupported": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": true
        //             },
        //             "macAddress": {
        //                 "settable": false,
        //                 "value": "48:e7:da:01:c6:08",
        //                 "maxLength": 17
        //             },
        //             "modelInfo": {
        //                 "settable": false,
        //                 "value": "BRP069A78",
        //                 "maxLength": 9
        //             },
        //             "name": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "Gateway",
        //                 "maxLength": 63
        //             },
        //             "ssid": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "daikin-ap",
        //                 "maxLength": 9
        //             },
        //             "serialNumber": {
        //                 "settable": false,
        //                 "value": "0060691",
        //                 "maxLength": 16
        //             },
        //             "wifiConnectionSSID": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "Proximus-Home-B7B0",
        //                 "maxLength": 32
        //             },
        //             "wifiConnectionStrength": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": -29,
        //                 "maxValue": 0,
        //                 "minValue": -90,
        //                 "stepValue": 1
        //             }
        //         },
        //         {
        //             "embeddedId": "climateControlMainZone",
        //             "managementPointType": "climateControl",
        //             "managementPointCategory": "primary",
        //             "managementPointSubType": "mainZone",
        //             "consumptionData": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "ref": "#consumptionData",
        //                 "value": {
        //                     "electrical": {
        //                         "heating": {
        //                             "d": [
        //                                 2,
        //                                 0,
        //                                 0,
        //                                 1,
        //                                 4,
        //                                 2,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 4,
        //                                 2,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 4,
        //                                 2,
        //                                 1,
        //                                 0,
        //                                 0,
        //                                 1,
        //                                 null,
        //                                 null,
        //                                 null
        //                             ],
        //                             "w": [
        //                                 14,
        //                                 11,
        //                                 19,
        //                                 13,
        //                                 25,
        //                                 15,
        //                                 12,
        //                                 15,
        //                                 8,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null
        //                             ],
        //                             "m": [
        //                                 null,
        //                                 null,
        //                                 228,
        //                                 273,
        //                                 28,
        //                                 21,
        //                                 0,
        //                                 0,
        //                                 48,
        //                                 96,
        //                                 220,
        //                                 565,
        //                                 437,
        //                                 320,
        //                                 107,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null
        //                             ]
        //                         }
        //                     }
        //                 }
        //             },
        //             "controlMode": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "roomTemperature",
        //                 "values": [
        //                     "leavingWaterTemperature",
        //                     "externalRoomTemperature",
        //                     "roomTemperature"
        //                 ]
        //             },
        //             "errorCode": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "",
        //                 "maxLength": 16
        //             },
        //             "holidayMode": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "ref": "#holidayMode",
        //                 "value": {
        //                     "enabled": false,
        //                     "startDate": "2017-01-01",
        //                     "endDate": "2017-01-01"
        //                 }
        //             },
        //             "iconId": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": 8
        //             },
        //             "isHolidayModeActive": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isInEmergencyState": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isInErrorState": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isInInstallerState": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isInWarningState": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "name": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "Altherma",
        //                 "maxLength": 63
        //             },
        //             "onOffMode": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "on",
        //                 "values": [
        //                     "off",
        //                     "on"
        //                 ]
        //             },
        //             "operationMode": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "heating",
        //                 "values": [
        //                     "heating"
        //                 ]
        //             },
        //             "schedule": {
        //                 "settable": true,
        //                 "ref": "#schedule",
        //                 "value": {
        //                     "currentMode": {
        //                         "settable": false,
        //                         "value": "heating",
        //                         "values": [
        //                             "heating"
        //                         ]
        //                     },
        //                     "modes": {
        //                         "heating": {
        //                             "enabled": {
        //                                 "settable": true,
        //                                 "requiresReboot": false,
        //                                 "value": true
        //                             },
        //                             "currentSchedule": {
        //                                 "settable": true,
        //                                 "requiresReboot": false,
        //                                 "value": "scheduleHeatingRT1",
        //                                 "values": [
        //                                     "scheduleHeatingRT1",
        //                                     "scheduleHeatingRT2",
        //                                     "scheduleHeatingRT3"
        //                                 ]
        //                             },
        //                             "meta": {
        //                                 "minIntervalBetweenActions": "00:10:00",
        //                                 "maxSchedules": 3,
        //                                 "maxActionsPerActionPeriod": 6,
        //                                 "consecutiveActionsAllowed": true,
        //                                 "actionTypes": {
        //                                     "roomTemperature": {
        //                                         "settable": false,
        //                                         "maxValue": 30,
        //                                         "minValue": 12,
        //                                         "stepValue": 1
        //                                     }
        //                                 }
        //                             },
        //                             "schedules": {
        //                                 "scheduleHeatingRT1": {
        //                                     "settable": true,
        //                                     "name": {
        //                                         "settable": true,
        //                                         "requiresReboot": false,
        //                                         "value": "User defined 1"
        //                                     },
        //                                     "meta": {
        //                                         "isReadOnly": false,
        //                                         "actionPeriods": [
        //                                             "monday",
        //                                             "tuesday",
        //                                             "wednesday",
        //                                             "thursday",
        //                                             "friday",
        //                                             "saturday",
        //                                             "sunday"
        //                                         ]
        //                                     },
        //                                     "actions": {}
        //                                 },
        //                                 "scheduleHeatingRT2": {
        //                                     "settable": true,
        //                                     "name": {
        //                                         "settable": true,
        //                                         "requiresReboot": false,
        //                                         "value": "User defined 2"
        //                                     },
        //                                     "meta": {
        //                                         "isReadOnly": false,
        //                                         "actionPeriods": [
        //                                             "monday",
        //                                             "tuesday",
        //                                             "wednesday",
        //                                             "thursday",
        //                                             "friday",
        //                                             "saturday",
        //                                             "sunday"
        //                                         ]
        //                                     },
        //                                     "actions": {}
        //                                 },
        //                                 "scheduleHeatingRT3": {
        //                                     "settable": true,
        //                                     "name": {
        //                                         "settable": true,
        //                                         "requiresReboot": false,
        //                                         "value": "User defined 3"
        //                                     },
        //                                     "meta": {
        //                                         "isReadOnly": false,
        //                                         "actionPeriods": [
        //                                             "monday",
        //                                             "tuesday",
        //                                             "wednesday",
        //                                             "thursday",
        //                                             "friday",
        //                                             "saturday",
        //                                             "sunday"
        //                                         ]
        //                                     },
        //                                     "actions": {}
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             },
        //             "sensoryData": {
        //                 "settable": false,
        //                 "ref": "#sensoryData",
        //                 "value": {
        //                     "roomTemperature": {
        //                         "settable": false,
        //                         "requiresReboot": false,
        //                         "value": 22.4,
        //                         "maxValue": 127,
        //                         "minValue": -127,
        //                         "stepValue": 0.1
        //                     },
        //                     "outdoorTemperature": {
        //                         "settable": false,
        //                         "requiresReboot": false,
        //                         "value": 4,
        //                         "maxValue": 127,
        //                         "minValue": -127,
        //                         "stepValue": 1
        //                     },
        //                     "leavingWaterTemperature": {
        //                         "settable": false,
        //                         "requiresReboot": false,
        //                         "value": 35,
        //                         "maxValue": 127,
        //                         "minValue": -127,
        //                         "stepValue": 1
        //                     }
        //                 }
        //             },
        //             "setpointMode": {
        //                 "settable": false,
        //                 "requiresReboot": true,
        //                 "value": "weatherDependent",
        //                 "values": [
        //                     "fixed",
        //                     "weatherDependent"
        //                 ]
        //             },
        //             "temperatureControl": {
        //                 "settable": true,
        //                 "ref": "#temperatureControl",
        //                 "value": {
        //                     "operationModes": {
        //                         "auto": {
        //                             "setpoints": {
        //                                 "roomTemperature": {
        //                                     "settable": true,
        //                                     "requiresReboot": false,
        //                                     "value": 22,
        //                                     "maxValue": 30,
        //                                     "minValue": 12,
        //                                     "stepValue": 0.5
        //                                 },
        //                                 "leavingWaterOffset": {
        //                                     "settable": true,
        //                                     "requiresReboot": false,
        //                                     "value": 0,
        //                                     "maxValue": 10,
        //                                     "minValue": -10,
        //                                     "stepValue": 1
        //                                 }
        //                             }
        //                         },
        //                         "heating": {
        //                             "setpoints": {
        //                                 "roomTemperature": {
        //                                     "settable": true,
        //                                     "requiresReboot": false,
        //                                     "value": 22,
        //                                     "maxValue": 30,
        //                                     "minValue": 12,
        //                                     "stepValue": 0.5
        //                                 },
        //                                 "leavingWaterOffset": {
        //                                     "settable": true,
        //                                     "requiresReboot": false,
        //                                     "value": 0,
        //                                     "maxValue": 10,
        //                                     "minValue": -10,
        //                                     "stepValue": 1
        //                                 }
        //                             }
        //                         },
        //                         "cooling": {
        //                             "setpoints": {}
        //                         }
        //                     }
        //                 }
        //             }
        //         },
        //         {
        //             "embeddedId": "domesticHotWaterTank",
        //             "managementPointType": "domesticHotWaterTank",
        //             "managementPointCategory": "primary",
        //             "consumptionData": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "ref": "#consumptionData",
        //                 "value": {
        //                     "electrical": {
        //                         "heating": {
        //                             "d": [
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 1,
        //                                 1,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 0,
        //                                 1,
        //                                 null,
        //                                 null,
        //                                 null
        //                             ],
        //                             "w": [
        //                                 2,
        //                                 2,
        //                                 2,
        //                                 1,
        //                                 0,
        //                                 1,
        //                                 2,
        //                                 2,
        //                                 1,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null
        //                             ],
        //                             "m": [
        //                                 null,
        //                                 null,
        //                                 15,
        //                                 23,
        //                                 22,
        //                                 23,
        //                                 22,
        //                                 17,
        //                                 20,
        //                                 23,
        //                                 25,
        //                                 36,
        //                                 38,
        //                                 36,
        //                                 9,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null,
        //                                 null
        //                             ]
        //                         }
        //                     }
        //                 }
        //             },
        //             "errorCode": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "",
        //                 "maxLength": 16
        //             },
        //             "heatupMode": {
        //                 "settable": false,
        //                 "requiresReboot": true,
        //                 "value": "reheatOnly",
        //                 "values": [
        //                     "reheatOnly",
        //                     "reheatSchedule",
        //                     "scheduleOnly"
        //                 ]
        //             },
        //             "iconId": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": 9
        //             },
        //             "isHolidayModeActive": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isInEmergencyState": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isInErrorState": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isInInstallerState": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isInWarningState": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "isPowerfulModeActive": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": false
        //             },
        //             "name": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "",
        //                 "maxLength": 63
        //             },
        //             "onOffMode": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "on",
        //                 "values": [
        //                     "off",
        //                     "on"
        //                 ]
        //             },
        //             "operationMode": {
        //                 "settable": false,
        //                 "value": "heating",
        //                 "values": [
        //                     "heating"
        //                 ]
        //             },
        //             "powerfulMode": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "off",
        //                 "values": [
        //                     "off",
        //                     "on"
        //                 ]
        //             },
        //             "sensoryData": {
        //                 "settable": false,
        //                 "ref": "#sensoryData",
        //                 "value": {
        //                     "tankTemperature": {
        //                         "settable": false,
        //                         "requiresReboot": false,
        //                         "value": 48,
        //                         "maxValue": 127,
        //                         "minValue": -127,
        //                         "stepValue": 1
        //                     }
        //                 }
        //             },
        //             "setpointMode": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "fixed",
        //                 "values": [
        //                     "fixed",
        //                     "weatherDependent"
        //                 ]
        //             },
        //             "temperatureControl": {
        //                 "settable": true,
        //                 "ref": "#temperatureControl",
        //                 "value": {
        //                     "operationModes": {
        //                         "heating": {
        //                             "setpoints": {
        //                                 "domesticHotWaterTemperature": {
        //                                     "settable": true,
        //                                     "requiresReboot": false,
        //                                     "value": 48,
        //                                     "maxValue": 60,
        //                                     "minValue": 30,
        //                                     "stepValue": 1
        //                                 }
        //                             }
        //                         }
        //                     }
        //                 }
        //             }
        //         },
        //         {
        //             "embeddedId": "indoorUnitHydro",
        //             "managementPointType": "indoorUnitHydro",
        //             "managementPointCategory": "secondary",
        //             "eepromVersion": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "3608726-66C",
        //                 "maxLength": 16
        //             },
        //             "iconId": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": 4
        //             },
        //             "modelInfo": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "EHVH08S23EJ9W",
        //                 "maxLength": 16
        //             },
        //             "name": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "Indoor Hydro Unit",
        //                 "maxLength": 63
        //             },
        //             "softwareVersion": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "0222",
        //                 "maxLength": 16
        //             }
        //         },
        //         {
        //             "embeddedId": "outdoorUnit",
        //             "managementPointType": "outdoorUnit",
        //             "managementPointCategory": "secondary",
        //             "iconId": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": 5
        //             },
        //             "name": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "Outdoor Unit",
        //                 "maxLength": 63
        //             },
        //             "softwareVersion": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "FFFF",
        //                 "maxLength": 16
        //             }
        //         },
        //         {
        //             "embeddedId": "userInterface",
        //             "managementPointType": "userInterface",
        //             "managementPointCategory": "secondary",
        //             "dateTime": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "2023-03-07T18:17:27"
        //             },
        //             "firmwareVersion": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "deprecated": "DEPRECATED",
        //                 "value": "6.9.0",
        //                 "maxLength": 16
        //             },
        //             "iconId": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": 6
        //             },
        //             "miconId": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "20010E05",
        //                 "maxLength": 16
        //             },
        //             "modelInfo": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "EHVH08S23EJ9W",
        //                 "maxLength": 16
        //             },
        //             "name": {
        //                 "settable": true,
        //                 "requiresReboot": false,
        //                 "value": "User Interface",
        //                 "maxLength": 63
        //             },
        //             "softwareVersion": {
        //                 "settable": false,
        //                 "requiresReboot": false,
        //                 "value": "6.9.0",
        //                 "maxLength": 16
        //             }
        //         }
        //     ],
        //     "embeddedId": "e1bac939-1495-4803-a6a3-ca2f9388c8ad",
        //     "timestamp": "2023-03-07T19:01:39.983Z",
        //     "id": "10b029e7-484c-4519-b22e-c14be4b7a71c",
        //     "lastUpdateReceived": "2023-03-07T19:01:39.983Z"
        // }, new DaikinCloudController());
        // devices.push(alt);

        devices.forEach(device => {
            try {
                const uuid = this.api.hap.uuid.generate(device.getId());
                const climateControlEmbeddedId: DaikinClimateControlEmbeddedId = device.getDescription().deviceModel === 'Altherma' ? 'climateControlMainZone' : 'climateControl';
                const name: string = device.getData(climateControlEmbeddedId, 'name').value;
                const deviceModel: string = device.getDescription().deviceModel;

                const existingAccessory = this.accessories.find(accessory => accessory.UUID === uuid);

                if (this.isExcludedDevice(this.config.excludedDevicesByDeviceId, uuid)) {
                    this.log.info(`Device with id ${uuid} is excluded, don't add accessory`);
                    if (existingAccessory) {
                        this.api.unregisterPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [existingAccessory]);
                    }
                    return;
                }

                if (existingAccessory) {
                    this.log.info('Restoring existing accessory from cache:', existingAccessory.displayName);
                    existingAccessory.context.device = device;
                    this.api.updatePlatformAccessories([existingAccessory]);

                    if (deviceModel === 'Altherma') {
                        new daikinAlthermaAccessory(this, existingAccessory);
                    } else {
                        new daikinAirConditioningAccessory(this, existingAccessory);
                    }

                } else {
                    this.log.info('Adding new accessory:', name);
                    const accessory = new this.api.platformAccessory(name, uuid);
                    accessory.context.device = device;

                    if (deviceModel === 'Altherma') {
                        new daikinAlthermaAccessory(this, accessory);
                    } else {
                        new daikinAirConditioningAccessory(this, accessory);
                    }

                    this.api.registerPlatformAccessories(PLUGIN_NAME, PLATFORM_NAME, [accessory]);
                }
            } catch (error) {
                if (error instanceof Error) {
                    // eslint-disable-next-line no-console
                    console.log(error);
                    this.log.error(`Failed to create HeaterCooler accessory from device, only HeaterCooler is supported at the moment: ${error.message}, device JSON: ${JSON.stringify(device)}`);
                }
            }
        });

        this.log.info('--------------- End Daikin info for debugging reasons --------------------');
    }

    async getCloudDevices(username: string, password: string): Promise<Device[]> {
        const daikinCloud = await this.initiateDaikinCloudController(username, password);
        const devices: Device[] = await daikinCloud.getCloudDevices();

        this.log.info(`Found ${devices.length} devices in your Daikin Cloud`);

        if (devices.length === 0) {
            return devices;
        }

        const cloudDetails = await daikinCloud.getCloudDeviceDetails();
        this.log.debug(JSON.stringify(cloudDetails));

        return devices;
    }

    async initiateDaikinCloudController(username, password) {
        let tokenSet;
        const options = {
            // eslint-disable-next-line no-console
            logger: console.log,            // optional, logger function used to log details depending on loglevel
            logLevel: 'info',               // optional, Loglevel of Library, default 'warn' (logs nothing by default)
            proxyOwnIp: '192.168.xxx.xxx',  // required, if proxy needed: provide own IP or hostname to later access the proxy
            proxyPort: 8888,                // required: use this port for the proxy and point your client device to this port
            proxyWebPort: 8889,             // required: use this port for the proxy web interface to get the certificate and start Link for login
            proxyListenBind: '0.0.0.0',     // optional: set this to bind the proxy to a special IP, default is '0.0.0.0'
            proxyDataDir: this.storagePath, // Directory to store certificates and other proxy relevant data to
            communicationTimeout: 10000,    // Amount of ms to wait for request and responses before timeout
            communicationRetries: 3,        // Amount of retries when connection timed out
        };

        const tokenFile = path.join(this.storagePath, 'daikincloudtokenset.json');
        this.log.debug(`Write/read Daikin Cloud tokenset from ${tokenFile}`);

        if (fs.existsSync(tokenFile)) {
            try {
                this.log.debug(`Daikin Cloud tokenset found at ${tokenFile}`);
                tokenSet = JSON.parse(fs.readFileSync(tokenFile).toString());
            } catch (e) {
                this.log.debug(`Daikin Cloud could not get tokenset: ${e}`);
            }
        }

        const daikinCloud: DaikinCloud = new DaikinCloudController(tokenSet, options);

        daikinCloud.on('token_update', tokenSet => {
            this.log.info('Retrieved new credentials from Daikin Cloud');
            fs.writeFileSync(tokenFile, JSON.stringify(tokenSet));
        });

        try {
            await daikinCloud.login(username, password);
        } catch (error) {
            if (error instanceof Error) {
                error.message = `Failed to login to Daikin Cloud with ${username}: ${error.message}`;
            }
            throw error;
        }

        return daikinCloud;
    }

    private isExcludedDevice(excludedDevicesByDeviceId: Array<string>, deviceId): boolean {
        return typeof excludedDevicesByDeviceId !== 'undefined' && excludedDevicesByDeviceId.includes(deviceId);
    }
}
