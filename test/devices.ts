// Zolder Jeroen, has all options
export const dx4Airco= {
    '_id': 'ca043bde-8db6-488b-a69e-f43949a24020',
    'isCloudConnectionUp': {
        'settable': false,
        'value': true,
    },
    'type': 'dx4',
    'deviceModel': 'dx4',
    'managementPoints': [
        {
            'embeddedId': 'gateway',
            'managementPointType': 'gateway',
            'managementPointCategory': 'secondary',
            'modelInfo': {
                'settable': false,
                'value': 'BRP069C4x',
            },
            'macAddress': {
                'settable': false,
                'value': 'd0:40:ef:fb:d2:dc',
            },
            'firmwareVersion': {
                'settable': false,
                'value': '1_12_51',
            },
            'serialNumber': {
                'settable': false,
                'value': '0000000002410756',
            },
            'errorCode': {
                'settable': false,
                'value': '',
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'ssid': {
                'settable': false,
                'value': 'DaikinAP67787',
            },
            'regionCode': {
                'settable': false,
                'value': 'eu',
            },
            'ledEnabled': {
                'settable': true,
                'value': true,
            },
            'timeZone': {
                'settable': true,
                'value': 'Europe/Brussels',
            },
            'daylightSavingTimeEnabled': {
                'settable': true,
                'value': true,
            },
            'wifiConnectionSSID': {
                'settable': false,
                'value': 'JEROENISWIFI',
            },
            'wifiConnectionStrength': {
                'settable': false,
                'value': -52,
                'maxValue': 0,
                'minValue': -90,
                'stepValue': 1,
            },
        },
        {
            'embeddedId': 'climateControl',
            'managementPointType': 'climateControl',
            'managementPointSubType': 'mainZone',
            'managementPointCategory': 'primary',
            'onOffMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'on',
            },
            'name': {
                'settable': true,
                'maxLength': 20,
                'value': 'Zolder',
            },
            'iconId': {
                'settable': true,
                'maxValue': 255,
                'minValue': 0,
                'value': 15,
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
            'isInModeConflict': {
                'settable': false,
                'value': false,
            },
            'isInCautionState': {
                'settable': false,
                'value': false,
            },
            'errorCode': {
                'settable': false,
                'value': '00-',
            },
            'operationMode': {
                'settable': true,
                'value': 'heating',
                'values': [
                    'fanOnly',
                    'heating',
                    'cooling',
                    'auto',
                    'dry',
                ],
            },
            'temperatureControl': {
                'ref': '#temperatureControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'heating': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 22,
                                    'stepValue': 0.5,
                                    'minValue': 10,
                                    'maxValue': 31,
                                },
                            },
                        },
                        'cooling': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 25,
                                    'stepValue': 0.5,
                                    'minValue': 18,
                                    'maxValue': 33,
                                },
                            },
                        },
                        'auto': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 20,
                                    'stepValue': 0.5,
                                    'minValue': 18,
                                    'maxValue': 30,
                                },
                            },
                        },
                    },
                },
            },
            'sensoryData': {
                'ref': '#sensoryData',
                'settable': false,
                'value': {
                    'roomTemperature': {
                        'settable': false,
                        'value': 25,
                        'stepValue': 1,
                        'minValue': -25,
                        'maxValue': 50,
                    },
                    'outdoorTemperature': {
                        'settable': false,
                        'value': 25.5,
                        'stepValue': 0.5,
                        'minValue': -25,
                        'maxValue': 50,
                    },
                },
            },
            'fanControl': {
                'ref': '#fanControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'heating': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'fixed',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                        'quiet',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 2,
                                        'stepValue': 1,
                                        'minValue': 1,
                                        'maxValue': 5,
                                        'settable': true,
                                    },
                                },
                            },
                            'fanDirection': {
                                'horizontal': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                                'vertical': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                            'windNice',
                                        ],
                                    },
                                },
                            },
                        },
                        'cooling': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'fixed',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                        'quiet',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 2,
                                        'stepValue': 1,
                                        'minValue': 1,
                                        'maxValue': 5,
                                        'settable': true,
                                    },
                                },
                            },
                            'fanDirection': {
                                'horizontal': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                                'vertical': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                            'windNice',
                                        ],
                                    },
                                },
                            },
                        },
                        'auto': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'auto',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                        'quiet',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 1,
                                        'stepValue': 1,
                                        'minValue': 1,
                                        'maxValue': 5,
                                        'settable': true,
                                    },
                                },
                            },
                            'fanDirection': {
                                'horizontal': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                                'vertical': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                            'windNice',
                                        ],
                                    },
                                },
                            },
                        },
                        'dry': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'auto',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                    ],
                                },
                            },
                            'fanDirection': {
                                'horizontal': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                                'vertical': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                            'windNice',
                                        ],
                                    },
                                },
                            },
                        },
                        'fanOnly': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'auto',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                        'quiet',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 5,
                                        'stepValue': 1,
                                        'minValue': 1,
                                        'maxValue': 5,
                                        'settable': true,
                                    },
                                },
                            },
                            'fanDirection': {
                                'horizontal': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                                'vertical': {
                                    'currentMode': {
                                        'value': 'stop',
                                        'settable': true,
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                            },
                        },
                    },
                },
            },
            'schedule': {
                'ref': '#schedule',
                'settable': true,
                'value': {
                    'currentMode': {
                        'value': 'any',
                        'settable': true,
                        'values': [
                            'any',
                        ],
                    },
                    'nextAction': {},
                    'modes': {
                        'any': {
                            'currentSchedule': {
                                'value': '0',
                                'settable': true,
                                'values': [
                                    '0',
                                    '1',
                                    '2',
                                ],
                            },
                            'enabled': {
                                'value': false,
                                'settable': true,
                            },
                            'meta': {
                                'minIntervalBetweenActions': '00:01:00',
                                'maxSchedules': 1,
                                'maxActionsPerActionPeriod': 6,
                                'consecutiveActionsAllowed': true,
                                'actionTypes': {
                                    'operationMode': {
                                        'settable': false,
                                        'values': [
                                            'fanOnly',
                                            'heating',
                                            'cooling',
                                            'auto',
                                            'dry',
                                            'off',
                                        ],
                                    },
                                    'roomTemperature': {
                                        'heating': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 10,
                                            'maxValue': 31,
                                        },
                                        'cooling': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 18,
                                            'maxValue': 33,
                                        },
                                        'auto': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 18,
                                            'maxValue': 30,
                                        },
                                    },
                                    'fanSpeed': {
                                        'heating': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'quiet',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 5,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                        'cooling': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'quiet',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 5,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                        'auto': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'quiet',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 5,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                        'dry': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                ],
                                            },
                                        },
                                        'fanOnly': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'quiet',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 5,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                    },
                                    'econoMode': {
                                        'settable': false,
                                        'values': [
                                            'on',
                                            'off',
                                        ],
                                    },
                                },
                            },
                            'schedules': {
                                '0': {
                                    'name': {
                                        'settable': true,
                                        'value': '',
                                        'maxLength': 32,
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
                                            '20:00:00': {
                                                'operationMode': 'off',
                                            },
                                        },
                                        'wednesday': {
                                            '20:00:00': {
                                                'operationMode': 'off',
                                            },
                                        },
                                        'thursday': {
                                            '20:00:00': {
                                                'operationMode': 'off',
                                            },
                                        },
                                        'friday': {
                                            '20:00:00': {
                                                'operationMode': 'off',
                                            },
                                        },
                                        'saturday': {
                                            '20:00:00': {
                                                'operationMode': 'off',
                                            },
                                        },
                                        'sunday': {
                                            '20:00:00': {
                                                'operationMode': 'off',
                                            },
                                        },
                                    },
                                    'settable': true,
                                },
                                '1': {
                                    'name': {
                                        'settable': true,
                                        'value': '',
                                        'maxLength': 32,
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
                                    'settable': true,
                                },
                                '2': {
                                    'name': {
                                        'settable': true,
                                        'value': '',
                                        'maxLength': 32,
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
                                    'settable': true,
                                },
                            },
                        },
                    },
                },
            },
            'econoMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
            'powerfulMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
            'isPowerfulModeActive': {
                'settable': false,
                'value': false,
            },
            'streamerMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
            'consumptionData': {
                'ref': '#consumptionData',
                'settable': false,
                'value': {
                    'electrical': {
                        'unit': 'kWh',
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
                                0,
                                0,
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
                                null,
                                null,
                                null,
                                null,
                            ],
                            'm': [
                                0,
                                0,
                                0,
                                0,
                                0,
                                3,
                                2,
                                0,
                                0,
                                5.3,
                                64.2,
                                52.5,
                                19.3,
                                41.5,
                                13.6,
                                25.7,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                            ],
                        },
                        'cooling': {
                            'd': [
                                0,
                                0,
                                0.1,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0.2,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0.1,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                            ],
                            'w': [
                                0.1,
                                0.1,
                                0.1,
                                0.1,
                                0.2,
                                0.1,
                                0.1,
                                0.1,
                                0.3,
                                0.1,
                                null,
                                null,
                                null,
                                null,
                            ],
                            'm': [
                                0,
                                0,
                                0,
                                0,
                                0,
                                31.1,
                                21.2,
                                12.1,
                                16.4,
                                3.1,
                                0,
                                0,
                                0,
                                0,
                                0,
                                1.3,
                                0.6,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                                0,
                            ],
                        },
                    },
                },
            },
            'holidayMode': {
                'ref': '#holidayMode',
                'settable': true,
                'value': {
                    'enabled': false,
                },
            },
            'isCoolHeatMaster': {
                'settable': false,
                'value': true,
            },
            'isLockFunctionEnabled': {
                'settable': false,
                'value': false,
            },
            'outdoorSilentMode': {
                'settable': false,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
        },
        {
            'embeddedId': 'indoorUnit',
            'managementPointType': 'indoorUnit',
            'managementPointCategory': 'secondary',
            'softwareVersion': {
                'settable': false,
                'value': '20003001',
            },
            'eepromVersion': {
                'settable': false,
                'value': '12FE',
            },
            'dryKeepSetting': {
                'settable': false,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'on',
            },
        },
        {
            'embeddedId': 'outdoorUnit',
            'managementPointType': 'outdoorUnit',
            'managementPointCategory': 'secondary',
            'errorCode': {
                'settable': false,
                'value': '00-',
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'isInWarningState': {
                'settable': false,
                'value': false,
            },
            'isInCautionState': {
                'settable': false,
                'value': false,
            },
        },
    ],
    'embeddedId': '87988',
    'timestamp': '2022-05-04T10:49:25.002Z',
    'id': 'ca043bde-8db6-488b-a69e-f43949a24020',
    'lastUpdateReceived': '2022-05-04T10:49:25.002Z',
};

