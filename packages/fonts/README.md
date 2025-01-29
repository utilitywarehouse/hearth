# Fonts

- DM Sans source: https://github.com/googlefonts/dm-fonts/tree/main/Sans/fonts/webfonts
- DM Mono source: https://fonts.google.com/specimen/DM+Mono
- Comic Hams source: https://brandfolder.com/uw/new-brand


All the font and CSS files you need to self-host the UW font families in your
application.

Get the performance gains of self-hosting the font, and the added reliability of
versioning, without the hassle of managing font assets.

_Add the fonts as a dependency, import into your project, and you're ready to go!_ 🚀

- [Included Fonts](#included-fonts)
- [Getting Started](#getting-started)
- [Fonts](#fonts)
  - [Aeonik](#aeonik)
  - [Work Sans](#work-sans)
- [Contributing](#contributing)
- [Checking Imports](#checking-imports)

## Included Fonts

This package includes the following font families, styles and weights.

| **Font Family** | **Font Weights** | **Font Styles** |
| :-------------- | :--------------- | :-------------- |

## Getting Started

Add the Fonts package to your project dependencies.

```console
yarn add @utilitywarehouse/hearth-fonts
# or
pnpm add @utilitywarehouse/hearth-fonts
# or
npm install --save @utilitywarehouse/hearth-fonts
```

You can then import the CSS within your app entry file or site component. This
will include all font families, weights & styles.

```js
import '@utilitywarehouse/hearth-fonts
```

## Contributing

The font CSS files are processed with PostCSS.

```console
pnpm build
```

This will resolve the imported CSS and minify the resulting files.

You can check any changes via the Storybook app, by running the following in the
root directory.

```console
pnpm storybook
```

## Checking Imports

To check the CSS imports work, and the fonts load, as expected, there is a
Storybook app available. In the root directory run:

```console
pnpm storybook
```

You may have to disable these fonts in your local Font Book to ensure you're
loading them as intended.
