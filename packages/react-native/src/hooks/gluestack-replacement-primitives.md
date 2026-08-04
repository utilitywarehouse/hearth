# Shared headless primitives for the gluestack migration (UWDS-4791)

Design note for the two state primitives that replace gluestack's `create*`
factories, so the Accordion ([UWDS-4798](https://linear.app/utilitywarehouse/issue/UWDS-4798))
and form-control+radio+checkbox ([UWDS-4800](https://linear.app/utilitywarehouse/issue/UWDS-4800))
migrations implement against one agreed shape. No code here — API notes only,
no new dependency.

Everything below wires to React Native's **built-in** `accessibilityRole` and
`accessibilityState`, confirmed present and sufficient in `react-native@0.80.0`
for native VoiceOver/TalkBack. `Pressable`-only consumers (Tabs, StepperInput,
PillGroup, Card, DatePicker, Carousel, SegmentedControl, List, Menu,
ExpandableCard) need no primitive — they move straight to RN's native
`Pressable` render-prop.

## 1. Expand/collapse — `useExpandableGroup` / `useExpandableItem`

Replaces `@gluestack-ui/accordion`'s `createAccordion` + `@react-stately/utils`
`useControlledState` + `@react-native-aria/accordion` `useAccordion`/
`useAccordionItem`. The single/multiple × collapsible branching is real state
logic that must be reproduced exactly (see behaviour table below) — everything
else gluestack did here (id-linking, `aria-controls`, `role="region"`) is a
web-only ARIA pattern with no native equivalent, and is dropped in favour of
`accessibilityState.expanded`, which is what actually drives native
VoiceOver/TalkBack.

```ts
type ExpandableType = 'single' | 'multiple';

interface UseExpandableGroupOptions {
  type?: ExpandableType; // default 'multiple'
  collapsible?: boolean; // default true
  value?: string[]; // controlled
  defaultValue?: string[]; // uncontrolled initial value
  onValueChange?: (value: string[]) => void;
  disabled?: boolean; // group-level disable
}

interface UseExpandableGroupResult {
  expandedValues: string[];
  isExpanded: (itemValue: string) => boolean;
  toggleItem: (itemValue: string, itemDisabled?: boolean) => void;
}

function useExpandableGroup(options: UseExpandableGroupOptions): UseExpandableGroupResult;
```

`toggleItem` behaviour (unchanged from current gluestack semantics):

| `type`     | `collapsible` | opening a closed item             | toggling the only open item |
|------------|----------------|------------------------------------|------------------------------|
| `single`   | `true`         | replaces the currently open item   | closes it                   |
| `single`   | `false`        | replaces the currently open item   | no-op (can't close the last one) |
| `multiple` | `true`         | adds to `expandedValues`           | removes from `expandedValues` |
| `multiple` | `false`        | adds to `expandedValues`           | no-op (can't remove the last one) |

A disabled item (`itemDisabled` or group-level `disabled`) is a no-op for
`toggleItem` regardless of type/collapsible.

Value resolution follows the same controlled/uncontrolled convention as the
rest of the codebase (e.g. `Tabs.utils.ts`'s `resolveInitialValue` /
`resolveActiveValue`): `value` wins when defined; otherwise fall back to
internal state seeded from `defaultValue` (or `[]`).

Per-item hook, called once per `AccordionItem`:

```ts
interface UseExpandableItemOptions {
  value: string;
  disabled?: boolean;
  expandedValues: string[];
  toggleItem: UseExpandableGroupResult['toggleItem'];
}

interface UseExpandableItemResult {
  isExpanded: boolean;
  triggerProps: {
    accessibilityRole: 'button';
    accessibilityState: { expanded: boolean; disabled: boolean };
    nativeID: string; // `accordion-trigger-${value}`
    onPress: () => void;
  };
  contentProps: {
    nativeID: string; // `accordion-content-${value}`
    accessibilityLabelledBy: string; // == triggerProps.nativeID, web/Android parity
  };
}

function useExpandableItem(options: UseExpandableItemOptions): UseExpandableItemResult;
```

`accessibilityRole`/`accessibilityState` produced: trigger is `role="button"`
with `accessibilityState={{ expanded, disabled }}` — this is the one native
signal that actually matters. `contentProps.accessibilityLabelledBy` gives web
(via react-native-web's ARIA mapping) and Android the same `aria-labelledby`
linkage gluestack provided; there is no native iOS equivalent and none is
needed since `expanded` state lives on the trigger itself.

## 2. Radio/checkbox-group selection state

Replaces three independent things that gluestack currently implements with
separate `@react-stately`/`@react-native-aria` state machines: single-select
group state (`RadioGroup`, `RadioCardGroup`, `ToggleButtonCardGroup` — all
three currently duplicate `createRadio`'s machinery via three separate factory
instances), multi-select group state (`CheckboxGroup`), and a standalone
boolean toggle (`Checkbox` used without a group). Note: standalone `Radio`
outside a group has never actually worked in this codebase (gluestack logs an
error and derives no state) — no standalone single-select hook is needed.

`createFormControl`'s `useFormControlProvider` id/`aria-describedby` linking
(`labelId`/`feedbackId`/`helpTextId`) is **not** reproduced — confirmed dead
code in the current integration (nothing downstream ever calls the paired
`useFormControl` to consume those ids). Only the plain context value
`FormField.context.ts` already exposes (`validationStatus`, `disabled`,
`readonly`, `required`, `label`, `helperText`, `helperIcon`, `validText`,
`invalidText`) needs to keep flowing to Radio/Checkbox descendants — no new
primitive for that.

### 2a. Single-select group — `useSingleSelection`

```ts
interface UseSingleSelectionOptions {
  value?: string; // controlled
  defaultValue?: string; // uncontrolled initial value
  onValueChange?: (value: string) => void;
  disabled?: boolean; // group-level disable
}

interface UseSingleSelectionResult {
  selectedValue: string | undefined;
  isSelected: (itemValue: string) => boolean;
  select: (itemValue: string) => void;
  groupProps: {
    accessibilityRole: 'radiogroup';
  };
}

function useSingleSelection(options: UseSingleSelectionOptions): UseSingleSelectionResult;
```

`select` on a group-disabled group is a no-op. Per-item props are derived by
the consumer (Radio/RadioCard/ToggleButtonCard), not by a further hook, since
each already has its own `disabled` prop to combine with the group's:

```ts
// consumer-side derivation, not a separate hook call
const itemProps = {
  accessibilityRole: 'radio' as const,
  accessibilityState: { checked: isSelected(value), disabled: itemDisabled || groupDisabled },
  onPress: () => select(value),
};
```

### 2b. Multi-select group — `useMultiSelection`

```ts
interface UseMultiSelectionOptions {
  value?: string[]; // controlled
  defaultValue?: string[]; // uncontrolled initial value
  onValueChange?: (value: string[]) => void;
  disabled?: boolean; // group-level disable
}

interface UseMultiSelectionResult {
  selectedValues: string[];
  isSelected: (itemValue: string) => boolean;
  toggle: (itemValue: string) => void;
}

function useMultiSelection(options: UseMultiSelectionOptions): UseMultiSelectionResult;
```

No `groupProps` — React Native has no `checkboxgroup` accessibility role
(unlike `radiogroup`), so `CheckboxGroup`'s wrapper stays a plain `View`, same
as gluestack's current output is effectively unused there.

### 2c. Standalone toggle — `useToggle`

For a `Checkbox` used outside a `CheckboxGroup`:

```ts
interface UseToggleOptions {
  checked?: boolean; // controlled
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

interface UseToggleResult {
  checked: boolean;
  toggle: () => void;
}

function useToggle(options: UseToggleOptions): UseToggleResult;
```

Consumer-side item props follow the same pattern as 2a:

```ts
const itemProps = {
  accessibilityRole: 'checkbox' as const,
  accessibilityState: { checked, disabled },
  onPress: toggle,
};
```

`accessibilityRole`/`accessibilityState` produced across 2a-2c: `radiogroup`
on the group container, `radio`/`checkbox` on each item, each item's
`accessibilityState={{ checked, disabled }}` — this is currently **missing**
from Hearth's own component code (gluestack injects `role` only; the ARIA
`checked` mapping RNW derives from `role` alone is not equivalent to native
`accessibilityState`), so the migration sub-issues must add it explicitly,
not just preserve existing behaviour.
