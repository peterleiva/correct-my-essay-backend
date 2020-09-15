/**
 * @file Jest config file
 */

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
	coveragePathIgnorePatterns: ['/node_modules/', '/test/'],
	notify: true,
	moduleDirectories: ['node_modules', 'src', 'test'],
	moduleNameMapper: {
		'^src/(.*)$': '<rootDir>/src/$1',
		'^test/(.*)$': '<rootDir>/test/$1',
	},
	setupFilesAfterEnv: ['jest-extended'],
	reporters: ['default', 'jest-html-reporters'],
};
