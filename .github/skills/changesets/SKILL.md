---
name: changesets
description: Guidelines for writing effective changesets in the Hearth monorepo. Use when creating changesets with pnpm changeset, documenting package changes, or reviewing changelog entries for React and React Native components.
metadata:
  author: Utility Warehouse
  tags: changesets, changelog, semver, documentation, monorepo
---

# Changeset Writing Skill

## Overview
This skill provides guidelines for writing changesets in the Hearth monorepo. Changesets are used to document changes and generate changelogs for package consumers.

## When to Apply This Skill
Use this skill when:
- Creating a new changeset file using `pnpm changeset`
- Writing commit messages that will become changelog entries
- Documenting changes to any package in the monorepo
- Reviewing changesets in pull requests

## Workflow

### Check for Existing Changesets
Before creating a new changeset, check if one already exists for the current changes:

```bash
ls -la .changeset/*.md
```

Look for changeset files (excluding `README.md` and `config.json`). If you see files like `.changeset/some-name-here.md`, review their content to see if they already document your changes.

### Create a New Changeset
If no changeset exists or you need to document additional changes, create one in the `.changeset` directory. It should follow this structure:

```markdown
---
'@package/name': patch|minor|major
---

...rest of the changeset content...
```
The name of the .md file can be anything descriptive, as long as it ends with `.md`.

Make sure the package name is correct, it should be one of the following: 
- `@utilitywarehouse/hearth-react`
- `@utilitywarehouse/hearth-react-icons`
- `@utilitywarehouse/hearth-react-native`
- `@utilitywarehouse/hearth-react-native-icons`
- `@utilitywarehouse/hearth-svg-icons`
- `@utilitywarehouse/hearth-svg-assets`
- `@utilitywarehouse/hearth-fonts`
- `@utilitywarehouse/hearth-tokens`
- `@utilitywarehouse/hearth-css-reset`

## Change Type Classification

Every changeset must start with a type indicator using the following format:

### 🐛 [FIX]
Use for bug fixes, corrections, and patches that resolve issues without changing the API or adding new features.

**Examples:**
- Fixing incorrect prop types
- Correcting styling issues
- Resolving runtime errors
- Fixing accessibility issues

### 💅 [ENHANCEMENT]
Use for improvements to existing features that don't add new functionality or break existing APIs.

**Examples:**
- Performance optimisations
- Improved error messages
- Better TypeScript types
- Code refactoring without behaviour changes
- Minor UX improvements

### 🌟 [FEATURE]
Use for new features, capabilities, or components that add functionality.

**Examples:**
- New components
- Additional props or configuration options
- New hooks or utilities
- New variants or modes

### 💔 [BREAKING CHANGE]
Use for changes that break backward compatibility and require consumers to update their code.

**Examples:**
- Removing deprecated APIs
- Renaming props or components
- Changing default behaviour
- Removing features
- Major API redesigns

### 📦 [DEPS]
Use for dependency updates, including adding, removing, or upgrading package dependencies.

**Examples:**
- Updating React Native to a new version
- Adding a new dependency for a feature
- Removing unused dependencies
- Upgrading TypeScript or other dev dependencies
- Security patches for dependencies

## Content Structure

### For Small Changes
For minor bug fixes or simple enhancements, a brief single-line description is sufficient:

```markdown
🐛 [FIX]: Correct border radius on Button component when size is small
```

```markdown
💅 [ENHANCEMENT]: Improve performance of List component with large datasets
```

```markdown
📦 [DEPS]: Update @types/react to 18.2.45
```

### For Impactful Changes
For features, breaking changes, or changes that affect how consumers use the package, include:

1. **Heading**: A clear, concise description of what changed
2. **Description**: Additional context including:
   - Why the change was made
   - How it affects the UI or behavior
   - What consumers need to know or do

**Example:**
```markdown
🌟 [FEATURE]: Display an open icon when links are set to open in a new tab.

This change enhances user experience by providing a visual cue for links that open in new tabs. An open icon will now be displayed next to the link text when target is set to _blank.
You can override this behaviour by setting the hideOpenIcon prop to true.
Additionally, "opens in new tab" will be read out by screen readers. This will happen even when hideOpenIcon is set to true.
```

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
- Write in plain (British) English
- Use present tense ("Add feature" not "Added feature")
- Focus on what changed from the user's perspective

### Be Specific
- Mention component names, prop names, and specific behaviours
- Avoid vague terms like "various fixes" or "improvements"

### Be User-Focused
- Think about what package consumers need to know
- Include migration guidance for breaking changes
- Explain the "why" when it adds value

### Consider Future Readers
- Include context that will be helpful months or years later
- Link to relevant discussions or documentation
- Document the reasoning behind significant decisions

Make sure to wrap component names, prop names, and code snippets in backticks for clarity.

## Common Patterns

### Adding a New Component
```markdown
🌟 [FEATURE]: Add DatePicker component for date selection

A new DatePicker component is now available for selecting dates in forms. It supports both single date selection and date range selection, with full keyboard navigation and screen reader support.

**Developer changes**:

\`\`\`tsx
import { DatePicker } from '@utilitywarehouse/react-native';

<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
/>
\`\`\`
```

### Fixing a Bug
```markdown
🐛 [FIX]: Prevent TextInput from losing focus on Android when error message appears

Fixed an issue where TextInput would lose focus on Android devices when validation errors were displayed, disrupting the user's input flow.
```

