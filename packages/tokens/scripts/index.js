import generateJs from './generateJs.js';
import buildCss from './build-css.js';

async function buildStyles() {
  const dictionaries = [...buildCss(), ...generateJs()];

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
