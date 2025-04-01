module.exports = {
  plugins: ['@svgr/plugin-jsx'],
  icon: false,
  typescript: true,
  dimensions: true,
  ref: true,
  replaceAttrValues: {
    currentColor: '{color}',
  },
  titleProp: true,
  svgProps: {
    'aria-hidden': '{!title}',
    focusable: 'false',
    role: 'img',
  },
  outDir: 'lib',
};
