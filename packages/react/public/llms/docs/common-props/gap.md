# Gap

The `gap` prop is responsive, and accepts [space design tokens](https://hearth.prod.uw.systems/?path=/docs/tokens_space--docs#available-space-tokens),
as well as Hearth prefixed CSS custom properties from the Hearth Tokens library. You cannot pass raw strings.

```tsx
import { Flex } from '@utilitywarehouse/hearth-react' import { components } from '@utilitywarehouse/hearth-tokens/browser';

// token value
<Flex gap="100" />

// responsive token values
<Flex gap={{ mobile: "100", desktop: "300" }}/>

// Hearth prefixed CSS custom property
<Flex gap="var(--h-space-200)" />

// Hearth browser tokens
<Flex gap={components.button.gap}/>

// This will show an error as the string pixel value, passed to the desktop breakpoint, is not valid
// <Box gap={{ mobile: '100', tablet: 'var(--h-space-200)', desktop: '32px' }}/>
```

| Prop        | Type                                                                                                                                                                                             | Default | Description |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------- | ----------- |
| `gap`       | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `rowGap`    | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `columnGap` | `Responsive<`var(--h-${string})` \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
