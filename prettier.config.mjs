/** @type {{endOfLine: string, plugins: [string], singleQuote: boolean, printWidth: number, useTabs: boolean, tabWidth: number}} */
const config = {
  endOfLine: 'lf',
  tabWidth: 2,
  printWidth: 80,
  singleQuote: true,
  useTabs: false,
  plugins: ['prettier-plugin-packagejson', 'prettier-plugin-tailwindcss'],
};

export default config;
