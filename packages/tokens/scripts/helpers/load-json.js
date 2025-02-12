import fs from 'fs';
import path from 'path';

export function loadJSON(relativePath) {
  const filePath = path.resolve(relativePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
}
