# Visual tests

Stories for visual regression on iOS and Android through Chromatic. They are
not published (`package.json` `files` ships only `build/**`) and the web
Storybook does not load them.

## How they run

- Set `EXPO_PUBLIC_VISUAL_TESTS=true` when bundling `apps/storybook-rn-expo`.
  `.rnstorybook/main.ts` then loads **only** `visual-tests/**/*.visual.stories.tsx`.
  Without the flag the normal stories load and `visual-tests` is excluded.
- With the flag on, `.rnstorybook/preview.tsx` uses `VisualTestDecorator`
  instead of the interactive decorator (no dark-mode bar, no `ScrollView`,
  `SafeAreaView`, fixed background, keyboard dismissed).
- `preview.tsx` sets `chromatic.disableSnapshot: true` globally. Each file here
  sets `disableSnapshot: false` in its `meta`.

## Files

- One file per component: `<Component>.visual.stories.tsx`, title `Visual Tests/<Component>`.
- Import components from `../src`, so the stories run without a package build.
- Shared helpers live in `_support/`: `isVisualTest`, `VisualTestDecorator`,
  `VTGrid`, `VTRow` and `VTInvertedStrip`.

## Rules

- **Fit the content box.** Keep content within about 360 x 650pt. If it does not
  fit, split it into more exports. Each export is one snapshot per device.
- **Show states through props** (`disabled`, `validationStatus`, `loading`,
  `checked`, `selected`, `inverted`, `focused`, `pressed` where supported).
  Do not use `play` functions to focus or press.
- **Be deterministic.** No `autoFocus`. Set `caretHidden` on text inputs. Use
  fixed dates, no random data, and local bundled images only.
- **Dark mode** is a separate export named `<Name>Dark` with
  `parameters: { colorMode: 'dark' }`. The colour mode never comes from the
  device setting.
- **Inverted states** go on a `VTInvertedStrip` in the same story.
- **Reduced motion** is handled in UWDS-5139, not here.
