# Component bugs found by interaction tests

Bugs in `packages/react` surfaced while adding Storybook interaction tests (UWDS-4962) that couldn't be fixed directly. Fixable bugs are fixed in the component instead and don't stay here. Each one listed has:

- a test written as an **expected failure**: the correct assertion wrapped in a local `expectToFail(() => ...)` helper in the story file. It passes while the bug exists and fails once it's fixed, which is the signal to remove the wrapper and the entry.
- a linked Linear issue in the UWDS triage queue.

Entries are only added after a real browser run of the unwrapped assertion confirms the bug.

## CurrencyInput: onChange event loses target and event properties

- **Linear:** [UWDS-5156](https://linear.app/utilitywarehouse/issue/UWDS-5156)
- **Component:** `packages/react/src/components/CurrencyInput/CurrencyInput.tsx` (`handleChange`)
- **Expected:** `onChange` receives an event whose `target` is the input, so `event.target.name`, `event.target.id` and `event.preventDefault()` work, and React Hook Form's `register` can read `target.name`.
- **Actual:** the event is rebuilt with `{ ...e, target: { ...e.target, value } }`. Spreading a DOM element and a SyntheticEvent drops their prototype properties and methods, so `target.name` is `undefined` and `preventDefault` isn't a function.
- **Why not fixed here:** the fix needs an API decision, either a Proxy over the event or a new `onValueChange` for the raw value. See the Linear issue.
- **Test:** `CurrencyInput.stories.tsx` → `Formatting`.
