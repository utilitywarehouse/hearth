---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add color override props to `IconButton` for service-specific branding

The `IconButton` component now supports custom color overrides through three new optional props: `backgroundColor`, `activeBackgroundColor`, and `shadowColor`. These props enable service-specific branding for use cases like service buttons (Electricity, Broadband, Mobile, Insurance, Cashback Card).

⚠️ **Important**: These props should be used sparingly and only for specific use cases where brand-specific colors are required. For most use cases, continue using the standard `colorScheme` and `variant` props to maintain design system consistency.

**Components affected**:
- `IconButton`

**Developer changes**:

You can now customize `IconButton` colors for service-specific branding:

```tsx
import { IconButton } from '@utilitywarehouse/hearth-react-native';
import { ElectricityMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

<IconButton
  icon={ElectricityMediumIcon}
  backgroundColor="energyBlue200"
  activeBackgroundColor="energyBlue300"
  shadowColor="energyBlue300"
  variant="emphasis"
  onPress={handlePress}
/>
```

The new props are:
- `backgroundColor` - Sets the base background color, overriding the color scheme's default
- `activeBackgroundColor` - Sets the background color when pressed or in an active state
- `shadowColor` - Sets the shadow/elevation color

These overrides work alongside the existing `variant` and `colorScheme` props, allowing you to maintain structural styling while customizing colors for specific branding requirements.
