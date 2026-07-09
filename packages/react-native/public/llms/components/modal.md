# Modal

The `Modal` component provides a versatile dialog interface that slides up from the bottom of the screen. It's built on top of
the `BottomSheetModal`
component and includes pre-configured layouts for common modal patterns including headers, content areas, and action buttons.

The Modal component is ideal for displaying important information, collecting user input, or presenting choices that require user attention
without navigating away from the current screen.

If you need a modal layout inside a React Navigation modal screen, use `NavModal` instead.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Features](#features)
- [Accessibility](#accessibility)
- [Examples](#examples)
  - [Basic Modal](#basic-modal)
  - [Modal with Image](#modal-with-image)
  - [Fullscreen Modal](#fullscreen-modal)
  - [Modal with Custom Content](#modal-with-custom-content)
  - [JSX Description](#jsx-description)
  - [Sticky Custom Footer](#sticky-custom-footer)
  - [Loading State](#loading-state)
  - [Without Close Button](#without-close-button)
  - [Single Action Modal](#single-action-modal)
  - [Navigation Modals](#navigation-modals)
  - [Close handlers and state management](#close-handlers-and-state-management)
- [Integration Notes](#integration-notes)
- [External Resources](#external-resources)

## Playground

```tsx
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
  <ViewWrap>
    <Button onPress={openModal}>Open Modal</Button>

    <Modal ref={modalRef} {...args} />
  </ViewWrap>
</View>
```

### Basic Usage

```tsx
import { useRef, useCallback } from 'react';
import { Modal, Button, BottomSheetModal } from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  const handleOpenModal = useCallback(() => {
    modalRef.current?.present();
  }, []);

  const handleCloseModal = useCallback(() => {
    modalRef.current?.dismiss();
  }, []);

  return (
    <>
      <Button onPress={handleOpenModal}>Open Modal</Button>

      <Modal
        ref={modalRef}
        heading="Confirm Action"
        description="Are you sure you want to proceed with this action?"
        primaryButtonText="Confirm"
        secondaryButtonText="Cancel"
        onPressPrimaryButton={handleCloseModal}
        onPressSecondaryButton={handleCloseModal}
      />
    </>
  );
};
```

## Props

The Modal component extends the `BottomSheetModal` component and accepts all of its props, plus the following additional props:

| Property                      | Type                                                               | Description                                                                                                            | Default        |
| ----------------------------- | ------------------------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------- |
| `heading`                     | `string`                                                           | The heading text displayed at the top of the modal                                                                     | -              |
| `description`                 | `ReactNode`                                                        | The description content displayed below the heading. Pass a string for the default styling, or JSX for custom content. | -              |
| `showCloseButton`             | `boolean`                                                          | Whether to show the close button in the top-right corner                                                               | `true`         |
| `primaryButtonText`           | `string`                                                           | Text for the primary action button                                                                                     | -              |
| `secondaryButtonText`         | `string`                                                           | Text for the secondary action button                                                                                   | -              |
| `onPressPrimaryButton`        | `() => void`                                                       | Callback function called when the primary button is pressed                                                            | -              |
| `onPressSecondaryButton`      | `() => void`                                                       | Callback function called when the secondary button is pressed                                                          | -              |
| `onPressCloseButton`          | `() => void`                                                       | Callback function called when the close button is pressed                                                              | -              |
| `closeOnPrimaryButtonPress`   | `boolean`                                                          | Whether to automatically close the modal when the primary button is pressed                                            | `true`         |
| `closeOnSecondaryButtonPress` | `boolean`                                                          | Whether to automatically close the modal when the secondary button is pressed                                          | `true`         |
| `onChange`                    | `(index: number, position: number, `<br />` type: number) => void` | Callback function called when the modal's position changes \*                                                          | -              |
| `loading`                     | `boolean`                                                          | Whether to show a loading state with spinner                                                                           | `false`        |
| `loadingHeading`              | `string`                                                           | The heading text to be displayed when loading is true. If not provided, the regular heading will be shown.             | `'Loading...'` |
| `loadingDescription`          | `string`                                                           | The description text to be displayed when loading is true. If not provided, the regular description will be shown.     | -              |
| `image`                       | `ImageProps`                                                       | Image to display in the modal (shows as centered content with text below)                                              | -              |
| `children`                    | `ReactNode`                                                        | Custom content to display in the modal body                                                                            | -              |
| `primaryButtonProps`          | `Omit<ButtonWithoutChildrenProps, 'children'>`                     | Additional props to pass to the primary button (colorScheme defaults to 'highlight', variant to 'solid')               | -              |
| `secondaryButtonProps`        | `Omit<ButtonWithoutChildrenProps, 'children'>`                     | Additional props to pass to the secondary button (colorScheme defaults to 'functional', variant to 'outline')          | -              |
| `footer`                      | `ReactNode`                                                        | Custom footer content that replaces the built-in action buttons                                                        | -              |
| `footerStyle`                 | `StyleProp<ViewStyle>`                                             | Styles applied to the footer container, useful for sticky footer shadows or custom spacing                             | -              |
| `closeButtonProps`            | `Omit<UnstyledIconButtonProps, 'children'>`                        | Additional props to pass to the close button                                                                           | -              |
| `fullscreen`                  | `boolean`                                                          | Whether the modal should take up the full screen height                                                                | `false`        |

When `footer` is provided, the primary and secondary button props are not available. Build your footer actions directly inside the custom footer content instead.

\* use this to detect if the modal has been opened or closed, index 0 indicates open state and -1 indicates closed state

### `ModalImage` Props

The `ModalImage` component can be used to display an image within the Modal. It accepts the following props:

| Property  | Type                  | Description                                                              |
| --------- | --------------------- | ------------------------------------------------------------------------ |
| `source`  | `ImageSourcePropType` | The source of the image to display                                       |
| `light`   | `ImageSourcePropType` | The source of the image to display in light mode (use instead of source) |
| `dark`    | `ImageSourcePropType` | The source of the image to display in dark mode (use instead of source)  |
| `...rest` | `ImageProps`          | Additional props to pass to the underlying Image component               |

For more details about the ThemedImage component used internally, refer to the `ThemedImage` documentation.

### Automatic Layout Management

- **Header Section**: Displays heading, description, and close button in a flexible layout
- **Content Area**: Supports custom children or image content with automatic centering
- **Footer Section**: Action buttons with consistent spacing and styling
- **Loading State**: Built-in spinner and loading text with proper layout

### Responsive Behavior

- **Dynamic Sizing**: Automatically adjusts height based on content when `enableDynamicSizing` is enabled
- **Image Modals**: Automatically sets snapPoints to `['90%']` when an image is provided
- **Handle Management**: Automatically hides the drag handle during loading states

### Accessibility & UX

- **Auto-close**: Configurable auto-close behavior for action buttons
- **Backdrop**: Inherits backdrop behavior from BottomSheetModal
- **Scrollable Content**: Uses BottomSheetScrollView for content that may overflow
- **Screen Reader Support**: Automatically announces modal state changes and manages focus
- **Focus Management**: Sets accessibility focus to modal content when opened
- **Keyboard Navigation**: Full keyboard support for interactive elements
- **ARIA Labels**: Proper labeling for all interactive components
- **Loading States**: Accessible loading indicators with appropriate announcements

## Accessibility

The Modal component is built with comprehensive accessibility support to ensure a great experience for all users, including those using screen readers and other assistive technologies.

### Screen Reader Support

- **Automatic Announcements**: When the modal opens, screen readers automatically announce "Modal opened"
- **Content Focus**: Focus is automatically set to the modal content area for immediate access
- **Loading State Announcements**: Loading states are properly announced with "Loading..." text
- **Button Labels**: All interactive elements have descriptive accessibility labels

### Focus Management

The Modal component automatically manages focus to provide a seamless experience:

```tsx
// Focus is automatically set when modal opens
const MyModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <Modal
      ref={modalRef}
      heading="Accessible Modal" // Automatically becomes accessible heading
      description="This description is accessible to screen readers"
      primaryButtonText="Confirm" // Button is automatically labeled
      secondaryButtonText="Cancel"
      // Focus management is handled automatically
    />
  );
};
```

### Custom Accessibility Labels

You can enhance accessibility by providing custom labels for buttons and close actions:

```tsx
<Modal
  ref={modalRef}
  heading="Delete Item"
  description="This action cannot be undone"
  primaryButtonText="Delete"
  secondaryButtonText="Cancel"
  // Custom accessibility labels
  closeButtonProps={{
    accessibilityLabel: 'Close delete confirmation dialog',
  }}
  primaryButtonProps={{
    accessibilityLabel: 'Confirm deletion of item',
  }}
  secondaryButtonProps={{
    accessibilityLabel: 'Cancel deletion and return to previous screen',
  }}
/>
```

### Loading State Accessibility

Loading states are fully accessible with proper announcements:

```tsx
<Modal
  ref={modalRef}
  heading="Processing Payment"
  description="Please wait while we process your payment"
  loading={isProcessing}
  // Loading spinner and "Loading..." text are automatically accessible
  primaryButtonText="Process Payment"
  onPressPrimaryButton={handlePayment}
/>
```

### Best Practices

1. **Descriptive Headings**: Use clear, descriptive headings that explain the modal's purpose
2. **Actionable Button Text**: Use specific button text that describes the action (e.g., "Save Changes" vs "OK")
3. **Meaningful Descriptions**: Provide context in the description to help users understand the consequences
4. **Custom Labels**: Add custom accessibility labels for complex interactions
5. **Loading Feedback**: Always provide accessible feedback during loading states

### Testing Accessibility

To test accessibility in your Modal implementation:

```tsx
import { AccessibilityInfo } from 'react-native';

const TestableModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  const handleOpenModal = () => {
    modalRef.current?.present();

    // Test: Verify screen reader announcement
    AccessibilityInfo.announceForAccessibility('Opening confirmation dialog');
  };

  return (
    <Modal
      ref={modalRef}
      heading="Test Modal"
      description="This modal demonstrates accessibility features"
      primaryButtonText="Test Action"
      // Verify these labels work with your screen reader
      closeButtonProps={{
        accessibilityLabel: 'Close test modal',
        accessibilityHint: 'Dismisses the modal without saving changes',
      }}
    />
  );
};
```

### Platform Considerations

The Modal component handles platform-specific accessibility differences:

- **iOS**: Uses VoiceOver optimizations for focus management
- **Android**: Implements TalkBack-specific accessibility patterns
- **Cross-platform**: Consistent behavior across both platforms

### Basic Modal

```tsx
<View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
  <ViewWrap>
    <Button onPress={openModal}>Open Modal</Button>

    <Modal ref={modalRef} {...args} />
  </ViewWrap>
</View>
```

### Modal with Image

Use the `image` prop to display an image-centric modal with centered content:

```tsx
<Modal
  heading="Modal Heading"
  description="This is a modal description"
  showCloseButton
  primaryButtonText="Primary"
  secondaryButtonText="Cancel"
  onPressCloseButton={() => null}
  onPressPrimaryButton={() => null}
  onPressSecondaryButton={() => null}
/>
```

```tsx
import { Modal, ModalImage, Button } from '@utilitywarehouse/hearth-react-native';

const ImageModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Button onPress={() => modalRef.current?.present()}>Show Image Modal</Button>

      <Modal
        ref={modalRef}
        heading="Welcome!"
        description="Thanks for joining our community"
        primaryButtonText="Get Started"
        secondaryButtonText="Maybe Later"
        image={<ModalImage source={require('./path/to/image.png')} resizeMode="contain" />}
        onPressPrimaryButton={() => modalRef.current?.dismiss()}
        onPressSecondaryButton={() => modalRef.current?.dismiss()}
      />
    </>
  );
};
```

### Fullscreen Modal

Create a modal that takes up the full screen height:

```tsx
<View style={Platform.OS === 'web' ? { width: 400, height: 800 } : { flex: 1 }}>
  <ViewWrap>
    <Button onPress={openModal}>Open Fullscreen Modal</Button>

    <Modal
      ref={modalRef}
      heading="Fullscreen Modal Heading"
      description="This is a fullscreen modal description"
      onPressCloseButton={closeModal}
      primaryButtonText="Primary"
      onPressPrimaryButton={closeModal}
      secondaryButtonText="Cancel"
      onPressSecondaryButton={closeModal}
      fullscreen
    >
      <Box gap="200">
        <BodyText>This is a fullscreen modal with content.</BodyText>
        <BodyText>You can swipe it up and down to close.</BodyText>
      </Box>
    </Modal>
  </ViewWrap>
</View>
```

```tsx
const FullscreenModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Button onPress={() => modalRef.current?.present()}>Show Fullscreen Modal</Button>

      <Modal
        ref={modalRef}
        heading="Fullscreen Modal"
        description="This modal takes up the full screen height"
        primaryButtonText="Close"
        onPressPrimaryButton={() => modalRef.current?.dismiss()}
        fullscreen
      />
    </>
  );
};
```

### Modal with Custom Content

Add custom content between the header and footer sections:

```tsx
<Modal
  heading="Modal Heading"
  description="This is a modal description"
  showCloseButton
  primaryButtonText="Primary"
  secondaryButtonText="Cancel"
  onPressCloseButton={() => null}
  onPressPrimaryButton={() => null}
  onPressSecondaryButton={() => null}
/>
```

```tsx
const CustomContentModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Button onPress={() => modalRef.current?.present()}>Show Custom Modal</Button>

      <Modal
        ref={modalRef}
        heading="Settings"
        description="Configure your preferences"
        primaryButtonText="Save"
        secondaryButtonText="Cancel"
        onPressPrimaryButton={() => modalRef.current?.dismiss()}
        onPressSecondaryButton={() => modalRef.current?.dismiss()}
      >
        <Box gap="200">
          <BodyText>Enable notifications</BodyText>
          <BodyText>Allow location access</BodyText>
          <BodyText>Share usage data</BodyText>
        </Box>
      </Modal>
    </>
  );
};
```

### JSX Description

`description` accepts a string for the default text styling, or JSX when you need custom content such as a link:

```tsx
<Modal
  ref={modalRef}
  heading="Update available"
  description={
    <BodyText>
      Read the <InlineLink onPress={() => {}}>release notes</InlineLink> before updating.
    </BodyText>
  }
/>
```

### Sticky Custom Footer

Replace the built-in buttons with a custom sticky footer when you need custom layouts or button arrangements:

```tsx
<Modal
  heading="Modal Heading"
  description="This is a modal description"
  showCloseButton
  primaryButtonText="Primary"
  secondaryButtonText="Cancel"
  onPressCloseButton={() => null}
  onPressPrimaryButton={() => null}
  onPressSecondaryButton={() => null}
/>
```

```tsx
const StickyCustomFooterModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Button onPress={() => modalRef.current?.present()}>Show Custom Footer Modal</Button>

      <Modal
        ref={modalRef}
        heading="Update billing details"
        description="Use a custom sticky footer when you need horizontal actions or extra decoration."
        footer={
          <Flex direction="row" spacing="md" pt="250">
            <Button
              variant="outline"
              colorScheme="functional"
              onPress={() => modalRef.current?.dismiss()}
              style={{ flex: 1 }}
            >
              Cancel
            </Button>
            <Button onPress={() => modalRef.current?.dismiss()} style={{ flex: 1 }}>
              Save changes
            </Button>
          </Flex>
        }
        footerStyle={{
          boxShadow: '0px -6px 12px rgba(16, 24, 40, 0.12)',
        }}
      >
        <Box gap="200">
          <BodyText>Review the changes before saving.</BodyText>
        </Box>
      </Modal>
    </>
  );
};
```

### Loading State

Show a loading spinner while processing:

```tsx
<Modal
  heading="Modal Heading"
  description="This is a modal description"
  showCloseButton
  primaryButtonText="Primary"
  secondaryButtonText="Cancel"
  onPressCloseButton={() => null}
  onPressPrimaryButton={() => null}
  onPressSecondaryButton={() => null}
/>
```

```tsx
const LoadingModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsLoading(false);
    modalRef.current?.dismiss();
  };

  return (
    <>
      <Button onPress={() => modalRef.current?.present()}>Show Loading Modal</Button>

      <Modal
        ref={modalRef}
        heading="Processing"
        description="Please wait while we process your request"
        loading={isLoading}
        primaryButtonText="Submit"
        onPressPrimaryButton={handleSubmit}
        closeOnPrimaryButtonPress={false}
      />
    </>
  );
};
```

### Without Close Button

Remove the close button for critical actions:

```tsx
const CriticalModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Button onPress={() => modalRef.current?.present()}>Show Critical Modal</Button>

      <Modal
        ref={modalRef}
        heading="Critical Action Required"
        description="This action cannot be undone"
        showCloseButton={false}
        primaryButtonText="Continue"
        secondaryButtonText="Cancel"
        onPressPrimaryButton={() => modalRef.current?.dismiss()}
        onPressSecondaryButton={() => modalRef.current?.dismiss()}
      />
    </>
  );
};
```

### Single Action Modal

Create a modal with only one action button:

```tsx
const AlertModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);

  return (
    <>
      <Button onPress={() => modalRef.current?.present()}>Show Alert</Button>

      <Modal
        ref={modalRef}
        heading="Success!"
        description="Your action was completed successfully"
        primaryButtonText="OK"
        onPressPrimaryButton={() => modalRef.current?.dismiss()}
      />
    </>
  );
};
```

### Navigation Modals

For React Navigation modal screens, use `NavModal`. It contains the extracted screen-based modal layout, background variants, scrollable content handling, and the Android `triggerCloseAnimation()` ref used during navigation dismissal.

### Close handlers and state management

The Modal component provides multiple ways to handle closing the modal and managing state:

- Use the `onPressPrimaryButton`, `onPressSecondaryButton`, and `onPressCloseButton` props to run custom logic when buttons are pressed, such as form validation or API calls, before closing the modal.
- Control whether the modal should automatically close when action buttons are pressed using the `closeOnPrimaryButtonPress` and `closeOnSecondaryButtonPress` props. This allows you to keep the modal
  open while performing async operations and only close it when those operations are complete.
- Use the `onChange` prop to detect when the modal is opened or closed based on the index parameter (0 for open, -1 for closed) and manage state accordingly.

```tsx
const MyModal = () => {
  const modalRef = useRef<BottomSheetModal>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    modalRef.current?.dismiss();
  };

  return (
    <>
      <Button onPress={() => modalRef.current?.present()}>Open Modal</Button>

      <Modal
        ref={modalRef}
        heading="Submit Data"
        description="Please confirm your submission"
        primaryButtonText="Submit"
        secondaryButtonText="Cancel"
        onPressPrimaryButton={handleSubmit}
        closeOnPrimaryButtonPress={false} // Keep modal open while submitting
        onChange={index => {
          if (index === -1) {
            // Modal closed, reset state if needed
            setIsSubmitting(false);
          }
        }}
        loading={isSubmitting}
      />
    </>
  );
};
```

### BottomSheetModalProvider

When using the Modal component, ensure your app is wrapped with `BottomSheetModalProvider`:

```tsx
import { BottomSheetModalProvider } from '@utilitywarehouse/hearth-react-native';

const App = () => {
  return <BottomSheetModalProvider>{/* Your app content */}</BottomSheetModalProvider>;
};
```

If your app already handles safe-area padding around modal content, you can disable Hearth's bottom-sheet safe-area spacing:

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

### Ref Usage

The Modal component forwards its ref to the underlying `BottomSheetModal`, giving you access to methods like:

- `present()` - Opens the modal
- `dismiss()` - Closes the modal
- `close()` - Alternative to dismiss
- `snapToIndex(index)` - Snap to a specific index
- `snapToPosition(position)` - Snap to a specific position

```tsx
const modalRef = useRef<BottomSheetModal>(null);

// Open modal
modalRef.current?.present();

// Close modal
modalRef.current?.dismiss();

// Snap to specific position
modalRef.current?.snapToIndex(1);
```

## External Resources

This component is built on top of [@gorhom/bottom-sheet](https://gorhom.github.io/react-native-bottom-sheet/) (v5). For more information about the
underlying BottomSheet functionality, please refer to the BottomSheet documentation and
the [official documentation](https://gorhom.dev/react-native-bottom-sheet/).
