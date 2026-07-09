---
name: figma-code-connect
description: "Use when: adding or updating Figma Code Connect files for components in packages/react or packages/react-native. The two packages use different formats — read the 'Which package?' section first."
argument-hint: "Component name, package (react or react-native), and Figma URL"
---

# Figma Code Connect

Every new component should have a Figma Code Connect file. Code Connect maps the Figma component to a live code snippet shown in the Figma Dev Mode inspector.

## Which package?

The two packages use **different formats and file locations**:

| | `packages/react` | `packages/react-native` |
|---|---|---|
| **Format** | `.figma.ts` — template API (`figma.selectedInstance`) | `.figma.tsx` — connect API (`figma.connect()`) |
| **Location** | `packages/react/figma/<Name>.figma.ts` | `packages/react-native/src/components/<Name>/<Name>.figma.tsx` |
| **Import** | `@utilitywarehouse/hearth-react` | `from '../'` (component's `index.ts`) |
| **Scaffold** | Write manually | `pnpm figma:create` from `packages/react-native` |
| **Config** | `packages/react/figma.config.json` | `packages/react-native/figma.config.json` |

Do not mix formats between packages. Applying the React Native format in the React package (or vice versa) will break publishing.

---

## React (`packages/react`)

### Format

**Use `.figma.ts` template files** — not `.figma.tsx`. Three legacy `.figma.ts` files already exist as exemplars (`ExpandableCard`, `SegmentedControl`, `SegmentedControlOption`); do not add `.figma.tsx` files to this package.

Place template files in `packages/react/figma/`:

```
packages/react/figma/
  MyComponent.figma.ts
  MyComponentItem.figma.ts   # one file per connected Figma component
```

### Template structure

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

### Prop mapping patterns

#### String and enum props

```ts
const label = instance.getString('Label');           // text content
const size = instance.getEnum('Size', { 'SM-32': 'sm', 'MD-48': 'md' });  // Figma variant → React prop value
const disabled = instance.getBoolean('Disabled?');  // boolean toggle
```

#### Conditional instance swap (icon, avatar, badge slots)

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

#### Conditional string props

```ts
const showHelper = instance.getBoolean('Helper text?');
const helperText = instance.getString('Helper text');

export default {
  example: figma.code`<MyComponent${showHelper ? figma.code` helperText="${helperText}"` : ''} />`,
  ...
};
```

### Compound components (parent + children)

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

### Publishing (React)

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

---

## React Native (`packages/react-native`)

### Format

**Use `.figma.tsx` connect files** with `figma.connect()` from `@figma/code-connect`. Files live co-located with the component, not in a separate directory:

```
packages/react-native/src/components/MyComponent/
  MyComponent.figma.tsx   # co-located with the component
```

The CLAUDE.md for react-native notes these files are excluded from eslint and turbo build inputs.

### Template structure

```tsx
import figma from '@figma/code-connect';
import { MyComponent } from '../';

figma.connect(
  MyComponent,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=<nodeId>',
  {
    props: {
      variant: figma.enum('Variant', {
        'Subtle - Default': 'subtle',
        Emphasis: 'emphasis',
      }),
      size: figma.enum('Size', {
        'SM-24': 'sm',
        'MD-28': 'md',
      }),
      disabled: figma.boolean('Disabled?'),
      icon: figma.boolean('Icon?', {
        true: figma.instance('Icon-20'),
        false: '',
      }),
      label: figma.string('Label'),
    },
    example: props => (
      <MyComponent
        variant={props.variant}
        size={props.size}
        disabled={props.disabled}
        icon={props.icon}
      >
        {props.label}
      </MyComponent>
    ),
  }
);
```

**Import the component from `'../'`** — this resolves to the component folder's `index.ts`, not to the package root. Do not import from `@utilitywarehouse/hearth-react-native` inside the figma file.

### Prop mapping patterns

The connect API uses `figma.enum()`, `figma.boolean()`, `figma.string()`, and `figma.instance()` directly inside the `props` object — no `getEnum`/`getString`/`getBoolean` calls.

| Pattern | Syntax |
|---------|--------|
| Enum | `figma.enum('Figma Property', { 'Figma Value': 'reactProp' })` |
| Boolean | `figma.boolean('Property?')` |
| Boolean with instances | `figma.boolean('Icon?', { true: figma.instance('Icon-20'), false: '' })` |
| String | `figma.string('Label')` |
| Instance | `figma.instance('SlotName')` |

Reference `packages/react-native/src/components/Badge/Badge.figma.tsx` for a complete real-world example.

### Scaffolding

Use the built-in scaffold command rather than writing from scratch:

```sh
pnpm figma:create
```

Run from `packages/react-native`. It generates the boilerplate and prompts for the Figma URL.

### Publishing (React Native)

> **Always get explicit user approval before running any publish command.**

Preview first:

```sh
npx figma connect print
```

Run from `packages/react-native`. When the user has approved, publish with:

```sh
pnpm figma:publish
```

For the full API reference and advanced patterns, invoke `/anthropic-skills:figma-code-connect`.
