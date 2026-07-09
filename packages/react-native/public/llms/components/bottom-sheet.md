# Bottom Sheet

The `BottomSheet` component provides a drawer-like interface that slides up from the bottom of the screen. It's commonly used for displaying additional content or actions without navigating away from the current screen.

> **Important:** For most use cases, we recommend using the `BottomSheetModal` component instead of `BottomSheet`. The modal version appears over the page content, whereas the standard `BottomSheet` is rendered inline with other page content.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Components](#components)
  - [`BottomSheetModal`](#bottomsheetmodal)
  - [`BottomSheetScrollView`](#bottomsheetscrollview)
  - [`BottomSheetModalProvider`](#bottomsheetmodalprovider)
  - [`Input` in Bottom Sheets](#input-in-bottom-sheets)
- [External Resources](#external-resources)

## Playground

```tsx
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
  <ViewWrap>
    <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>

    <BottomSheet ref={bottomSheetRef} {...args}>
      <BottomSheetView>
        <Box gap="200">
          <BodyText>This is a bottom sheet with content.</BodyText>
          <BodyText>You can swipe it up and down to close.</BodyText>
          <Button onPress={() => bottomSheetRef.current?.close()}>Close Bottom Sheet</Button>
        </Box>
      </BottomSheetView>
    </BottomSheet>
  </ViewWrap>
</View>
```

### Basic Usage

```tsx
import { useRef, useCallback } from 'react';
import {
  BottomSheetModal,
  BottomSheetView,
  Button,
  Box,
  BodyText,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const bottomSheetRef = useRef(null);

  const handleOpenPress = useCallback(() => {
    bottomSheetRef.current?.present();
  }, []);

  return (
    <>
      <Button onPress={handleOpenPress}>Open Bottom Sheet</Button>

      <BottomSheetModal ref={bottomSheetRef} snapPoints={['25%', '50%']}>
        <BottomSheetView>
          <Box gap="200" padding="100">
            <BodyText>This is a bottom sheet modal that appears over your content.</BodyText>
            <Button onPress={() => bottomSheetRef.current?.close()}>Close Bottom Sheet</Button>
          </Box>
        </BottomSheetView>
      </BottomSheetModal>
    </>
  );
};
```

## Props

The BottomSheet component is built on top of [react-native-bottom-sheet](https://gorhom.dev/react-native-bottom-sheet/), and accepts all of its props, plus the following additional props:

| Property                    | Type                                            | Description                                                                                                    | Default         |
| --------------------------- | ----------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | --------------- |
| children                    | `ReactNode`                                     | The content to display within the bottom sheet                                                                 | -               |
| backdrop                    | `boolean \| React.FC<BottomSheetBackdropProps>` | Whether to show a backdrop overlay when the sheet is open or provide a custom backdrop component               | `true`          |
| showHandle                  | `boolea`                                        | Whether to show the handle at the top of the sheet                                                             | `true`          |
| containerStyle              | `ViewStyle`                                     | Style for the bottom sheet container                                                                           | -               |
| handleStyle                 | `ViewStyle`                                     | Style for the bottom sheet handle                                                                              | -               |
| contentStyle                | `ViewStyle`                                     | Style for the bottom sheet content container                                                                   | -               |
| snapPoints                  | `(string \| number)[]`                          | Points for the bottom sheet to snap to, specified as an array of percentages (e.g., ['25%', '50%']) or numbers | `[]`            |
| index                       | `number`                                        | The initial snap point index                                                                                   | `-1` (closed)   |
| enablePanDownToClose        | `boolean`                                       | Whether to allow swiping down to close the sheet                                                               | `true`          |
| onChange                    | `(index: number) => void`                       | Callback when the sheet changes position                                                                       | -               |
| enableContentPanningGesture | `boolean`                                       | Whether to allow panning gestures on the content                                                               | `true`          |
| enableHandlePanningGesture  | `boolean`                                       | Whether to allow panning gestures on the handle                                                                | `true`          |
| keyboardBehavior            | `'interactive' \| 'extend' \| 'fillParent'`     | Defines how the bottom sheet interacts with the keyboard                                                       | `'interactive'` |
| animateOnMount              | `boolean`                                       | Whether to animate on mounting                                                                                 | `false`         |

For a comprehensive list of props, refer to the [official documentation](https://gorhom.github.io/react-native-bottom-sheet/props).

### `BottomSheetModal`

The `BottomSheetModal` component is the recommended way to use bottom sheets in most applications. It appears over the current content rather than being rendered inline.

```tsx
import { BottomSheetModal } from '@utilitywarehouse/hearth-react-native';

// See usage example above
```

**Important:** When using `BottomSheetModal`, you need to wrap your app with `BottomSheetModalProvider`:

```tsx
import { BottomSheetModalProvider } from '@utilitywarehouse/hearth-react-native';

const App = () => {
  return <BottomSheetModalProvider>{/* Your app content */}</BottomSheetModalProvider>;
};
```

`BottomSheetModalProvider` adds Hearth's bottom-sheet safe-area spacing by default. If your app already handles safe-area padding, you can opt out and avoid double spacing:

```tsx
import { BottomSheetModalProvider } from '@utilitywarehouse/hearth-react-native';

const App = () => {
  return (
    <BottomSheetModalProvider useSafeAreaInsets={false}>
      {/* Your app content */}
    </BottomSheetModalProvider>
  );
};
```

### `BottomSheetScrollView`

For scrollable content within a bottom sheet, use the `BottomSheetScrollView` component instead of the standard ScrollView:

```tsx
import {
  BottomSheetModal,
  BottomSheetScrollView,
  Box,
  BodyText,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const bottomSheetRef = useRef(null);

  return (
    <BottomSheetModal ref={bottomSheetRef} snapPoints={['50%', '90%']}>
      <BottomSheetScrollView>
        <Box gap="200" padding="100">
          <BodyText>This is scrollable content inside the bottom sheet.</BodyText>
          {/* Add more content here */}
        </Box>
      </BottomSheetScrollView>
    </BottomSheetModal>
  );
};
```

### `BottomSheetModalProvider`

As mentioned above, when using `BottomSheetModal`, you need to wrap your app with `BottomSheetModalProvider`:

```tsx
import { BottomSheetModalProvider } from '@utilitywarehouse/hearth-react-native';

const App = () => {
  return <BottomSheetModalProvider>{/* Your app content */}</BottomSheetModalProvider>;
};
```

Use the `useSafeAreaInsets` prop to control whether Hearth applies bottom-sheet safe-area spacing for modal content, list wrappers, and the top `SafeAreaView` used by components such as `Select` and `Combobox`.

| Property            | Type      | Description                                                                                                                                         | Default |
| ------------------- | --------- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ------- |
| `useSafeAreaInsets` | `boolean` | Applies Hearth's safe-area insets inside bottom sheets. Set to `false` when your app already manages safe-area padding around bottom-sheet content. | `true`  |

### `Input` in Bottom Sheets

When using the `Input` component inside a `BottomSheet` or `BottomSheetModal`, you need to pass the `inBottomSheet` prop to ensure proper behavior with the keyboard and focus management.

```tsx
import { Input } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  return (
    <BottomSheetModal>
      <Input placeholder="Type something..." inBottomSheet />
    </BottomSheetModal>
  );
};
```

## External Resources

This component is built on top of [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/) (v5). For more information about advanced usage and additional features, please refer to the [official documentation](https://gorhom.dev/react-native-bottom-sheet/).
