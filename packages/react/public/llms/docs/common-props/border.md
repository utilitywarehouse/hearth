# Borders

## Border colour

The border colour props accept the following semantic colour values: `strong`, `subtle`.
It will also apply the `solid` border style to the specified side(s).

```tsx
<Box borderColor="strong" />
<Box borderColor="subtle" />
```

This applies to all of the available border colour values:

- `borderColor`
- `borderTopColor`
- `borderRightColor`
- `borderBottomColor`
- `borderLeftColor`

You can also pass any of the available Hearth prefixed CSS custom properties
from the Hearth Tokens library. You cannot pass raw strings to the border
colour props.

```tsx
import { Box } from '@utilitywarehouse/hearth-react' import { semantic } from '@utilitywarehouse/hearth-tokens/browser';

// token value
<Box borderColor="subtle" />

// Hearth prefixed CSS custom property
<Box borderColor="var(--h-color-grey-500)" />

// Hearth browser tokens
<Box
  borderColor={semantic.feedback.positive.border}
  borderWidth="1"
  borderStyle="solid"
  borderRadius="lg"
/>

// This will show an error as the string pixel value is not valid
// <Box borderColor='rebeccapurple'/>
```

| Prop                | Type                                           | Default | Description |
| ------------------- | ---------------------------------------------- | ------- | ----------- |
| `borderColor`       | `"strong" \| `var(--h-${string})` \| "subtle"` | —       |             |
| `borderTopColor`    | `"strong" \| `var(--h-${string})` \| "subtle"` | —       |             |
| `borderRightColor`  | `"strong" \| `var(--h-${string})` \| "subtle"` | —       |             |
| `borderBottomColor` | `"strong" \| `var(--h-${string})` \| "subtle"` | —       |             |
| `borderLeftColor`   | `"strong" \| `var(--h-${string})` \| "subtle"` | —       |             |

## Border width and style

The border props are responsive, and, alongside the border color and border
radius props, can be used to control the appearance of component borders.

The border-style is implicitly set when applying a border-color, so you usually
won't need it.

You can also pass any of the available Hearth prefixed CSS custom properties
from the Hearth Tokens library. You cannot pass raw strings to the border
colour props.

```tsx
<Box borderColor="strong"  borderWidth="1" />
<Box borderWidth="2" borderColor="subtle" borderStyle={{ mobile: 'none', desktop: 'solid' }} />
<Box borderTopColor="subtle" borderTopWidth={{ mobile: '1', desktop: '2'}} borderRadius="full" />

// using Hearth browser tokens
import { components } from '@utilitywarehouse/hearth-tokens/browser';

<Box borderWidth={components.alert.borderWidth} />
```

| Prop                | Type                                                    | Default | Description |
| ------------------- | ------------------------------------------------------- | ------- | ----------- |
| `borderStyle`       | `Responsive<"none" \| "solid">`                         | —       |             |
| `borderTopStyle`    | `Responsive<"none" \| "solid">`                         | —       |             |
| `borderRightStyle`  | `Responsive<"none" \| "solid">`                         | —       |             |
| `borderBottomStyle` | `Responsive<"none" \| "solid">`                         | —       |             |
| `borderLeftStyle`   | `Responsive<"none" \| "solid">`                         | —       |             |
| `borderWidth`       | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">` | —       |             |
| `borderTopWidth`    | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">` | —       |             |
| `borderRightWidth`  | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">` | —       |             |
| `borderBottomWidth` | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">` | —       |             |
| `borderLeftWidth`   | `Responsive<`var(--h-${string})` \| "0" \| "1" \| "2">` | —       |             |

## Border radius

The `borderRadius` prop is responsive, and can be used in conjunction with the
other common border props to style component borders.

You can also override the `borderRadius` for individual corners and sides.

```tsx
<Box borderRadius="md" />
<Box borderRadius={{ mobile: 'full', desktop: 'lg' }}  />
<Box borderRadius="lg" borderRadiusBottomNone />
<Box borderRadius="lg" borderRadiusTopLeftNone borderRadiusBottomRightNone  />
```

| Prop                          | Type                                                                                | Default | Description |
| ----------------------------- | ----------------------------------------------------------------------------------- | ------- | ----------- |
| `borderRadius`                | `Responsive<"none" \| "xs" \| "sm" \| "md" \| "lg" \| "xl" \| "full" \| "inherit">` | —       |             |
| `borderRadiusTopLeftNone`     | `boolean`                                                                           | —       |             |
| `borderRadiusTopRightNone`    | `boolean`                                                                           | —       |             |
| `borderRadiusBottomLeftNone`  | `boolean`                                                                           | —       |             |
| `borderRadiusBottomRightNone` | `boolean`                                                                           | —       |             |
| `borderRadiusTopNone`         | `boolean`                                                                           | —       |             |
| `borderRadiusRightNone`       | `boolean`                                                                           | —       |             |
| `borderRadiusBottomNone`      | `boolean`                                                                           | —       |             |
| `borderRadiusLeftNone`        | `boolean`                                                                           | —       |             |
