# Homebridge Daikin Heat Pump Cloud plugin

This Homebrige plugin connects to the Daikin Cloud and loads your Heat Pump devices to be controled via Homebridge and Homekit. 

## This plugin will:
- create a heat pump accesory, that will show current leaving water temperature, heating/cooling mode, offset
<img width="153" alt="Screenshot 2022-11-15 at 11 22 05" src="https://user-images.githubusercontent.com/26749550/201895772-97cf8ca8-c2ca-4a08-95bc-e88596de1d0b.png">

- create a temperature accessory that will show current outdoor temperature measured by outdoor heatpump device
<img width="153" alt="Screenshot 2022-11-15 at 11 23 48" src="https://user-images.githubusercontent.com/26749550/201895841-03c68c3c-ca34-4077-bcd3-d6f68a79f553.png">

- create a hot water tank accessory, that will show target temperature & current water tank temperature
<img width="153" alt="Screenshot 2022-11-15 at 11 23 07" src="https://user-images.githubusercontent.com/26749550/201895872-c3c1de6b-9b40-4a07-a438-1de0a6677127.png">

## You will be able to:
- turn on/off heat pump or water tank
- change Heat Pump mode (heating/cooling)
- set temperature offset for heating/cooling
<img width="519" alt="Screenshot 2022-11-15 at 11 26 40" src="https://user-images.githubusercontent.com/26749550/201896356-a945dc66-0a86-47a6-a6e6-b25d5f68ff35.png">

- set temperature offset for hot watwer tank
<img width="519" alt="Screenshot 2022-11-15 at 11 26 49" src="https://user-images.githubusercontent.com/26749550/201896462-fc711f25-8fd6-4ca6-90a5-d3230b1a841e.png">

## Plugin settings
- you can disable on/off function
- you can disable hot water tank accessory (may be needed, if you don't own hot water tank device)
- you can disable outdoor temperature settings (may be needed, if you don't own hot water tank device)

## Limitations
Daikin doesn't provide target Heater/Cooler temperature. So the temperature shown in this accessory is current leaving water temperature & target temperature is offset.

Current acessory state doesnt reflect if your device is idle/heating/cooling, because daikin doesn't provide this information (we only know the target state).

Even if you set "Disable on/off switch", you are still able to switch devices on/off in homebridge accessory page (it works fine in ios home).

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
