# Component bugs found by interaction tests

Bugs in `packages/react` surfaced while adding Storybook interaction tests (UWDS-4962). Each one has a test written as an **expected failure**: the correct assertion wrapped in a local `expectToFail(() => ...)` helper in the story file. The test passes while the bug exists and fails once it's fixed, which is the signal to remove the wrapper and the entry here. All entries below were confirmed by a real browser run of the unwrapped assertion.

## Select: trigger isn't described by its helper or validation text

- **Component:** `packages/react/src/components/Select/Select.tsx`
- **Expected:** the trigger (`role="combobox"`) has `aria-describedby` pointing at the helper text and, when shown, the validation text, and `aria-invalid` when `validationStatus="invalid"`. This matches `TextInput` (`TextInput.tsx:87-88`).
- **Actual:** `useIds` generates `helperTextId`/`validationTextId` and `FormField` renders them, but neither is attached to `SelectPrimitive.Trigger`, so screen readers don't announce the helper or error text when the trigger is focused.
- **Test:** `Select.stories.tsx` → `Playground` (helper text) and `DisabledHidesValidation` (`aria-invalid` on the enabled invalid select).

## Combobox: input isn't described by its helper or validation text

- **Component:** `packages/react/src/components/Combobox/Combobox.tsx`
- **Expected:** the input (`role="combobox"`) has `aria-describedby` pointing at the helper text and validation text, as `TextInput` does.
- **Actual:** same pattern as Select: `helperTextId`/`validationTextId` are generated and rendered by `FormField` but never passed to `ComboboxPrimitive.Input` / `InputBase`.
- **Test:** `Combobox.stories.tsx` → `DisabledHidesValidation`.