// Keuken Jeroen, more simple, no horizontal and vertical swing, no powerful mode, min-max speed 1-3
export const dx23Airco = {
    '_id': 'efd08509-2edb-41d0-a9ab-ce913323d811',
    'isCloudConnectionUp': {
        'settable': false,
        'value': true,
    },
    'type': 'dx23',
    'deviceModel': 'dx23',
    'managementPoints': [
        {
            'embeddedId': 'gateway',
            'managementPointType': 'gateway',
            'managementPointCategory': 'secondary',
            'name': {
                'settable': true,
                'maxLength': 32,
                'value': 'Gateway',
            },
            'iconId': {
                'settable': true,
                'value': 3,
            },
            'timeZone': {
                'settable': false,
                'value': 'Europe/Brussels',
            },
            'modelInfo': {
                'settable': false,
                'value': 'BRP069A8x',
            },
            'ipAddress': {
                'settable': false,
                'value': '192.168.86.25',
            },
            'macAddress': {
                'settable': false,
                'value': '74:7a:90:30:40:da',
            },
            'regionCode': {
                'settable': false,
                'value': 'eu',
            },
            'ledEnabled': {
                'settable': true,
                'value': true,
            },
            'firmwareVersion': {
                'settable': false,
                'value': '4_0_3',
            },
            'daylightSavingTimeEnabled': {
                'settable': false,
                'value': true,
            },
            'ssid': {
                'settable': false,
                'value': 'DaikinAP73377',
            },
            'wifiConnectionSSID': {
                'settable': false,
                'value': 'JEROENISWIFI',
            },
            'wifiConnectionStrength': {
                'settable': false,
                'value': -70,
                'maxValue': 0,
                'minValue': -90,
                'stepValue': 1,
            },
        },
        {
            'embeddedId': 'climateControl',
            'managementPointType': 'climateControl',
            'managementPointSubType': 'mainZone',
            'managementPointCategory': 'primary',
            'onOffMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
            'name': {
                'settable': true,
                'maxLength': 32,
                'value': 'Keuken',
            },
            'iconId': {
                'settable': true,
                'value': 15,
            },
            'isHolidayModeActive': {
                'settable': false,
                'value': false,
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'isInModeConflict': {
                'settable': false,
                'value': true,
            },
            'errorCode': {
                'settable': false,
                'value': '00',
            },
            'operationMode': {
                'settable': true,
                'values': [
                    'auto',
                    'dry',
                    'cooling',
                    'heating',
                    'fanOnly',
                ],
                'value': 'cooling',
            },
            'temperatureControl': {
                'ref': '#temperatureControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'auto': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 17,
                                    'minValue': 16,
                                    'maxValue': 32,
                                    'stepValue': 0.5,
                                },
                            },
                        },
                        'cooling': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 17,
                                    'minValue': 16,
                                    'maxValue': 32,
                                    'stepValue': 0.5,
                                },
                            },
                        },
                        'heating': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 17,
                                    'minValue': 16,
                                    'maxValue': 32,
                                    'stepValue': 0.5,
                                },
                            },
                        },
                    },
                },
            },
            'sensoryData': {
                'ref': '#sensoryData',
                'settable': false,
                'value': {
                    'roomTemperature': {
                        'settable': false,
                        'value': 27,
                    },
                },
            },
            'fanControl': {
                'ref': '#fanControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'auto': {
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'fixed',
                                    'values': [
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 1,
                                        'settable': true,
                                        'maxValue': 3,
                                        'minValue': 1,
                                        'stepValue': 1,
                                    },
                                },
                            },
                        },
                        'dry': {
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'auto',
                                    'values': [
                                        'auto',
                                    ],
                                },
                            },
                        },
                        'cooling': {
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'fixed',
                                    'values': [
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 3,
                                        'settable': true,
                                        'maxValue': 3,
                                        'minValue': 1,
                                        'stepValue': 1,
                                    },
                                },
                            },
                        },
                        'heating': {
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'fixed',
                                    'values': [
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 1,
                                        'settable': true,
                                        'maxValue': 3,
                                        'minValue': 1,
                                        'stepValue': 1,
                                    },
                                },
                            },
                        },
                        'fanOnly': {
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'fixed',
                                    'values': [
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 1,
                                        'settable': true,
                                        'maxValue': 3,
                                        'minValue': 1,
                                        'stepValue': 1,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            'schedule': {
                'ref': '#schedule',
                'settable': true,
                'value': {
                    'currentMode': {
                        'value': 'any',
                        'settable': true,
                        'values': [
                            'any',
                        ],
                    },
                    'nextAction': {},
                    'modes': {
                        'any': {
                            'currentSchedule': {
                                'value': '0',
                                'settable': true,
                                'values': [
                                    '0',
                                    '1',
                                    '2',
                                ],
                            },
                            'enabled': {
                                'value': false,
                                'settable': true,
                            },
                            'meta': {
                                'minIntervalBetweenActions': '00:01:00',
                                'maxSchedules': 1,
                                'maxActionsPerActionPeriod': 6,
                                'consecutiveActionsAllowed': true,
                                'actionTypes': {
                                    'operationMode': {
                                        'settable': false,
                                        'values': [
                                            'auto',
                                            'dry',
                                            'cooling',
                                            'heating',
                                            'fanOnly',
                                            'off',
                                        ],
                                    },
                                    'roomTemperature': {
                                        'auto': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 16,
                                            'maxValue': 32,
                                        },
                                        'cooling': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 16,
                                            'maxValue': 32,
                                        },
                                        'heating': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 16,
                                            'maxValue': 32,
                                        },
                                    },
                                    'fanSpeed': {
                                        'auto': {
                                            'currentMode': {
                                                'values': [
                                                    'fixed',
                                                ],
                                                'settable': false,
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'settable': false,
                                                    'maxValue': 3,
                                                    'minValue': 1,
                                                    'stepValue': 1,
                                                },
                                            },
                                        },
                                        'dry': {
                                            'currentMode': {
                                                'values': [
                                                    'auto',
                                                ],
                                                'settable': false,
                                            },
                                        },
                                        'cooling': {
                                            'currentMode': {
                                                'values': [
                                                    'fixed',
                                                ],
                                                'settable': false,
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'settable': false,
                                                    'maxValue': 3,
                                                    'minValue': 1,
                                                    'stepValue': 1,
                                                },
                                            },
                                        },
                                        'heating': {
                                            'currentMode': {
                                                'values': [
                                                    'fixed',
                                                ],
                                                'settable': false,
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'settable': false,
                                                    'maxValue': 3,
                                                    'minValue': 1,
                                                    'stepValue': 1,
                                                },
                                            },
                                        },
                                        'fanOnly': {
                                            'currentMode': {
                                                'values': [
                                                    'fixed',
                                                ],
                                                'settable': false,
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'settable': false,
                                                    'maxValue': 3,
                                                    'minValue': 1,
                                                    'stepValue': 1,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            'schedules': {
                                '0': {
                                    'name': {
                                        'settable': true,
                                        'value': '',
                                        'maxLength': 32,
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
                                    'settable': true,
                                },
                                '1': {
                                    'name': {
                                        'settable': true,
                                        'value': '',
                                        'maxLength': 32,
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
                                    'settable': true,
                                },
                                '2': {
                                    'name': {
                                        'settable': true,
                                        'value': '',
                                        'maxLength': 32,
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
                                    'settable': true,
                                },
                            },
                        },
                    },
                },
            },
            'isPowerfulModeActive': {
                'settable': false,
                'value': false,
            },
            'holidayMode': {
                'ref': '#holidayMode',
                'settable': true,
                'value': {
                    'enabled': false,
                },
            },
        },
        {
            'embeddedId': 'indoorUnit',
            'managementPointType': 'indoorUnit',
            'managementPointCategory': 'secondary',
            'modelInfo': {
                'settable': false,
                'value': 'FDXM35F3V1B9',
            },
            'name': {
                'settable': true,
                'maxLength': 32,
                'value': 'Indoor Unit',
            },
            'iconId': {
                'settable': true,
                'value': 4,
            },
            'softwareVersion': {
                'settable': false,
                'value': '0',
            },
        },
    ],
    'embeddedId': '78e9e2b5-2e25-4e9b-ae72-56184fc0e6a9',
    'timestamp': '2022-05-04T10:47:18.040Z',
    'id': 'efd08509-2edb-41d0-a9ab-ce913323d811',
    'lastUpdateReceived': '2022-05-04T10:47:18.040Z',
};

// Altherma heatpump
export const althermaHeatPump = {
    '_id': '10b029e7-484c-4519-b22e-c14be4b7a71c',
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
                'value': '3.2.4',
                'maxLength': 8,
            },
            'ipAddress': {
                'settable': false,
                'value': '192.168.1.10',
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
                'value': '48:e7:da:01:c6:08',
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
                'value': 'daikin-ap',
                'maxLength': 9,
            },
            'serialNumber': {
                'settable': false,
                'value': '0060691',
                'maxLength': 16,
            },
            'wifiConnectionSSID': {
                'settable': false,
                'requiresReboot': false,
                'value': 'Proximus-Home-B7B0',
                'maxLength': 32,
            },
            'wifiConnectionStrength': {
                'settable': false,
                'requiresReboot': false,
                'value': -29,
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
            'consumptionData': {
                'settable': false,
                'requiresReboot': false,
                'ref': '#consumptionData',
                'value': {
                    'electrical': {
                        'heating': {
                            'd': [
                                2,
                                0,
                                0,
                                1,
                                4,
                                2,
                                0,
                                0,
                                0,
                                0,
                                4,
                                2,
                                0,
                                0,
                                0,
                                4,
                                2,
                                1,
                                0,
                                0,
                                1,
                                null,
                                null,
                                null,
                            ],
                            'w': [
                                14,
                                11,
                                19,
                                13,
                                25,
                                15,
                                12,
                                15,
                                8,
                                null,
                                null,
                                null,
                                null,
                                null,
                            ],
                            'm': [
                                null,
                                null,
                                228,
                                273,
                                28,
                                21,
                                0,
                                0,
                                48,
                                96,
                                220,
                                565,
                                437,
                                320,
                                107,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                            ],
                        },
                    },
                },
            },
            'controlMode': {
                'settable': false,
                'requiresReboot': false,
                'value': 'roomTemperature',
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
                'value': 8,
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
                'value': 'Altherma',
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
                'requiresReboot': false,
                'value': 'heating',
                'values': [
                    'heating',
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
                                'settable': true,
                                'requiresReboot': false,
                                'value': true,
                            },
                            'currentSchedule': {
                                'settable': true,
                                'requiresReboot': false,
                                'value': 'scheduleHeatingRT1',
                                'values': [
                                    'scheduleHeatingRT1',
                                    'scheduleHeatingRT2',
                                    'scheduleHeatingRT3',
                                ],
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
                                'scheduleHeatingRT1': {
                                    'settable': true,
                                    'name': {
                                        'settable': true,
                                        'requiresReboot': false,
                                        'value': 'User defined 1',
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
                                'scheduleHeatingRT2': {
                                    'settable': true,
                                    'name': {
                                        'settable': true,
                                        'requiresReboot': false,
                                        'value': 'User defined 2',
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
                                'scheduleHeatingRT3': {
                                    'settable': true,
                                    'name': {
                                        'settable': true,
                                        'requiresReboot': false,
                                        'value': 'User defined 3',
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
            'sensoryData': {
                'settable': false,
                'ref': '#sensoryData',
                'value': {
                    'roomTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 22.4,
                        'maxValue': 127,
                        'minValue': -127,
                        'stepValue': 0.1,
                    },
                    'outdoorTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 4,
                        'maxValue': 127,
                        'minValue': -127,
                        'stepValue': 1,
                    },
                    'leavingWaterTemperature': {
                        'settable': false,
                        'requiresReboot': false,
                        'value': 35,
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
                                'roomTemperature': {
                                    'settable': true,
                                    'requiresReboot': false,
                                    'value': 22,
                                    'maxValue': 30,
                                    'minValue': 12,
                                    'stepValue': 0.5,
                                },
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
                                'roomTemperature': {
                                    'settable': true,
                                    'requiresReboot': false,
                                    'value': 22,
                                    'maxValue': 30,
                                    'minValue': 12,
                                    'stepValue': 0.5,
                                },
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
                            'setpoints': {},
                        },
                    },
                },
            },
        },
        {
            'embeddedId': 'domesticHotWaterTank',
            'managementPointType': 'domesticHotWaterTank',
            'managementPointCategory': 'primary',
            'consumptionData': {
                'settable': false,
                'requiresReboot': false,
                'ref': '#consumptionData',
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
                                1,
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
                                null,
                            ],
                            'w': [
                                2,
                                2,
                                2,
                                1,
                                0,
                                1,
                                2,
                                2,
                                1,
                                null,
                                null,
                                null,
                                null,
                                null,
                            ],
                            'm': [
                                null,
                                null,
                                15,
                                23,
                                22,
                                23,
                                22,
                                17,
                                20,
                                23,
                                25,
                                36,
                                38,
                                36,
                                9,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                                null,
                            ],
                        },
                    },
                },
            },
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
                'value': 9,
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
                        'value': 48,
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
                                    'value': 48,
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
                'value': '3608726-66C',
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
                'value': 'EHVH08S23EJ9W',
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
                'value': '2023-03-07T18:17:27',
            },
            'firmwareVersion': {
                'settable': false,
                'requiresReboot': false,
                'deprecated': 'DEPRECATED',
                'value': '6.9.0',
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
                'value': '20010E05',
                'maxLength': 16,
            },
            'modelInfo': {
                'settable': false,
                'requiresReboot': false,
                'value': 'EHVH08S23EJ9W',
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
                'value': '6.9.0',
                'maxLength': 16,
            },
        },
    ],
    'embeddedId': 'e1bac939-1495-4803-a6a3-ca2f9388c8ad',
    'timestamp': '2023-03-07T19:01:39.983Z',
    'id': '10b029e7-484c-4519-b22e-c14be4b7a71c',
    'lastUpdateReceived': '2023-03-07T19:01:39.983Z',
};

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

