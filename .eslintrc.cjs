module.exports = {
  parserOptions: { sourceType: 'module', ecmaVersion: 2024 },
  extends: ['plugin:astro/recommended', 'plugin:tailwindcss/recommended'],
  overrides: [
    {
      files: ['*.astro'],
      parser: 'astro-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        extraFileExtensions: ['.astro'],
      },
      rules: {},
    },
  ],
}
