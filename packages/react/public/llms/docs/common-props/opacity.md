# Opacity

The opacity prop provides opacity styles, it is responsive and accepts any
valid string value.
This means you can use the Hearth browser tokens as values.

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

| Prop      | Type                 | Default | Description |
| --------- | -------------------- | ------- | ----------- |
| `opacity` | `Responsive<string>` | —       |             |
