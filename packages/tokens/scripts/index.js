import StyleDictionary from 'style-dictionary';
import path from 'path';
import { fileURLToPath } from 'url';
import { unwrapAlias } from './utils/index.js';
import generateCss from './generateCss.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * --------------------------------------------
 * 1) REGISTER TRANSFORMS
 * --------------------------------------------
 * Style Dictionary v4 uses:
 *   - type: 'value' | 'attribute' | 'name'
 *   - filter(token) => boolean
 *   - transform(token) => any
 *   - optional transitive: true/false
 */

StyleDictionary.registerTransform({
  name: 'alias/variable-js',
  type: 'value',
  // If token has `token.value.alias`, let's transform it
  filter: token => {
    return token.value && typeof token.alias === 'string';
  },
  transform: token => {
    // e.g. "{space.200}" -> "space.200"
    // console.log(token);
    return unwrapAlias(token.alias);
  },
});

/**
 * --------------------------------------------
 * 2) REGISTER TRANSFORM GROUPS
 * --------------------------------------------
 */

StyleDictionary.registerTransformGroup({
  name: 'js-device',
  transforms: [
    'attribute/cti',
    'name/camel',
    // 'alias/variable-js', // our custom transform for alias references in JS
  ],
});

/**
 * --------------------------------------------
 * 3) REGISTER CUSTOM FORMATS
 * --------------------------------------------
 * In v4, you can use `registerFormat({ name, format: fn })`.
 * The function receives an object with shape:
 *   {
 *     dictionary,
 *     platform,
 *     file,
 *     options,
 *     allProperties, // legacy
 *   }
 * and must return a string, which will be written to the file.
 */

/** Example: “Device-based” CSS => :root for mobile, @media for desktop */
StyleDictionary.registerFormat({
  name: 'css/device-variables',
  format: ({ dictionary }) => {
    // console.log(dictionary.allTokens);
    const mobileTokens = dictionary.allTokens.filter(t => t.path[0] === 'mobile');
    const desktopTokens = dictionary.allTokens.filter(t => t.path[0] === 'desktop');

    const mobileVars = mobileTokens
      .map(t => `  --${t.path.slice(1).join('-')}: ${t.value};`)
      .join('\n');
    const desktopVars = desktopTokens
      .map(t => `    --${t.path.slice(1).join('-')}: ${t.value};`)
      .join('\n');

    return `:root {\n${mobileVars}\n}\n\n@media (min-width: 1024px) {\n  :root {\n${desktopVars}\n  }\n}`;
  },
});

/** Example: “Device-based” JS => default is mobile, with a nested “desktop” key */
// StyleDictionary.registerFormat({
//   name: 'js/device-module',
//   format: ({ dictionary }) => {
//     // console.log(dictionary.allTokens);
//     const output = { mobile: {}, tablet: {}, desktop: {} };
//     dictionary.allTokens.forEach(token => {
//       const [device, ...rest] = token.path;
//       if (!output[device]) return; // skip if not 'mobile' or 'desktop'
//       let current = output[device];
//       rest.forEach((part, i) => {
//         if (i === rest.length - 1) {
//           current[part] = token.value;
//         } else {
//           current[part] = current[part] || {};
//           current = current[part];
//         }
//       });
//     });
//     // By design, "mobile" is default root, "desktop" is nested:
//     const final = { ...output.mobile, tablet: output.tablet, desktop: output.desktop };
//     return `export default ${JSON.stringify(final, null, 2)};`;
//   },
// });

/**
 * --------------------------------------------
 * 4) BUILD DICTIONARIES / PLATFORMS
 * --------------------------------------------
 * You can define a set of style dictionaries or just one
 * combined config. The snippet below uses multiple.
 */

async function buildStyles() {
  const dictionaries = [
    ...generateCss(),
    // // // PRIMITIVE tokens
    // new StyleDictionary({
    //   source: [
    //     './tokens/design-tokens---primitive.json',
    //     './tokens/design-tokens---device.json',
    //     './tokens/design-tokens---theme.json',
    //   ],
    //   platforms: {
    //     css: {
    //       transformGroup: 'css-device',
    //       transforms: ['remove-color'],
    //       buildPath: './build/css/',
    //       files: [
    //         {
    //           destination: 'primitive.css',
    //           format: 'css/variables',
    //           filter: token => {
    //             if (token.attributes?.type === 'dark') {
    //               return false;
    //             }
    //             return token.filePath.includes('primitive');
    //           },
    //         },
    //       ],
    //     },
    //     js: {
    //       transforms: ['attribute/cti', 'name/camel'],
    //       buildPath: './build/js/',
    //       files: [
    //         {
    //           destination: 'primitive.js',
    //           format: 'javascript/es6',
    //           filter: token => {
    //             return token.filePath.includes('primitive');
    //           },
    //           // options: {
    //           //   minify: true,
    //           // },
    //         },
    //       ],
    //     },
    //   },
    // }),

    // // DEVICE tokens (mobile vs desktop)
    // new StyleDictionary({
    //   source: [
    //     './tokens/design-tokens---primitive.json',
    //     './tokens/design-tokens---device.json',
    //     './tokens/design-tokens---theme.json',
    //   ],
    //   platforms: {
    //     css: {
    //       transformGroup: 'css-device',
    //       buildPath: './build/css/',
    //       files: [
    //         {
    //           destination: 'device.css',
    //           format: 'css/device-variables', // Our custom device-based CSS format
    //         },
    //       ],
    //     },
    //     js: {
    //       transformGroup: 'js-device',
    //       buildPath: './build/js/',
    //       files: [
    //         {
    //           destination: 'device.js',
    //           format: 'js/device-module', // Our custom device-based JS format
    //         },
    //       ],
    //     },
    //   },
    // }),

    // // THEME tokens (light vs dark)
    // new StyleDictionary({
    //   source: [
    //     './tokens/design-tokens---primitive.json',
    //     './tokens/design-tokens---device.json',
    //     './tokens/design-tokens---theme.json',
    //   ],
    //   platforms: {
    //     css: {
    //       transformGroup: 'css',
    //       buildPath: './build/css/',
    //       files: [
    //         {
    //           destination: 'theme-light.css',
    //           format: 'css/variables',
    //           filter: token => {
    //             // console.log(token);
    //             return token.path[0] === 'light';
    //           },
    //         },
    //         {
    //           destination: 'theme-dark.css',
    //           format: 'css/variables',
    //           filter: token => token.path[0] === 'dark',
    //         },
    //       ],
    //     },
    //     js: {
    //       // could also do 'js-device' if you want alias references or device grouping
    //       transformGroup: 'js-device',
    //       buildPath: './build/js/',
    //       files: [
    //         {
    //           destination: 'theme/light.js',
    //           format: 'javascript/esm',
    //           filter: token => token.path[0] === 'light',
    //           options: {
    //             minify: true,
    //           },
    //         },
    //         {
    //           destination: 'theme/dark.js',
    //           format: 'javascript/esm',
    //           filter: token => token.path[0] === 'dark',
    //           options: {
    //             minify: true,
    //           },
    //         },
    //       ],
    //     },
    //   },
    // }),
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
