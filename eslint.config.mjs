import eslint from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintConfigPrettier from 'eslint-config-prettier'

export default tseslint.config({
    ignores: ['dist/**'], // 👈 ignore build output

    languageOptions: {
        parserOptions: {
            project: true,
            tsconfigRootDir: import.meta.dirname
        }
    },
    files: ['**/*.ts'],
    extends: [eslint.configs.recommended, ...tseslint.configs.recommendedTypeChecked, eslintConfigPrettier],
    rules: {
        'no-console': 'error',
        quotes: ['error', 'single', { allowTemplateLiterals: true }],
        '@typescript-eslint/no-unused-vars': [
            'error',
            {
                argsIgnorePattern: '^_', // Ignore unused function args starting with "_"
                varsIgnorePattern: '^_', // Ignore unused variables starting with "_"
                caughtErrorsIgnorePattern: '^_' // Ignore unused caught errors starting with "_"
            }
        ]
    }
})
