export const althermaMiladcerkicOff = {
    'managementPoints': [
        {
            'embeddedId': 'gateway',
            'managementPointType': 'gateway',
            'managementPointCategory': 'secondary',
            'firmwareVersion': {
                'settable': false,
                'value': '3.3.0',
                'maxLength': 8,
            },
            'ipAddress': {
                'settable': false,
                'value': 'REDACTED',
                'maxLength': 15,
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
                'settable': false,
                'requiresReboot': false,
                'value': 'Gateway',
                'maxLength': 63,
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
                'settable': false,
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
                    'leavingWaterTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 41,
                        'maxValue': 127,
                        'minValue': -127,
                        'stepValue': 1,
                    },
                    'outdoorTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 9,
                        'maxValue': 127,
                        'minValue': -127,
                        'stepValue': 1,
                    },
                },
            },
            'setpointMode': {
                'settable': false,
                'requiresReboot': true,
                'value': 'fixed',
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
                                'leavingWaterTemperature': {
                                    'settable': true,
                                    'requiresReboot': false,
                                    'value': 41,
                                    'maxValue': 55,
                                    'minValue': 25,
                                    'stepValue': 1,
                                },
                            },
                        },
                        'cooling': {
                            'setpoints': {
                                'leavingWaterTemperature': {
                                    'settable': false,
                                    'requiresReboot': false,
                                    'value': 20,
                                    'maxValue': 22,
                                    'minValue': 7,
                                    'stepValue': 1,
                                },
                            },
                        },
                        'heating': {
                            'setpoints': {
                                'leavingWaterTemperature': {
                                    'settable': true,
                                    'requiresReboot': false,
                                    'value': 41,
                                    'maxValue': 55,
                                    'minValue': 25,
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
                'value': 'reheatSchedule',
                'values': [
                    'reheatOnly',
                    'reheatSchedule',
                    'scheduleOnly',
                ],
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
                'settable': false,
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
                'settable': false,
                'value': 'heating',
                'values': [
                    'heating',
                ],
            },
            'powerfulMode': {
                'settable': false,
                'requiresReboot': false,
                'value': 'off',
                'values': [
                    'off',
                    'on',
                ],
            },
            'schedule': {
                'settable': true,
                'ref': '#schedule',
                'value': {
                    'currentMode': {
                        'settable': false,
                        'value': 'heating',
                        'values': [
                            'heating',
                        ],
                    },
                    'modes': {
                        'heating': {
                            'enabled': {
                                'settable': false,
                                'requiresReboot': false,
                                'value': true,
                            },
                            'currentSchedule': {
                                'settable': true,
                                'requiresReboot': false,
                                'value': 'scheduleHeatingMode1',
                                'values': [
                                    'scheduleHeatingMode1',
                                ],
                            },
                            'meta': {
                                'minIntervalBetweenActions': '00:10:00',
                                'maxSchedules': 1,
                                'maxActionsPerActionPeriod': 4,
                                'consecutiveActionsAllowed': true,
                                'actionTypes': {
                                    'domesticHotWaterTemperature': {
                                        'settable': false,
                                        'values': [
                                            'eco',
                                            'comfort',
                                            'turn_off',
                                        ],
                                    },
                                },
                            },
                            'schedules': {
                                'scheduleHeatingMode1': {
                                    'settable': false,
                                    'name': {
                                        'settable': false,
                                        'requiresReboot': false,
                                        'value': 'User defined',
                                    },
                                    'meta': {
                                        'isReadOnly': false,
                                        'actionPeriods': [
                                            'monday',
                                            'tuesday',
                                            'wednesday',
                                            'thursday',
                                            'friday',
                                            'saturday',
                                            'sunday',
                                        ],
                                    },
                                    'actions': {
                                        'monday': {
                                            '06:30:00': {
                                                'domesticHotWaterTemperature': 'comfort',
                                            },
                                            '23:00:00': {
                                                'domesticHotWaterTemperature': 'eco',
                                            },
                                        },
                                        'tuesday': {
                                            '06:30:00': {
                                                'domesticHotWaterTemperature': 'comfort',
                                            },
                                            '23:00:00': {
                                                'domesticHotWaterTemperature': 'eco',
                                            },
                                        },
                                        'wednesday': {
                                            '06:30:00': {
                                                'domesticHotWaterTemperature': 'comfort',
                                            },
                                            '23:00:00': {
                                                'domesticHotWaterTemperature': 'eco',
                                            },
                                        },
                                        'thursday': {
                                            '06:30:00': {
                                                'domesticHotWaterTemperature': 'comfort',
                                            },
                                            '23:00:00': {
                                                'domesticHotWaterTemperature': 'eco',
                                            },
                                        },
                                        'friday': {
                                            '06:30:00': {
                                                'domesticHotWaterTemperature': 'comfort',
                                            },
                                            '23:00:00': {
                                                'domesticHotWaterTemperature': 'eco',
                                            },
                                        },
                                        'saturday': {
                                            '06:30:00': {
                                                'domesticHotWaterTemperature': 'comfort',
                                            },
                                            '23:00:00': {
                                                'domesticHotWaterTemperature': 'eco',
                                            },
                                        },
                                        'sunday': {
                                            '06:30:00': {
                                                'domesticHotWaterTemperature': 'comfort',
                                            },
                                            '23:00:00': {
                                                'domesticHotWaterTemperature': 'eco',
                                            },
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            'sensoryData': {
                'settable': false,
                'ref': '#sensoryData',
                'value': {
                    'tankTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 27,
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
                                    'settable': false,
                                    'requiresReboot': false,
                                    'value': 50,
                                    'maxValue': 127,
                                    'minValue': -127,
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
            'modelInfo': {
                'settable': false,
                'requiresReboot': false,
                'value': 'EBVX16S23DJ9W',
                'maxLength': 16,
            },
            'name': {
                'settable': false,
                'requiresReboot': false,
                'value': 'Indoor Hydro Unit',
                'maxLength': 63,
            },
            'softwareVersion': {
                'settable': false,
                'requiresReboot': false,
                'value': '0792',
                'maxLength': 16,
            },
        },
        {
            'embeddedId': 'outdoorUnit',
            'managementPointType': 'outdoorUnit',
            'managementPointCategory': 'secondary',
            'name': {
                'settable': false,
                'requiresReboot': false,
                'value': 'Outdoor Unit',
                'maxLength': 63,
            },
            'softwareVersion': {
                'settable': false,
                'requiresReboot': false,
                'value': '802B',
                'maxLength': 16,
            },
        },
        {
            'embeddedId': 'userInterface',
            'managementPointType': 'userInterface',
            'managementPointCategory': 'secondary',
            'modelInfo': {
                'settable': false,
                'requiresReboot': false,
                'value': 'EBVX16S23DJ9W',
                'maxLength': 16,
            },
            'name': {
                'settable': false,
                'requiresReboot': false,
                'value': 'User Interface',
                'maxLength': 63,
            },
            'softwareVersion': {
                'settable': false,
                'requiresReboot': false,
                'value': '7.6.0',
                'maxLength': 16,
            },
        },
    ],
    '_id': 'cc173ba9-be4b-436f-86e0-5f895ea667c7',
    'deviceModel': 'Altherma',
    'type': 'heating-wlan',
    'isCloudConnectionUp': {
        'settable': false,
        'value': true,
    },
    'embeddedId': '602934ce-ba31-4d6d-b5df-3da21a46df88',
    'timestamp': '2025-01-26T19:39:17.467Z',
    'id': 'cc173ba9-be4b-436f-86e0-5f895ea667c7',
};
