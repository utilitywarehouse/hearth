# Storybook Icons

This app is used for documenting the icons packages. To run it:

```console
npm run setup
pnpm install
pnpm dev
```

## Scripts

```
./scripts/generate-icons-utils.js
```

Generate a set of utility files to render icon stories and documentation.

To run:

```console
pnpm generate
pnpm format
```

## Templates

```
./templates/icons.ts.ejs
./templates/svg-icons.ts.ejs
./templates/react-icons.ts.ejs
```

A set of [ejs](https://ejs.co/) templates used by the above script to generate
utility files.

## Utils

```
./utils/icons.ts
./utils/svg-icons.ts
./utils/react-icons.ts
```

A set of utilities which are generated from the icon packages manifest files.
These utilities mean we can render the icons in storybook when the icons
packages are generated, without any manual intervention.

## Stories

Each icons package has a story which loops through the relevant utilities file
to render each icon. There is also a [MDX](https://mdxjs.com/docs/)
documentation page, going into more detail for each package. The React Native
story uses the React components so we don't have to try and render RN components
here in Storybook. Clicking on each icon in each story will copy to the
clipboard; the import path for the React and React Native packages, and the raw
SVG for the SVG package.
