/**
 * Script to copy token files from the main tokens package to a local directory
 * This allows the react-native package to use local tokens instead of importing from the library
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define paths
const rootDir = path.resolve(__dirname, '../../../');
const sourceTokensDir = path.resolve(rootDir, 'packages/tokens/src/ts');
const targetTokensDir = path.resolve(__dirname, '../src/tokens');

// Create the target directory if it doesn't exist
if (!fs.existsSync(targetTokensDir)) {
  fs.mkdirSync(targetTokensDir, { recursive: true });
}

/**
 * Remove all contents from a directory without deleting the directory itself
 */
function clearDirectory(directory) {
  if (fs.existsSync(directory)) {
    const entries = fs.readdirSync(directory, { withFileTypes: true });

    for (const entry of entries) {
      const entryPath = path.join(directory, entry.name);
      if (entry.isDirectory()) {
        // Recursively remove directory contents
        clearDirectory(entryPath);
        fs.rmdirSync(entryPath);
      } else {
        // Remove file
        fs.unlinkSync(entryPath);
      }
    }
    console.log(`Cleared contents of: ${directory}`);
  }
}

/**
 * Copy a directory recursively
 */
function copyDirectory(source, target) {
  // Create target directory if it doesn't exist
  if (!fs.existsSync(target)) {
    fs.mkdirSync(target, { recursive: true });
  }

  // Get all files in the source directory
  const entries = fs.readdirSync(source, { withFileTypes: true });

  for (const entry of entries) {
    const sourcePath = path.join(source, entry.name);
    const targetPath = path.join(target, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy directories
      copyDirectory(sourcePath, targetPath);
    } else {
      // Copy files
      fs.copyFileSync(sourcePath, targetPath);
      console.log(`Copied: ${sourcePath} -> ${targetPath}`);
    }
  }
}

// Clear target directory contents before copying
console.log('Removing existing token files...');
clearDirectory(targetTokensDir);

// Copy all token files from source to target
console.log('Copying token files from src/ts directory...');
copyDirectory(sourceTokensDir, targetTokensDir);
console.log('Token files copied successfully!');

// Add a readme explaining the purpose of this directory
const readmePath = path.join(targetTokensDir, 'README.md');
const readmeContent = `# Local Tokens

This directory contains a local copy of the tokens from \`@utilitywarehouse/hearth-tokens\` package.
These files are copied automatically by running \`npm run copyTokens\` script.

DO NOT edit these files directly - they will be overwritten when the script runs again.
Instead, make changes to the source tokens in the tokens package.
`;

fs.writeFileSync(readmePath, readmeContent);
console.log(`Created: ${readmePath}`);

console.log('Done!');
