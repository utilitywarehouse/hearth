module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-media-use-custom-media'],
  rules: {
    'csstools/media-use-custom-media': 'always',
    // Enforce prefixes on classnames and keyframes
    'selector-class-pattern': /^((mobile|tablet|desktop|wide):)?-?uwp-([a-zA-Z]|-)+$/,
    'keyframes-name-pattern': /^uwp-([a-z]|-)+$/,
  },
};
