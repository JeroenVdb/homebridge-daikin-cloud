export const dx23Airco2 = {
    'managementPoints': [
        {
            'embeddedId': 'gateway',
            'managementPointType': 'gateway',
            'managementPointCategory': 'secondary',
            'name': {
                'settable': false,
                'maxLength': 32,
                'value': 'Gateway',
            },
            'modelInfo': {
                'settable': false,
                'value': 'BRP069B4x',
            },
            'ipAddress': {
                'settable': false,
                'value': 'REDACTED',
            },
            'macAddress': {
                'settable': false,
                'value': 'REDACTED',
            },
            'firmwareVersion': {
                'settable': false,
                'value': '1_14_88',
            },
            'isFirmwareUpdateSupported': {
                'settable': false,
                'value': true,
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
                'settable': false,
                'maxLength': 32,
                'value': 'Chambre Parents',
            },
            'isHolidayModeActive': {
                'settable': false,
                'value': false,
            },
            'isInErrorState': {
                'settable': false,
                'value': false,
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
                'value': 'heating',
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
                                    'value': 25,
                                    'minValue': 18,
                                    'maxValue': 30,
                                    'stepValue': 0.5,
                                },
                            },
                        },
                        'cooling': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 25,
                                    'minValue': 18,
                                    'maxValue': 32,
                                    'stepValue': 0.5,
                                },
                            },
                        },
                        'heating': {
                            'setpoints': {
                                'roomTemperature': {
                                    'settable': true,
                                    'value': 13,
                                    'minValue': 10,
                                    'maxValue': 30,
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
                        'value': 19,
                    },
                    'outdoorTemperature': {
                        'settable': false,
                        'value': 17,
                    },
                },
            },
            'fanControl': {
                'ref': '#fanControl',
                'settable': true,
                'value': {
                    'operationModes': {
                        'auto': {
                            'fanDirection': {
                                'vertical': {
                                    'currentMode': {
                                        'settable': true,
                                        'value': 'stop',
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                            },
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'fixed',
                                    'values': [
                                        'quiet',
                                        'auto',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 3,
                                        'settable': true,
                                        'maxValue': 5,
                                        'minValue': 1,
                                        'stepValue': 1,
                                    },
                                },
                            },
                        },
                        'dry': {
                            'fanDirection': {
                                'vertical': {
                                    'currentMode': {
                                        'settable': true,
                                        'value': 'stop',
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                            },
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
                            'fanDirection': {
                                'vertical': {
                                    'currentMode': {
                                        'settable': true,
                                        'value': 'stop',
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                            },
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'fixed',
                                    'values': [
                                        'quiet',
                                        'auto',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 3,
                                        'settable': true,
                                        'maxValue': 5,
                                        'minValue': 1,
                                        'stepValue': 1,
                                    },
                                },
                            },
                        },
                        'heating': {
                            'fanDirection': {
                                'vertical': {
                                    'currentMode': {
                                        'settable': true,
                                        'value': 'stop',
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                            },
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'fixed',
                                    'values': [
                                        'quiet',
                                        'auto',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 4,
                                        'settable': true,
                                        'maxValue': 5,
                                        'minValue': 1,
                                        'stepValue': 1,
                                    },
                                },
                            },
                        },
                        'fanOnly': {
                            'fanDirection': {
                                'vertical': {
                                    'currentMode': {
                                        'settable': true,
                                        'value': 'stop',
                                        'values': [
                                            'stop',
                                            'swing',
                                        ],
                                    },
                                },
                            },
                            'fanSpeed': {
                                'currentMode': {
                                    'settable': true,
                                    'value': 'fixed',
                                    'values': [
                                        'quiet',
                                        'auto',
                                        'fixed',
                                    ],
                                },
                                'modes': {
                                    'fixed': {
                                        'value': 3,
                                        'settable': true,
                                        'maxValue': 5,
                                        'minValue': 1,
                                        'stepValue': 1,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            'schedule': 'REDACTED',
            'isPowerfulModeActive': {
                'settable': false,
                'value': false,
            },
            'powerfulMode': {
                'settable': true,
                'values': [
                    'on',
                    'off',
                ],
                'value': 'off',
            },
            'consumptionData': 'REDACTED',
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
            'name': {
                'settable': false,
                'maxLength': 32,
                'value': 'Indoor Unit',
            },
            'softwareVersion': {
                'settable': false,
                'value': '3.20',
            },
        },
    ],
    '_id': '7d4bd896-b31c-478d-9ce4-a9e4234df253',
    'id': '7d4bd896-b31c-478d-9ce4-a9e4234df253',
    'type': 'dx23',
    'deviceModel': 'dx23',
    'isCloudConnectionUp': {
        'settable': false,
        'value': true,
    },
    'embeddedId': '52447ea2-2bd6-42e4-8876-5940a7c9b44b',
    'timestamp': '2024-10-22T08:47:34.264Z',
};
