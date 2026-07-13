# Toast

The `Toast` component provides a non-intrusive way to display brief messages to users. Toasts appear at the bottom of the screen, can be stacked vertically, and automatically dismiss after a configurable duration. They support swipe-to-dismiss gestures and can include icons, action links, and a dismiss button.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Features](#features)
- [Examples](#examples)
  - [Basic Toast](#basic-toast)
  - [With Icon](#with-icon)
  - [With Action](#with-action)
  - [Custom Duration](#custom-duration)
  - [Stacked Toasts](#stacked-toasts)
  - [Programmatic Dismiss](#programmatic-dismiss)
  - [Dismiss Options](#dismiss-options)
- [Accessibility](#accessibility)

## Playground

```tsx
// Example usage
<ViewWrap>
  <PlaygroundDemo />
</ViewWrap>
```

### Setup

First, wrap your app with the `ToastProvider` at the root level:

```tsx
// Example usage
import { ToastProvider } from '@utilitywarehouse/hearth-react-native';

function App() {
  return <ToastProvider>{/* Your app content */}</ToastProvider>;
}
```

**Important:** Place the `ToastProvider` at the root of your app, outside of any scroll views or nested containers. This ensures toasts are displayed in a fixed position at the bottom of the screen, regardless of scroll position.

### Basic Usage

Use the `useToast` hook to display toasts from any component:

```tsx
// Example usage
import { useToast } from '@utilitywarehouse/hearth-react-native';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';

const MyComponent = () => {
  const { addToast } = useToast();

  const handleSave = () => {
    // Your save logic
    addToast({
      text: 'Settings saved successfully',
      icon: TickSmallIcon,
    });
  };

  return <Button onPress={handleSave}>Save</Button>;
};
```

### ToastOptions

| Prop              | Type                  | Default        | Description                                                      |
| ----------------- | --------------------- | -------------- | ---------------------------------------------------------------- |
| `text`            | `string \| ReactNode` | -              | The main message to display                                      |
| `icon`            | `ComponentType`       | -              | Optional icon component to display                               |
| `actionText`      | `string`              | -              | Optional action text to display as a link                        |
| `onPress`         | `() => void`          | -              | Optional callback when action or toast is pressed                |
| `onDismiss`       | `() => void`          | -              | Optional callback when toast is dismissed                        |
| `duration`        | `number`              | `6000`         | Auto-dismiss duration in ms (0 = no dismiss)                     |
| `showDismissIcon` | `boolean`             | `true`         | Whether to show the dismiss icon button                          |
| `dismissOnPress`  | `boolean`             | `true`         | Whether to dismiss the toast when pressed when Toast has onPress |
| `id`              | `string`              | auto-generated | Optional custom ID for the toast                                 |

### useToast Hook

Returns an object with:

| Method        | Signature                           | Description                              |
| ------------- | ----------------------------------- | ---------------------------------------- |
| `addToast`    | `(options: ToastOptions) => string` | Shows a new toast and returns its ID     |
| `removeToast` | `(id: string) => void`              | Programmatically dismisses a toast by ID |

## Features

- **Auto-Dismiss:** Toasts automatically dismiss after 6 seconds by default. You can customize this duration or disable auto-dismiss entirely by setting `duration` to `0`.
- **Swipe to Dismiss:** Users can swipe down on any toast to dismiss it immediately. The gesture uses smooth animations for a native feel.
- **Dismiss Button:** Each toast includes a close button in the top-right corner for manual dismissal.
- **Stacking:** Multiple toasts stack vertically at the bottom of the screen, with the newest toast appearing on top. Each toast maintains its own auto-dismiss timer.
- **Icons:** Add visual context by including an icon component. Icons are positioned at the start of the toast message.
- **Action Links:** Include interactive action links (like "Undo" or "View") as secondary actions within the toast using the `actionText` prop. When `onPress` is provided, the entire toast becomes tappable, allowing users to trigger the action by tapping anywhere on the toast.

### Basic Toast

A simple text-only toast:

```tsx
// Example usage
<ViewWrap>
  <BasicToastDemo />
</ViewWrap>
```

### With Icon

Toasts with icons for different message types:

```tsx
// Example usage
<ViewWrap>
  <WithIconDemo />
</ViewWrap>
```

### With Action

Include interactive action links for secondary actions:

```tsx
// Example usage
<ViewWrap>
  <WithActionDemo />
</ViewWrap>
```

### Custom Duration

Control how long toasts stay visible:

```tsx
// Example usage
<ViewWrap>
  <CustomDurationDemo />
</ViewWrap>
```

### Stacked Toasts

Multiple toasts stack vertically, newest on top:

```tsx
// Example usage
<ViewWrap>
  <StackedToastsDemo />
</ViewWrap>
```

### Programmatic Dismiss

Dismiss toasts programmatically using their ID:

```tsx
// Example usage
<ViewWrap>
  <ProgrammaticDismissDemo />
</ViewWrap>
```

### Dismiss Options

Control dismiss behavior with `showDismissIcon` and `dismissOnPress`:

```tsx
// Example usage
<ViewWrap>
  <DismissOptionsDemo />
</ViewWrap>
```

## Accessibility

- **Screen reader announcements**: Toast content is automatically announced when it appears. On iOS, VoiceOver receives the announcement via accessibility live regions. On Android, TalkBack receives a direct announcement to avoid duplication
- **Semantic structure**: Toasts use proper ARIA roles (`alert` on iOS) for screen readers
- **Dismiss button**: Includes an accessibility label for easy dismissal
- **Action links**: Properly accessible as interactive elements when provided
- **Swipe gestures**: Work alongside manual dismiss options for user flexibility
- **Non-blocking**: Toasts don't interrupt user interaction with the app or steal focus
