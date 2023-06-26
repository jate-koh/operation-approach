module.exports = {
    'root': true,
    'env': {
        'browser': true,
        'es6': true,
        'node': true,
    },
    'extends': ['eslint:recommended', 'plugin:react/recommended'],
    'globals': {
        'Atomics': 'readonly',
        'SharedArrayBuffer': 'readonly'
    },
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': { 'jsx': true },
        'ecmaVersion': 11,
        'sourceType': 'module'
    },
    'plugins': ['react'],
    'rules': {
        // eslint:recommended rules
        'indent': ['warn', 4],
        'linebreak-style': 'off',
        'quotes': ['warn', 'single'],
        'semi': ['warn', 'always'],
        'eqeqeq': 'off',
        'spaced-comment': 'off',
        'no-unused-vars': 'warn',
        'no-undef': 'warn',
        'no-await-in-loop': 'off',
        'no-restricted-syntax': 'off',
        'no-plusplus': 'off',
        'padded-blocks': [ 'warn', {
            classes: "always"
        }],

        // plugin:react/recommended
        'react/prop-types': 'off',
        'react/react-in-jsx-scope': 'off',
        'react/no-unescaped-entities': 'off'

    }
};