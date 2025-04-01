# Hearth React Icons

This package provides the Hearth Icons as React components. These icon components
have been generated from the `svg-icons` package.

## Installation

```console
yarn add @utilitywarehouse/hearth-react-icons
```

## Usage

```tsx
import { AddMediumIcon } from '@utilitywarehouse/hearth-react-icons';

[...]

<AddMediumIcon title="add new address" titleId="add-new-address">
```

## Generate

To re-create the icons, run the generation script in this directory.

```console
pnpm generate
pnpm format
```

It's more likely that both the `svg-icons` and `react-icons` packages will be
generated at the same time. In that case you can generate both in the root dir.

```console
pnpm generate
```

For more detailed documentation about the generation of the icons please read
[the relevant documentation](../../ICON_GENERATION.md).
