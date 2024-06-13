module.exports = {
	root: true,
	env: { browser: true, es2020: true },
	extends: [
		"eslint:recommended",
		"plugin:solid/typescript",
		'plugin:@typescript-eslint/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	plugins: ['solid'],
	rules: {
		"solid/reactivity": "warn",
		"solid/no-destructure": "warn",
		"solid/jsx-no-undef": "error",
		"@typescript-eslint/no-unused-vars": [
			"warn", {
				"args": "all",
				"argsIgnorePattern": "^_",
				"caughtErrors": "all",
				"caughtErrorsIgnorePattern": "^_",
				"destructuredArrayIgnorePattern": "^_",
				"varsIgnorePattern": "^_",
				"ignoreRestSiblings": true
			}
		],
		"@typescript-eslint/ban-ts-comment": ["error", {
			'ts-ignore': 'allow-with-description',
		}]
	},
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json'],
		tsconfigRootDir: __dirname,
		ecmaFeatures: {
			"jsx": true
		},
	},
}
