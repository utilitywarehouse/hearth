import fs from 'fs';
import path from 'path';

const loadJSON = relativePath => {
  const filePath = path.resolve(relativePath);
  return JSON.parse(fs.readFileSync(filePath, 'utf8'));
};

export default loadJSON;
