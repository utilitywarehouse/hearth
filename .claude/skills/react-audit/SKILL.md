---
name: react-audit
description: "Use when: auditing packages/react for completeness — every exported component should have a Storybook story, docs, and Figma Code Connect file. Covers gap detection, prioritisation, and the fix workflow for packages/react only."
argument-hint: "Optional: specific component name or area to audit (default: full package)"
---

# React Audit

Periodic health check for `packages/react` (`@utilitywarehouse/hearth-react`). This skill is scoped to the **React package only** — for React Native, see `react-native-component-docs`.

---

## Scope

Run this audit against `packages/react/src/`. The full list of exported components lives in `packages/react/src/index.ts`. Check each one against the checklists below.

**Intentional exceptions** (do not flag these as gaps):

| Exception | Reason |
|-----------|--------|
| Layout primitives: `Box`, `Flex`, `Grid`, `Container` | Code-level abstractions — no dedicated Figma component node |
| Typography primitives: `BodyText`, `DetailText`, `Heading`, `Strong`, `Em`, `SectionHeader` | Same |
| `RadioCard.docs.mdx` | Documented inside `RadioGroup.docs.mdx` |
| Base/internal components: `ButtonBase`, `InputBase`, `FormField`, `FormGroupBase` | Not public-facing; skip stories and docs |
| `ToggleGroup` standalone stories/docs | Already documented inside `ToggleButton.docs.mdx` |

---

## Completeness Checklist (per component)

For each name exported from `src/index.ts`, check:

- [ ] `src/components/<Name>/<Name>.stories.tsx` exists
- [ ] `src/components/<Name>/<Name>.docs.mdx` exists (or is intentionally covered by a parent component's docs — see exceptions above)
- [ ] `figma/<Name>.figma.ts` exists (or the component is on the exceptions list)
- [ ] `src/index.ts` exports both the component **and** its prop type (`export type`)

---

## Docs Quality Checklist (per `.docs.mdx`)

- [ ] `sourceState` values are valid: `'show'`, `'hide'`, or `'none'` — never `'shown'` or `'hidden'`
- [ ] `StorybookLink` import uses the package form: `import { StorybookLink } from '@utilitywarehouse/hearth-storybook-utils'`
- [ ] No duplicate links in common-props or Alternatives sections
- [ ] `## Alternatives` section present when 2+ other components serve overlapping use cases
- [ ] `## Accessibility` section present for interactive components (keyboard interactions, ARIA roles, focus management)
- [ ] Table of contents present when the docs page has 4 or more sections

---

## Figma Code Connect Checklist (per `.figma.ts`)

- [ ] File is `.figma.ts` template format — **not** `.figma.tsx` (parser-based `figma.connect()`)
- [ ] Header comments present: `// url=`, `// source=`, `// component=`
- [ ] Compound children include `metadata: { nestable: true }` in their export
- [ ] Output previewed with `npx figma connect print` before committing
- [ ] **Never publish without explicit user approval**

---

## Gap Prioritisation

Triage findings into tiers before acting:

| Tier | What | Why |
|------|------|-----|
| 1 — Fix now | Invalid skill instructions, broken attribute values, duplicate content | Mislead contributors or silently break Storybook |
| 2 — Fix soon | Missing docs/stories for user-facing components | Gaps in consumer-facing documentation |
| 3 — Backlog | Mechanical migrations (StorybookLink imports, `.figma.tsx` → `.figma.ts`) | High volume, low risk, no semantic change |
| Blocked | Missing Figma Code Connect where no `.figma.ts` exists | Requires Figma node URL from the user — flag and move on |

---

## Fix Workflow

1. **Audit**: read `src/index.ts` for the full export list; check each component against the checklists above. Use `find` or `grep` rather than reading every file manually.
2. **Report**: group findings by tier; call out intentional exceptions clearly so reviewers don't re-flag them.
3. **Fix by PR group**: one logical group per branch — skills, doc fixes, import migrations, Code Connect migrations.
4. **Run `pnpm checks`** from the repo root before each commit. Fix any new errors before committing.
5. **Stop at each PR boundary**: commit and wait for the user to push and confirm the PR is open before starting the next group.
6. **Figma Code Connect**: preview with `npx figma connect print` before committing; never publish without explicit user approval.

---

## Useful Commands

Run from `packages/react` unless noted:

```sh
# From repo root — run all quality checks
pnpm checks

# Find all .docs.mdx files with invalid sourceState values
grep -rn 'sourceState="shown"\|sourceState="hidden"' packages/react/src/

# Find all .docs.mdx files using relative StorybookLink imports
grep -rn "from '.*shared/storybook/StorybookLink'" packages/react/src/

# List all components in the figma/ directory
ls packages/react/figma/*.figma.ts packages/react/figma/*.figma.tsx 2>/dev/null

# Preview a Code Connect file output
npx figma connect print --file figma/<Name>.figma.ts

# Start Storybook to verify docs visually
pnpm dev:react
```
