---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: `BodyText` `xl` size (20px / 28px line-height)

The `xl` size is now available on the `BodyText` component, making `Body Text XL` and `Body Text XL SemiBold` (`size="xl" weight="semibold"`) usable in
React.

**Developer changes**:

No migration required. Use the new size alongside the existing `weight` prop:

```tsx
<BodyText size="xl">Body Text XL</BodyText>
<BodyText size="xl" weight="semibold">Body Text XL SemiBold</BodyText>
```

The `xl` size is fully responsive:

```tsx
<BodyText size={{ mobile: 'lg', desktop: 'xl' }}>Responsive</BodyText>
```
