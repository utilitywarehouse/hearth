---
name: react-native-component-addition
description: "Use when: adding a new component to Hearth React Native (packages/react-native), or mirroring an existing React component's API in React Native. Covers component files, props, exports, stories, and All Components registration — sequences through the react-native-component-docs and figma-code-connect skills for those steps."
argument-hint: "Component name and any special variants or animation requirements"
---

# React Native Component Addition

## When to Use
- Adding a new component under packages/react-native/src/components
- Mirroring an existing React component API in React Native
- Creating stories, docs, and Figma Code Connect entries for a new RN component

## Before You Start
- Check for an existing React web implementation for props and behavior.
- Locate component tokens in packages/react-native/src/tokens (components/*) if styling is token-driven.
- Confirm whether animations are required; use react-native-reanimated when animating.

## Standard Folder Structure
Create a new component folder:

```
packages/react-native/src/components/<Component>/
  <Component>.tsx
  <Component>.props.ts
  <Component>.stories.tsx
  <Component>.docs.mdx
  <Component>.figma.tsx
  index.ts
```

Add additional files as needed (subcomponents, helpers, platform-specific variants).

## Implementation Steps
1. **Props**: Define public props in <Component>.props.ts. Keep types explicit and add JSDoc defaults.
2. **Component**: Implement <Component>.tsx using tokens from theme (useTheme or StyleSheet variants).
3. **Animations**: Use react-native-reanimated for animations. Respect reduce motion via useReducedMotion.
4. **Exports**: Export from index.ts in the component folder, then re-export in packages/react-native/src/components/index.ts.
5. **Stories**: Add <Component>.stories.tsx with a Playground story and key variants. Follow existing Storybook patterns.
6. **Docs**: Add <Component>.docs.mdx. See the [react-native-component-docs](./../react-native-component-docs/SKILL.md) skill for the required structure, sections, and code snippets.
7. **Figma**: Add <Component>.figma.tsx. See the [figma-code-connect](./../figma-code-connect/SKILL.md) skill for the connect API, prop mapping patterns, the `pnpm figma:create` scaffold command, and the publish-approval requirement.
8. **All Components**: Add the component to packages/react-native/docs/components/AllComponents.web.tsx with a minimal demo.
9. **Tests**: Add any tests for components that have complex logic, split out into a Component.utils.ts file and test against that if necessary.
Add storybook story tests for interaction behviour tests where necessary too.

## Checklist
- Component folder with props, implementation, stories, docs, figma, and index exports
- Accessible labels and roles set where relevant (aria, accessibilityRole)
- Token usage aligns with components tokens (theme.components.<component>)
- Stories include a Playground story and at least one variant example
- Docs include Playground, Usage, Props table, and Figma links when available
- All Components list updated

## Notes
- Prefer Unsityles StyleSheet variants for size, colorScheme, and state styling e.g `styles.useVariants({...variants})`.
- Keep docs concise; use real props and default values.
- If the component mirrors the React package, reuse prop names and behavior.
