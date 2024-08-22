

export const althermaHeatPump2 = {
    '_id': '517f8022-c4ef-4a84-99bf-2ce5cdf1ebcb',
    'id': '517f8022-c4ef-4a84-99bf-2ce5cdf1ebcb',
    'deviceModel': 'Altherma',
    'type': 'heating-wlan',
    'isCloudConnectionUp': {
        'settable': false,
        'value': true,
    },
    'managementPoints': [
        {
            'embeddedId': 'gateway',
            'managementPointType': 'gateway',
            'managementPointCategory': 'secondary',
            'firmwareVersion': {
                'settable': false,
                'value': '3.2.5',
                'maxLength': 8,
            },
            'ipAddress': {
                'settable': false,
                'value': 'REDACTED',
                'maxLength': 15,
            },
            'iconId': {
                'settable': true,
                'requiresReboot': false,
                'value': 3,
            },
            'isFirmwareUpdateSupported': {
                'settable': false,
                'requiresReboot': false,
                'value': true,
            },
            'macAddress': {
                'settable': false,
                'value': 'REDACTED',
                'maxLength': 17,
            },
            'modelInfo': {
                'settable': false,
                'value': 'BRP069A78',
                'maxLength': 9,
            },
            'name': {
                'settable': true,
                'requiresReboot': false,
                'value': 'Gateway',
                'maxLength': 63,
            },
            'ssid': {
                'settable': false,
                'requiresReboot': false,
                'value': 'REDACTED',
                'maxLength': 9,
            },
            'serialNumber': {
                'settable': false,
                'value': 'REDACTED',
                'maxLength': 16,
            },
            'wifiConnectionSSID': {
                'settable': false,
                'requiresReboot': false,
                'value': 'REDACTED',
                'maxLength': 32,
            },
            'wifiConnectionStrength': {
                'settable': false,
                'requiresReboot': false,
                'value': -68,
                'maxValue': 0,
                'minValue': -90,
                'stepValue': 1,
            },
        },
        {
            'embeddedId': 'climateControlMainZone',
            'managementPointType': 'climateControl',
            'managementPointCategory': 'primary',
            'managementPointSubType': 'mainZone',
            'consumptionData': 'REDACTED',
            'controlMode': {
                'settable': false,
                'requiresReboot': false,
                'value': 'leavingWaterTemperature',
                'values': [
                    'leavingWaterTemperature',
                    'externalRoomTemperature',
                    'roomTemperature',
                ],
            },
            'errorCode': {
                'settable': false,
                'requiresReboot': false,
                'value': '',
                'maxLength': 16,
            },
            'holidayMode': {
                'settable': true,
                'requiresReboot': false,
                'ref': '#holidayMode',
                'value': {
                    'enabled': false,
                    'startDate': '2017-01-01',
                    'endDate': '2017-01-01',
                },
            },
            'iconId': {
                'settable': true,
                'requiresReboot': false,
                'value': 11,
            },
            'isHolidayModeActive': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isInEmergencyState': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isInErrorState': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isInInstallerState': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isInWarningState': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'name': {
                'settable': true,
                'requiresReboot': false,
                'value': '',
                'maxLength': 63,
            },
            'onOffMode': {
                'settable': true,
                'requiresReboot': false,
                'value': 'off',
                'values': [
                    'off',
                    'on',
                ],
            },
            'operationMode': {
                'settable': true,
                'requiresReboot': false,
                'value': 'heating',
                'values': [
                    'heating',
                    'cooling',
                    'auto',
                ],
            },
            'sensoryData': {
                'settable': false,
                'ref': '#sensoryData',
                'value': {
                    'outdoorTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 16,
                        'maxValue': 127,
                        'minValue': -127,
                        'stepValue': 1,
                    },
                    'leavingWaterTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 33,
                        'maxValue': 127,
                        'minValue': -127,
                        'stepValue': 1,
                    },
                },
            },
            'setpointMode': {
                'settable': false,
                'requiresReboot': true,
                'value': 'weatherDependent',
                'values': [
                    'fixed',
                    'weatherDependentHeatingFixedCooling',
                    'weatherDependent',
                ],
            },
            'temperatureControl': {
                'settable': true,
                'ref': '#temperatureControl',
                'value': {
                    'operationModes': {
                        'auto': {
                            'setpoints': {
                                'leavingWaterOffset': {
                                    'settable': true,
                                    'requiresReboot': false,
                                    'value': 0,
                                    'maxValue': 10,
                                    'minValue': -10,
                                    'stepValue': 1,
                                },
                            },
                        },
                        'heating': {
                            'setpoints': {
                                'leavingWaterOffset': {
                                    'settable': true,
                                    'requiresReboot': false,
                                    'value': 0,
                                    'maxValue': 10,
                                    'minValue': -10,
                                    'stepValue': 1,
                                },
                            },
                        },
                        'cooling': {
                            'setpoints': {
                                'leavingWaterOffset': {
                                    'settable': true,
                                    'requiresReboot': false,
                                    'value': 0,
                                    'maxValue': 10,
                                    'minValue': -10,
                                    'stepValue': 1,
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            'embeddedId': 'domesticHotWaterTank',
            'managementPointType': 'domesticHotWaterTank',
            'managementPointCategory': 'primary',
            'consumptionData': 'REDACTED',
            'errorCode': {
                'settable': false,
                'requiresReboot': false,
                'value': '',
                'maxLength': 16,
            },
            'heatupMode': {
                'settable': false,
                'requiresReboot': true,
                'value': 'reheatOnly',
                'values': [
                    'reheatOnly',
                    'reheatSchedule',
                    'scheduleOnly',
                ],
            },
            'iconId': {
                'settable': true,
                'requiresReboot': false,
                'value': 29,
            },
            'isHolidayModeActive': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isInEmergencyState': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isInErrorState': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isInInstallerState': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isInWarningState': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'isPowerfulModeActive': {
                'settable': false,
                'requiresReboot': false,
                'value': false,
            },
            'name': {
                'settable': true,
                'requiresReboot': false,
                'value': '',
                'maxLength': 63,
            },
            'onOffMode': {
                'settable': true,
                'requiresReboot': false,
                'value': 'on',
                'values': [
                    'off',
                    'on',
                ],
            },
            'operationMode': {
                'settable': false,
                'value': 'heating',
                'values': [
                    'heating',
                ],
            },
            'powerfulMode': {
                'settable': true,
                'requiresReboot': false,
                'value': 'off',
                'values': [
                    'off',
                    'on',
                ],
            },
            'sensoryData': {
                'settable': false,
                'ref': '#sensoryData',
                'value': {
                    'tankTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 50,
                        'maxValue': 127,
                        'minValue': -127,
                        'stepValue': 1,
                    },
                },
            },
            'setpointMode': {
                'settable': false,
                'requiresReboot': false,
                'value': 'fixed',
                'values': [
                    'fixed',
                    'weatherDependent',
                ],
            },
            'temperatureControl': {
                'settable': true,
                'ref': '#temperatureControl',
                'value': {
                    'operationModes': {
                        'heating': {
                            'setpoints': {
                                'domesticHotWaterTemperature': {
                                    'settable': true,
                                    'requiresReboot': false,
                                    'value': 50,
                                    'maxValue': 60,
                                    'minValue': 30,
                                    'stepValue': 1,
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            'embeddedId': 'indoorUnitHydro',
            'managementPointType': 'indoorUnitHydro',
            'managementPointCategory': 'secondary',
            'eepromVersion': {
                'settable': false,
                'requiresReboot': false,
                'value': '3608726-74D',
                'maxLength': 16,
            },
            'iconId': {
                'settable': true,
                'requiresReboot': false,
                'value': 4,
            },
            'modelInfo': {
                'settable': false,
                'requiresReboot': false,
                'value': 'EHVX08S23EJ9W',
                'maxLength': 16,
            },
            'name': {
                'settable': true,
                'requiresReboot': false,
                'value': 'Indoor Hydro Unit',
                'maxLength': 63,
            },
            'softwareVersion': {
                'settable': false,
                'requiresReboot': false,
                'value': '0222',
                'maxLength': 16,
            },
        },
        {
            'embeddedId': 'outdoorUnit',
            'managementPointType': 'outdoorUnit',
            'managementPointCategory': 'secondary',
            'iconId': {
                'settable': true,
                'requiresReboot': false,
                'value': 5,
            },
            'name': {
                'settable': true,
                'requiresReboot': false,
                'value': 'Outdoor Unit',
                'maxLength': 63,
            },
            'softwareVersion': {
                'settable': false,
                'requiresReboot': false,
                'value': 'FFFF',
                'maxLength': 16,
            },
        },
        {
            'embeddedId': 'userInterface',
            'managementPointType': 'userInterface',
            'managementPointCategory': 'secondary',
            'dateTime': {
                'settable': false,
                'requiresReboot': false,
                'value': '2023-09-23T05:58:57',
            },
            'firmwareVersion': {
                'settable': false,
                'requiresReboot': false,
                'deprecated': 'DEPRECATED',
                'value': '7.1.0',
                'maxLength': 16,
            },
            'iconId': {
                'settable': true,
                'requiresReboot': false,
                'value': 6,
            },
            'miconId': {
                'settable': false,
                'requiresReboot': false,
                'value': '20010E07',
                'maxLength': 16,
            },
            'modelInfo': {
                'settable': false,
                'requiresReboot': false,
                'value': 'EHVX08S23EJ9W',
                'maxLength': 16,
            },
            'name': {
                'settable': true,
                'requiresReboot': false,
                'value': 'User Interface',
                'maxLength': 63,
            },
            'softwareVersion': {
                'settable': false,
                'requiresReboot': false,
                'value': '7.1.0',
                'maxLength': 16,
            },
        },
    ],
    'embeddedId': '25eff8e4-e12e-4ccd-ac41-c5b913c7c10d',
    'timestamp': '2023-09-23T08:24:03.059Z',
};
