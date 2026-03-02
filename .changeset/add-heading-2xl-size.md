---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add 2xl size variant to Heading component

The `Heading` component now supports a `2xl` size option, providing a larger heading size for prominent page titles and hero sections. This size is responsive across device sizes with appropriate font sizes and line heights for mobile, tablet, and desktop viewports.

**Components affected**:
- `Heading`

**Developer changes**:

Use the new `2xl` size prop:

```tsx
<Heading size="2xl">Welcome to Hearth</Heading>
```

The `2xl` size will render with:
- Mobile: 44px font size, 52px line height
- Tablet: 44px font size, 52px line height  
- Desktop: 54px font size, 62px line height
