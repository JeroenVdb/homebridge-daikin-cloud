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
