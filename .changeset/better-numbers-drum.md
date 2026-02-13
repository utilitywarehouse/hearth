---
'@utilitywarehouse/hearth-react': patch
---

🌟 [FEATURE]: Add `opacity` prop to layout components

**Components affected**:

- `Box`
- `Flex`
- `Grid`

These components now accept an `opacity` prop that allows you to set the opacity
of the component and its children. The `opacity` prop accepts a string value between
`0` and `1`, as well as Hearth browser tokens and CSS custom properties.

```tsx
import {semantic} from '@utilitywarehouse/hearth-tokens/browser';

<Box opacity="0.5" />
<Box opacity={semantic.opacity.disabled}/>
<Box opacity="var(--h-opacity-disabled)" />

<Flex opacity="0.5" />
<Flex opacity={semantic.opacity.disabled}/>
<Flex opacity="var(--h-opacity-disabled)" />

<Grid opacity="0.5" />
<Grid opacity={semantic.opacity.disabled}/>
<Grid opacity="var(--h-opacity-disabled)" />
```
