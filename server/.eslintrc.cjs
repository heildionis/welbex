module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:@typescript-eslint/recommended',
		'airbnb',
		'prettier',
		'plugin:import/recommended',
	],
	overrides: [],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: ['@typescript-eslint', 'unused-imports'],
	rules: {
		indent: ['error', 'tab'],
		'linebreak-style': ['error', 'windows'],
		quotes: ['error', 'single'],
		semi: ['error', 'always'],
		'no-undef': 'warn',
		'no-unused-vars': 'off',
		'unused-imports/no-unused-imports': 'error',
		'import/prefer-default-export': 'off',
		'import/extensions': ['off', 'always', { ignorePackages: true }],
		'import/no-unresolved': 'off',
		'consistent-return': 'warn',
		'no-underscore-dangle': 'off',
	},
};
