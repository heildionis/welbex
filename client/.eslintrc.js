module.exports = {
	env: {
		browser: true,
		es2021: true,
	},
	extends: ['plugin:react/recommended', 'airbnb', 'prettier'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaFeatures: {
			jsx: true,
		},
		ecmaVersion: 'latest',
		sourceType: 'module',
	},
	plugins: [
		'react',
		'@typescript-eslint',
		'react-hooks',
		'heildionis-plugin',
		'unused-imports',
	],
	rules: {
		'unused-imports/no-unused-imports': 'error',
		'react/jsx-filename-extension': [
			2,
			{
				extensions: ['.js', '.jsx', '.tsx'],
			},
		],
		'import/no-unresolved': 'off',
		'import/prefer-default-export': 'off',
		'object-curly-newline': 'off',
		'no-unused-vars': 'warn',
		'react/require-default-props': 'off',
		'react/react-in-jsx-scope': 'off',
		'react/jsx-props-no-spreading': 'warn',
		'react/function-component-definition': 'off',
		'react/no-array-index-key': 'warn',
		'react/destructuring-assignment': 'warn',
		'no-shadow': 'off',
		'import/order': [
			'error',
			{
				pathGroups: [
					{
						pattern: '@/**',
						group: 'internal',
						position: 'after',
					},
				],
				'newlines-between': 'always',
				alphabetize: {
					order: 'asc',
					caseInsensitive: false,
				},
			},
		],
		'import/extensions': 'off',
		'import/no-extraneous-dependencies': 'off',
		'no-underscore-dangle': 'off',
		'max-len': [
			'error',
			{
				ignoreComments: true,
				code: 130,
			},
		],
		'jsx-quotes': ['error', 'prefer-single'],
		'react/jsx-no-useless-fragment': 'off',
		'no-param-reassign': 'off',
		'linebreak-style': 'off',
		'jsx-a11y/click-events-have-key-events': 'off',
		'jsx-a11y/no-static-element-interactions': 'off',
		'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
		'react-hooks/exhaustive-deps': 'error',
		'no-undef': 'off',
		'heildionis-plugin/path-checker': [2, { alias: '@' }],
		'heildionis-plugin/public-api-imports': [
			'error',
			{
				alias: '@',
				testFilesPatterns: [
					'**/*.test.*',
					'**/*.stories.*',
					'**/StoreDecorator.tsx',
				],
			},
		],
		'heildionis-plugin/layer-imports': [
			'error',
			{
				alias: '@',
				ignoreImportPatterns: [
					'**/StoreProvider',
					'**/testing',
					'**/componentRender',
				],
			},
		],
		'react/jsx-max-props-per-line': ['error', { maximum: 4 }],
		'react/no-unstable-nested-components': 'off',
	},
	globals: {
		__IS_DEV__: true,
		__API__: true,
		__PROJECT__: true,
		__UPLOADS: true,
	},
	overrides: [
		{
			files: ['**/src/**/*.{test,stories}.{ts,tsx}'],
			rules: {
				'i18next/no-literal-string': 'off',
				'max-len': 'off',
				'no-console': 'off',
			},
		},
	],
};
