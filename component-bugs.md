# Component bugs found by interaction tests

Bugs in `packages/react` surfaced while adding Storybook interaction tests (UWDS-4962) that couldn't be fixed directly. Fixable bugs are fixed in the component instead and don't stay here. Each one listed has:

- a test written as an **expected failure**: the correct assertion wrapped in a local `expectToFail(() => ...)` helper in the story file. It passes while the bug exists and fails once it's fixed, which is the signal to remove the wrapper and the entry.
- a linked Linear issue in the UWDS triage queue.

Entries are only added after a real browser run of the unwrapped assertion confirms the bug.

_No open entries._
