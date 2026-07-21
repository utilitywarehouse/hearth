---
name: add-changeset
description: Guidelines for writing effective changesets in the Hearth monorepo. Use when adding or creating changesets with pnpm changeset, documenting package changes, or reviewing changelog entries for React and React Native components.
metadata:
  author: Utility Warehouse
  tags: changesets, changelog, semver, documentation, monorepo
---

# Changeset Writing Skill

## Overview

This skill provides guidelines for writing changesets in the Hearth monorepo.
Changesets are used to document changes and generate changelogs for package
consumers.

## When to Apply This Skill

Use this skill when:
- Creating a new changeset file using `pnpm changeset`
- Writing commit messages that will become changelog entries
- Documenting changes to any package in the monorepo
- Reviewing changesets in pull requests

Don't use this skill for internal-only changes that don't affect consumers from a library release perspective, such as refactoring, code style updates or documentation changes. Those changes should be documented in the commit message but do not require a changeset.

## Workflow

### Check for Existing Changesets

Before creating a new changeset, check if one already exists for the current
changes:

```bash
ls -la .changeset/*.md
```

Look for changeset files (excluding `README.md` and `config.json`). If you see
files like `.changeset/some-name-here.md`, review their content to see if they
already document your changes.

### Create a New Changeset

If no changeset exists or you need to document additional changes, create one in
the `.changeset` directory. It should follow this structure:

```markdown
---
'@package/name': patch|minor|major
---

...rest of the changeset content...
```

The name of the `.md` file can be anything descriptive, as long as it is succinct and ends with `.md`.

Make sure the package name is correct, it should be one of the following:

- `@utilitywarehouse/hearth-react`
- `@utilitywarehouse/hearth-react-icons`
- `@utilitywarehouse/hearth-react-native`
- `@utilitywarehouse/hearth-react-native-icons`
- `@utilitywarehouse/hearth-svg-icons`
- `@utilitywarehouse/hearth-svg-assets`
- `@utilitywarehouse/hearth-json-assets`
- `@utilitywarehouse/hearth-fonts`
- `@utilitywarehouse/hearth-tokens`
- `@utilitywarehouse/hearth-css-reset`

While the packages are in a pre `v1` state, we are not strictly adhering to
semver guidelines, but we do want to be mindful of the impact of changes. Use
the following guidelines for selecting the appropriate change type:

- **Patch**: Use for bug fixes, performance improvements, new props, backward-compatible changes and non-breaking internal Changes
- **Minor**: Use for new features, breaking changes, removed features, and renamed APIs
- **Major**: Do not use for any changes at this time. This will change after we reach `v1` and start following semver guidelines more strictly.

## Change Type Classification

Every changeset must start with a type indicator, followed by a colon (`:`). The six types are:

| Emoji | Type | Use for |
|-------|------|---------|
| 🐛 | [FIX] | Bug fixes and patches that don't change the API |
| 💅 | [ENHANCEMENT] | Improvements to existing features without breaking changes |
| 🌟 | [FEATURE] | New features, capabilities, or components |
| 💔 | [BREAKING CHANGE] | Changes that break backward compatibility |
| 📦 | [DEPS] | Dependency updates |
| 🧹 | [HOUSEKEEPING] | Internal changes that don't affect consumers |

If unsure which type applies, see [references/change-type-guide.md](references/change-type-guide.md) for full definitions and examples.

## Content Structure

### For Small Changes

For minor bug fixes or simple enhancements, a brief single-line description is sufficient:

```markdown
🐛 [FIX]: `Button` border radius incorrect when `size` is `small`
```

```markdown
💅 [ENHANCEMENT]: Improve performance of List component with large datasets
```

```markdown
📦 [DEPS]: Update @types/react to 18.2.45
```

Single line descriptions should be kept short and focused on the user impact.
Avoid including implementation details or internal changes that don't affect
consumers. If further information is needed, consider adding additional sections
as outlined below.

Do not repeat the change type as a verb in the heading or description — it is
already indicated by the emoji and label at the start of the changeset. For
`[FIX]` changesets, state the problem plainly rather than framing it as an
action. For example, "`Button` border radius incorrect when `size` is `small`"
not "Fix `Button` border radius when `size` is `small`" or "Correct `Button`
border radius when `size` is `small`". For `[FEATURE]` and `[ENHANCEMENT]`
changesets, describe the outcome or capability, not the action taken.

