import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from 'typescript-eslint';


export default [
	{ files: [ '**/*.{js,mjs,cjs,ts}' ] },
	{ files: [ '**/*.js' ], languageOptions: { sourceType: 'module' } },
	{ languageOptions: { globals: { ...globals.node, ...globals.nodeBuiltin, ...globals.browser } } },
	pluginJs.configs.recommended,
	...tseslint.configs.recommended,
	{
		rules: {
			'arrow-spacing': [ 'warn', { 'before': true, 'after': true } ],
			'brace-style': [ 'error', 'stroustrup', { 'allowSingleLine': true } ],
			'comma-dangle': [ 'error', 'always-multiline' ],
			'comma-spacing': 'error',
			'comma-style': 'error',
			'no-unused-vars': 'off',
			'@typescript-eslint/no-unused-vars': [ 'error', { 'varsIgnorePattern': '__' } ],
			'curly': [ 'error', 'multi-line', 'consistent' ],
			'dot-location': [ 'error', 'property' ],
			'handle-callback-err': 'off',
			'keyword-spacing': 'error',
			'max-nested-callbacks': [ 'error', { 'max': 7 } ],
			'max-statements-per-line': [ 'error', { 'max': 2 } ],
			'no-console': 'off',
			'no-empty-function': 'error',
			'no-floating-decimal': 'error',
			'no-inline-comments': 'error',
			'no-lonely-if': 'error',
			'no-multi-spaces': 'error',
			'no-multiple-empty-lines': [ 'error', { 'max': 2, 'maxEOF': 1, 'maxBOF': 0 } ],
			'no-shadow': [ 'error', { 'allow': [ 'err', 'resolve', 'reject' ] } ],
			'no-trailing-spaces': [ 'error' ],
			'no-var': 'error',
			'object-curly-spacing': [ 'error', 'always' ],
			'prefer-const': 'error',
			'quotes': [ 'error', 'single' ],
			'semi': [ 'error', 'always' ],
			'space-before-blocks': 'error',
			'space-before-function-paren': [ 'error', {
				'anonymous': 'never',
				'named': 'never',
				'asyncArrow': 'always',
			} ],
			'space-in-parens': 'error',
			'space-infix-ops': 'error',
			'space-unary-ops': 'error',
			'spaced-comment': 'error',
			'yoda': 'error',
		},
	},
];