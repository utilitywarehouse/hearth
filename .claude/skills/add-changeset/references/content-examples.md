# Content Examples

This guide provides worked examples of common changeset patterns.

## Common Patterns

### Adding a New Component

```markdown
🌟 [FEATURE]: Add `DatePicker` component for date selection

A new `DatePicker` component is now available for selecting dates in forms. It
supports both single date selection and date range selection, with full keyboard
navigation and screen reader support.

**Developer changes**:

\`\`\`tsx
import { DatePicker } from '@utilitywarehouse/hearth-react-native';

<DatePicker
  value={date}
  onChange={setDate}
  minDate={new Date()}
/>
\`\`\`
```

### Fixing a Bug

```markdown
🐛 [FIX]: `TextInput` loses focus on Android when an error message appears

`TextInput` was losing focus on Android devices when validation errors were
displayed, disrupting the user's input flow.
```

### Breaking Change

```markdown
💔 [BREAKING CHANGE]: Remove deprecated `size` prop from `Avatar` component

The deprecated `size` prop has been removed in favour of the `width` and
`height` props for more flexible sizing.

**Components affected**:

- `Avatar`

**Developer changes**:

Replace the `size` prop with explicit `width` and `height` props:

\`\`\`diff
- <Avatar size={40} src={avatarUrl} />
+ <Avatar width={40} height={40} src={avatarUrl} />
\`\`\`

For common sizes, use the provided constants:

\`\`\`tsx
import { Avatar, AVATAR_SIZES } from '@utilitywarehouse/hearth-react-native';

<Avatar size={AVATAR_SIZES.medium} src={avatarUrl} />
\`\`\`
```

### Enhancement

```markdown
💅 [ENHANCEMENT]: Improve `Button` press animation performance

Optimised the `Button` component press animation to use native driver, resulting
in smoother interactions at 60fps, even on lower-end devices.

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

## Examples from the Hearth Repo

### Good Examples

✅ **Feature with full context:**

```markdown
🌟 [FEATURE]: Add support for controlled `DateInput` components

`DateInput` now supports both controlled and uncontrolled modes. In controlled
mode, you can manage the date value externally, allowing for complex validation
and form state management.

**Components affected**:

- `DateInput`

**Developer changes**:

Use the `value` and `onChange` props for controlled mode:

\`\`\`tsx
const [date, setDate] = useState(new Date());

[...]

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
🐛 [FIX]: `TextInput` label colour incorrect in dark mode
```

✅ **Breaking change with migration:**

```markdown
💔 [BREAKING CHANGE]: Remove support for legacy theme format

The legacy theme format (v1) is no longer supported. All themes must now use the
v2 format introduced in version 2.0.0.

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
💔 [BREAKING CHANGE]: Update `Button` API
```

❌ **Implementation details instead of user impact:**

```markdown
💅 [ENHANCEMENT]: Refactor Button component to use hooks internally
```

(Better: Focus on the benefit this brings to users, or skip if there's no visible change)

❌ **Repeating the change type as a verb in the heading:**

```markdown
🐛 [FIX]: Fix `Modal` close button accessibility issue
```

```markdown
🐛 [FIX]: Correct `TextInput` label colour in dark mode
```

(Better: State the problem directly — "`Modal` close button inaccessible when browser UI bars are visible", "`TextInput` label colour incorrect in dark mode")

Also avoid including internal implementation details that don't affect consumers.
