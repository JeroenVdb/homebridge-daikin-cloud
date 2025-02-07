export class DaikinCloudRepo {
    static maskSensitiveCloudDeviceData(cloudDeviceDetails) {
        return {
            managementPoints: cloudDeviceDetails.managementPoints.map(managementPoint => {
                if (managementPoint.ipAddress) managementPoint.ipAddress.value = 'REDACTED';
                if (managementPoint.macAddress) managementPoint.macAddress.value = 'REDACTED';
                if (managementPoint.ssid) managementPoint.ssid.value = 'REDACTED';
                if (managementPoint.serialNumber) managementPoint.serialNumber.value = 'REDACTED';
                if (managementPoint.wifiConnectionSSID) managementPoint.wifiConnectionSSID.value = 'REDACTED';
                if (managementPoint.consumptionData) managementPoint.consumptionData = 'REDACTED';
                if (managementPoint.schedule) managementPoint.schedule = 'REDACTED';
                if (managementPoint.consumptionData) managementPoint.consumptionData = 'REDACTED';

                return managementPoint;
            }),
            ...cloudDeviceDetails,
        };
    }
}
