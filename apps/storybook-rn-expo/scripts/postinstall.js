const fs = require('fs');
const path = require('path');
const { exec } = require('child_process');

const files = {
  'ComicHams-BoldFlare': '../../../packages/fonts/files/ttf/ComicHams-BoldFlare.ttf',
  'ComicHams-HeavyFlare': '../../../packages/fonts/files/ttf/ComicHams-HeavyFlare.ttf',
  'ComicHams-SemiBoldFlare': '../../../packages/fonts/files/ttf/ComicHams-SemiBoldFlare.ttf',
  'DMMono-Medium': '../../../packages/fonts/files/ttf/DMMono-Medium.ttf',
  'DMMono-MediumItalic': '../../../packages/fonts/files/ttf/DMMono-MediumItalic.ttf',
  'DMSans-Bold': '../../../packages/fonts/files/ttf/DMSans-Bold.ttf',
  'DMSans-BoldItalic': '../../../packages/fonts/files/ttf/DMSans-BoldItalic.ttf',
  'DMSans-Italic': '../../../packages/fonts/files/ttf/DMSans-Italic.ttf',
  'DMSans-Regular': '../../../packages/fonts/files/ttf/DMSans-Regular.ttf',
};

for (const file in files) {
  const targetDir = path.resolve(__dirname, '../assets/fonts');
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  const sourcePath = path.resolve(__dirname, files[file]);
  const targetPath = path.resolve(
    __dirname,
    '../assets/fonts',
    file.toLowerCase().replace(/-/g, '_') + path.extname(files[file])
  );

  fs.copyFile(sourcePath, targetPath, err => {
    // console.log(`Copied ${file} to ${targetPath}`);
    if (err) throw err;
  });
}

exec(`cd ${__dirname} && npx turbo build`, (error, stdout, stderr) => {
  if (error) {
    console.error(`exec error: ${error}`);
    return;
  }
  console.log(stdout);
  console.error(stderr);
});