Keep the description focused on what changed and why it matters to users, rather
than how it was implemented.

### For Impactful Changes

For features, breaking changes, or changes that affect how consumers use the package, include:

1. **Heading**: A clear, concise description of what changed, do not repeat the
   change type in the heading, it is already indicated by the emoji and label at
   the start of the changeset. Focus on the user impact and what consumers need
   to know.
2. **Description**: Additional context including:
   - Why the change was made
   - How it affects the UI or behaviour
   - What consumers need to know or do

Consumers do not need to know implementation details unless they affect how they
use the package. Focus on the user-facing impact and any necessary migration
steps.

See [references/content-examples.md](references/content-examples.md) for worked examples of common patterns.

## Additional Content Sections

### Affected Components

List components that are directly impacted by the change:

```markdown
**Components affected**:
- `Button`
- `IconButton`
- `LinkButton`
```

### Developer Changes

Outline what developers need to do in response to the change:

- **For non-breaking changes**: Clearly state when no action is required
- **For breaking changes**: Provide before/after examples with code diffs
- Use `diff` code blocks with `+` for additions and `-` for deletions

**Example:**

```markdown
**Developer changes**:

If you already have links that open in new tabs, you don't need to make any
changes. However, if you want to hide the open icon for specific links, you can
do so by adding the `hideOpenIcon` prop:

\`\`\`tsx
<Link href="/faqs" target="_blank" hideOpenIcon>
  Visit FAQs
</Link>
\`\`\`

\`\`\`tsx
<InlineLink href="/faqs" target="_blank" hideOpenIcon>
  Visit FAQs
</InlineLink>
\`\`\`
```

**Breaking change example:**

```markdown
**Developer changes**:

The `variant` prop has been renamed to `appearance`. Update your code as follows:

\`\`\`diff
- <Button variant="primary">Click me</Button>
+ <Button appearance="primary">Click me</Button>
\`\`\`
```

### References

Include helpful links or context:

```markdown
**References**:
- [WCAG 2.1 Success Criterion 2.4.4](https://www.w3.org/WAI/WCAG21/Understanding/link-purpose-in-context.html)
- [When to use target="_blank"](https://css-tricks.com/use-target_blank/)
- [Internal discussion](https://github.com/utilitywarehouse/hearth/discussions/123)
```

## Writing Best Practices

### Be Clear and Concise

- Write in plain (British) English, this is important. Use customise instead of customize, behaviour instead of behavior.
- Use present tense ("Add feature" not "Added feature")
- Focus on what changed from the user's perspective
- Prefer brevity while still providing necessary context

### Be Specific

- Mention component names, prop names, and specific behaviours
- Avoid vague terms like "various fixes" or "improvements"

### Be User-Focused

- Think about what package consumers need to know
- Include migration guidance for breaking changes
- Explain the "why" when it adds value
- Avoid internal implementation details that don't affect consumers

### Consider Future Readers

- Include context that will be helpful months or years later
- Link to relevant discussions or documentation
- Document the reasoning behind significant decisions

For clarity and readability, make sure to wrap component names, prop names, and
code snippets in backticks. Also wrap lines and include an empty line after
headings.


## Package Selection

When running `pnpm changeset`, you'll be asked which packages to include:

- Select only packages that are directly affected by your changes
- For component changes, include both the source package (e.g., `@utilitywarehouse/react-native`) and any related packages (e.g., `@utilitywarehouse/react-native-icons` if icon components changed)
- Don't include packages that only use the changed code as a dependency (changesets will handle this automatically)

## Semver Guidelines

Standard semver does not apply while the packages are pre-v1. Follow the bump-level rules in "Create a New Changeset" above, which take precedence. In particular: **do not use `major`** at this time.

## Final Review

Before submitting a changeset, use the checklist in [references/writing-checklist.md](references/writing-checklist.md) to verify all details.

## Tips for Success

1. **Think like a consumer**: What would you want to know if using this library?
2. **Be honest about breaking changes**: It's better to over-communicate than surprise users
3. **Use real examples**: Copy actual code from your changes for examples
4. **Link to documentation**: Direct users to docs for complex features

For real-world examples from the Hearth repo and patterns to avoid, see [references/content-examples.md](references/content-examples.md).