// Unknown from: https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/50
export const unknownKitchenGuests = {
    '_id': '60f60b43-0d09-4084-94a0-d7a71020001f',
    'error': 'INVALID_GATEWAY_DEVICE',
    'type': 'dx4',
    'deviceModel': 'dx4',
    'isCloudConnectionUp': {
        'settable': false,
        'value': true,
    },
    'managementPoints': [
        {
            'embeddedId': 'gateway',
            'managementPointType': 'gateway',
            'managementPointSubType': null,
            'managementPointCategory': 'secondary',
            'daylightSavingTimeEnabled': {
                'settable': true,
                'value': true,
            },
            'errorCode': {
                'settable': false,
                'value': '',
            },
            'firmwareVersion': {
                'settable': false,
                'value': '1_28_0',
            },
            'isFirmwareUpdateSupported': {
                'settable': false,
                'value': true,
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'ledEnabled': {
                'settable': true,
                'value': true,
            },
            'ipAddress': {
                'settable': false,
                'value': '192.168.1.172',
            },
            'macAddress': {
                'settable': false,
                'value': '50:26:ef:a6:c1:9a',
            },
            'modelInfo': {
                'settable': false,
                'value': 'BRP069C5x',
            },
            'regionCode': {
                'settable': false,
                'value': 'eu',
            },
            'serialNumber': {
                'settable': false,
                'value': '0000000006756438',
            },
            'ssid': {
                'settable': false,
                'value': 'DaikinAP69089',
            },
            'timeZone': {
                'settable': true,
                'value': 'Europe/Madrid',
            },
            'wifiConnectionSSID': {
                'settable': false,
                'value': 'Nosotros',
            },
            'wifiConnectionStrength': {
                'settable': false,
                'value': -42,
                'maxValue': 0,
                'minValue': -90,
                'stepValue': 1,
            },
        },
        {
            'embeddedId': 'climateControl',
            'managementPointType': 'climateControl',
            'managementPointSubType': 'mainZone',
            'managementPointCategory': 'primary',
            'errorCode': {
                'settable': false,
                'value': '-',
            },
            'fanControl': {
                'ref': '#fanControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'cooling': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'auto',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 1,
                                        'stepValue': 1,
                                        'minValue': 1,
                                        'maxValue': 3,
                                        'settable': true,
                                    },
                                },
                            },
                        },
                        'fanOnly': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'auto',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 3,
                                        'stepValue': 1,
                                        'minValue': 1,
                                        'maxValue': 3,
                                        'settable': true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            'holidayMode': {
                'ref': '#holidayMode',
                'settable': true,
                'value': {
                    'enabled': false,
                },
            },
            'iconId': {
                'settable': true,
                'maxValue': 255,
                'minValue': 0,
                'value': 15,
            },
            'isCoolHeatMaster': {
                'settable': false,
                'value': false,
            },
            'isFilterSignOn': {
                'settable': false,
                'value': false,
            },
            'isHolidayModeActive': {
                'settable': false,
                'value': false,
            },
            'isInCautionState': {
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
            'isLockFunctionEnabled': {
                'settable': false,
                'value': false,
            },
            'isRefrigerantLeaking': {
                'settable': false,
                'value': false,
            },
            'name': {
                'settable': true,
                'maxLength': 20,
                'value': 'Kitchen Guest',
            },
            'onOffMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
            'operationMode': {
                'settable': true,
                'value': 'cooling',
                'values': [
                    'fanOnly',
                    'cooling',
                    'dry',
                ],
            },
            'schedule': {
                'ref': '#schedule',
                'settable': true,
                'value': {
                    'currentMode': {
                        'value': 'any',
                        'settable': true,
                        'values': [
                            'any',
                        ],
                    },
                    'nextAction': {},
                    'modes': {
                        'any': {
                            'currentSchedule': {
                                'value': '0',
                                'settable': true,
                                'values': [
                                    '0',
                                    '1',
                                    '2',
                                ],
                            },
                            'enabled': {
                                'value': false,
                                'settable': true,
                            },
                            'meta': {
                                'minIntervalBetweenActions': '00:01:00',
                                'maxSchedules': 1,
                                'maxActionsPerActionPeriod': 6,
                                'consecutiveActionsAllowed': true,
                                'actionTypes': {
                                    'operationMode': {
                                        'settable': false,
                                        'values': [
                                            'heating',
                                            'cooling',
                                            'fanOnly',
                                            'dry',
                                            'off',
                                        ],
                                    },
                                    'roomTemperature': {
                                        'heating': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 16,
                                            'maxValue': 32,
                                        },
                                        'cooling': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 16,
                                            'maxValue': 32,
                                        },
                                    },
                                    'fanSpeed': {
                                        'heating': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 3,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                        'cooling': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 3,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                        'fanOnly': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 3,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            'schedules': {
                                '0': {
                                    'name': {
                                        'maxLength': 32,
                                        'settable': true,
                                        'value': '',
                                    },
                                    'meta': {
                                        'actionPeriods': [
                                            'monday',
                                            'tuesday',
                                            'wednesday',
                                            'thursday',
                                            'friday',
                                            'saturday',
                                            'sunday',
                                        ],
                                        'isReadOnly': false,
                                    },
                                    'actions': {},
                                    'settable': true,
                                },
                                '1': {
                                    'name': {
                                        'maxLength': 32,
                                        'settable': true,
                                        'value': '',
                                    },
                                    'meta': {
                                        'actionPeriods': [
                                            'monday',
                                            'tuesday',
                                            'wednesday',
                                            'thursday',
                                            'friday',
                                            'saturday',
                                            'sunday',
                                        ],
                                        'isReadOnly': false,
                                    },
                                    'actions': {},
                                    'settable': true,
                                },
                                '2': {
                                    'name': {
                                        'maxLength': 32,
                                        'settable': true,
                                        'value': '',
                                    },
                                    'meta': {
                                        'actionPeriods': [
                                            'monday',
                                            'tuesday',
                                            'wednesday',
                                            'thursday',
                                            'friday',
                                            'saturday',
                                            'sunday',
                                        ],
                                        'isReadOnly': false,
                                    },
                                    'actions': {},
                                    'settable': true,
                                },
                            },
                        },
                    },
                },
            },
            'sensoryData': {
                'ref': '#sensoryData',
                'settable': false,
                'value': {
                    'roomTemperature': {
                        'settable': false,
                        'unit': '°C',
                        'value': 30.1,
                        'stepValue': 0.01,
                        'minValue': -43.05,
                        'maxValue': 127,
                    },
                },
            },
            'temperatureControl': {
                'ref': '#temperatureControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'cooling': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 23.5,
                                    'unit': '°C',
                                    'stepValue': 0.1,
                                    'minValue': 16,
                                    'maxValue': 32,
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            'embeddedId': 'indoorUnit',
            'managementPointType': 'indoorUnit',
            'managementPointSubType': null,
            'managementPointCategory': 'secondary',
            'modelInfo': {
                'settable': false,
                'value': 'FXSA50A2VEB',
            },
            'softwareVersion': {
                'settable': false,
                'value': '19000A03',
            },
            'sensoryData': {
                'ref': '#sensoryData',
                'settable': false,
                'value': {
                    'fanMotorRotationSpeed': {
                        'settable': false,
                        'value': 0,
                        'minValue': 0,
                        'maxValue': -1,
                        'stepValue': 1,
                        'unit': 'rpm',
                    },
                    'suctionTemperature': {
                        'settable': false,
                        'value': 30.1,
                        'minValue': -43.05,
                        'maxValue': 128,
                        'stepValue': 0.01,
                        'unit': '°C',
                    },
                },
            },
        },
        {
            'embeddedId': 'outdoorUnit',
            'managementPointType': 'outdoorUnit',
            'managementPointSubType': null,
            'managementPointCategory': 'secondary',
            'modelInfo': {
                'settable': false,
                'value': 'RXYSA6A7V1B',
            },
            'errorCode': {
                'settable': false,
                'value': '-',
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'isInWarningState': {
                'settable': false,
                'value': false,
            },
            'isInCautionState': {
                'settable': false,
                'value': false,
            },
        },
    ],
    'embeddedId': '1395211',
    'timestamp': '2024-01-24T19:56:47.581Z',
    'id': '60f60b43-0d09-4084-94a0-d7a71020001f',
};

// Unknown from: https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/50
export const unknownJan = {
    '_id': 'c6001930-f7a2-4903-a2d2-be0b649ac9da',
    'error': 'INVALID_GATEWAY_DEVICE',
    'type': 'dx4',
    'deviceModel': 'dx4',
    'isCloudConnectionUp': {
        'settable': false,
        'value': true,
    },
    'managementPoints': [
        {
            'embeddedId': 'gateway',
            'managementPointType': 'gateway',
            'managementPointSubType': null,
            'managementPointCategory': 'secondary',
            'daylightSavingTimeEnabled': {
                'settable': true,
                'value': true,
            },
            'errorCode': {
                'settable': false,
                'value': '',
            },
            'firmwareVersion': {
                'settable': false,
                'value': '1_28_0',
            },
            'isFirmwareUpdateSupported': {
                'settable': false,
                'value': true,
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'ledEnabled': {
                'settable': true,
                'value': true,
            },
            'ipAddress': {
                'settable': false,
                'value': '192.168.1.201',
            },
            'macAddress': {
                'settable': false,
                'value': '50:26:ef:9c:b5:04',
            },
            'modelInfo': {
                'settable': false,
                'value': 'BRP069C5x',
            },
            'regionCode': {
                'settable': false,
                'value': 'eu',
            },
            'serialNumber': {
                'settable': false,
                'value': '0000000005645828',
            },
            'ssid': {
                'settable': false,
                'value': 'DaikinAP34761',
            },
            'timeZone': {
                'settable': true,
                'value': 'Europe/Madrid',
            },
            'wifiConnectionSSID': {
                'settable': false,
                'value': 'Nosotros',
            },
            'wifiConnectionStrength': {
                'settable': false,
                'value': -41,
                'maxValue': 0,
                'minValue': -90,
                'stepValue': 1,
            },
        },
        {
            'embeddedId': 'climateControl',
            'managementPointType': 'climateControl',
            'managementPointSubType': 'mainZone',
            'managementPointCategory': 'primary',
            'errorCode': {
                'settable': false,
                'value': '-',
            },
            'fanControl': {
                'ref': '#fanControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'cooling': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'auto',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 1,
                                        'stepValue': 1,
                                        'minValue': 1,
                                        'maxValue': 3,
                                        'settable': true,
                                    },
                                },
                            },
                        },
                        'fanOnly': {
                            'fanSpeed': {
                                'currentMode': {
                                    'value': 'auto',
                                    'settable': true,
                                    'values': [
                                        'auto',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 3,
                                        'stepValue': 1,
                                        'minValue': 1,
                                        'maxValue': 3,
                                        'settable': true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            'holidayMode': {
                'ref': '#holidayMode',
                'settable': true,
                'value': {
                    'enabled': false,
                },
            },
            'iconId': {
                'settable': true,
                'maxValue': 255,
                'minValue': 0,
                'value': 15,
            },
            'isCoolHeatMaster': {
                'settable': false,
                'value': false,
            },
            'isFilterSignOn': {
                'settable': false,
                'value': false,
            },
            'isHolidayModeActive': {
                'settable': false,
                'value': false,
            },
            'isInCautionState': {
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
            'isLockFunctionEnabled': {
                'settable': false,
                'value': false,
            },
            'isRefrigerantLeaking': {
                'settable': false,
                'value': false,
            },
            'name': {
                'settable': true,
                'maxLength': 20,
                'value': 'Jan',
            },
            'onOffMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
            'operationMode': {
                'settable': true,
                'value': 'cooling',
                'values': [
                    'fanOnly',
                    'cooling',
                    'dry',
                ],
            },
            'schedule': {
                'ref': '#schedule',
                'settable': true,
                'value': {
                    'currentMode': {
                        'value': 'any',
                        'settable': true,
                        'values': [
                            'any',
                        ],
                    },
                    'nextAction': {},
                    'modes': {
                        'any': {
                            'currentSchedule': {
                                'value': '0',
                                'settable': true,
                                'values': [
                                    '0',
                                    '1',
                                    '2',
                                ],
                            },
                            'enabled': {
                                'value': false,
                                'settable': true,
                            },
                            'meta': {
                                'minIntervalBetweenActions': '00:01:00',
                                'maxSchedules': 1,
                                'maxActionsPerActionPeriod': 6,
                                'consecutiveActionsAllowed': true,
                                'actionTypes': {
                                    'operationMode': {
                                        'settable': false,
                                        'values': [
                                            'heating',
                                            'cooling',
                                            'fanOnly',
                                            'dry',
                                            'off',
                                        ],
                                    },
                                    'roomTemperature': {
                                        'heating': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 16,
                                            'maxValue': 32,
                                        },
                                        'cooling': {
                                            'settable': false,
                                            'stepValue': 0.5,
                                            'minValue': 16,
                                            'maxValue': 32,
                                        },
                                    },
                                    'fanSpeed': {
                                        'heating': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 3,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                        'cooling': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 3,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                        'fanOnly': {
                                            'currentMode': {
                                                'settable': false,
                                                'values': [
                                                    'auto',
                                                    'fixed',
                                                ],
                                            },
                                            'modes': {
                                                'fixed': {
                                                    'stepValue': 1,
                                                    'minValue': 1,
                                                    'maxValue': 3,
                                                    'settable': false,
                                                },
                                            },
                                        },
                                    },
                                },
                            },
                            'schedules': {
                                '0': {
                                    'name': {
                                        'maxLength': 32,
                                        'settable': true,
                                        'value': '',
                                    },
                                    'meta': {
                                        'actionPeriods': [
                                            'monday',
                                            'tuesday',
                                            'wednesday',
                                            'thursday',
                                            'friday',
                                            'saturday',
                                            'sunday',
                                        ],
                                        'isReadOnly': false,
                                    },
                                    'actions': {},
                                    'settable': true,
                                },
                                '1': {
                                    'name': {
                                        'maxLength': 32,
                                        'settable': true,
                                        'value': '',
                                    },
                                    'meta': {
                                        'actionPeriods': [
                                            'monday',
                                            'tuesday',
                                            'wednesday',
                                            'thursday',
                                            'friday',
                                            'saturday',
                                            'sunday',
                                        ],
                                        'isReadOnly': false,
                                    },
                                    'actions': {},
                                    'settable': true,
                                },
                                '2': {
                                    'name': {
                                        'maxLength': 32,
                                        'settable': true,
                                        'value': '',
                                    },
                                    'meta': {
                                        'actionPeriods': [
                                            'monday',
                                            'tuesday',
                                            'wednesday',
                                            'thursday',
                                            'friday',
                                            'saturday',
                                            'sunday',
                                        ],
                                        'isReadOnly': false,
                                    },
                                    'actions': {},
                                    'settable': true,
                                },
                            },
                        },
                    },
                },
            },
            'sensoryData': {
                'ref': '#sensoryData',
                'settable': false,
                'value': {
                    'roomTemperature': {
                        'settable': false,
                        'unit': '°C',
                        'value': 27,
                        'stepValue': 0.01,
                        'minValue': -43.05,
                        'maxValue': 127,
                    },
                },
            },
            'temperatureControl': {
                'ref': '#temperatureControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'cooling': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 26.1,
                                    'unit': '°C',
                                    'stepValue': 0.1,
                                    'minValue': 16,
                                    'maxValue': 32,
                                },
                            },
                        },
                    },
                },
            },
        },
        {
            'embeddedId': 'indoorUnit',
            'managementPointType': 'indoorUnit',
            'managementPointSubType': null,
            'managementPointCategory': 'secondary',
            'modelInfo': {
                'settable': false,
                'value': 'FXSA32A2VEB',
            },
            'softwareVersion': {
                'settable': false,
                'value': '19000A03',
            },
            'sensoryData': {
                'ref': '#sensoryData',
                'settable': false,
                'value': {
                    'fanMotorRotationSpeed': {
                        'settable': false,
                        'value': 0,
                        'minValue': 0,
                        'maxValue': -1,
                        'stepValue': 1,
                        'unit': 'rpm',
                    },
                    'suctionTemperature': {
                        'settable': false,
                        'value': 27,
                        'minValue': -43.05,
                        'maxValue': 128,
                        'stepValue': 0.01,
                        'unit': '°C',
                    },
                },
            },
        },
        {
            'embeddedId': 'outdoorUnit',
            'managementPointType': 'outdoorUnit',
            'managementPointSubType': null,
            'managementPointCategory': 'secondary',
            'modelInfo': {
                'settable': false,
                'value': 'RXYSA6A7V1B',
            },
            'errorCode': {
                'settable': false,
                'value': '-',
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
            },
            'isInWarningState': {
                'settable': false,
                'value': false,
            },
            'isInCautionState': {
                'settable': false,
                'value': false,
            },
        },
    ],
    'embeddedId': '1407366',
    'timestamp': '2024-01-24T19:56:06.956Z',
    'id': 'c6001930-f7a2-4903-a2d2-be0b649ac9da',
};
