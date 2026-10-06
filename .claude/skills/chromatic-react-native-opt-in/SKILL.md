---
name: chromatic-react-native-opt-in
description: Use when opening or updating a PR that touches packages/react-native or apps/storybook-rn-expo, to decide whether to opt it into the native (Expo) Chromatic visual regression build. The build is off by default — this skill covers how to judge whether a change warrants it (user request, visual impact, blast radius, size) and how to opt in with the label or `[chromatic]` marker.
metadata:
  author: Utility Warehouse
  tags: chromatic, visual regression, react native, expo, ci
---

# Chromatic React Native opt-in

## Overview

`.github/workflows/chromatic-react-native-expo.yml` builds the Expo Storybook app
(`apps/storybook-rn-expo`) on a macOS runner and snapshots it on real iOS/Android
renderers in Chromatic. It is slow, uses an expensive runner, and every snapshot
counts towards the Chromatic quota, so it is **opt-in**: it does nothing on a PR
unless that PR asks for it.

This is separate from `chromatic-react-native.yml`, which snapshots the React
Native Web Storybook (`packages/react-native/.storybook`) on every push. Both
Storybooks load the same `*.stories.tsx` files and both have
`chromatic: { disableSnapshot: true }` set globally in their `preview.tsx`, so only
stories that opt back in with `chromatic: { disableSnapshot: false }` (typically a
component's `KitchenSink`) are ever snapshotted.

## How to opt in

Do **one** of these on the PR:

- Add the `chromatic: React Native` label:
  ```bash
  gh pr edit <number> --add-label "chromatic: React Native"
  ```
- Or put `[chromatic]` in the PR title or body (e.g. when creating the PR with
  `gh pr create`).

When the PR is squash-merged, the push to `main` builds too (it checks the merged
PR's label, title and body), which keeps the `main` baseline in step with what was
reviewed. A maintainer can also run the workflow by hand from the Actions tab
(`workflow_dispatch`), e.g. to capture a fresh baseline.

Docs-only changes (`*.md`, `*.mdx`, `*.docs.mdx`) never build, even when opted in.

## Deciding

**If the user asked for it** (or asked you not to), do what they said and stop here.

Otherwise, decide yourself. Start from the diff:

```bash
git diff --stat origin/main...HEAD -- packages/react-native apps/storybook-rn-expo
```

Then work out which components the change can affect and whether any of their
stories are snapshotted:

```bash
grep -rln "disableSnapshot: false" packages/react-native/src apps/storybook-rn-expo/components
```

A change can only show up in Chromatic if it changes how a **snapshotted** story
renders. If none of the affected components have a snapshotted story, opting in
spends a macOS build to compare nothing — skip it (and mention that adding a
`KitchenSink` with `disableSnapshot: false` is the way to cover that component).

### Opt in when

- **Foundations change** — anything every component renders through:
  `src/core/` (themes, Unistyles config, breakpoints), `src/tokens/`,
  `src/legacyTokens/`, fonts, or icon packages. One token value can move every
  snapshot. Opt in regardless of diff size.
- **Native rendering dependencies change** — bumps to `react-native`, `expo`,
  `react-native-unistyles`, `react-native-svg`, `react-native-reanimated`,
  `react-native-gesture-handler`, `@gorhom/bottom-sheet`, or the Expo app's
  `metro.config.js`, `babel.config.js`, `app.config.ts`, `.rnstorybook/` setup.
- **Native-only code paths** — `*.ios.tsx` / `*.android.tsx`, `Platform.OS` /
  `Platform.select` branches, or native-only styles. The React Native Web build
  can't see these, so this workflow is the only visual check they get.
- **Visual change to a snapshotted component** — style objects, variants,
  `compoundVariants`, layout, spacing, colour, typography, or render-tree structure
  in a component (or a shared internal it uses) that has a snapshotted story.
- **Cross-cutting change** — the same visual change spread across roughly three or
  more components, or a refactor of a shared primitive (e.g. a pressable, text, or
  icon wrapper) that many components build on.
- **New baseline** — a story is newly opted into snapshotting
  (`disableSnapshot: false` added) or a snapshotted story's content changes.
- **Breaking / release-bound change** — a `major` changeset, or a large change
  landing on the `hearth-react-native-v1` branch, where an unnoticed regression
  would ship to every consumer at once.

### Skip when

- The change has no visual output: hooks, context, logic, event handlers,
  accessibility props (`accessibilityLabel`, `role`, etc.), prop types, JSDoc.
- Only tests, interaction tests (`play` functions), changesets, Figma Code Connect
  (`*.figma.tsx`), LLM docs (`public/llms/`), or docs change.
- Stories change but none of them are snapshotted.
- A small, contained style tweak to a single component, web-only (`_web`) styles,
  or anything the React Native Web Chromatic build already covers — unless that
  component's appearance is native-specific.

### Size as a tie-breaker

When the rules above don't settle it, weigh how much could move against the cost of
a build:

| Change | Lean |
|--------|------|
| One component, a few style lines, web build covers it | Skip |
| One component, broad restyle or render-tree rework | Opt in if snapshotted |
| Several components, or a shared primitive | Opt in |
| Anything under `core/`, `tokens/`, fonts, icons, native deps | Opt in |

If you're still unsure, opt in — a missed native regression costs more than one
build.

## Tell the user

Whenever you open or update a PR that touches these paths, say in one line which
way you decided and why (e.g. "Opted into native Chromatic: changes `theme.space`
tokens used by every component" or "Skipped native Chromatic: logic-only change to
`useFormFieldAccessibility`"). When you opt in, put the same reason in the PR body
so reviewers know why the build ran.
