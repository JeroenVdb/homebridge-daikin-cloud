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
