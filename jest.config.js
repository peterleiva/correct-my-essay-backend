module.exports = {
	globals: {
		'ts-jest': {
			tsConfig: 'tsconfig.test.json',
		},
	},
	preset: 'ts-jest',
	testEnvironment: 'node',
	coverageDirectory: 'coverage',
	collectCoverage: true,
	notify: true,
	moduleDirectories: ['node_modules', 'src', 'test'],
	moduleFileExtensions: ['ts', 'js'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
	},
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest',
	},
};
