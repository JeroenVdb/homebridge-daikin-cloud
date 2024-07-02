# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/)
and this project adheres to [Semantic Versioning](http://semver.org/).

## [Unreleased] - yyyy-mm-dd

TBD

### Added

### Changed

### Fixed

## [1.8.0-beta.0] - 2023-09-05

### Added

- Support for Altherma (fixes https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/30)

### Changed

### Fixed

## [1.7.3] - 2024-03-10

### Added

- Warning about why login sometimes will fail (https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/51)

## [1.7.0] - 2023-09-03

### Added

- Switch for indoor silent/quiet fan speed mode (fixes https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/33)

### Changed

### Fixed

## [1.6.0] - 2023-08-31

### Added

- It is now possible, via the config, to exclude specific devices (fixes https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/31)

### Changed

### Fixed

## [1.5.5] - 2023-08-31

### Added

### Changed

### Fixed

- Fix crashing plugin because it was published before the final commit (fixes https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/38)

## [1.5.3] - 2023-08-24

### Added

### Changed

- Moved detailed logging from the info level to debug. Enable Debug Mode to see the logging again (fixes https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/34)

### Fixed

## [1.5.2] - 2023-03-09

### Added

### Changed

### Fixed

- The plugin crashed when it tries to convert a non-airco device to a HeaterCooler accessory (fixes https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/29)

## [1.5.1] - 2023-02-28

Labels are back!

### Added

- Add funding link to https://www.paypal.me/jrnvdb

### Changed

### Fixed

## [1.5.0] - 2023-02-28

Labels are back!

### Added

### Changed

### Fixed

- Labels now have the correct label again. Restarting Homebridge and Home should bring back the labels (https://github.com/JeroenVdb/homebridge-daikin-cloud/issues/27)

## [1.4.0] - 2022-09-28

Here we would have the update steps for 1.2.4 for people to follow.

### Added

### Changed

### Fixed

- Merged https://github.com/JeroenVdb/homebridge-daikin-cloud/pull/16 which fixes an incompatibility for users using fahrenheit
- Extra services are now also removed after settings the showExtraFeatures option from true to false (https://github.com/JeroenVdb/homebridge-daikin-cloud/commit/11ffb863ab7b99906a23e8ae816302bf47940f0a)
