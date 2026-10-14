---
name: react-native-visual-tests
description: "Use when: adding or changing a component in packages/react-native in a way that changes how it looks (new component, new or changed visual prop/variant/state, style, layout or token change, major refactor or migration), or when writing or editing packages/react-native/visual-tests/*.visual.stories.tsx. Covers when a visual test is required, the file and story rules, the snapshot budget, and how to preview the stories locally."
argument-hint: "Component name and what changed visually"
---

# React Native Visual Tests

`packages/react-native/visual-tests/` holds the stories the native Chromatic
build snapshots on iOS and Android. This skill is the single source of truth
for the rules; `visual-tests/README.md` points here.

## When a visual test is required

Add or update `packages/react-native/visual-tests/<Component>.visual.stories.tsx`
when a change:

- adds a new component;
- adds or changes a visual prop or variant, such as `variant`, `colorScheme`,
  `size` or a new state;
- changes styles, layout or theme tokens the component uses;
- is a major refactor or migration (e.g. moving off gluestack).

It is **not** required for docs-only changes, behaviour-only changes with no
visual output, or test-only changes. If you are not sure, run the visual tests
and check the diff.

When a change alters an existing state the visual test already shows, the
story usually needs no edit: the Chromatic diff is the check. Update the story
only when the new prop, variant or state is not shown yet.

## How they run

- `apps/storybook-rn-expo/.rnstorybook/main.ts` loads **only**
  `visual-tests/**/*.visual.stories.tsx` when `EXPO_PUBLIC_VISUAL_TESTS=true`,
  and excludes them otherwise. The web Storybook never loads them, and they are
  not published.
- With the flag on, `.rnstorybook/preview.tsx` uses `VisualTestDecorator`
  (`visual-tests/_support`) instead of the interactive decorator: no dark-mode
  bar, no `ScrollView`, a `SafeAreaView` with a fixed background, the keyboard
  dismissed, and reduced motion always on (`ReducedMotionConfig` plus Hearth's
  `ReducedMotionOverride`), so animated components render their final state.
- `.github/workflows/chromatic-react-native-expo.yml` builds with the flag on.
  It is **opt-in** with the `chromatic: React Native` label; see the
  [chromatic-react-native-opt-in](../chromatic-react-native-opt-in/SKILL.md)
  skill for when to add it. Pushes to `main` build when the merged PR had the
  label, and a maintainer can run it by hand (`workflow_dispatch`).
- The job exits once the Storybook is uploaded (`--exit-once-uploaded`).
  Results (changes, errors) appear on the PR as Chromatic's
  **"UI Tests: hearth-react-native (Native)"** check, not in the job log.

### Preview locally

From the repo root, with the package built (`pnpm --filter @utilitywarehouse/hearth-react-native run build`):

```bash
EXPO_PUBLIC_VISUAL_TESTS=true pnpm --dir apps/storybook-rn-expo exec expo start -c
```

`-c` clears the Metro cache: `EXPO_PUBLIC_*` values are inlined at bundle time,
so a cached bundle keeps the old setting. Open the app on a simulator and check
each story fits the screen without scrolling.

## Files

- One file per component: `<Component>.visual.stories.tsx`, `title: 'Visual Tests/<Component>'`.
- Import components from `../src/components/<Component>`, so the stories run
  without a package build.
- Opt in at the `meta` level, because `preview.tsx` disables snapshots globally:

  ```tsx
  const meta = {
    title: 'Visual Tests/<Component>',
    parameters: {
      chromatic: { disableSnapshot: false },
    },
  } satisfies Meta;
  ```

- Use the shared helpers from `./_support`: `VTGrid` and `VTRow` (labelled
  rows), and `VTInvertedStrip` for inverted states. Full-width parts inside a
  `VTRow` need a `width: '100%'` wrapper.
- Use the docs' **Advanced Usage** / **Child Components** example for an
  `Advanced` export when a component exports child parts that render
  differently from its props API. Skip it when it would look the same.

## Rules

- **Fit the content box.** Keep each story within about 360 × 650pt. If it does
  not fit, split it into more exports rather than letting it scroll.
- **Show states through props** (`disabled`, `validationStatus`, `loading`,
  `checked`, `selected`, `inverted`, `focused`, `pressed` where supported).
  No `play` functions that focus or press.
- **Be deterministic.** No `autoFocus`. Set `caretHidden` on text inputs. Use
  fixed dates and values (no `new Date()`/`dayjs()`), no random data, and local
  bundled images only.
- **Dark mode** is a separate export named `<Name>Dark` with
  `parameters: { colorMode: 'dark' }`. Add one only when the component has
  dark-specific styling worth guarding (colour schemes, surfaces, inverted
  content), not for every component. The colour mode never comes from the
  device setting.
- **Overlays** (Modal, BottomSheet, Menu, pickers, Toast) open on mount (ref
  `.present()` in a `useEffect`, or an open prop) with animations off, and may
  set `chromatic: { disableSnapshot: false, delay }` to settle. See
  `Modal.visual.stories.tsx`.
- **Flaky stories are dropped, not tolerated.** If a story diffs between runs
  with no code change, fix it or remove it and record why in
  `visual-tests/README.md`. Do not raise the diff threshold.

## Budget

Each export costs **1 snapshot × 2 devices on every build** (there is no
TurboSnap for native). The agreed budget is **≤ 200 snapshots per build**;
the suite is at about 186, which leaves room for about 7 more exports. Before adding exports:

- count the current exports (`git grep -c "^export const" -- 'packages/react-native/visual-tests/*.visual.stories.tsx'`);
- prefer adding rows to an existing export over a new export;
- if a new component pushes the build over budget, say so in the PR so the
  budget can be raised or other stories trimmed.

## Checklist

- [ ] `<Component>.visual.stories.tsx` added or updated, or the PR says why none is needed
- [ ] Each export fits one screen on iOS and Android
- [ ] States set through props; no focus, timers, dates or remote images
- [ ] `Dark` export only where the component has dark-specific styling
- [ ] Snapshot count still within budget
- [ ] PR labelled `chromatic: React Native` (see [chromatic-react-native-opt-in](../chromatic-react-native-opt-in/SKILL.md))
