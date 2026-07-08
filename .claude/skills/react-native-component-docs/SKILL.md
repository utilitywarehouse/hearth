---
name: react-native-component-docs
description: "Use when: creating or updating React Native component docs in Hearth, especially new .docs.mdx files under packages/react-native/src/components. Covers structure, required sections, and code snippets."
---

# React Native Component Docs

This skill guides you in creating new documentation pages for React Native components in the Hearth repo. It mirrors existing patterns in `packages/react-native/src/components/*/*.docs.mdx` and uses Storybook Docs blocks.

## When To Use

- Creating a new `*.docs.mdx` page for a React Native component
- Updating component docs to follow Hearth patterns

## Where Docs Live

- Component docs files are colocated with the component:
  - `packages/react-native/src/components/<Component>/<Component>.docs.mdx`
- Stories referenced by docs live next to them:
  - `packages/react-native/src/components/<Component>/<Component>.stories.tsx`
- Shared docs components are in:
  - `packages/react-native/docs/components`

## Required Imports

Use this exact set as a baseline and prune what you do not use:

```mdx
import { Canvas, Controls, Meta } from '@storybook/addon-docs/blocks';
import { Box, Center, <Component> } from '../..';
import { BackToTopButton, UsageWrap, ViewFigmaButton } from '../../../docs/components';
import * as Stories from './<Component>.stories';
```

Add other imports as needed, e.g. tokens or icons:

```mdx
import { color } from '@utilitywarehouse/hearth-tokens/js';
import { AddSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
```

## Doc Structure (Template)

Use this skeleton and adapt the content to the component:

````mdx
<Meta title="Components / <Component>" />

<BackToTopButton />

<ViewFigmaButton url="<Figma URL>" />

# <Component>

One-paragraph summary of what the component does and when to use it.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)

## Playground

<Canvas of={Stories.Playground} />

<Controls of={Stories.Playground} />

## Usage

<UsageWrap>
  <Center>
    <Box>
      {/* Example usage */}
    </Box>
  </Center>
</UsageWrap>

```tsx
import { <Component> } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <<Component> />
);
```

## Props

| Property | Type | Description | Default |
| --- | --- | --- | --- |
| `example` | `string` | Example prop description. | `""` |
````

## Optional Sections

Add sections when they add value. Keep headings in title case.

- `Examples` for multiple usage examples or variations, usually within the stories file but can be added directly in the docs if simpler. 
Make sure to include code blocks for each example. This is likely needed for most components.
- `Color Schemes` or `Variants` for visual configuration
- `Advanced Usage` when composing subcomponents (e.g. `BadgeIcon`, `BadgeText`), typically to show escaped API for advanced use cases
- `Accessibility` when there are important considerations or features related to accessibility

## Content Guidelines

- Keep intro paragraph short and practical.
- Use a real `Stories.Playground` story for the interactive section.
- Match the component category in the `Meta` title (e.g. `Components /`, `Primitives /`).
- If you include a Figma link, add `ViewFigmaButton` after `BackToTopButton`.
- Keep examples simple and centered with `UsageWrap` + `Center` + `Box`.
- Prefer `tsx` for code blocks unless it is strictly `jsx`.

## Checklist

- `*.docs.mdx` file is in the component folder
- `Meta` title matches Storybook nav structure
- `Playground` and `Controls` reference a real story
- `Usage` section has both a live example and a code block
- `Props` table covers all public props and defaults
- Optional sections are only added when helpful
- Order of sections should be in the standard pattern (Playground, Usage, Props, then optional sections)
