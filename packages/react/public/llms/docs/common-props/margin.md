# Margin props

Margin props are responsive, and accept [space design tokens](https://hearth.prod.uw.systems/?path=/docs/tokens_space--docs#available-space-tokens),
as well as Hearth prefixed CSS custom properties from the Hearth Tokens library.

```tsx
import { Box } from '@utilitywarehouse/hearth-react' import { components } from '@utilitywarehouse/hearth-tokens/browser';

// token value
<Box margin="100" />

// responsive token values
<Box margin={{ mobile: "100", desktop: "300" }}/>

// Hearth prefixed CSS custom property
<Box margin="var(--h-space-200)" />

// Hearth browser tokens
<Box margin={components.container.margin}/>

// The only raw string value accepted is "auto"
<Box marginX="auto"/>

// This will show an error as the string pixel value, passed to the desktop breakpoint, is not valid
// <Box margin={{ mobile: '100', tablet: 'var(--h-space-200)', desktop: '32px' }}/>
```

| Prop           | Type                                                                                                                                                                                                       | Default | Description |
| -------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ----------- |
| `margin`       | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginTop`    | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginRight`  | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginBottom` | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginLeft`   | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginX`      | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
| `marginY`      | `Responsive<`var(--h-${string})` \| "0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000">` | —       |             |
