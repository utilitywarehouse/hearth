// This is all copied and updated to our needs from
// https://github.com/radix-ui/icons/tree/master/packages/generate-icon-lib
const path = require('path');
const fs = require('fs-extra');
// eslint-disable-next-line @typescript-eslint/naming-convention
const _ = require('lodash');
const { optimize, loadConfig } = require('svgo');
const cheerio = require('cheerio');
const fetch = require('node-fetch');

require('dotenv').config();

console.log('FIGMA_ACCESS_TOKEN:', process.env.FIGMA_ACCESS_TOKEN);
if (!process.env.FIGMA_ACCESS_TOKEN) {
  throw new Error("❌ FIGMA_ACCESS_TOKEN is missing! Make sure it's set.");
}

const figmaConfig = {
  /** The base Figma API url */
  baseUrl: 'https://api.figma.com',
  /** The UW Icons Figma library fileKey */
  fileKey: 'x1DivEZ23UPZP7WXufHPjG',
  /** The headers pass the Figma personal access key to the API, authenticating this script. */
  headers: new fetch.Headers({ 'X-Figma-Token': process.env.FIGMA_ACCESS_TOKEN }),
};

const transformers = {
  /** Build the svg & jsx names of the icon */
  buildIconNames(icon, metadata) {
    // represents icons with the naming convention - `{name}{size}{variant}`
    const baseName = `${icon.name.split(' - ')[0]}${metadata.size}`.replace(/[0-9]/g, '');
    // SVG naming convention = `{name}-{size}-{variant}`
    const svgName = `${_.kebabCase(baseName)}-icon`;
    // JSX naming convention = `{Name}{Size}{Variant}Icon`
    const jsxName = `${_.upperFirst(_.camelCase(baseName))}Icon`;
    return {
      id: icon.id,
      svgName,
      jsxName,
    };
  },
  /** Swaps out all colors (except for "none") for stroke and fill to "currentColor". */
  injectCurrentColor(svgRaw) {
    const $ = cheerio.load(svgRaw, { xmlMode: true });
    $('*').each((_i, el) => {
      Object.keys(el.attribs).forEach(attrKey => {
        if (['fill', 'stroke'].includes(attrKey)) {
          const val = $(el).attr(attrKey);
          if (val !== 'none') {
            $(el).attr(attrKey, 'currentColor');
          }
        }
      });
    });
    return $.xml();
  },
  /** Pass SVG through SVGO to reduce size. */
  async passSVGO(svgRaw, svgPath, config) {
    const { data } = optimize(svgRaw, {
      ...config,
      path: svgPath,
    });
    return data;
  },
};

/**
 * Gets the contents of the UW Icons Figma library.
 *
 * https://www.figma.com/file/WDFaQF9EMtS7MjuIpjDVpf
 *
 * This is the document we will need to pull all the icons out of.
 */
async function getIconsFigmaDocument() {
  const resp = await fetch(`${figmaConfig.baseUrl}/v1/files/${figmaConfig.fileKey}`, {
    headers: figmaConfig.headers,
  });
  const data = await resp.json();
  if (data.status === 403 && data.err === 'Invalid token') {
    throw new Error(
      'An invalid token was used. Follow the Auth Guide (https://git.io/Je87i), and try again.'
    );
  }
  return data.document;
}

/** Get only the small, medium & large icon canvases from the Figma document. */
async function getSizeCanvases(document) {
  return document.children.reduce((canvases, { name, children }) => {
    const [size] = name.split(' - ');

    if (
      (size.includes('Small') || size.includes('Medium') || size.includes('Large')) &&
      children.length > 0
    ) {
      canvases = [...canvases, { size, children }];
    }
    return canvases;
  }, []);
}

/** Gets all the icons from the contents of the Variant frames */
function getIcons(data) {
  return data.reduce((icons, size) => {
    size.children.forEach(columns => {
      columns.children.forEach(nameIconPair => {
        if (!nameIconPair.children) {
          return;
        }
        nameIconPair.children.forEach(item => {
          // we need to pull out the component from the name/icon pair
          if (item.type === 'COMPONENT') {
            icons[item.id] = transformers.buildIconNames(item, size);
          }
          // when there are multiple columns of icons then the name/icon pairs
          // will be nested inside another column frame
          if (item.type === 'FRAME') {
            item.children.forEach(child => {
              if (child.type === 'COMPONENT') {
                icons[child.id] = transformers.buildIconNames(child, size);
              }
            });
          }
        });
      });
    });
    return icons;
  }, {});
}

async function writeIconsToFile(icons) {
  const formatted = Object.values(icons).map(({ id, jsxName }) => ({ id, name: jsxName }));
  await fs.outputFile(
    path.resolve(__dirname, '..', 'icons.json'),
    JSON.stringify(formatted, undefined, 2),
    {
      encoding: 'utf8',
    }
  );
}

