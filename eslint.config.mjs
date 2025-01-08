/* eslint-disable no-underscore-dangle */
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
    baseDirectory: __dirname,
})

const eslintConfig = [
    ...compat.extends('next/core-web-vitals', 'next/typescript'),
    {
        rules: {
            'arrow-body-style': ['error', 'as-needed'],
            'react/jsx-props-no-spreading': 'error',
            'import/no-extraneous-dependencies': 'error',
            'import/prefer-default-export': 'error',
            'no-console': 'error',
            'no-underscore-dangle': 'error',
            'no-unused-vars': 'error',
            'no-unused-expressions': 'error',
            'no-unused-labels': 'error',
            'no-use-before-define': 'error',
            'no-param-reassign': 'error',
            'no-shadow': 'error',
            'no-nested-ternary': 'error',
            'no-void': 'error',
            'no-continue': 'error',
            'no-restricted-syntax': 'error',
            'no-prototype-builtins': 'error',
            'no-restricted-globals': 'error',
            'no-undef-init': 'error',
            'no-restricted-properties': 'error',
            'no-plusplus': 'error',
            'no-useless-constructor': 'error',
            'no-constant-condition': 'error',
            'no-irregular-whitespace': 'error',
            'no-implicit-coercion': 'error',
            'no-implicit-globals': 'error',
            'no-iterator': 'error',
            'no-new': 'error',
            'no-new-func': 'error',
            'no-new-wrappers': 'error',
            'no-proto': 'error',
            'no-script-url': 'error',
            'no-self-compare': 'error',
            'no-sequences': 'error',
            'no-throw-literal': 'error',
            'no-unmodified-loop-condition': 'error',
            'no-useless-call': 'error',
            'no-useless-catch': 'error',
            'no-useless-concat': 'error',
            'no-useless-escape': 'error',
            'no-useless-return': 'error',
            'prefer-const': 'error',
            'space-infix-ops': 'error',
            'space-infix-ops': 'error',
            'func-names': 'error',
            'no-multi-spaces': 'error',
            'consistent-return': 'error',
            'prefer-destructuring': ['warn', { object: true, array: false }],
            'no-else-return': 'error',
            'react/no-deprecated': 'error',
            'react/no-direct-mutation-state': 'error',
            'react/no-typos': 'error',
            'func-style': ['warn', 'expression'],
        },
    },
]

export default eslintConfig
