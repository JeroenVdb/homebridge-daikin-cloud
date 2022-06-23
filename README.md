# Homebridge Daikin Cloud plugin

This Homebrige plugin connects to the Daikin Cloud and loads all your devices to be controled via Homebridge and Homekit.

The plugin supports some very basic airco manipulations:
- Current room temperature
- Set airco to cooling, heating or auto + the required temperature
- Set the fan speed

![IMG_7664](https://user-images.githubusercontent.com/657797/166705724-03255e67-252e-480e-9b4f-5cbc33aa9527.jpeg) ![IMG_7665](https://user-images.githubusercontent.com/657797/166705729-748e878a-dfd6-431a-923d-6287ce012bd8.jpeg)

## Fan speed

You can change the fan speed from the accessory settings screen.

Daikin fan speeds are expressed in a number from 1 to many, for example 1 to 5. In Home you need to express the fan speed in a percentage from 1% to 100%.

Example: if you have a Daikin airco with fan speed 1 to 5, you need to set the fan speed to 50% in Home to set the fan speed to 3 on your airco.

![IMG_7678](https://user-images.githubusercontent.com/657797/166897048-2152619a-f270-4b64-9740-5bceac310f19.jpeg)

## Fan direction, swing mode

If your Daikin device support it you can enable swing mode from the accessory settings screen.

If your device supports vertical and horizontal swing both will be started and stopped. Via the Daikin app you can also have a silent swing, this is not yet supported because you can't select this from the Home app.

![IMG_8954](https://user-images.githubusercontent.com/657797/175316496-a5338659-ecc1-4023-8a4b-2ec6b0adaf9b.PNG)


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
            "platform": "DaikinCloud"
        }
    ]
}
```

## Tested with devices

- BRP069C4x
- BRP069A8x

## Credits

Credits for the Daikin Cloud API goes to @Apollon77 for https://github.com/Apollon77/daikin-controller-cloud
