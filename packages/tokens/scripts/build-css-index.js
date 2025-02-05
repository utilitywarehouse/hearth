import fs from 'fs-extra';
import path from 'path';

export async function buildCssIndex() {
  const files = fs.readdirSync(path.resolve('./css'));
  const content = files.map(file => `@import '../css/${file}';`).join('\n');
  await fs.outputFile(path.resolve('css', 'index.css'), content, {
    encoding: 'utf8',
  });
}
