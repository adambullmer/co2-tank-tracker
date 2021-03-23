module.exports = {
  root: true,
  env: {
    browser: true,
    node: true,
    jest: true,
    "jest/globals": true,
  },
  extends: [
    "@nuxtjs/eslint-config-typescript",
    "plugin:prettier/recommended",
    "plugin:nuxt/recommended",
  ],
  plugins: [],
  // add your custom rules here
  rules: {},
};
