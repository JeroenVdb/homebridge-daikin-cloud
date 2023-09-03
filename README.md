# Homebridge Daikin Cloud plugin

This Homebrige plugin connects to the Daikin Cloud and loads all your devices to be controled via Homebridge and Homekit.

The plugin supports some basic Daikin airco settings:
- Current room temperature
- Set airco to cooling, heating or auto + the required temperature**
- Set the fan speed
- Swing mode (if supported by your device)
- Enable special modes (if supported by your device and enabled in config):
  - powerful mode
  - econo mode
  - streamer mode
  - outdoor silent mode
  - indoor silent/quiet mode

** HomeKit does not support all operation modes of Daikin (for example dry and fan only).

![IMG_7664](https://user-images.githubusercontent.com/657797/166705724-03255e67-252e-480e-9b4f-5cbc33aa9527.jpeg) ![IMG_7665](https://user-images.githubusercontent.com/657797/166705729-748e878a-dfd6-431a-923d-6287ce012bd8.jpeg)

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

By default, this plugin creates a default [HeaterCooler Service](https://developers.homebridge.io/#/service/HeaterCooler) with the above possibilities. If you want you can add `showExtraFeatures: true` to the config. This will create extra switches to enable more special modes of your Daikin (if available).

Supported:
- Streamer mode
- Econo mode
- Powerful mode
- Outdoor silent mode
- Indoor silent/quiet mode

Extra info and example: https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/8#issuecomment-1188128335


## Install

Install from NPM: https://www.npmjs.com/package/homebridge-daikin-cloud

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
            "platform": "DaikinCloud",
            "showExtraFeatures": false, // boolean, default: false
            "excludedDevicesByDeviceId": [], // array of strings, find you deviceId in the logs when homekit starts
        }
    ]
}
```

## Tested with devices

- BRP069C4x
- BRP069A8x

## Development

For running a local Homebridge setup: https://github.com/oznu/homebridge-config-ui-x#installation-instructions

```
sudo hb-service start
sudo hb-service stop
```

UI: http://localhost:8581


## Credits

Credits for the Daikin Cloud API goes to @Apollon77 for https://github.com/Apollon77/daikin-controller-cloud
