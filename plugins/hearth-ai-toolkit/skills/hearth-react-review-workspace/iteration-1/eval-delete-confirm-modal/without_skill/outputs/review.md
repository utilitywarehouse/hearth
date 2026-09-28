# Review: DeleteConfirmModal.tsx

Reviewed using general React / accessibility / design-system judgement only (no Hearth-specific docs consulted).

## Critical

1. **`Modal` is imported but never used.** The component imports `Modal` from `@utilitywarehouse/hearth-react` (line 1) but instead hand-rolls a modal with a raw `<div>` overlay (line 13). This almost certainly throws away built-in behaviour a dedicated `Modal` component would provide: focus trap, focus restore on close, `Escape`-to-close, `role="dialog"`/`aria-modal`, rendering via a portal so it isn't clipped by an ancestor's `overflow: hidden`, and body-scroll locking while open. Unless there's a specific reason to bypass it, this should be rebuilt on top of `Modal`.

2. **Interactive element nested inside another interactive element.** `<a href="#" onClick={onConfirm}><Button variant="solid">Delete</Button></a>` (lines 19–21) puts a `<button>` inside an `<a>`. This is invalid HTML, confuses screen readers/keyboard navigation, and `href="#"` will jump/scroll the page on click since `onConfirm` doesn't call `preventDefault()`. The "Delete" action isn't a navigation — it should just be a `<Button onClick={onConfirm}>`, not wrapped in an anchor at all.

3. **Manual overlay reimplementation has no interaction affordances.** The backdrop `<div>` has no `onClick` to dismiss on outside-click, no `onKeyDown` for `Escape`, and no focus management (focus isn't moved into the dialog on open or restored to the trigger on close). All of this is exactly what a real `Modal`/`Dialog` primitive normally handles — another reason to use the imported `Modal` rather than the custom div.

## Accessibility

4. **No dialog semantics.** There is no `role="dialog"`, `aria-modal="true"`, `aria-labelledby` (pointing at the `Heading`), or `aria-describedby` (pointing at the `BodyText`). Screen reader users won't get the "you are in a dialog" announcement or an accessible name/description for it.

5. **Cancel button is a bare native `<button>`** (line 18) instead of the design system's `Button` component that's already imported and used elsewhere in the same file. This is inconsistent (different focus ring, sizing, hover/active states, typography) and likely fails whatever visual/interaction consistency the rest of the app relies on.

6. **No visual/semantic distinction for a destructive action.** `variant="solid"` is used for "Delete" with no indication this is a destructive/dangerous action (e.g., a danger/critical styling). Confirm dialogs for irreversible actions typically warrant a visually distinct treatment so users don't click it by habit.

## Robustness

7. **No guard against double submission.** `onConfirm` is called directly with no disabled/loading state. If the delete is asynchronous, a user double-clicking (or a slow response) could fire the action twice, and there's no way to show pending state or prevent the Cancel button from being used mid-request.

8. **Unmount-based visibility (`if (!open) return null`)** means the dialog is fully removed from the DOM rather than using the underlying `Modal`'s own open/close handling. This can lose transition/animation support and defeats any portal rendering the real `Modal` would give you.

## Styling / consistency

9. **Hardcoded inline styles** (`position: 'fixed'`, `inset: 0`, `background: 'rgba(0,0,0,0.5)'`, line 13) sit alongside design-system components (`Box`, `Flex`, `Heading`, `BodyText`, `Button`). Mixing raw inline CSS with design tokens is inconsistent — if there's a themed overlay/scrim value, it should come from the design system rather than being hand-coded, and dark-mode/theme changes won't be picked up by a hardcoded rgba value.

10. **`padding={{ tablet: '300' }}` has no base/mobile value.** Only a `tablet` breakpoint is specified, so it's unclear what padding (if any) applies below that breakpoint — likely unintentional and worth specifying a default.

## Minor

- Prop drilling `open`/`onClose`/`onConfirm` is fine for a simple confirm dialog, but consider whether an `itemName`/`title`/`description` prop would be useful so this isn't hardcoded to generic "this item" copy, limiting reuse.
- No test id / `data-testid` hooks for the confirm/cancel actions, which will make this harder to target in tests if the project uses testing-library queries by test id rather than role/text.

## Summary

The most important issue is #1/#2: the component bypasses the `Modal` primitive it already imports and reimplements overlay/backdrop behaviour by hand, introducing an invalid HTML nesting (`button` inside `a`) and losing accessibility features (focus trap, `Escape` handling, ARIA roles) that the real component would likely provide for free. Fix that first; the rest (Cancel button using the design system `Button`, ARIA attributes, destructive-action styling, double-submit guard) follow naturally once it's rebuilt on the proper primitive.
