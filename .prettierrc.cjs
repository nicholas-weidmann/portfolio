/** @type {import("prettier").Config} */
module.exports = {
  printWidth: 120,
  singleQuote: true,
  useTabs: false,
  tabWidth: 2,
  semi: false,
  bracketSpacing: true,
  trailingComma: 'all',
  plugins: ['prettier-plugin-astro'],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro',
      },
    },
  ],
}
