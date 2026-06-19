# Colour props

## Color

The `color` prop accepts the following semantic colour values: `primary`,
`secondary`, `brand`, `affirmative`, `inverted`.

```tsx
<Box color="primary" />
<Box color="secondary" />
<Box color="brand" />
<Box color="affirmative" />
<Box color="inverted" />
```

| Value       | CSS custom property       |
| ----------- | ------------------------- |
| primary     | var(--h-text-primary)     |
| secondary   | var(--h-text-secondary)   |
| brand       | var(--h-text-brand)       |
| affirmative | var(--h-text-affirmative) |
| inverted    | var(--h-text-inverted)    |

You can also pass any of the available Hearth prefixed CSS custom properties
from the Hearth Tokens library.
You cannot pass raw strings to the `color` prop.

```tsx
import { Box } from '@utilitywarehouse/hearth-react' import { semantic } from '@utilitywarehouse/hearth-tokens/browser';

// token value
<Box color="primary" />

// Hearth prefixed CSS custom property
<Box color="var(--h-color-cashback-lilac-500)" />

// Hearth browser tokens
<Box color={semantic.feedback.positive.foreground.subtle}/>

// This will show an error as the string pixel value is not valid
// <Box color='rebeccapurple'/>
```

| Prop    | Type                                                                                         | Default | Description |
| ------- | -------------------------------------------------------------------------------------------- | ------- | ----------- |
| `color` | `"primary" \| "secondary" \| "brand" \| "affirmative" \| "inverted" \| `var(--h-${string})`` | —       |             |

## Background colour

The `backgroundColor` prop accepts the following semantic colour values: `primary`, `secondary`, `brand`.

```tsx
<Box backgroundColor="primary" />
<Box backgroundColor="secondary" />
<Box backgroundColor="brand" />
```

| Value     | CSS custom property           |
| --------- | ----------------------------- |
| primary   | var(--h-background-primary)   |
| secondary | var(--h-background-secondary) |
| brand     | var(--h-background-brand)     |

You can also pass any of the available Hearth prefixed CSS custom properties from the Hearth Tokens library.
You cannot pass raw strings to the `backgroundColor` prop.

```tsx
import { Box } from '@utilitywarehouse/hearth-react' import { semantic } from '@utilitywarehouse/hearth-tokens/browser';

// token value
<Box backgroundColor="primary" />

// Hearth prefixed CSS custom property
<Box backgroundColor="var(--h-color-cashback-lilac-200)" />

// Hearth browser tokens
<Box backgroundColor={semantic.feedback.positive.surface.subtle}/>

// This will show an error as the string pixel value is not valid
// <Box backgroundColor='rebeccapurple'/>
```

| Prop              | Type                                                          | Default | Description |
| ----------------- | ------------------------------------------------------------- | ------- | ----------- |
| `backgroundColor` | `"primary" \| "secondary" \| "brand" \| `var(--h-${string})`` | —       |             |