### Breaking Change
```markdown
💔 [BREAKING CHANGE]: Remove deprecated size prop from Avatar component

The deprecated `size` prop has been removed in favor of the `width` and `height` props for more flexible sizing.

**Components affected**:
- `Avatar`

**Developer changes**:

Replace the `size` prop with explicit `width` and `height` props:

\`\`\`diff
- <Avatar size={40} src={avatarUrl} />
+ <Avatar width={40} height={40} src={avatarUrl} />
\`\`\`

For common sizes, you can use the provided constants:

\`\`\`tsx
import { Avatar, AVATAR_SIZES } from '@utilitywarehouse/react-native';

<Avatar {...AVATAR_SIZES.medium} src={avatarUrl} />
\`\`\`
```

### Enhancement
```markdown
💅 [ENHANCEMENT]: Improve Button press animation performance

Optimised the Button component's press animation to use native driver, resulting in smoother interactions at 60fps even on lower-end devices.

**Components affected**:
- `Button`
- `IconButton`

**Developer changes**:

No changes required. The performance improvement is automatic.
```

### Dependency Update
```markdown
📦 [DEPS]: Update React Native to 0.73.0

Updated React Native from 0.72.0 to 0.73.0, bringing performance improvements and new features.

**Developer changes**:

No changes required. The update is backward compatible with existing code.
```

```markdown
📦 [DEPS]: Upgrade TypeScript to 5.3.0

Updated TypeScript to version 5.3.0, which includes improved type inference and better performance.

**Developer changes**:

No changes required. All existing type definitions remain compatible.
```

## Package Selection

When running `pnpm changeset`, you'll be asked which packages to include:

- Select only packages that are directly affected by your changes
- For component changes, include both the source package (e.g., `@utilitywarehouse/react-native`) and any related packages (e.g., `@utilitywarehouse/react-native-icons` if icon components changed)
- Don't include packages that only use the changed code as a dependency (changesets will handle this automatically)

## Semver Guidelines

- **Patch** (0.0.X): Bug fixes, performance improvements, no API changes
- **Minor** (0.X.0): New features, new props, backward-compatible changes
- **Major** (X.0.0): Breaking changes, removed features, renamed APIs

When in doubt, prefer a more conservative approach (e.g., minor over patch) to avoid surprising consumers.

## Review Checklist

Before submitting a changeset, verify:

- [ ] Change type emoji is correct and matches the actual change
- [ ] Heading clearly describes what changed
- [ ] Description explains why it matters (for significant changes)
- [ ] Affected components are listed (when applicable)
- [ ] Developer changes include code examples (for breaking changes)
- [ ] Migration path is clear for breaking changes
- [ ] References are included for complex changes
- [ ] Language is clear and user-focused
- [ ] Semver bump level is appropriate
- [ ] All affected packages are included

## Examples from the Hearth Repo

### Good Examples

✅ **Feature with full context:**
```markdown
🌟 [FEATURE]: Add support for controlled DateInput components

DateInput now supports both controlled and uncontrolled modes. In controlled mode, you can manage the date value externally, allowing for complex validation and form state management.

**Components affected**:
- `DateInput`

**Developer changes**:

Use the `value` and `onChange` props for controlled mode:

\`\`\`tsx
const [date, setDate] = useState(new Date());

<DateInput
  value={date}
  onChange={setDate}
  label="Select date"
/>
\`\`\`

For uncontrolled mode, use `defaultValue`:

\`\`\`tsx
<DateInput
  defaultValue={new Date()}
  label="Select date"
/>
\`\`\`
```

✅ **Simple fix:**
```markdown
🐛 [FIX]: Correct TextInput label color in dark mode
```

✅ **Breaking change with migration:**
```markdown
💔 [BREAKING CHANGE]: Remove support for legacy theme format

The legacy theme format (v1) is no longer supported. All themes must now use the v2 format introduced in version 2.0.0.

**Developer changes**:

Migrate your theme from v1 to v2 format:

\`\`\`diff
const theme = {
-  primaryColor: '#FF0000',
-  secondaryColor: '#00FF00',
+  colors: {
+    primary: '#FF0000',
+    secondary: '#00FF00',
+  },
};
\`\`\`

**References**:
- [Theme migration guide](https://hearth.uw.systems/docs/theming/migration)
```

### Avoid

❌ **Too vague:**
```markdown
🐛 [FIX]: Fix bugs
```

❌ **Missing context for breaking change:**
```markdown
💔 [BREAKING CHANGE]: Update Button API
```

❌ **Implementation details instead of user impact:**
```markdown
💅 [ENHANCEMENT]: Refactor Button component to use hooks internally
```
(Better: Focus on the benefit this brings to users, or skip if there's no visible change)

Also avoid including internal implementation details that don't affect consumers. We also don't need to add internal changes to things like Figma mappings or documentation unless they change how consumers use the component. 

## Tips for Success

1. **Write changesets as you code**: Don't wait until PR time
2. **Think like a consumer**: What would you want to know if using this library?
3. **Be honest about breaking changes**: It's better to over-communicate than surprise users
4. **Use real examples**: Copy actual code from your changes for examples
5. **Link to documentation**: Direct users to docs for complex features
6. **Get feedback**: Ask teammates to review your changeset content

## Further Reading

- [Changesets Documentation](https://github.com/changesets/changesets)
- [Semantic Versioning](https://semver.org/)
- [Keep a Changelog](https://keepachangelog.com/)
