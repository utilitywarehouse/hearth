# Visual tests

Stories for visual regression on iOS and Android through Chromatic. They are
not published (`package.json` `files` ships only `build/**`) and the web
Storybook does not load them.

The rules for writing them, when a change needs one, the snapshot budget and
how to preview them locally live in one place: the
[`react-native-visual-tests` skill](../../../.claude/skills/react-native-visual-tests/SKILL.md).
Update the skill, not this file, when a rule changes.

## In short

- One file per component: `<Component>.visual.stories.tsx`, title
  `Visual Tests/<Component>`, with `chromatic: { disableSnapshot: false }` in
  its `meta`.
- `EXPO_PUBLIC_VISUAL_TESTS=true` makes `apps/storybook-rn-expo` load only
  these files and wrap them in `VisualTestDecorator`.
- Shared helpers live in `_support/`: `isVisualTest`, `VisualTestDecorator`,
  `VTGrid`, `VTRow` and `VTInvertedStrip`.

## Dropped stories

Stories removed because they were flaky or could not be made deterministic.
Record each one here with the reason.

_None yet._
