# Weekly accessibility report

Every Monday at 07:00 UTC, [`.github/workflows/a11y-weekly.yml`](../../.github/workflows/a11y-weekly.yml) runs every Storybook story in `packages/react` and `packages/react-native` with accessibility checks set to fail. It then posts a summary to Slack. You can also start it by hand from the Actions tab (**Weekly Accessibility Report** → **Run workflow**).

The weekly run doesn't block anything. On pull requests, a11y checks stay in `'todo'` mode, so violations show in the Storybook test UI but never fail CI.

## What gets checked

| Check | Packages | What it catches |
| --- | --- | --- |
| **Web (axe)** | react, react-native | axe-core rules on the rendered DOM (`@storybook/addon-a11y`). For React Native, this is the react-native-web output. |
| **Native rules** | react-native | React Native props that axe can't see. See the table below. |
| **ESLint** | react-native | `eslint-plugin-react-native-a11y` static checks. These run on every PR as part of `pnpm lint`. |

axe checks the HTML that react-native-web produces. It can't see how a component behaves under VoiceOver or TalkBack, so the native rules ([`packages/react-native/.storybook/a11y`](../../packages/react-native/.storybook/a11y)) read the React Native props of each rendered element and check them directly:

| Rule | Severity | Checks |
| --- | --- | --- |
| `pressable-has-role` | error | An element with `onPress`/`onLongPress` has a `role`/`accessibilityRole`. |
| `pressable-has-name` | error | An interactive element has a label or text content. |
| `image-has-label` | error | An `Image` has `accessibilityLabel`/`alt`, or is hidden with `accessible={false}`. |
| `toggle-has-state` | error | `checkbox`/`switch`/`radio` roles expose a checked state. |
| `adjustable-has-value` | error | `adjustable`/`slider` roles expose a value. |
| `no-nested-pressables` | error | No interactive element sits inside another one. Android merges them, so TalkBack can't reach the inner element. Reported once per outer element. |
| `touch-target-size` | error below 24×24, warn below 44×44 | Target size including `hitSlop`. 24 is the WCAG 2.5.8 (AA) minimum. 44 is Apple's guideline. As in WCAG, an undersized target still passes if a 24px circle centred on it doesn't overlap another target. |
| `hint-without-label` | warn | An element has `accessibilityHint` but no label. |

## Running it locally

Run a package's stories the same way the weekly job does:

```sh
VITE_A11Y_STRICT=true pnpm --dir packages/react-native exec vitest run --project storybook \
  --reporter=default --reporter=json --outputFile=a11y-results.json
```

Preview the Slack message from local results without posting it. The script reads `<RESULTS_DIR>/a11y-<package>/a11y-results.json`:

```sh
mkdir -p /tmp/a11y/a11y-react-native && mv packages/react-native/a11y-results.json /tmp/a11y/a11y-react-native/
RESULTS_DIR=/tmp/a11y pnpm a11y:report --dry-run
```

Unit tests: `pnpm test:a11y-report` for this script, and `pnpm --dir packages/react-native test` for the native rules.

## Opting out

Some stories are presentational and contain extra components that aren't what's being tested. Prefer the first option below, because it keeps the component itself checked.

### 1. Mark the scaffolding, not the story

Wrap demo-only parts so that neither axe nor the native rules check them.

React Native:

```tsx
import { A11yIgnore } from '../../../.storybook/a11y';

<A11yIgnore>
  <DemoControls />
</A11yIgnore>
```

React: add `data-a11y-ignore` to the wrapper element.

### 2. Turn off a rule for a story

```tsx
import type { NativeA11yParameters } from '../../../.storybook/a11y';

export const LayoutDemo: Story = {
  parameters: {
    // Web (axe), built into @storybook/addon-a11y
    a11y: {
      config: { rules: [{ id: 'color-contrast', enabled: false }] },
      // or skip axe for the story entirely: test: 'off'
    },
    // Native rules (React Native only)
    nativeA11y: {
      rules: { 'no-nested-pressables': 'off', 'touch-target-size': 'warn' },
      // or skip all native rules: disable: true
      reason: 'Layout demo: the extra Pressables are story scaffolding',
    } satisfies NativeA11yParameters,
  },
};
```

- `nativeA11y` also accepts `exclude: ['<css selector>']` to skip matching parts of the DOM.
- `reason` is required whenever a native rule is turned `'off'` or `disable: true` is set. Without it, the story fails.
- `satisfies NativeA11yParameters` catches misspelled rule ids in your editor.

Every opt-out is listed in the weekly run summary with its reason, and Slack shows how many stories have one. Opt-outs therefore stay visible instead of piling up unnoticed.
