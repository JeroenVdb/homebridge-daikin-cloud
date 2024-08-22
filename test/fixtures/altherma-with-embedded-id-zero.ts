export const althermaWithEmbeddedIdZero = {
    '_id': '9ba5ec19-1084-4c78-bb97-f9588fc1655c',
    'id': '9ba5ec19-1084-4c78-bb97-f9588fc1655c',
    'type': 'heating',
    'deviceModel': 'Altherma',
    'isCloudConnectionUp': {
        'settable': false,
        'value': true,
    },
    'managementPoints': [
        {
            'embeddedId': '0',
            'managementPointType': 'gateway',
            'managementPointCategory': 'secondary',
            'name': {
                'settable': false,
                'maxLength': 63,
                'value': 'Gateway',
            },
            'firmwareVersion': {
                'settable': false,
                'value': '436CC180000',
            },
            'isFirmwareUpdateSupported': {
                'settable': false,
                'value': true,
            },
            'modelInfo': {
                'settable': false,
                'value': 'BRP069A62',
            },
            'ipAddress': {
                'settable': false,
                'value': '192.168.1.198',
            },
            'macAddress': {
                'settable': false,
                'value': '00:23:7e:cd:e9:94',
            },
            'errorCode': {
                'settable': false,
                'value': '',
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
        },
        {
            'embeddedId': '1',
            'managementPointType': 'climateControl',
            'managementPointSubType': 'mainZone',
            'managementPointCategory': 'primary',
            'name': {
                'settable': false,
                'value': '',
                'maxLength': 63,
            },
            'errorCode': {
                'settable': false,
                'value': '',
            },
            'holidayMode': {
                'settable': true,
                'ref': '#holidayMode',
                'value': {
                    'enabled': false,
                    'startDate': '2017-01-01',
                    'endDate': '2017-01-01',
                },
            },
            'isHolidayModeActive': {
                'settable': false,
                'value': false,
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'isInWarningState': {
                'settable': false,
                'value': false,
            },
            'isInInstallerState': {
                'settable': false,
                'value': false,
            },
            'isInEmergencyState': {
                'settable': false,
                'value': false,
            },
            'onOffMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
            'setpointMode': {
                'settable': false,
                'values': [
                    'fixed',
                    'weatherDependent',
                    'weatherDependentHeatingFixedCooling',
                ],
                'value': 'weatherDependentHeatingFixedCooling',
            },
            'controlMode': {
                'settable': false,
                'values': [
                    'roomTemperature',
                    'leavingWaterTemperature',
                    'externalRoomTemperature',
                ],
                'value': 'roomTemperature',
            },
            'consumptionData': {
                'ref': '#consumptionData',
                'settable': false,
                'value': {
                    'electrical': {
                        'heating': {
                            'd': [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                null,
                                null,
                            ],
                            'w': [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                null,
                                null,
                            ],
                            'm': [
                                510,
                                393,
                                332,
                                201,
                                117,
                                41,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                175,
                                129,
                                51,
                                9,
                                0,
                                0,
                                0,
                                null,
                                null,
                                null,
                                null,
                            ],
                        },
                        'cooling': {
                            'd': [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                null,
                                null,
                            ],
                            'w': [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                null,
                                null,
                            ],
                            'm': [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                null,
                                null,
                                null,
                                null,
                            ],
                        },
                        'unit': 'kWh',
                    },
                },
            },
            'sensoryData': {
                'settable': false,
                'ref': '#sensoryData',
                'value': {
                    'roomTemperature': {
                        'settable': false,
                        'value': 27.7,
                    },
                    'outdoorTemperature': {
                        'settable': false,
                        'value': 24,
                    },
                    'leavingWaterTemperature': {
                        'settable': false,
                        'value': 35,
                    },
                },
            },
            'temperatureControl': {
                'ref': '#temperatureControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'heating': {
                            'setpoints': {
                                'roomTemperature': {
                                    'maxValue': 30,
                                    'minValue': 12,
                                    'stepValue': 0.5,
                                    'settable': true,
                                    'value': 21,
                                },
                                'leavingWaterOffset': {
                                    'maxValue': 10,
                                    'minValue': -10,
                                    'stepValue': 1,
                                    'settable': true,
                                    'value': 6,
                                },
                            },
                        },
                        'cooling': {
                            'setpoints': {
                                'roomTemperature': {
                                    'maxValue': 35,
                                    'minValue': 15,
                                    'stepValue': 0.5,
                                    'settable': true,
                                    'value': 20,
                                },
                                'leavingWaterTemperature': {
                                    'maxValue': 22,
                                    'minValue': 18,
                                    'stepValue': 1,
                                    'settable': true,
                                    'value': 18,
                                },
                            },
                        },
                        'auto': {
                            'setpoints': {
                                'roomTemperature': {
                                    'maxValue': 30,
                                    'minValue': 12,
                                    'stepValue': 0.5,
                                    'settable': true,
                                    'value': 21,
                                },
                            },
                        },
                    },
                },
            },
            'operationMode': {
                'settable': true,
                'values': [
                    'heating',
                    'cooling',
                    'auto',
                ],
                'value': 'heating',
            },
            'schedule': {
                'ref': '#schedule',
                'settable': true,
                'value': {
                    'currentMode': {
                        'settable': false,
                        'values': [
                            'heating',
                            'cooling',
                        ],
                        'value': 'heating',
                    },
                    'nextAction': {},
                    'modes': {
                        'heating': {
                            'currentSchedule': {
                                'settable': true,
                                'values': [
                                    '0',
                                    '1',
                                    '2',
                                ],
                            },
                            'enabled': {
                                'settable': true,
                                'value': false,
                            },
                            'meta': {
                                'minIntervalBetweenActions': '00:10:00',
                                'maxSchedules': 3,
                                'maxActionsPerActionPeriod': 6,
                                'consecutiveActionsAllowed': true,
                                'actionTypes': {
                                    'roomTemperature': {
                                        'settable': false,
                                        'maxValue': 30,
                                        'minValue': 12,
                                        'stepValue': 1,
                                    },
                                },
                            },
                            'schedules': {
                                '0': {
                                    'settable': false,
                                    'name': {
                                        'value': 'User defined 1',
                                        'settable': false,
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
                                            '04:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '07:00:00': {
                                                'roomTemperature': 21,
                                            },
                                            '15:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '20:00:00': {
                                                'roomTemperature': 21,
                                            },
                                        },
                                        'tuesday': {
                                            '04:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '07:00:00': {
                                                'roomTemperature': 21,
                                            },
                                            '15:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '20:00:00': {
                                                'roomTemperature': 21,
                                            },
                                        },
                                        'wednesday': {
                                            '04:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '07:00:00': {
                                                'roomTemperature': 21,
                                            },
                                            '15:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '20:00:00': {
                                                'roomTemperature': 21,
                                            },
                                        },
                                        'thursday': {
                                            '04:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '07:00:00': {
                                                'roomTemperature': 21,
                                            },
                                            '15:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '20:00:00': {
                                                'roomTemperature': 21,
                                            },
                                        },
                                        'friday': {
                                            '04:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '07:00:00': {
                                                'roomTemperature': 21,
                                            },
                                            '15:00:00': {
                                                'roomTemperature': 29,
                                            },
                                            '20:00:00': {
                                                'roomTemperature': 21,
                                            },
                                        },
                                        'saturday': {
                                            '04:00:00': {
                                                'roomTemperature': 27,
                                            },
                                            '19:00:00': {
                                                'roomTemperature': 21,
                                            },
                                        },
                                        'sunday': {
                                            '04:00:00': {
                                                'roomTemperature': 27,
                                            },
                                            '19:00:00': {
                                                'roomTemperature': 21,
                                            },
                                        },
                                    },
                                },
                                '1': {
                                    'settable': false,
                                    'name': {
                                        'value': 'User defined 2',
                                        'settable': false,
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
                                    'actions': {},
                                },
                                '2': {
                                    'settable': false,
                                    'name': {
                                        'value': 'User defined 3',
                                        'settable': false,
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
                                    'actions': {},
                                },
                            },
                        },
                        'cooling': {
                            'currentSchedule': {
                                'settable': true,
                                'values': [
                                    '0',
                                ],
                            },
                            'enabled': {
                                'settable': true,
                                'value': false,
                            },
                            'meta': {
                                'minIntervalBetweenActions': '00:10:00',
                                'maxSchedules': 1,
                                'maxActionsPerActionPeriod': 6,
                                'consecutiveActionsAllowed': true,
                                'actionTypes': {
                                    'roomTemperature': {
                                        'settable': false,
                                        'maxValue': 35,
                                        'minValue': 15,
                                        'stepValue': 1,
                                    },
                                },
                            },
                            'schedules': {
                                '0': {
                                    'settable': false,
                                    'name': {
                                        'value': 'User defined',
                                        'settable': false,
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
                                    'actions': {},
                                },
                            },
                        },
                    },
                },
            },
            'targetTemperature': {
                'settable': true,
                'value': 21,
                'maxValue': 30,
                'minValue': 12,
                'stepValue': 0.5,
            },
        },
        {
            'embeddedId': '2',
            'managementPointCategory': 'primary',
            'managementPointType': 'domesticHotWaterTank',
            'name': {
                'settable': false,
                'value': '',
                'maxLength': 63,
            },
            'errorCode': {
                'settable': false,
                'value': '',
            },
            'isHolidayModeActive': {
                'settable': false,
                'value': false,
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'isInWarningState': {
                'settable': false,
                'value': false,
            },
            'isInInstallerState': {
                'settable': false,
                'value': false,
            },
            'isInEmergencyState': {
                'settable': false,
                'value': false,
            },
            'isPowerfulModeActive': {
                'settable': false,
                'value': false,
            },
            'onOffMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'on',
            },
            'powerfulMode': {
                'settable': true,
                'values': [
                    'off',
                    'on',
                ],
                'value': 'off',
            },
            'heatupMode': {
                'settable': false,
                'values': [
                    'reheatOnly',
                    'scheduleOnly',
                    'reheatSchedule',
                ],
                'value': 'reheatOnly',
            },
            'consumptionData': {
                'ref': '#consumptionData',
                'settable': false,
                'value': {
                    'electrical': {
                        'heating': {
                            'd': [
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                1,
                                0,
                                0,
                                1,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                1,
                                null,
                                null,
                            ],
                            'w': [
                                2,
                                3,
                                1,
                                2,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1,
                                1,
                                2,
                                null,
                                null,
                            ],
                            'm': [
                                259,
                                125,
                                122,
                                114,
                                94,
                                77,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                168,
                                259,
                                242,
                                156,
                                142,
                                78,
                                7,
                                null,
                                null,
                                null,
                                null,
                            ],
                        },
                        'unit': 'kWh',
                    },
                },
            },
            'sensoryData': {
                'settable': false,
                'ref': '#sensoryData',
                'value': {
                    'tankTemperature': {
                        'settable': false,
                        'value': 42,
                    },
                },
            },
            'temperatureControl': {
                'ref': '#temperatureControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'heating': {
                            'setpoints': {
                                'domesticHotWaterTemperature': {
                                    'maxValue': 60,
                                    'minValue': 30,
                                    'stepValue': 1,
                                    'settable': true,
                                    'value': 45,
                                },
                            },
                        },
                    },
                },
            },
            'operationMode': {
                'settable': false,
                'values': [
                    'heating',
                ],
                'value': 'heating',
            },
            'setpointMode': {
                'settable': false,
                'values': [
                    'fixed',
                    'weatherDependent',
                ],
                'value': 'fixed',
            },
        },
        {
            'embeddedId': '3',
            'managementPointType': 'indoorUnitHydro',
            'managementPointCategory': 'secondary',
            'name': {
                'settable': false,
                'maxLength': 63,
                'value': 'Indoor Unit Hydro',
            },
            'modelInfo': {
                'settable': false,
                'value': 'EHVX08S23DJ9W',
            },
            'softwareVersion': {
                'settable': false,
                'value': 'ID7404',
            },
        },
        {
            'embeddedId': '4',
            'managementPointType': 'outdoorUnit',
            'managementPointCategory': 'secondary',
            'name': {
                'settable': false,
                'maxLength': 63,
                'value': 'Outdoor Unit',
            },
            'softwareVersion': {
                'settable': false,
                'value': 'IDE7C4',
            },
        },
        {
            'embeddedId': '5',
            'managementPointType': 'userInterface',
            'managementPointCategory': 'secondary',
            'name': {
                'settable': false,
                'maxLength': 63,
                'value': 'User Interface',
            },
            'softwareVersion': {
                'settable': false,
                'value': 'v01.06.00',
            },
        },
    ],
    'embeddedId': 'baec4446-1ff7-45be-acd0-5b759bc4c6e6',
    'timestamp': '2024-08-10T18:55:05.368Z',
};
