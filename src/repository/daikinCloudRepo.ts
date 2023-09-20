export class DaikinCloudRepo {
    static maskSensitiveCloudDeviceData(cloudDeviceDetails) {
        cloudDeviceDetails.map(deviceDetail => {
            deviceDetail = deviceDetail.managementPoints.map(managementPoint => {
                if (managementPoint.embeddedId === 'gateway') {
                    if (managementPoint.ipAddress) managementPoint.ipAddress.value = 'REDACTED';
                    if (managementPoint.macAddress) managementPoint.macAddress.value = 'REDACTED';
                    if (managementPoint.ssid) managementPoint.ssid.value = 'REDACTED';
                    if (managementPoint.serialNumber) managementPoint.serialNumber.value = 'REDACTED';
                    if (managementPoint.wifiConnectionSSID) managementPoint.wifiConnectionSSID.value = 'REDACTED';
                }

                if (managementPoint.embeddedId === 'climateControl' || managementPoint.embeddedId === 'climateControlMainZone') {
                    if (managementPoint.consumptionData) managementPoint.consumptionData = 'REDACTED';
                    if (managementPoint.schedule) managementPoint.schedule = 'REDACTED';
                }

                if (managementPoint.embeddedId === 'domesticHotWaterTank') {
                    if (managementPoint.consumptionData) managementPoint.consumptionData = 'REDACTED';
                    if (managementPoint.schedule) managementPoint.schedule = 'REDACTED';
                }
                return managementPoint;
            });
            return deviceDetail;
        });
        return cloudDeviceDetails;
    }
}
