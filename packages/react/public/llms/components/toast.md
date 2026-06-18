# Toast

A `Toast` is a brief, non-intrusive message that appears temporarily to provide feedback on an action or notify users of important information. Toasts automatically dismiss after a set duration or can be dismissed manually.

- [Usage](#usage)
- [Icon](#icon)
- [Dismiss toast](#dismiss-toast)
- [Actions](#actions)
- [Custom duration](#custom-duration)
- [Accessibility](#accessibility)
  - [Sensitivity](#sensitivity)
  - [Keyboard interactions](#keyboard-interactions)
- [Duplicate toasts](#duplicate-toasts)
- [API](#api)

```tsx
<div>
  <Button
    onClick={() => {
      setOpen(false);
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        setOpen(true);
      }, 100);
    }}
  >
    Show Toast
  </Button>
  <Toast open={open} onOpenChange={setOpen} icon={<TickCircleMediumIcon />} {...args}>
    <ToastActionLink href="#" altText="Visit #">
      Link
    </ToastActionLink>
  </Toast>
</div>
```

## Usage

When using toasts you must first wrap your usage in a provider. It usually
makes sense to do this at the root of the application.

```tsx
import { ToastProvider } from '@utilitywarehouse/hearth-react';

[...]

<ToastProvider>
  {children}
</ToastProvider>
```

You can then render your toast:

```tsx
<Toast description="Toast description" />
```

## Icon

Include an icon using the `icon` prop:

```tsx
import { Toast } from '@utilitywarehouse/hearth-react';
import { TickCircleMediumIcon } from '@utilitywarehouse/hearth-react-icons';

[...]

<Toast
  description='With icon'
  icon={<TickCircleMediumIcon />}
/>
```

## Dismiss toast

A dismiss button can be included.

```tsx
<Toast description="Show dismiss button" showDismissButton />
```

Users can also swipe down on any toast to dismiss it immediately.

## Actions

You can include an `action` using the `ToastActionLink` or `ToastActionButton`
components as children. Only use one per toast.

The action should be safe to ignore so that users are not expected to complete
tasks with unexpected side effects as a result of a time limit. You can direct
the user to a permanent place in your application where they can action it. Use
foreground type to announce immediately and increase the duration to give the
user ample time.

When obtaining a user response is necessary, consider using an `Alert` instead.

```tsx
<Toast
  type="foreground"
  duration={10000}
  description="You can change your details anytime"
>
  <ToastActionLink
    href="/account-settings"
    altText="Visit account settings to change your details"
  >
    Account settings
  </ToastActionLink>
</Toast>

[...]

<Toast
  type="foreground"
  duration={10000}
  description="Settings updated"
>
  <ToastActionButton altText="Go to settings to undo">Undo</ToastActionButton>
</Toast>
```

```tsx
<div>
  <Flex gap="400">
    <Button
      onClick={() => {
        setOpenLinkActionToast(false);
        window.clearTimeout(linkActionTimerRef.current);
        linkActionTimerRef.current = window.setTimeout(() => {
          setOpenLinkActionToast(true);
        }, 100);
      }}
    >
      Show Link Action Toast
    </Button>
    <Button
      onClick={() => {
        setOpenButtonActionToast(false);
        window.clearTimeout(buttonActionTimerRef.current);
        buttonActionTimerRef.current = window.setTimeout(() => {
          setOpenButtonActionToast(true);
        }, 100);
      }}
    >
      Show Button Action Toast
    </Button>
  </Flex>
  <Toast
    type="foreground"
    duration={10000}
    description="You can change your details anytime"
    open={openLinkActionToast}
    onOpenChange={setOpenLinkActionToast}
  >
    <ToastActionLink
      href="/account-settings"
      altText="Visit account settings to change your details"
    >
      Account settings
    </ToastActionLink>
  </Toast>
  <Toast
    type="foreground"
    duration={10000}
    description="Settings updated"
    open={openButtonActionToast}
    onOpenChange={setOpenButtonActionToast}
  >
    <ToastActionButton altText="Go to settings to undo">Undo</ToastActionButton>
  </Toast>
</div>
```

## Custom duration

The default duration of 5 seconds is set on the `ToastProvider`, you
can override this on the provider, or setting this on the individual toast will
override the global default.

```tsx
<Toast duration={10000} description="Custom toast duration of 10 seconds" />
```

## Accessibility

Adheres to the [aria-live requirements](https://www.w3.org/TR/wai-aria/#aria-live)

### Sensitivity

You can control the sensitivity of the toast for screen readers, using the `type` prop.

For toasts that are the result of a user action, choose `foreground`. Toasts
generated from background tasks should use `background`. The default type is
`foreground`.

Foreground toasts are announced immediately. Assistive technologies may choose
to clear previously queued messages when a foreground toast appears. Try to
avoid stacking distinct foreground toasts at the same time.

Background toasts are announced at the next graceful opportunity, for example,
when the screen reader has finished reading its current sentence. They do not
clear queued messages so overusing them can be perceived as a laggy user
experience for screen reader users when used in response to a user interaction.

### Keyboard interactions

<Flex direction="column" gap="200" className="sb-unstyled">
  <Flex>
    <Box width="300px">
      <BodyText as="span" weight="bold">
        Key
      </BodyText>
    </Box>
    <BodyText as="span" weight="bold">
      Description
    </BodyText>
  </Flex>
  <Divider />
  {[
    {
      key: 'F8',
      description: 'Focuses toasts viewport.',
    },
    {
      key: 'Tab',
      description: 'Moves focus to the next focusable element.',
    },
    {
      key: 'Shift+Tab',
      description: 'Moves focus to the previous focusable element.',
    },
    {
      key: 'Space',
      description:
        'When focus is on a Toast action component or the Toast dismiss button, closes the toast.',
    },
    {
      key: 'Enter',
      description:
        'When focus is on a Toast action component or the Toast dismiss button, closes the toast.',
    },
    {
      key: 'Esc',
      description: 'When focus is on a Toast, closes the toast.',
    },
  ].map((kbi, i) => (
    <>
      <Flex>
        <Box width="300px">
          <kbd>{kbi.key}</kbd>
        </Box>
        <BodyText as="span">{kbi.description}</BodyText>
      </Flex>
      {i < 5 ? <Divider /> : null}
    </>
  ))}
</Flex>

## Duplicate toasts

When a toast must appear every time a user clicks a button, use state to render
multiple instances of the same toast. Toasts will stack vertically with the
newest appearing at the bottom.

```tsx
const [savedCount, setSavedCount] = React.useState(0);

return (
  <div>
    <Button onClick={() => setSavedCount(count => count + 1)}>Save</Button>

    {Array.from({ length: savedCount }).map((_, index) => (
      <Toast key={index} description={`Saved! (${index})`} showDismissButton />
    ))}
  </div>
);
```

### ToastProvider

This component is based on [Radix UI's Toast primitive](https://www.radix-ui.com/primitives/docs/components/toast).

| Prop                 | Type                          | Default | Description                                                                                                                                                                                       |
| -------------------- | ----------------------------- | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `viewportLabel`      | `string`                      | —       |                                                                                                                                                                                                   |
| `viewportHotkey`     | `string[]`                    | —       |                                                                                                                                                                                                   |
| `label`              | `string`                      | —       | An author-localized label for each toast. Used to help screen reader users associate the interruption with a toast. @defaultValue 'Notification'                                                  |
| `duration`           | `number`                      | `5000`  | Time in milliseconds that each toast should remain visible for. @defaultValue 5000                                                                                                                |
| `announcerContainer` | `Element \| DocumentFragment` | —       | An optional container where the toast announcements should be appended. This is useful when working with focus traps or modal dialogs that make other elements inert. @defaultValue document.body |

### Toast

This component is based on [Radix UI's Toast primitive](https://www.radix-ui.com/primitives/docs/components/toast).

| Prop                | Type                               | Default | Description                                                                                          |
| ------------------- | ---------------------------------- | ------- | ---------------------------------------------------------------------------------------------------- |
| `open`              | `boolean`                          | —       |                                                                                                      |
| `onPause`           | `(() => void)`                     | —       |                                                                                                      |
| `type`              | `"foreground" \| "background"`     | —       |                                                                                                      |
| `duration`          | `number`                           | —       | Time in milliseconds that toast should remain visible for. Overrides value given to `ToastProvider`. |
| `onEscapeKeyDown`   | `((event: KeyboardEvent) => void)` | —       |                                                                                                      |
| `onResume`          | `(() => void)`                     | —       |                                                                                                      |
| `onSwipeStart`      | `((event: SwipeEvent) => void)`    | —       |                                                                                                      |
| `onSwipeMove`       | `((event: SwipeEvent) => void)`    | —       |                                                                                                      |
| `onSwipeCancel`     | `((event: SwipeEvent) => void)`    | —       |                                                                                                      |
| `onSwipeEnd`        | `((event: SwipeEvent) => void)`    | —       |                                                                                                      |
| `defaultOpen`       | `boolean`                          | —       |                                                                                                      |
| `onOpenChange`      | `((open: boolean) => void)`        | —       |                                                                                                      |
| `description`       | `ReactNode`                        | —       |                                                                                                      |
| `icon`              | `ReactNode`                        | —       |                                                                                                      |
| `showDismissButton` | `boolean`                          | —       |                                                                                                      |

### ToastActionLink

This component is based on the `a` element and [Radix UI's Toast primitive](https://www.radix-ui.com/primitives/docs/components/toast).

| Prop      | Type      | Default | Description                                                                                                                                                                                                                                                                                                     |
| --------- | --------- | ------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asChild` | `boolean` | —       |                                                                                                                                                                                                                                                                                                                 |
| `altText` | `string`  | —       | A short description for an alternate way to carry out the action. For screen reader users who will not be able to navigate to the button easily/quickly. @example <ToastAction altText="Goto account settings to upgrade">Upgrade</ToastAction> @example <ToastAction altText="Undo (Alt+U)">Undo</ToastAction> |

### ToastActionButton

This component is based on the `button` element and [Radix UI's Toast primitive](https://www.radix-ui.com/primitives/docs/components/toast).
