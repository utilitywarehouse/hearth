import { generateJsTokens } from './generate-js-tokens.js';
import { generateCssTokens } from './generate-css-tokens.js';
import { generateBrowserTokens } from './generate-browser-tokens.js';

async function generateTokens() {
  const dictionaries = [
    // Generate JS objects, optimised for use in React Native applications
    ...generateJsTokens(),
    // Generate CSS Custom properties
    ...generateCssTokens(),
    // Generate JS objects, optimised for use in the browser. These will refer
    // to CSS custom properties rather than raw values, so need to be used in
    // conjunction with the CSS tokens.
    ...generateBrowserTokens(),
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
  await generateTokens();
})();