/** Gets Figma urls for each icon SVG, using the icon id. */
async function renderIdsToSvgUrls(ids) {
  const resp = await fetch(
    `${figmaConfig.baseUrl}/v1/images/${figmaConfig.fileKey}?ids=${ids}&format=svg`,
    { headers: figmaConfig.headers }
  );

  // We can't be sure of the response, when an error, will have a body that can be streamed to JSON.
  let data = {
    err: null,
    images: {},
  };
  if (resp.headers.get('content-type').includes('application/json')) {
    data = await resp.json();
  }
  const error = typeof data.err === 'object' ? JSON.stringify(data.err, null, 2) : data.err;
  if (!resp.ok) {
    switch (resp.status) {
      case 400:
        throw new Error(`Unexpected error encountered from Figma API\n${error}`);
      case 404:
        throw new Error(
          "One or more of the icons couldn't be found in Figma. Check to see if they still exist, and try again."
        );
      case 500:
        throw new Error('Figma could not render the icons. ಠ_ಠ');
      default:
        throw new Error(`An error occured while rendering icons to SVG.\n${resp.status}\n${error}`);
    }
  }

  if (!data.images || !Object.keys(data.images).length) {
    throw new Error(
      `An error occured after rendering icons in Figma. Render response:\n${JSON.stringify(
        data,
        null,
        2
      )}`
    );
  }

  return data.images;
}

/** Download SVGs and create .svg files in the lib directory. */
async function downloadSvgsToFs(urls, icons) {
  const svgoConfig = await loadConfig();
  await Promise.all(
    Object.keys(urls).map(async iconId => {
      const icon = icons[iconId];
      const fileName = `${icon.svgName}.svg`;

      const processedSvg = await (
        await fetch(urls[iconId])
      )
        .text()
        .then(async svgRaw => transformers.passSVGO(svgRaw, fileName, svgoConfig))
        .then(svgRaw => transformers.injectCurrentColor(svgRaw));

      await fs.outputFile(path.resolve(__dirname, '..', 'lib', fileName), processedSvg, {
        encoding: 'utf8',
      });
    })
  );
}

/** Generates a manifest.json file for use by storybook to generate docs. */
async function generateManifest(icons) {
  const svgIcons = Object.values(icons).reduce((manifest, icon) => {
    const { svgName, jsxName } = icon;
    return [...manifest, { name: jsxName, path: `${svgName}.svg` }];
  }, []);
  await fs.outputFile(
    path.resolve(__dirname, '../manifest.json'),
    JSON.stringify({ svgIcons }, null, 2),
    { encoding: 'utf8' }
  );
}

/** Get a list of icons from the manifest file */
async function getIconsList() {
  const raw = await fs.readFileSync(path.resolve(__dirname, '..', 'manifest.json'), {
    encoding: 'utf8',
  });
  const { svgIcons } = JSON.parse(raw);
  return svgIcons.map(i => i.name);
}

/**
 * Create a temporary list of added and removed icons. This will be deleted
 * after it has been ourputted to the console when running the generate
 * script.
 * Currently this won't list any icons taht have changed. So we'll have to
 * check this manually to see if the change warrants inclusion in the
 * changeset.
 */
async function createTempListOfAddedAndRemovedIcons(previous, updated) {
  const addedIcons = updated.reduce((added, icon) => {
    if (!previous.includes(icon)) {
      added.push(icon);
    }
    return added;
  }, []);

  const removedIcons = previous.reduce((removed, icon) => {
    if (!updated.includes(icon)) {
      removed.push(icon);
    }
    return removed;
  }, []);

  const added = addedIcons.length > 0 ? `- ${addedIcons.join('\n- ')}` : 'No new icons.';
  const removed = removedIcons.length > 0 ? `- ${removedIcons.join('\n- ')}` : 'No removed icons.';
  const content = `
## NEW ICONS

${added}

## REMOVED ICONS

${removed}

`;
  await fs.outputFile(path.resolve(__dirname, '../../../', 'updated-icons.md'), content);
  return { added, removed };
}

async function main() {
  // First get a list of the currently available icons.
  const currentIconsList = await getIconsList();

  // Get the document from Figma
  console.log('getting figma document');
  const document = await getIconsFigmaDocument();
  // Pull out the relevant canvases
  const data = await getSizeCanvases(document);
  // Get all the icons
  console.log('getting icons');
  const icons = getIcons(data);
  // write to file for reference & generating figma code connect files
  await writeIconsToFile(icons);
  // List all the icons ids and use them to get the URLs for each SVG
  const iconIds = Object.keys(icons);
  const iconSvgUrls = await renderIdsToSvgUrls(iconIds);

  // Download those SVGs to file
  console.log('creating svg files');
  await downloadSvgsToFs(iconSvgUrls, icons);
  // generate the manifest for the storybook docs
  await generateManifest(icons);

  // Let's see what icons we have now, and what has been added and removed, so
  // we can add it to the release changeset.
  const updatedIconsList = await getIconsList();
  await createTempListOfAddedAndRemovedIcons(currentIconsList, updatedIconsList);
}

main()
  .then(() => {
    console.log('Thanks, see ya 👋');
  })
  .catch(err => {
    console.error(err);
    return process.exit(1);
  });
