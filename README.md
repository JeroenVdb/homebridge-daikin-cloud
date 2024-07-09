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

## Important: NEW Daikin API

Have a close look at the config section below, you need to create an App in the Daikin Europe Developer Portal and set up some required parameters.

If you are still having problems going through the authentication flow, check out related issues [https://github.com/JeroenVdb/homebridge-daikin-cloud/issues?q=label%3A%22authorization+flow%22+](here). 

Since 2.0.0 this plugin uses the new Daikin API, this comes with some challenges. The most important one: you can only do 200 calls per day.
We'll need to see how this plugin can help prevent hitting this limit and in the same time be accurate.

### Polling for data

Due to the rate limits on the Daikin API, we need to manage our API calls carefully. Here's our current polling approach:

- By default, we check for new data every 15 minutes. This interval can be adjusted using the `updateIntervalInMinutes` configuration parameter.
- When you make changes, such as setting a new target temperature, we trigger an immediate update to ensure the new status is accurately reflected. We do 
  however wait doing this force update so the Daikin API can process the request.

### Access token or Refresh token is revoked

If something is wrong with your access of refresh token you will need to authorise again. You can do this by deleting the `.
daikin-controller-cloud-tokenset` file from your Homebridge storage directory, you can find this path in the Homebridge UI System Information widget.

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
            "platform": "DaikinCloud",
            "clientId": "<clientId>",
            "clientSecret": "<clientSecret>",
            "oidcCallbackServerBindAddr": "<0.0.0.0>",
            "callbackServerExternalAddress": "<redirectUri address>",
            "callbackServerPort": "<redirectUri port>",
            "showExtraFeatures": false, // boolean, default: false
            "excludedDevicesByDeviceId": [], // array of strings, find you deviceId in the logs when homekit starts
            "updateIntervalInMinutes": 15, // how fast do you want Daikin to poll for new Device data, default: 15
        }
    ]
}
```

### Get config parameters

The following parameters are required:
- clientId
- clientSecret
- callbackServerExternalAddress
- callbackServerPort

First 2 values you will get when you set up your App in the Daikin Europe Developer Portal. The last 2 values make the Redirect URI where the Daikin 
Cloud API will send the tokens to.

#### Create an App in the Daikin Europe Developer Portal

1. Go to https://developer.cloud.daikineurope.com/
2. In the upper right corner click your name and select "My Apps"
3. Click "+ New App"
4. Fill in your application name, auth strategy (Onecta OIDC) and redirect URI (see "callbackServerExternalAddress and callbackServerPort" below)
5. Click create

You will receive a Client ID and Client Secret (keep it with you, you'll only see it once). The Redirect URI is the one you entered in step 4.

#### callbackServerExternalAddress and callbackServerPort

This plugin uses daikin-controller-cloud. This package will set up a small https server where the Authentication flow will finish, so it can get the
required tokens. Because the server is running in our Homebridge instance the callbackServerExternalAddress will match the one of your Homebridge instance, the port is any free port.

For example is you are running Homebridge on a Raspberry Pi with IP `192.168.0.160` and port `8581`, the callbackServerExternalAddress will be `192.168.0.160`.
The callbackServerPort can be `8582` (or any other free port). Once you have both you can also construct the Redirect URI you need to configure your Daikin 
app: `https://<callbackServerExternalAddress>:<callbackServerPort>`. For this example: `https://192.168.0.160:8582`

#### oidcCallbackServerBindAddr

This is the address the http server binds to, this is often just localhost: `127.0.0.1`, if that does not work you can use `0.0.0.0` (be aware that this will 
listen for all incoming connections from all over your network, and if your network allows from over the internet).

If you are still having problems going through the authentication flow, check out related issues [https://github.com/JeroenVdb/homebridge-daikin-cloud/issues?q=label%3A%22authorization+flow%22+](here).

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

## Tested with devices

Devices supported by Daikin Onecta app: https://www.daikin.eu/en_us/product-group/control-systems/onecta/connectable-units.html

- BRP069C4x
- BRP069A8x
- BRP069A78 - Altherma heatpump, we import this as a HeaterCooler [(to be validated)](https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/30)

## Development

In HomeKit you expose an accessory which has one or more services, available services are:
- https://developer.apple.com/documentation/homekit/hmservice/accessory_service_types (HomeKit docs)
- https://developers.homebridge.io/#/service (Homebridge)

Each service has one or more characteristics, check both HomeKit and Homebridge docs to find out which are compatible.
A service can have multiple child services, for example a HeaterCooler service can also have multiple Switch services. But not all services can be combined. 
Use HomeKit Accessory Simulator to find out which are compatible or via the HomeKit docs you can also find links from the service to other services.

### Local

For running a local Homebridge setup: https://github.com/oznu/homebridge-config-ui-x#installation-instructions

```
sudo hb-service start
sudo hb-service stop
```

UI: http://localhost:8581

## Credits

Credits for the Daikin Cloud API goes to @Apollon77 for https://github.com/Apollon77/daikin-controller-cloud
