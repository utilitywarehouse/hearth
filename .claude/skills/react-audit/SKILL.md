---
name: react-audit
description: "Use when: auditing packages/react for completeness — every exported component should have a Storybook story, docs, and Figma Code Connect file. Covers gap detection, prioritisation, and the fix workflow for packages/react only."
argument-hint: "Optional: specific component name or area to audit (default: full package)"
---

# React Audit

Periodic health check for `packages/react` (`@utilitywarehouse/hearth-react`). This skill is scoped to the **React package only** — for React Native, see `react-native-component-docs`.

---

## Scope

Run this audit against `packages/react/src/`. The full list of exported components lives in `packages/react/src/index.ts`. Check each one against the checklists below — **including sub-components** (e.g. `CardActionLink`, `MenuItem`, `AccordionItem`). Don't assume a sub-component is "covered" just because it's narrated inside its parent's `.docs.mdx` — checklist item 1 (own `.stories.tsx`) applies to it independently; a component that only shows up via a secondary `<ArgTypes of={X}/>` block on someone else's docs page is invisible to the `hearth-react` MCP server even though it renders fine in Storybook.

**Intentional exceptions** (do not flag these — but only for the specific checklist item named):

| Exception | Exempted from | Still required |
|-----------|----------------|-----------------|
| Layout primitives: `Box`, `Flex`, `Grid`, `Container` | `.figma.ts` | No dedicated Figma component node |
| Typography primitives: `BodyText`, `DetailText`, `Heading`, `Strong`, `Em`, `SectionHeader` | `.figma.ts` | Same |
| A sub-component narrated in its parent's `.docs.mdx` (e.g. `RadioCard` in `RadioGroup.docs.mdx`, `SkeletonBox` in `Skeleton.docs.mdx`) | its own `.docs.mdx` | Still needs its own `.stories.tsx` — this is the established pattern, not a full exemption |

---

## Completeness Checklist (per component)

For each name exported from `src/index.ts`, check:

- [ ] `src/components/<Name>/<Name>.stories.tsx` exists
- [ ] `src/components/<Name>/<Name>.docs.mdx` exists (or is intentionally covered by a parent component's docs — see exceptions above)
- [ ] `src/components/<Name>/<Name>.figma.ts` exists (or the component is on the exceptions list)
- [ ] `src/index.ts` exports both the component **and** its prop type (`export type`)

---

## Docs Quality Checklist (per `.docs.mdx`)

See [`react-component-addition`](../react-component-addition/SKILL.md) for canonical docs authoring rules (`sourceState` values, `StorybookLink` import path).

Audit-specific checks:
- [ ] No duplicate links in common-props or Alternatives sections
- [ ] `## Alternatives` section present when 2+ other components serve overlapping use cases
- [ ] `## Accessibility` section present for interactive components (keyboard interactions, ARIA roles, focus management)
- [ ] Table of contents present when the docs page has 4 or more sections

---

## MCP Documentation Quality Checklist

File-existence checks above don't catch a component whose `.stories.tsx` exists but
whose underlying `.tsx`/`.props.ts` has no JSDoc — `oversight` catches that gap
directly against what the MCP server actually sees.

From `packages/react`:

```sh
pnpm build:storybook
npx oversight --max-warnings 0 --expected-extractor react-docgen-typescript
```

- [ ] Zero findings. A `required-prop-undocumented` **error** means the MCP has no
      description for a prop a consumer must set — treat as Tier 1. A
      `component-description-missing` / `prop-descriptions-missing` **warning** means
      the MCP entry is usable but incomplete — treat as Tier 2.
- [ ] Fix by adding a component-level JSDoc block (see
      [`react-component-addition`](../react-component-addition/references/implementation-conventions.md))
      and a `/** ... */` comment on each flagged prop — not `/* ... */`, which
      `react-docgen-typescript` doesn't pick up.

---

## Figma Code Connect Checklist (per `.figma.ts`)

See [`figma-code-connect`](../figma-code-connect/SKILL.md) for canonical Code Connect format and structure rules (`.figma.ts` format, header comments, `nestable: true` metadata).

Audit-specific gates:
- [ ] Output previewed with `npx figma connect print` before committing
- [ ] **Never publish without explicit user approval**

---

## Gap Prioritisation

Triage findings into tiers before acting:

| Tier | What | Why |
|------|------|-----|
| 1 — Fix now | Invalid skill instructions, broken attribute values, duplicate content, missing sub-component `.stories.tsx`, `oversight` `required-prop-undocumented` errors | Mislead contributors, silently break Storybook, or leave the MCP unable to resolve a required prop |
| 2 — Fix soon | Missing docs/stories for user-facing components, `oversight` description/prop-description warnings | Gaps in consumer-facing or MCP-facing documentation |
| 3 — Backlog | Mechanical migrations (StorybookLink imports, `.figma.tsx` → `.figma.ts`) | High volume, low risk, no semantic change |
| Blocked | Missing Figma Code Connect where no `.figma.ts` exists | Requires Figma node URL from the user — flag and move on |

---

## Fix Workflow

1. **Audit**: read `src/index.ts` for the full export list; check each component — sub-components included — against the checklists above. Use `find` or `grep` for file-existence checks, then `pnpm build:storybook && npx oversight --max-warnings 0 --expected-extractor react-docgen-typescript` for the MCP documentation quality checklist, rather than reading every file manually.
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

# From packages/react — lint the MCP manifest for missing descriptions/props
pnpm build:storybook && npx oversight --max-warnings 0 --expected-extractor react-docgen-typescript

# Find sub-components missing their own .stories.tsx (own Meta, not just a nested ArgTypes block)
# — no single grep catches this reliably; cross-check src/index.ts exports against
# `find src/components -name '*.stories.tsx'` by component name.

# Find all .docs.mdx files with invalid sourceState values
grep -rnE 'sourceState="(shown|hidden)"' src/

# Find all .docs.mdx files using relative StorybookLink imports
grep -rn "from '.*shared/storybook/StorybookLink'" src/

# List all components missing a Code Connect file
find src/components -mindepth 1 -maxdepth 1 -type d | while read -r d; do
  ls "$d"/*.figma.ts >/dev/null 2>&1 || echo "$d"
done

# Preview a Code Connect file output
npx figma connect preview --file src/components/<Name>/<Name>.figma.ts --token "$FIGMA_CODE_CONNECT_TOKEN"

# Start Storybook to verify docs visually
pnpm dev:react
```
