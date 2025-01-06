export const althermaFraction =
    {
        '_id': '',
        'deviceModel': 'Altherma',
        'type': 'heating-wlan',
        'isCloudConnectionUp':
            {
                'settable': false,
                'value': true,
            },
        'managementPoints':
            [
                {
                    'embeddedId': 'gateway',
                    'managementPointType': 'gateway',
                    'managementPointCategory': 'secondary',
                    'firmwareVersion':
                        {
                            'settable': false,
                            'value': '3.3.0',
                            'maxLength': 8,
                        },
                    'ipAddress':
                        {
                            'settable': false,
                            'value': '192.168.0.220',
                            'maxLength': 15,
                        },
                    'isFirmwareUpdateSupported':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': true,
                        },
                    'macAddress':
                        {
                            'settable': false,
                            'value': '',
                            'maxLength': 17,
                        },
                    'modelInfo':
                        {
                            'settable': false,
                            'value': 'BRP069A78',
                            'maxLength': 9,
                        },
                    'name':
                        {
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
                    'consumptionData':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'ref': '#consumptionData',
                            'value':
                                {
                                    'electrical':
                                        {
                                            'heating':
                                                {
                                                    'd':
                                                        [
                                                            1,
                                                            1,
                                                            2,
                                                            1,
                                                            1,
                                                            1,
                                                            0,
                                                            0,
                                                            0,
                                                            1,
                                                            1,
                                                            2,
                                                            1,
                                                            1,
                                                            1,
                                                            1,
                                                            1,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                        ],
                                                    'w':
                                                        [
                                                            4,
                                                            5,
                                                            5,
                                                            4,
                                                            6,
                                                            8,
                                                            14,
                                                            15,
                                                            11,
                                                            5,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                        ],
                                                    'm':
                                                        [
                                                            1131,
                                                            1140,
                                                            957,
                                                            654,
                                                            278,
                                                            48,
                                                            0,
                                                            0,
                                                            0,
                                                            371,
                                                            884,
                                                            1270,
                                                            1607,
                                                            790,
                                                            646,
                                                            419,
                                                            164,
                                                            17,
                                                            0,
                                                            0,
                                                            129,
                                                            16,
                                                            null,
                                                            null,
                                                        ],
                                                },
                                            'cooling':
                                                {
                                                    'd':
                                                        [
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
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                        ],
                                                    'w':
                                                        [
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
                                                    'm':
                                                        [
                                                            0,
                                                            0,
                                                            0,
                                                            0,
                                                            0,
                                                            73,
                                                            161,
                                                            94,
                                                            65,
                                                            7,
                                                            0,
                                                            0,
                                                            0,
                                                            0,
                                                            0,
                                                            0,
                                                            0,
                                                            80,
                                                            142,
                                                            158,
                                                            56,
                                                            0,
                                                            null,
                                                            null,
                                                        ],
                                                },
                                        },
                                },
                        },
                    'controlMode':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'leavingWaterTemperature',
                            'values':
                                [
                                    'leavingWaterTemperature',
                                    'externalRoomTemperature',
                                    'roomTemperature',
                                ],
                        },
                    'errorCode':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': '',
                            'maxLength': 16,
                        },
                    'holidayMode':
                        {
                            'settable': true,
                            'requiresReboot': false,
                            'ref': '#holidayMode',
                            'value':
                                {
                                    'enabled': false,
                                    'startDate': '2017-01-01',
                                    'endDate': '2017-01-01',
                                },
                        },
                    'isHolidayModeActive':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isInEmergencyState':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isInErrorState':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isInInstallerState':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isInWarningState':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'name':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'Climate control unit',
                            'maxLength': 63,
                        },
                    'onOffMode':
                        {
                            'settable': true,
                            'requiresReboot': false,
                            'value': 'on',
                            'values':
                                [
                                    'off',
                                    'on',
                                ],
                        },
                    'operationMode':
                        {
                            'settable': true,
                            'requiresReboot': false,
                            'value': 'heating',
                            'values':
                                [
                                    'heating',
                                    'cooling',
                                    'auto',
                                ],
                        },
                    'sensoryData':
                        {
                            'settable': false,
                            'ref': '#sensoryData',
                            'value':
                                {
                                    'leavingWaterTemperature':
                                        {
                                            'settable': false,
                                            'requiresReboot': false,
                                            'value': 35,
                                            'maxValue': 127,
                                            'minValue': -127,
                                            'stepValue': 1,
                                        },
                                    'outdoorTemperature':
                                        {
                                            'settable': false,
                                            'requiresReboot': false,
                                            'value': 11,
                                            'maxValue': 127,
                                            'minValue': -127,
                                            'stepValue': 1,
                                        },
                                },
                        },
                    'setpointMode':
                        {
                            'settable': false,
                            'requiresReboot': true,
                            'value': 'weatherDependent',
                            'values':
                                [
                                    'fixed',
                                    'weatherDependentHeatingFixedCooling',
                                    'weatherDependent',
                                ],
                        },
                    'temperatureControl':
                        {
                            'settable': true,
                            'ref': '#temperatureControl',
                            'value':
                                {
                                    'operationModes':
                                        {
                                            'auto':
                                                {
                                                    'setpoints':
                                                        {
                                                            'leavingWaterOffset':
                                                                {
                                                                    'settable': true,
                                                                    'requiresReboot': false,
                                                                    'value': 0,
                                                                    'maxValue': 10,
                                                                    'minValue': -10,
                                                                    'stepValue': 1,
                                                                },
                                                        },
                                                },
                                            'cooling':
                                                {
                                                    'setpoints':
                                                        {
                                                            'leavingWaterOffset':
                                                                {
                                                                    'settable': true,
                                                                    'requiresReboot': false,
                                                                    'value': 0,
                                                                    'maxValue': 10,
                                                                    'minValue': -10,
                                                                    'stepValue': 1,
                                                                },
                                                        },
                                                },
                                            'heating':
                                                {
                                                    'setpoints':
                                                        {
                                                            'leavingWaterOffset':
                                                                {
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
                    'consumptionData':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'ref': '#consumptionData',
                            'value':
                                {
                                    'electrical':
                                        {
                                            'heating':
                                                {
                                                    'd':
                                                        [
                                                            0,
                                                            0,
                                                            1,
                                                            0,
                                                            2,
                                                            1,
                                                            1,
                                                            0,
                                                            1,
                                                            3,
                                                            0,
                                                            1,
                                                            0,
                                                            0,
                                                            1,
                                                            1,
                                                            2,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                        ],
                                                    'w':
                                                        [
                                                            10,
                                                            11,
                                                            11,
                                                            10,
                                                            12,
                                                            11,
                                                            9,
                                                            11,
                                                            10,
                                                            4,
                                                            null,
                                                            null,
                                                            null,
                                                            null,
                                                        ],
                                                    'm':
                                                        [
                                                            429,
                                                            372,
                                                            385,
                                                            344,
                                                            335,
                                                            322,
                                                            311,
                                                            342,
                                                            486,
                                                            365,
                                                            393,
                                                            441,
                                                            522,
                                                            330,
                                                            370,
                                                            344,
                                                            319,
                                                            301,
                                                            272,
                                                            275,
                                                            301,
                                                            14,
                                                            null,
                                                            null,
                                                        ],
                                                },
                                        },
                                },
                        },
                    'errorCode':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': '',
                            'maxLength': 16,
                        },
                    'heatupMode':
                        {
                            'settable': false,
                            'requiresReboot': true,
                            'value': 'reheatOnly',
                            'values':
                                [
                                    'reheatOnly',
                                    'reheatSchedule',
                                    'scheduleOnly',
                                ],
                        },
                    'isHolidayModeActive':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isInEmergencyState':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isInErrorState':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isInInstallerState':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isInWarningState':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'isPowerfulModeActive':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': false,
                        },
                    'name':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'Hot water tank unit',
                            'maxLength': 63,
                        },
                    'onOffMode':
                        {
                            'settable': true,
                            'requiresReboot': false,
                            'value': 'on',
                            'values':
                                [
                                    'off',
                                    'on',
                                ],
                        },
                    'operationMode':
                        {
                            'settable': false,
                            'value': 'heating',
                            'values':
                                [
                                    'heating',
                                ],
                        },
                    'powerfulMode':
                        {
                            'settable': true,
                            'requiresReboot': false,
                            'value': 'off',
                            'values':
                                [
                                    'off',
                                    'on',
                                ],
                        },
                    'sensoryData':
                        {
                            'settable': false,
                            'ref': '#sensoryData',
                            'value':
                                {
                                    'tankTemperature':
                                        {
                                            'settable': false,
                                            'requiresReboot': false,
                                            'value': 45,
                                            'maxValue': 127,
                                            'minValue': -127,
                                            'stepValue': 1,
                                        },
                                },
                        },
                    'setpointMode':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'fixed',
                            'values':
                                [
                                    'fixed',
                                    'weatherDependent',
                                ],
                        },
                    'temperatureControl':
                        {
                            'settable': true,
                            'ref': '#temperatureControl',
                            'value':
                                {
                                    'operationModes':
                                        {
                                            'heating':
                                                {
                                                    'setpoints':
                                                        {
                                                            'domesticHotWaterTemperature':
                                                                {
                                                                    'settable': true,
                                                                    'requiresReboot': false,
                                                                    'value': 47,
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
                    'modelInfo':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'EBBX16DF9W',
                            'maxLength': 16,
                        },
                    'name':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'Indoor Hydro Unit',
                            'maxLength': 63,
                        },
                    'softwareVersion':
                        {
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
                    'name':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'Outdoor Unit',
                            'maxLength': 63,
                        },
                    'softwareVersion':
                        {
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
                    'modelInfo':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'EBBX16DF9W',
                            'maxLength': 16,
                        },
                    'name':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': 'User Interface',
                            'maxLength': 63,
                        },
                    'softwareVersion':
                        {
                            'settable': false,
                            'requiresReboot': false,
                            'value': '7.4.0',
                            'maxLength': 16,
                        },
                },
            ],
        'embeddedId': '',
        'timestamp': '2024-10-02T09:29:40.484Z',
        'id': '',
    };
