TBD!!!
# Homebridge Daikin Heat Pump Cloud plugin

This Homebrige plugin connects to the Daikin Cloud and loads your Heat Pump devices to be controled via Homebridge and Homekit. 

## This plugin will:
- create a heat pump accesory, that will show current leaving water temperature, heating/cooling mode, offset
- create a temperature accessory that will show current outdoor temperature measured by outdoor heatpump device
- create a water tank accessory, that will show target temperature & current water tank temperature

## You will be able to:
- turn on/off heat pump or water tank
- change Heat Pump mode (heating/cooling)
- set temperature offset for heating/cooling
- set temperature offset for hot watwer tank

![IMG_7664](https://user-images.githubusercontent.com/657797/166705724-03255e67-252e-480e-9b4f-5cbc33aa9527.jpeg) ![IMG_7665](https://user-images.githubusercontent.com/657797/166705729-748e878a-dfd6-431a-923d-6287ce012bd8.jpeg)

## Limitations
Daikin doesn't provide target Heater/Cooler temperature. So the temperature shown in this accessory is current leaving water temperature & target temperature is offset.

Current acessory state doesnt reflect if your device is idle/heating/cooling, because daikin doesn't provide this information (we only know the target state).

Even if you set "Disable on/off switch", you are still able to switch devices on/off in homebridge accessory page (it works fine in ios home).

## Fan speed

You can change the fan speed from the accessory settings screen.

Daikin fan speeds are expressed in a number from 1 to many, for example 1 to 5. In Home you need to express the fan speed in a percentage from 1% to 100%.

Example: if you have a Daikin airco with fan speed 1 to 5, you need to set the fan speed to 50% in Home to set the fan speed to 3 on your airco.

![IMG_7678](https://user-images.githubusercontent.com/657797/166897048-2152619a-f270-4b64-9740-5bceac310f19.jpeg)

## Swing mode

If your Daikin device support it you can enable swing mode from the accessory settings screen.

If your device supports vertical and horizontal swing both will be started and stopped. Via the Daikin app you can also have a silent swing, this is not yet supported because you can't select this from the Home app.

![IMG_8954](https://user-images.githubusercontent.com/657797/175316496-a5338659-ecc1-4023-8a4b-2ec6b0adaf9b.PNG)

## Control extra features (showExtraFeatures: true)

By default this plugin creates a default [HeaterCooler Service](https://developers.homebridge.io/#/service/HeaterCooler) with the above possibilities. If you want you can add `showExtraFeatures: true` to the config. This will create extra switches to enable more special modes of your Daikin (if available).

Supported:
- Streamer mode
- Econo mode
- Powerful mode
- Outdoor silent mode

Extra info and example: https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/8#issuecomment-1188128335


## Install

Install from NPM: https://www.npmjs.com/package/homebridge-daikin-heatpump-cloud

## Config

Add config object to the platform array in your Homebridge `config.json`.

```
{
    "bridge": {
        ...
    },
    "accessories": [],
    "platforms": [
        {
            "username": "<username>",
            "password": "<password>",
            "platform": "DaikinHeatpumpCloud",
            "HotWaterTank": false, // true or false (boolean), default: false
            "OutdoorTemperature": true, // true or false (boolean), default: true
            "DisableOnOff": false //  true or false (boolean), default false
        }
    ]
}
```

## Tested with devices

- EBBX16DF9W (BRP069A78 wifi modul)


## Development

For running a local Homebridge setup: https://github.com/oznu/homebridge-config-ui-x#installation-instructions


## Credits

This project is forked from https://github.com/JeroenVdb/homebridge-daikin-cloud, so special credits goes to @JeroenVdb

Credits for the Daikin Cloud API goes to @Apollon77 for https://github.com/Apollon77/daikin-controller-cloud
