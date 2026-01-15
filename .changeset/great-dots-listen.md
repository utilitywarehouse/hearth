---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE] Custom `ListItem` styles for `UL` and `OL` components

Added new props to `UL`, `OL`, and `ListItem` components to support custom list markers, including icons, images, and colors. This brings the functionality closer to CSS-like list styling. We also fixed a layout issue where list item text could overflow the container.

**Components affected**:

- `UL` (UnorderedList)
- `OL` (OrderedList)
- `ListItem`

**Developer changes**:

You can now customise list bullets/markers using the new `listStyle*` props. These can be set on the list container to apply to all items, or overridden on individual list items.

```tsx
import { UL, LI } from '@utilitywarehouse/hearth-react-native';
import { TickIcon } from '@utilitywarehouse/hearth-react-native-icons';

<UL listStyleColour="feedbackPositiveSurfaceDefault" listStyleIcon={TickIcon}>
  <LI>Success item 1</LI>
  <LI listStyleColour="feedbackDangerSurfaceDefault">Error item override</LI>
</UL>
```

Supported props:
- `listStyleImage`: React Element (e.g. `<Image />`)
- `listStyleIcon`: Icon component
- `listStyleWidth` / `listStyleHeight`: Dimensions for the marker (default: 20)
- `listStyleColour`: Color token or value for the marker

