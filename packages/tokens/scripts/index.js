import { buildJs } from './build-js.js';
import { buildCss } from './build-css.js';
import { buildBrowser } from './build-browser.js';

async function buildStyles() {
  const dictionaries = [
    // Build JS objects, optimised for use in React Native applications
    ...buildJs(),
    // Build CSS Custom properties
    ...buildCss(),
    // Build JS objects, optimised for use in the browser. These will refer
    // to CSS custom properties rather than raw values, so need to be used in
    // conjunction with the CSS tokens.
    ...buildBrowser(),
  ];

  try {
    // Style Dictionary v4 is async => buildAllPlatforms returns a Promise
    // We can do Promise.allSettled to run them in parallel:
    await Promise.allSettled(dictionaries.map(d => d.buildAllPlatforms()));
    console.log('Tokens built successfully!');
  } catch (error) {
    console.error('Error building tokens:', error);
  }
}

// Run the build:
(async () => {
  await buildStyles();
})();
