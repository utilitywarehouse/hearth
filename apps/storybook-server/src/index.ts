import express from 'express';
import path from 'path';
import fs from 'fs';

const app = express();
const PORT = process.env.PORT || 7337;

const projectRoot = path.resolve(__dirname, '..', '..', '..');
const appsDir = path.join(projectRoot, 'apps');

// 1. Serve storybook-docs app's static content from the root
const storybookDocsStaticDir = path.join(appsDir, 'storybook-docs', 'storybook-static');
const storybookDocsIndex = path.join(storybookDocsStaticDir, 'index.html');

// Define other storybook apps to serve
const storybookAppsToServe = [
  { name: 'react', dirName: 'storybook-react' },
  { name: 'react-native', dirName: '../packages/react-native' },
  { name: 'icons', dirName: 'storybook-icons' },
  { name: 'tokens', dirName: 'storybook-tokens' },
  { name: 'fonts', dirName: 'storybook-fonts' },
];

// Setup routes for sub-apps first
storybookAppsToServe.forEach(sbApp => {
  // Correctly join paths, especially for dirName like '../../packages/react-native'
  const appBaseDir = path.resolve(appsDir, sbApp.dirName); // Use resolve to handle '../'
  const appStaticDir = path.join(appBaseDir, 'storybook-static');
  const appIndex = path.join(appStaticDir, 'index.html');
  const routePath = `/${sbApp.name}`;

  if (fs.existsSync(appStaticDir)) {
    app.use(routePath, express.static(appStaticDir)); // Serve static files for the app
    console.log(`Serving ${sbApp.name} from: ${appStaticDir} at ${routePath}`);

    // SPA fallback for this app: any route under /app-name/* not caught by static should serve its index.html
    if (fs.existsSync(appIndex)) {
      app.get(`${routePath}/*`, (req, res) => {
        res.sendFile(appIndex);
      });
    } else {
      console.warn(
        `Warning: index.html not found in ${appStaticDir} for SPA fallback for ${sbApp.name}. Deep links may not work.`
      );
    }
  } else {
    console.warn(
      `Warning: Directory not found for ${sbApp.name}: ${appStaticDir}. Route /${sbApp.name} will not serve content.`
    );
  }
});

// Then, setup routes for the root app (storybook-docs)
if (fs.existsSync(storybookDocsStaticDir)) {
  app.use(express.static(storybookDocsStaticDir)); // Serve static files for the root
  console.log(`Serving Storybook Docs from: ${storybookDocsStaticDir} at /`);

  // SPA fallback for the root app. This should be after all other specific app routes.
  if (fs.existsSync(storybookDocsIndex)) {
    app.get('/*', (req, res, next) => {
      // This handler is for paths that were not caught by:
      // 1. express.static for any of the sub-apps ('/react', '/icons', etc.)
      // 2. SPA fallbacks for any of the sub-apps ('/react/*', '/icons/*', etc.)
      // 3. express.static for the root app ('/')
      // It means the request is likely a deep link for the root SPA.

      // Safeguard: ensure this doesn't incorrectly catch a base path of a sub-app
      // if that sub-app's static dir or index.html was missing, leading to its routes not being fully handled.
      const isSubAppPath = storybookAppsToServe.some(appConfig => {
        const appBasePath = `/${appConfig.name}`;
        // Check if the request path starts with a known sub-app base path
        return req.path === appBasePath || req.path.startsWith(appBasePath + '/');
      });

      if (isSubAppPath) {
        // If it's a path that should have been handled by a sub-app, let it proceed to 404 or other error handling.
        next();
      } else {
        // Not a sub-app path, so assume it's for the root SPA.
        res.sendFile(storybookDocsIndex);
      }
    });
  } else {
    console.warn(
      `Warning: index.html not found in ${storybookDocsStaticDir} for SPA fallback for the root application. Deep links may not work.`
    );
  }
} else {
  console.warn(
    `Warning: Directory not found for Storybook Docs: ${storybookDocsStaticDir}. The root path '/' will not serve content.`
  );
}

app.listen(PORT, () => {
  console.log(`Storybook Aggregator Server listening on http://localhost:${PORT}`);
  if (fs.existsSync(storybookDocsStaticDir)) {
    console.log(`- Main Storybook (docs) available at: http://localhost:${PORT}/`);
  }
  storybookAppsToServe.forEach(sbApp => {
    const appStaticDir = path.join(appsDir, sbApp.dirName, 'storybook-static');
    if (fs.existsSync(appStaticDir)) {
      console.log(`- ${sbApp.name} available at: http://localhost:${PORT}/${sbApp.name}/`);
      if (!fs.existsSync(path.join(appStaticDir, 'index.html'))) {
        console.log(
          `  (Warning: ${sbApp.name} is missing index.html, deep links might not work as expected)`
        );
      }
    }
  });
});
