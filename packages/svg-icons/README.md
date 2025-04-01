# Hearth SVG Icons

This package provides the Hearth Icons as optimized svg assets. These svg icons are
generated from the [Figma Hearth Icons library](https://www.figma.com/design/x1DivEZ23UPZP7WXufHPjG/Hearth-Icons?node-id=1-144&t=zu1vZUIjbMj2LDzV-0).

## Installation

```console
yarn add @utilitywarehouse/hearth-svg-icons
```

## Usage

```tsx
import AddMediumIcon from '@utilitywarehouse/hearth-svg-icons/lib/add-medium-icon.svg'

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

It's more likely that both the `svg-icons` and `react-icons` packages will be
generated at the same time. In that case you can generate both in the root dir.

```console
pnpm generate
```
