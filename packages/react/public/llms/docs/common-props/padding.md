# Padding props

Padding props are responsive, and accept [space design tokens](https://hearth.prod.uw.systems/?path=/docs/tokens_space--docs#available-space-tokens),
as well as Hearth prefixed CSS custom properties from the Hearth Tokens library. You cannot pass raw strings to the padding props.

```tsx
import { Box } from '@utilitywarehouse/hearth-react' import { components } from '@utilitywarehouse/hearth-tokens/browser';

// token value
<Box padding="100" />

// responsive token values
<Box padding={{ mobile: "100", desktop: "300" }}/>

// Hearth prefixed CSS custom property
<Box padding="var(--h-space-200)" />

// Hearth browser tokens
<Box paddingBottom={components.container.paddingBottom}/>

// This will show an error as the string pixel value, passed to the desktop breakpoint, is not valid
// <Box paddingBottom={{ mobile: '100', tablet: 'var(--h-space-200)', desktop: '32px' }}/>
```

| Prop            | Type                                                                                                                                                                                             | Default | Description |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ----------- |
| `padding`       | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `paddingTop`    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `paddingRight`  | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `paddingBottom` | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `paddingLeft`   | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `paddingX`      | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `paddingY`      | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
