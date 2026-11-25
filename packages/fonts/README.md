# Fonts

Self-hosted DM Sans, DM Mono and Comic Hams font files, with CSS `@font-face`
rules for each family.

All the font and CSS files you need to self-host the UW font families in your
application.

Get the performance gains of self-hosting the font, and the added reliability of
versioning, without the hassle of managing font assets.

_Add the fonts as a dependency, import into your project, and you're ready to go!_ 🚀

- [Included Fonts](#included-fonts)
- [CSS Files](#css-files)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Checking Imports](#checking-imports)

## Included Fonts

This package includes the following font families, styles and weights.

| **Font Family** | **Font Weights** | **Font Styles**   |
| :-------------- | :--------------- | :---------------- |
| DM Sans         | 400, 600, 700    | normal, italic    |
| DM Mono         | 500              | normal, italic    |
| Comic Hams      | 600, 700         | normal            |

## CSS Files

Each family has its own CSS file, and `index.css` loads all of them.

| **CSS File**      | **Loads**                          |
| :---------------- | :--------------------------------- |
| `index.css`       | DM Sans, DM Mono and Comic Hams    |
| `dm-sans.css`     | DM Sans                            |
| `dm-mono.css`     | DM Mono                            |
| `comic-hams.css`  | Comic Hams                         |

The CSS files load the WOFF2 files in `files/woff2/`. The package also ships the
same fonts as TTF in `files/ttf/`, and Android font-family XML in `files/xml/`.

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
import '@utilitywarehouse/hearth-fonts';
```

To include only one family, import its CSS file instead. For example, to load
only DM Sans:

```js
import '@utilitywarehouse/hearth-fonts/dm-sans.css';
```

Then reference the font name in your stylesheet:

```css
body {
  font-family: 'DM Sans', sans-serif;
}
```

## Contributing

The font CSS files are processed with PostCSS. The source files live in `src/`.

```console
pnpm build
```

Run this from `packages/fonts`. It resolves the imports in `src/`, minifies the
result, and writes the CSS files to the package root. `pnpm dev` does the same
and watches for changes.

You can check any changes via the Storybook app (see below).

## Checking Imports

To check the CSS imports work, and the fonts load, as expected, there is a
Storybook app available. From the repository root, run:

```console
pnpm --dir apps/storybook-docs run dev
```

The fonts are loaded in `apps/storybook-docs/.storybook/preview.ts`, and the
**Fonts / Getting Started** page shows the import examples above.

You may have to disable these fonts in your local Font Book to ensure you're
loading them as intended.
