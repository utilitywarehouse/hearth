---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `prefix` and `suffix` props to `Input` component

The `Input` component now supports `prefix` and `suffix` props, allowing you to display text or custom content before and after the input field. This is useful for adding units, currency symbols, or other contextual information.

**Components affected**:
- `Input`

**Developer changes**:

Use the `prefix` and `suffix` props to add content before or after the input:

```tsx
<Input
  label="Amount"
  prefix="£"
  suffix="GBP"
  placeholder="0.00"
/>
```

You can also pass custom React nodes:

```tsx
<Input
  label="Email"
  prefix={<CustomIcon />}
  suffix={<BodyText>@example.com</BodyText>}
/>
```

**Note**: The `prefix` and `suffix` props are not available on `password` and `search` input types, as these have specific UI patterns.
