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
const targetFile = path.resolve(__dirname, '../docs/changelog.mdx');

// Read the changelog content
console.log('Reading CHANGELOG.md...');
if (!fs.existsSync(sourceFile)) {
  console.error('Error: CHANGELOG.md not found at', sourceFile);
  process.exit(1);
}

const changelogContent = fs.readFileSync(sourceFile, 'utf-8');

// Create the MDX content with imports and components
const mdxContent = `import { Meta } from '@storybook/addon-docs/blocks';
import { BackToTopButton } from './components';

<Meta title="Changelog" />
<BackToTopButton />

${changelogContent}
`;

// Write the new MDX file
console.log('Writing changelog.mdx...');
fs.writeFileSync(targetFile, mdxContent);

console.log('✅ Changelog copied and transformed successfully!');
console.log(`   Source: ${sourceFile}`);
console.log(`   Target: ${targetFile}`);
