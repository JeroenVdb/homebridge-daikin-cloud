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
