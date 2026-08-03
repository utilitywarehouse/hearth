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

Read `assets/docs-template.mdx` when drafting the file structure. The template includes sections for the main component and compound-component sub-props patterns. Adapt the skeleton to your component and remove unused imports or sections.

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
- **LLM-docs pipeline constraint:** Pair `UsageWrap` blocks with an adjacent code fence — the LLM-docs generator drops decorative components and expects their content already duplicated in code. Re-run `pnpm generate:llm-docs` after any props or JSDoc changes to sync the generated llms.txt files (see `packages/react-native/CLAUDE.md`).

## Verify Before You Finish

1. **Read the component's source of truth:** Open `<Component>.props.ts` and cross-check every prop against your drafted Props table. Include all public props with correct types and defaults. For compound components, verify each subcomponent's `.props.ts` file and include a nested props table under the subcomponent's heading.
2. **Treat mismatches as blocking:** If a prop appears in `.props.ts` but not in your table (or vice versa), stop and fix it. This is not a nice-to-have — it's the ground truth check.
3. **Match story names exactly:** Verify that `Stories.Playground` and any other story references exist in the component's `.stories.tsx` file.
4. **Check compound-component structure:** If the component has subcomponents (e.g. `BadgeIcon`, `AccordionItem`), ensure each has its own `### Heading` with a `#### Props` table.

## Checklist

- `*.docs.mdx` file is in the component folder
- `Meta` title matches Storybook nav structure
- `Playground` and `Controls` reference a real story
- `Usage` section has both a live example and a code block
- Props table verified against `.props.ts` (including subcomponents)
- Compound component sub-props documented if applicable
- Optional sections are only added when helpful
- Order of sections should be in the standard pattern (Playground, Usage, Props, then optional sections)
