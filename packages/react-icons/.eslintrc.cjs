/* eslint-env node */
module.exports = {
  extends: ['../../.eslintrc.js', 'plugin:react/jsx-runtime'],
  parserOptions: {
    project: './tsconfig.json',
    tsconfigRootDir: __dirname,
  },
};
