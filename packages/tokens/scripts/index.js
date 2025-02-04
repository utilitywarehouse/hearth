import generateJs from './generateJs.js';
import generateCss from './generateCss.js';
import generateBrowser from './generateBrowser.js';

async function buildStyles() {
  const dictionaries = [...generateBrowser()];

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
