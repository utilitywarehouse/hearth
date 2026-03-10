# Hearth JSON Assets

This package provides animated illustrations as JSON data.

## Installation

```console
yarn add @utilitywarehouse/hearth-json-assets
```

## Usage

```tsx
import SpotProcessCompleteFunctional from '@utilitywarehouse/hearth-json-assets/lib/spot-process-complete-functional.json';
import Lottie from 'lottie-react';

[...]

<Lottie animationData={SpotProcessCompleteFunctional} />
```

## Adding a new asset

Adding a new asset must be agreed with UX who can confirm the correct animated
illustration with Brand & Creative. When agreed, the original JSON file should
be added to the `raw` directory, and the generation script should be run.

### Generate

This will normalize the added JSON file, add it to the `lib` directory, and
update the Storybook documentation.

Run the following from the root:

```console
pnpm generate:json-assets
```

### Publishing

IF these new assets need to be released, you should add a changeset file,
including the added and removed assets.
