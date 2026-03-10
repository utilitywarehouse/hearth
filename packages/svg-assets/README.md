# Hearth SVG Assets

This package provides static assets, including illustrations and logos, as
optimized SVGs. These are generated from the
[Figma Hearth Illustrations & Assets library](https://www.figma.com/design/bZWlxN5ZzRTlDmnR1EGZun/Hearth-Illustrations---Assets?node-id=1-3&p=f&t=TXanqMDBvlfODavY-0).

## Installation

```console
yarn add @utilitywarehouse/hearth-svg-assets
```

## Usage

```tsx
import LogoFullPurple from '@utilitywarehouse/hearth-svg-assets/lib/logo-full-purple.svg'

[...]

<img src={LogoFullPurple} alt="Utility Warehouse Logo" />
```

## Generate

To re-create the icons from source, run the generation script in this directory.
You will need a valid [Figma access token](https://www.figma.com/developers/api#authentication),
set as an environment variable; `FIGMA_ACCESS_TOKEN`.

```console
pnpm generate
pnpm format
```
