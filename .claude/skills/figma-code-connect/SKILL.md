---
name: figma-code-connect
description: "Use when: adding or updating Figma Code Connect files for components in packages/react or packages/react-native. Both packages use the same .figma.ts template format — only file location and a couple of details differ, see 'Which package?' below."
argument-hint: "Component name, package (react or react-native), and Figma URL"
---

# Figma Code Connect

Every new component should have a Figma Code Connect file. Code Connect maps the Figma component to a live code snippet shown in the Figma Dev Mode inspector.

Both `packages/react` and `packages/react-native` use the **template format** (`.figma.ts`, built on `figma.selectedInstance`). This replaced the older `figma.connect()`-based `.figma.tsx` connect API. As of this writing, migration is complete — there are no `.figma.tsx` files left in either package — but see [Legacy connect API](#legacy-connect-api-historical-context) at the bottom for historical context, or in the rare case a new one shows up.

Reference docs for everything in this file:
* Template Files — https://developers.figma.com/docs/code-connect/template-files/ (file structure, the migration script, slots)
* Template API — https://developers.figma.com/docs/code-connect/template-api/ (full `InstanceHandle` method surface, `figma.helpers.react`, default export shape)
* Batch Files — https://developers.figma.com/docs/code-connect/batch-files/ (`.figma.batch.ts`/`.figma.batch.json` pairs)

## Which package?

Both packages use `.figma.ts` template files. Only these differ:

| | `packages/react` | `packages/react-native` |
|---|---|---|
| **Location** | `packages/react/figma/<Name>.figma.ts` (flat directory) | `packages/react-native/src/components/<Name>/<Name>.figma.ts` (co-located with the component) |
| **Config** | `packages/react/figma.config.json` | `packages/react-native/figma.config.json` |
| **`// source=` comment** | Relative path back to the component, e.g. `../src/components/ExpandableCard/ExpandableCard.tsx` | Full GitHub blob URL, e.g. `https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Badge/Badge.tsx` |

**Import convention is the same for both**: import from the published package name (`@utilitywarehouse/hearth-react` or `@utilitywarehouse/hearth-react-native`), not a relative path. This is resolved via the `importPaths` mapping in each package's `figma.config.json`. (The legacy `.figma.tsx` connect format for React Native required importing from the component's local `'../'` to avoid a resolution issue — that workaround does not apply to `.figma.ts` templates; `npx figma connect migrate` rewrites these imports to the package name automatically.)

Do not mix formats between packages, and don't hand-roll the old `figma.connect()` API in either package going forward.

---

## Template file structure

```ts
// url=https://www.figma.com/design/<fileKey>/<fileName>?node-id=<nodeId>
// source=<see the per-package convention in the table above>
// component=MyComponent
import figma from 'figma';

const instance = figma.selectedInstance;

const size = instance.getEnum('Size', { 'SM': 'sm', 'MD': 'md' });
const label = instance.getString('Label');
const disabled = instance.getBoolean('Disabled');

export default {
  id: 'my-component',
  // Import from the published package name for whichever package you're in —
  // "@utilitywarehouse/hearth-react" or "@utilitywarehouse/hearth-react-native" (see the table above).
  imports: ['import { MyComponent } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<MyComponent${figma.helpers.react.renderProp('size', size)}${figma.helpers.react.renderProp('disabled', disabled)}>${figma.helpers.react.renderChildren(label)}</MyComponent>`,
  metadata: { props: { size, label, disabled } },
};
```

The `// url=` / `// source=` / `// component=` header comments are metadata for the CLI, not executed code — always include all three. The default export has three fields:

