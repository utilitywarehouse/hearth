# @utilitywarehouse/hearth-react — Skill Spec

`@utilitywarehouse/hearth-react` is a React design system component library for Utility Warehouse web products. It provides 60+ accessible, design-token-driven components built on CSS custom properties, with a layout system (Box, Flex, Grid, Container), form components, overlays, navigation, and data display — all targeting React 18/19.

## Domains

| Domain | Description | Skills |
|--------|-------------|--------|
| component-usage | Selecting the right component for a UI task and configuring it correctly with its API, props, and accessibility requirements | hearth-react-component-reference |
| ui-composition | Assembling components into layouts and features using the layout system, responsive props, and composition patterns | build-with-hearth-react |

## Skill Inventory

| Skill | Type | Domain | What it covers | Failure modes |
|-------|------|--------|----------------|---------------|
| hearth-react-component-reference | core | component-usage | 60+ components, props, accessibility patterns, HearthProvider | 8 |
| build-with-hearth-react | lifecycle | ui-composition | Layout system, style props, responsive, asChild, hearth-tokens, Next.js | 7 |

## Failure Mode Inventory

### hearth-react-component-reference (8 failure modes)

| # | Mistake | Priority | Source | Cross-skill? |
|---|---------|----------|--------|--------------|
| 1 | Using internal FormField component directly | CRITICAL | maintainer interview | — |
| 2 | Missing loadingTitle on Skeleton | CRITICAL | source | — |
| 3 | Missing label on IconButton | CRITICAL | source | — |
| 4 | Using deprecated loadingText on Modal | MEDIUM | CHANGELOG v0.27.3 | — |
| 5 | Invalid Button variant+colorScheme combination | HIGH | source | — |
| 6 | Omitting accessible label from Checkbox or Radio | HIGH | source | — |
| 7 | RadioTile assumes fill behaviour in row layout | MEDIUM | CHANGELOG v0.25.0 | — |
| 8 | Not using HearthProvider when Tooltip is present | HIGH | CHANGELOG v0.27.7 | build-with-hearth-react |

### build-with-hearth-react (7 failure modes)

| # | Mistake | Priority | Source | Cross-skill? |
|---|---------|----------|--------|--------------|
| 1 | Using margin on components instead of gap on parent container | HIGH | maintainer interview | — |
| 2 | Using JS tokens from hearth-tokens root instead of style props or CSS variables | CRITICAL | maintainer interview | — |
| 3 | Using raw inline styles for spacing/sizing | HIGH | maintainer interview | — |
| 4 | Nesting Next.js Link inside Button without asChild | CRITICAL | maintainer interview | — |
| 5 | Missing mobile breakpoint in responsive prop object | HIGH | source | — |
| 6 | Not adding use client in Next.js App Router consuming files | HIGH | source | — |
| 7 | Using Box/Flex/Grid as span without as="span" | MEDIUM | source | — |

## Tensions

| Tension | Skills | Agent implication |
|---------|--------|-------------------|
| Style props convenience vs custom token access | build-with-hearth-react ↔ hearth-react-component-reference | Agent uses style props everywhere, missing hearth-tokens CSS variables for custom styles |
| Accessibility completeness vs generation brevity | hearth-react-component-reference ↔ build-with-hearth-react | Generated code renders correctly but silently fails accessibility for screen reader users |

## Cross-References

| From | To | Reason |
|------|----|--------|
| hearth-react-component-reference | build-with-hearth-react | Component API knowledge is essential when composing UI layouts |
| build-with-hearth-react | hearth-react-component-reference | Layout patterns require awareness of individual component APIs and constraints |

## Subsystems & Reference Candidates

| Skill | Subsystems | Reference candidates |
|-------|------------|---------------------|
| hearth-react-component-reference | — | Full per-component API reference (60+ components) |
| build-with-hearth-react | — | Responsive prop system; space tokens (18 values); hearth-tokens/browser import |

## Remaining Gaps

| Skill | Question | Status |
|-------|----------|--------|
| build-with-hearth-react | Next.js App Router — use client boundary rules for hearth-react consuming files | open |
| hearth-react-component-reference | Component accessibility guidelines from Storybook docs.mdx files (not readable in this session) | open |

## Recommended Skill File Structure

- **Core skills:** `hearth-react-component-reference` — component API, accessibility, and usage reference
- **Lifecycle skills:** `build-with-hearth-react` — end-to-end workflow for building web UI with hearth-react
- **Reference files:** `hearth-react-component-reference` warrants per-component detail given 60+ components

## Composition Opportunities

| Library | Integration points | Composition skill needed? |
|---------|-------------------|--------------------------|
| Next.js | Link/Button via asChild, use client boundaries, HearthProvider placement | Covered in build-with-hearth-react |
| react-hook-form | Form inputs, validationStatus/validationText mapping | Deferred — to be added as hearth-react-hook-form skill in future |
