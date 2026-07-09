---
name: figma-code-connect
description: "Use when: adding or updating Figma Code Connect template files (.figma.ts) for components in packages/react. Covers the template format, compound component patterns, and Hearth-specific conventions."
argument-hint: "Component name and Figma URL"
---

# Figma Code Connect

Every new component should have a Figma Code Connect template file. Code Connect maps the Figma component to a live code snippet shown in the Figma Dev Mode inspector.

## Format

**This project uses template files (`.figma.ts`) — not parser-based files (`.figma.tsx` with `figma.connect()`).** Do not create `.figma.tsx` files. The two formats are incompatible; mixing them breaks the template engine.

Place template files in `packages/react/figma/`:

```
packages/react/figma/
  MyComponent.figma.ts
  MyComponentItem.figma.ts   # one file per connected Figma component
```

`figma.config.json` in `packages/react` includes these directories via `"include": ["figma/**/*", "src/**/*"]` and maps import paths via `"importPaths"`.

## Template structure

```ts
// url=https://www.figma.com/design/<fileKey>/<fileName>?node-id=<nodeId>
// source=../src/components/MyComponent/MyComponent.tsx
// component=MyComponent
import figma from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', { 'SM': 'sm', 'MD': 'md' });
const label = instance.getString('Label');
const disabled = instance.getBoolean('Disabled');

export default {
  example: figma.code`<MyComponent size="${size}"${disabled ? ' disabled' : ''}>${label}</MyComponent>`,
  imports: ['import { MyComponent } from "@utilitywarehouse/hearth-react"'],
  id: 'my-component',
};
```

## Prop mapping patterns

### String and enum props

```ts
const label = instance.getString('Label');           // text content
const size = instance.getEnum('Size', { 'SM-32': 'sm', 'MD-48': 'md' });  // Figma variant → React prop value
const disabled = instance.getBoolean('Disabled?');  // boolean toggle
```

### Conditional instance swap (icon, avatar, badge slots)

Use `getBoolean` to check if a slot is shown, then `getInstanceSwap` to retrieve the nested component. Reference `ExpandableCard.figma.ts` for the complete pattern:

```ts
const showIcon = instance.getBoolean('Leading Content');
const iconInstance = showIcon ? instance.getInstanceSwap('Icon-20') : null;
let iconCode;
if (iconInstance && iconInstance.type === 'INSTANCE') {
  iconCode = iconInstance.executeTemplate().example;
}

export default {
  example: figma.code`<MyComponent${iconCode ? figma.code` icon={${iconCode}}` : ''} />`,
  ...
};
```

### Conditional string props

```ts
const showHelper = instance.getBoolean('Helper text?');
const helperText = instance.getString('Helper text');

export default {
  example: figma.code`<MyComponent${showHelper ? figma.code` helperText="${helperText}"` : ''} />`,
  ...
};
```

## Compound components (parent + children)

For compound components where the parent renders configurable child instances:

1. **Create a template file for each Figma component** — parent and child each get their own `.figma.ts`.
2. **Mark child templates as nestable** — add `metadata: { nestable: true }` to the child's export so it renders inline rather than as a separate snippet.
3. **Resolve children in the parent with `findLayers`** — use `instance.findLayers(n => n.type === 'INSTANCE')` rather than `findConnectedInstances`. `findConnectedInstances` requires the child template to already be registered in Figma's Code Connect system; `findLayers` works immediately by scanning the layer tree directly.

```ts
// ParentComponent.figma.ts
const childLayers = instance.findLayers(n => n.type === 'INSTANCE');
const child0 = childLayers[0]?.type === 'INSTANCE' ? childLayers[0].executeTemplate().example : undefined;
const child1 = childLayers[1]?.type === 'INSTANCE' ? childLayers[1].executeTemplate().example : undefined;
const child2 = childLayers[2]?.type === 'INSTANCE' ? childLayers[2].executeTemplate().example : undefined;

export default {
  example: figma.code`<ParentComponent>
  ${child0}${child1}${child2}
</ParentComponent>`,
  imports: ['import { ParentComponent, ChildComponent } from "@utilitywarehouse/hearth-react"'],
  id: 'parent-component',
};
```

```ts
// ChildComponent.figma.ts — nestable child
export default {
  example: figma.code`<ChildComponent value="${value}" label="${label}" />`,
  imports: ['import { ChildComponent } from "@utilitywarehouse/hearth-react"'],
  id: 'child-component',
  metadata: { nestable: true },
};
```

## Publishing

> **Always get explicit user approval before running any publish command.** Publishing pushes live to Figma and affects what all designers see in Dev Mode — it cannot be undone by reverting a file.

Once the template file is ready, preview the output locally first:

```sh
npx figma connect print --file figma/MyComponent.figma.ts
```

Run this from `packages/react`. Review the printed snippet before publishing.

When the user has approved, publish with:

```sh
npx figma connect publish --file figma/MyComponent.figma.ts
```

For the full API reference and advanced patterns, invoke `/anthropic-skills:figma-code-connect`.