| Field | Purpose |
|---|---|
| `example` | The rendered code snippet — built with the `figma.code` tagged template. |
| `imports` | Array of import statement strings shown alongside the snippet. |
| `id` | Template identifier. |
| `metadata` (optional) | `{ nestable: true }` marks a child template as renderable inline when a parent resolves it — see [Compound components](#compound-components-parent--children). `{ props: {...} }` exposes every resolved const from the template (not just the ones interpolated into `example`) so a parent template can read a child's raw data via `executeTemplate().metadata.props`, not just its rendered code — always include it, keyed by the same names as your local `const` declarations. |

## The `InstanceHandle` API

Everything hangs off `figma.selectedInstance` (an `InstanceHandle`), or off a handle returned by one of its own methods (e.g. a nested instance from `findInstance`).

| Method | Use for |
|---|---|
| `getString(propName)` | Text property values |
| `getBoolean(propName, options?)` | Boolean toggle properties; pass `options` to map `true`/`false` to different values (e.g. rendering an instance swap) |
| `getEnum(propName, options)` | Variant/enum properties — maps each Figma value to its code equivalent |
| `getInstanceSwap(propName)` | An instance-swap property — returns the swapped `InstanceHandle` |
| `getSlot(propName)` | A **slot** property — returns a `SlotResult` (see [Slots](#slots)) |
| `getPropertyValue(propName)` | Raw, untransformed property value — avoid; prefer the typed getters above |
| `findText(layerName, opts?)` | Locate a text layer by name |
| `findInstance(layerName, opts?)` | Locate a single nested instance by name |
| `findConnectedInstance(codeConnectId, opts?)` | Locate a nested instance by its Code Connect ID |
| `findConnectedInstances(selectorFn, opts?)` | All nested instances matching a predicate that already have their own Code Connect definition |
| `findLayers(selectorFn, opts?)` | All layers (instances or text) matching a predicate — works without Code Connect registration, unlike `findConnectedInstance(s)` |
| `executeTemplate()` | Renders a nested instance's own template — `{ example, metadata }` |
| `hasCodeConnect()` | Whether the instance has an associated Code Connect definition |
| `codeConnectId()` | The instance's Code Connect ID, or `null` |

Prefer the typed getters (`getBoolean`/`getEnum`/`getString`/`getInstanceSwap`/`getSlot`) over `getPropertyValue()` — if you're refactoring a migrated file and see `getPropertyValue()`, replace it with the typed equivalent.

**Lookup methods return an error handle, not `undefined`, when they fail.** `findInstance`, `findText`, and similar layer lookups return an object typed `{ type: 'ERROR' }` when the layer doesn't exist — e.g. it's absent entirely from the currently selected variant, not just hidden. This is **not** `null`/`undefined`, so optional chaining (`?.`) does not guard against it — chaining a method call straight onto the result throws (e.g. `<result>.getInstanceSwap is not a function`) instead of short-circuiting. Always check `.type !== 'ERROR'` before calling anything else on a lookup result:

```ts
const badgeInstance = instance.findInstance('Badge');
const badge =
  badgeInstance && badgeInstance.type !== 'ERROR' ? badgeInstance.executeTemplate().example : undefined;
```

This bites most often when a nested instance only exists conditionally — e.g. it's present in the `true` variant of a boolean toggle but removed entirely (not just hidden) in the `false` variant.

### `figma.helpers.react`

Use these instead of hand-rolling conditional template branches — they handle prop/children formatting for you:

```ts
figma.helpers.react.renderProp('disabled', true);   // → " disabled"
figma.helpers.react.renderChildren('Hello');         // → "Hello"
```

`renderProp(name, value)` omits the prop entirely when `value` is `undefined`/`false`/empty, so you don't need manual ternaries for optional props. `renderChildren(value)` does the same for a component's children content.

## Prop mapping patterns

```ts
const label = instance.getString('Label');
const size = instance.getEnum('Size', { 'SM-32': 'sm', 'MD-48': 'md' });
const disabled = instance.getBoolean('Disabled?');
```

### Instance swap (icon, avatar slots that are a single swappable instance)

```ts
const icon = instance.getBoolean('Icon?', {
  true: instance.getInstanceSwap('Icon-20')?.executeTemplate().example,
  false: '',
});
```

If the swapped-in instance itself has no Code Connect definition — e.g. it's a local wrapper frame around the real asset, common with illustration/spot-asset libraries where the wrapper lives in the design file but the actual connected component is a nested instance from a separate published library — `.executeTemplate()` on the swap result directly won't resolve. Use `findConnectedInstances()` to search its descendants for the first one that does have a Code Connect definition, rather than assuming a fixed layer name or nesting depth (both can vary per swapped-in asset):

```ts
const illustrationInstance = instance.findInstance('Modal illustration');
const illustrationSwap =
  illustrationInstance && illustrationInstance.type !== 'ERROR'
    ? illustrationInstance.getInstanceSwap('Illustration')
    : undefined;
const illustrationAsset = illustrationSwap?.findConnectedInstances(() => true)[0];
const illustration = illustrationAsset?.executeTemplate().example;
```

### Slots

Figma components can expose a **slot** property — a placeholder that accepts one or more connected child instances, each with its own Code Connect definition. This is different from an instance-swap property (always exactly one fixed swap target) and from `figma.children()`/`findLayers` (which matches by layer name/type regardless of Code Connect registration).

```ts
const slot = instance.getSlot('Actions');
const actions = slot?.connectedInstances.map(action => action.executeTemplate().example) ?? [];

export default {
  example: figma.code`<ActionBar>${actions.flat()}</ActionBar>`,
  // ...
};
```

- `getSlot(propName)` returns `undefined` if the slot property doesn't exist or has no valid reference.
- `slot.connectedInstances` is an array of `InstanceHandle` — **only instances that already have their own published (or locally present) Code Connect definition are included.** A slot that can hold a single item still returns an array; index `[0]` if you only expect one.
- Call `.executeTemplate().example` on each connected instance, `.map()` across the array, then interpolate with `.flat()` — the `.flat()` handles the nested array structure `figma.code` produces.

Use `getSlot()` whenever the Figma component's property panel shows the property type as **Slot** — check via `get_context_for_code_connect` (Figma MCP) or the Dev Mode inspector, don't assume from the property name. Components authored before slots existed in Figma may have an old boolean+instance-swap pair, or a bare `figma.children()`/`findLayers()` call, doing the same job — when migrating one of these, verify against the live component and switch to `getSlot()` if the property has since become a real slot.

### Compound components (parent + children)

For a parent that renders configurable child instances **without** a slot property (rare — most new compound components expose a slot; use this only when they genuinely don't):

```ts
// ParentComponent.figma.ts
const childLayers = instance.findLayers(n => n.type === 'INSTANCE');
const child0 = childLayers[0]?.type === 'INSTANCE' ? childLayers[0].executeTemplate().example : undefined;

export default {
  example: figma.code`<ParentComponent>${child0}</ParentComponent>`,
  imports: ['import { ParentComponent, ChildComponent } from "@utilitywarehouse/hearth-react-native";'],
  id: 'parent-component',
};
```

```ts
// ChildComponent.figma.ts — nestable child
export default {
  example: figma.code`<ChildComponent value="${value}" label="${label}" />`,
  imports: ['import { ChildComponent } from "@utilitywarehouse/hearth-react-native";'],
  id: 'child-component',
  metadata: { nestable: true },
};
```

Every Figma component that can appear nested inside a parent's template needs its **own** `.figma.ts` file with `metadata: { nestable: true }` — a parent can only resolve children that have their own Code Connect definition (via `getSlot()`/`findConnectedInstances`) or that it locates directly by layer (via `findLayers`).

### Reusing a sibling template's resolved values

`metadata` isn't limited to `{ nestable: true }` or rendering a child inline — a template can also expose its resolved values so a *different* template flattens them onto its own props, instead of duplicating the same resolution logic. This comes up when several components each embed the same shared sub-component and flatten its props directly onto their own (rather than rendering it as a nested element) — e.g. multiple components embed a `Section Header` instance and each expose `heading`/`helperText`/`trailingContent` as their own top-level props:

```ts
// SectionHeader.figma.ts
const heading = instance.getString('Heading');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
// ...more resolution...

export default {
  example: figma.code`<SectionHeader ... />`,
  id: 'section-header',
  metadata: { props: { heading, helperText, trailingContent } },
};
```

```ts
// DescriptionList.figma.ts — embeds a Section Header instance
const sectionHeaderInstance = instance.findInstance('Section Header');
const sectionHeaderTemplate =
  sectionHeaderInstance && sectionHeaderInstance.type !== 'ERROR'
    ? sectionHeaderInstance.executeTemplate()
    : undefined;
const sectionHeader = sectionHeaderTemplate?.metadata.props;

export default {
  example: figma.code`<DescriptionList${figma.helpers.react.renderProp('heading', sectionHeader?.heading)}${figma.helpers.react.renderProp('helperText', sectionHeader?.helperText)}>...</DescriptionList>`,
  id: 'description-list',
};
```

Only do this when the embedded instance is genuinely the *same, current* component your other template already resolves — check the live Figma structure (`get_context_for_code_connect`) first. A layer that looks like the same sub-component by name (e.g. an older "Section Header" variant with different properties, left over from before a component was updated) can silently produce wrong or `undefined` values if you assume the shared shape without checking.

`metadata` can carry other custom keys beyond `props` too, for data that isn't itself a resolved prop — e.g. a boolean flag like `needsLinkImport` the embedding template needs to decide whether to add an extra import, since `executeTemplate()` only ever returns `{ example, metadata }`, never `imports`.

## Batch files

If a single source file has 10+ Code Connect docs following an identical shape (e.g. an icon library), `npx figma connect migrate` may produce a `.figma.batch.ts` (the shared template) + `.figma.batch.json` (per-component data: URL, name, id, import path) pair instead of one file per component. This is expected to be rare in Hearth — most components here have a handful of connections, well under the batch threshold. If you do hit one, don't split it back into individual files; per-component values come from `figma.batch.*` inside the template rather than being hardcoded.

## Migrate → review → refactor → verify workflow

This is the workflow for turning an existing `.figma.tsx` (legacy connect API) file into a `.figma.ts` template — not a blind rewrite, and not a bare mechanical script run.

1. **Migrate** — from the package directory, run:
   ```sh
   npx figma connect migrate --file src/components/<Name>/<Name>.figma.tsx
   ```
   (React: `figma/<Name>.figma.tsx`). This is a local, offline transform — it does not call the Figma API. Pass multiple `--file` paths together for a parent + its subcomponents.
2. **Review** — don't trust the migrated output blindly:
   - Check every mapped prop against the component's own `<Name>.props.ts` and `<Name>.docs.mdx`.
   - Cross-check against the **live** Figma component's current properties/variants/slots — use the Figma MCP `get_context_for_code_connect` tool (fileKey + nodeId from the file's `// url=` comment) to get the authoritative property list, including each property's `type`. Components drift from their original Code Connect mapping over time, and some now expose `SLOT`-type properties that didn't exist when the file was first authored.
3. **Refactor** — the migrate script's output already uses typed getters, but still check for and fix:
   - Any leftover `getPropertyValue()` → replace with the matching typed getter.
   - Any property the live Figma data reports as `type: "SLOT"` that the migrated file is still treating as `getInstanceSwap()`/`figma.children()`/`findLayers()` → switch to `getSlot()` (see [Slots](#slots)).
   - Overly verbose conditional branching → collapse using `figma.helpers.react.renderProp`/`renderChildren` where it fits.
4. **Delete** the old `.figma.tsx` file once you're confident the new file is correct.
5. **Verify** — preview the rendered output:
   ```sh
   npx figma connect preview --file src/components/<Name>/<Name>.figma.ts --token "$FIGMA_CODE_CONNECT_TOKEN"
   ```
   Older docs and issue templates refer to this as `figma connect print` — that subcommand does not exist in the installed CLI (`@figma/code-connect` v1.4.8 at time of writing); `preview` is the correct command. `preview` calls the live Figma API to resolve slots/instance-swaps, so it requires a token with **both** the "File Read" and "Code Connect Write" scopes — a token missing "Code Connect Write" will fail every file with `Invalid scope(s)`, not just the one you're checking. The CLI only auto-reads `FIGMA_ACCESS_TOKEN` from the environment (via `dotenv`), but this repo's token is stored as `FIGMA_CODE_CONNECT_TOKEN` — always pass it explicitly with `--token`, as above, for `preview`, `migrate` (only needed if resolving imports against the live file), and `publish`.

## Publishing

> **Always get explicit user approval before running any publish command**, for either package. Publishing pushes live to Figma and affects what all designers see in Dev Mode — it cannot be undone by reverting a file.

```sh
# React — from packages/react
npx figma connect publish --file figma/MyComponent.figma.ts --token "$FIGMA_CODE_CONNECT_TOKEN"

# React Native — from packages/react-native
pnpm figma:publish -- --token "$FIGMA_CODE_CONNECT_TOKEN"
```

## Legacy connect API (historical context)

Fully migrated as of this writing — there are no `.figma.tsx` files left in `packages/react` or `packages/react-native`. Older files used `figma.connect()` from `@figma/code-connect` instead of the template API:

```tsx
import figma from '@figma/code-connect';
import { MyComponent } from '../';

figma.connect(MyComponent, 'https://www.figma.com/design/.../?node-id=<nodeId>', {
  props: {
    variant: figma.enum('Variant', { 'Subtle - Default': 'subtle', Emphasis: 'emphasis' }),
    disabled: figma.boolean('Disabled?'),
    icon: figma.boolean('Icon?', { true: figma.instance('Icon-20'), false: '' }),
    label: figma.string('Label'),
    items: figma.children('Accordion Item'),
  },
  example: props => (
    <MyComponent variant={props.variant} disabled={props.disabled} icon={props.icon}>
      {props.label}
    </MyComponent>
  ),
});
```

This format is legacy — do not write new `.figma.tsx` connect files. It's included here only so migrated code can be traced back to its source when reviewing a `git diff`, and because `figma.children()`/`figma.instance()` in an old file are exactly the patterns that a live-Figma slot has often since replaced (see [Slots](#slots)).

For the full API reference and advanced patterns beyond this file, invoke `/anthropic-skills:figma-code-connect`.
