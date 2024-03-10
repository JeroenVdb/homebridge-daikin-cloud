
export default {
	"collectCoverage": true,
    "collectCoverageFrom": ['src/**/*.ts'],
	"coverageDirectory": 'coverage',
	"testMatch": [
		"**/?(*.)+(spec|test).+(ts|tsx|js)"
	],
	"transform": {
		"^.+\\.(ts|tsx)$": "ts-jest"
	},
	verbose: true
}
