---
'@utilitywarehouse/hearth-react-native': minor
---

💔 [BREAKING CHANGE]: Simplify semantic token naming and introduce utility prop types

This release simplifies the semantic token naming convention and introduces a new utility prop system to make the API more intuitive and consistent across components.

**Components affected**:
- `Box`
- `Container`
- `Card`
- `Flex`
- `Grid`
- `Center`
- `BodyText`
- `Heading`
- `DetailText`
- `Carousel`
- `CarouselItem`

**Developer changes**:

### Background Colors

Background color props now accept simplified semantic tokens. Update your code as follows:

```diff
- <Box backgroundColor="backgroundPrimary">
+ <Box backgroundColor="primary">

- <Box backgroundColor="backgroundSecondary">
+ <Box backgroundColor="secondary">

- <Box backgroundColor="backgroundBrand">
+ <Box backgroundColor="brand">

- <Container bg="backgroundPrimary">
+ <Container bg="primary">
```

You can still use full color tokens (e.g., `backgroundColor={color.blue[400]}`) by using a `StyleSheet`, the `useTheme` hook, or directly importing from the tokens library: 
```tsx
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create(theme => ({
  customBackground: {
    backgroundColor: theme.color.blue[400],
  },
}));

<Box style={styles.customBackground} />
```

```tsx
import { useTheme } from '@utilitywarehouse/hearth-react-native';

const theme = useTheme();

<Box backgroundColor={theme.color.purple[800]} />
```

```tsx
import { color } from '@utilitywarehouse/hearth-tokens';

<Box backgroundColor={color.blue[400]} />
```

### Text Colors

Text color props now accept simplified semantic tokens:

```diff
- <BodyText color="white">Text</BodyText>
+ <BodyText color="inverted">Text</BodyText>

- <BodyText color="grey1000">Text</BodyText>
+ <BodyText color="primary">Text</BodyText>

- <Heading color="textSecondary">Heading</Heading>
+ <Heading color="secondary">Heading</Heading>
```

### Border Colors

Border color props now accept simplified semantic tokens:

```diff
- <Box borderColor="grey800">
+ <Box borderColor="strong">

- <Box borderColor="borderSubtle">
+ <Box borderColor="subtle">
```

### Utility Props

Components now support consistent utility props through shared type interfaces. The following components have been updated to support additional utility props:

- **Container**: Added `MarginProps`, `PaddingProps`, `GapProps`, and `BackgroundColorProps`
- **Card**: Added `MarginProps` and `GapProps`
- **Flex**: Now properly supports `MarginProps`, `PaddingProps`, and `GapProps`
- **Text components** (BodyText, Heading, DetailText): Now support `MarginProps`

This means you can now use margin utilities directly on these components:

```tsx
<BodyText mt="200" mb="100">Text with margin utilities</BodyText>
<Container mx="300" py="200">Container with spacing utilities</Container>
<Card mt="200" gap="100">Card with margin and gap utilities</Card>
```

**Migration guide**:

1. Replace semantic background color tokens:
   - `backgroundPrimary` → `primary`
   - `backgroundSecondary` → `secondary`
   - `backgroundBrand` → `brand`

2. Replace semantic text color tokens:
   - `white` → `inverted` (for text on dark backgrounds)
   - `grey1000` / `textPrimary` → `primary`
   - `textSecondary` → `secondary`

3. Replace semantic border color tokens:
   - `grey800` / `borderStrong` → `strong`
   - `borderSubtle` → `subtle`

4. For non-semantic colors, use a `StyleSheet` and use the full color token from the theme:

```tsx
import { StyleSheet } from 'react-native'; 

const styles = StyleSheet.create(theme => ({ 
  customBackground: { 
    backgroundColor: theme.color.blue[400], 
  }, 
})); 

<Box style={styles.customBackground} /> 
```

or the `useTheme` hook:

```tsx
import { useTheme } from '@utilitywarehouse/hearth-react-native'; 

const theme = useTheme(); 
<Box backgroundColor={theme.color.purple[800]} /> 
```

or use the tokens library: 
```tsx
import { color } from '@utilitywarehouse/hearth-tokens';

<Box backgroundColor={color.purple[800]} />
```

**Backwards compatibility**:

The full color tokens (e.g., `backgroundPrimary`, `grey1000`) are still supported as fallbacks but are deprecated and will cause type errors. We recommend migrating to the simplified tokens for a cleaner API.

**References**:
- [Semantic tokens documentation](https://github.com/utilitywarehouse/hearth/blob/main/packages/tokens/src/semantic-light.ts)
