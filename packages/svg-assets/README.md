# Hearth SVG Assets

This package provides the Hearth Assets as optimized svg assets. These svg assets are
generated from the [Figma Hearth Illustrations & Assets library](https://www.figma.com/design/bZWlxN5ZzRTlDmnR1EGZun/Hearth-Illustrations---Assets?node-id=1-3&p=f&t=TXanqMDBvlfODavY-0).

## Installation

```console
yarn add @utilitywarehouse/hearth-svg-assets
```

## Usage

```tsx
import AddMediumIcon from '@utilitywarehouse/hearth-svg-assets/lib/add-medium-icon.svg'

[...]

<img src={AddMediumIcon} alt="add">
```

## Generate

To re-create the icons from source, run the generation script in this directory.
You will need a valid [Figma access token](https://www.figma.com/developers/api#authentication),
set as an environment variable; `FIGMA_ACCESS_TOKEN`.

```console
pnpm generate
pnpm format
```
