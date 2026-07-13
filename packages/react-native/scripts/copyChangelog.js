/**
 * Script to copy CHANGELOG.md to docs folder and convert it to changelog.mdx
 * with proper Meta and BackToTopButton components
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const sourceFile = path.resolve(__dirname, '../CHANGELOG.md');
const targetFile = path.resolve(__dirname, '../docs/changelog.docs.mdx');

// Read the changelog content
console.log('Reading CHANGELOG.md...');
if (!fs.existsSync(sourceFile)) {
  console.error('Error: CHANGELOG.md not found at', sourceFile);
  process.exit(1);
}

let changelogContent = fs.readFileSync(sourceFile, 'utf-8');

// Remove the first line (package name heading)
changelogContent = changelogContent.split('\n').slice(1).join('\n');

// Create the MDX content with imports and components
const mdxContent = `import { Meta } from '@storybook/addon-docs/blocks';
import { BackToTopButton, NextPrevPage } from './components';

<Meta title="Changelog" />
<BackToTopButton />

# Changelog - ${'`@utilitywarehouse/hearth-react-native`'}

The changelog for the Hearth React Native library. Here you can find all the changes, improvements, and bug fixes for each version.

${changelogContent}

<NextPrevPage
  prevLink="getting-started"
  prevTitle="Getting Started"
  nextLink="styling"
  nextTitle="Styling"
/>
`;

// Write the new MDX file
console.log('Writing changelog.docs.mdx...');
fs.writeFileSync(targetFile, mdxContent);

console.log('✅ Changelog copied and transformed successfully!');
console.log(`   Source: ${sourceFile}`);
console.log(`   Target: ${targetFile}`);
