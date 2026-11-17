// Custom properties Base UI sets on its positioner and panel elements.
const baseUiProperties = [
  'anchor-width',
  'anchor-height',
  'available-width',
  'available-height',
  'transform-origin',
  'accordion-panel-height',
  'collapsible-panel-height',
];

module.exports = {
  extends: 'stylelint-config-standard',
  plugins: ['stylelint-media-use-custom-media', 'stylelint-value-no-unknown-custom-properties'],
  rules: {
    'at-rule-no-unknown': [true, { ignoreAtRules: ['breakpoints'] }],
    // Enforce prefixes on classnames and keyframes
    'selector-class-pattern': /^((mobile|tablet|desktop|wide):)?-?h-([a-zA-Z\d]|-)+$/,
    'custom-property-pattern': new RegExp(`^(h-([a-zA-Z\\d]|-)+|${baseUiProperties.join('|')})$`),
    'keyframes-name-pattern': /^h-([a-z]|-)+$/,
    'csstools/media-use-custom-media': ['known', { importFrom: ['./src/styles/breakpoints.css'] }],
    'csstools/value-no-unknown-custom-properties': [
      true,
      {
        importFrom: [
          './src/styles/tokens/index.css',
          {
            customProperties: Object.fromEntries(baseUiProperties.map(name => [`--${name}`, '0'])),
          },
        ],
      },
    ],
  },
};
