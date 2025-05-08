module.exports = {
  ...require('@utilitywarehouse/prettier-config'),
  // Override values here
  overrides: [
    {
      files: '**/*.css',
      options: {
        printWidth: 120,
      },
    },
  ],
};
