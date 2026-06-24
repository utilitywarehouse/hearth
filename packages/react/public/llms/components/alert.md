# Alert

The `Alert` component displays a short, important message in a way that
attracts the user's attention without interrupting the user's task. This
component should be used to flag information of high importance, whether it be
an error, warning, success or information.

```tsx
<Alert
  colorScheme="info"
  title="Alert Title"
  text="This is an example of alert text which can wrap"
/>
```

## Color schemes

The `colorScheme` prop controls the visual appearance and semantic meaning of the Alert.

```tsx
<Flex direction="column" gap="400">
  <Alert colorScheme="info" title="Information" text="Learn more about our rates." />
  <Alert colorScheme="positive" title="Success" text="Mobile number updated." />
  <Alert colorScheme="danger" title="Error" text="Email address already exists." />
  <Alert colorScheme="warning" title="Warning" text="Payment details needed." />
</Flex>
```

## With `AlertIconButton`

Alerts can be made interactive by using the `AlertIconButton` component. This adds a clickable button to the alert with appropriate keyboard navigation.

```tsx
<Alert colorScheme="blue" title="Clickable Alert" text="This alert has an interactive button.">
  <AlertIconButton label="Click me" onClick={() => alert('Alert button clicked!')} />
</Alert>
```

```tsx
<Flex direction="column" gap="400" alignItems="start">
  <Alert
    colorScheme="info"
    title="Clickable Alert"
    text="This entire alert is clickable because it contains an AlertButton."
  >
    <AlertIconButton label="Click me" onClick={() => alert('Alert button clicked!')} />
  </Alert>
  <Alert
    colorScheme="positive"
    title="Custom Button Text"
    text="This alert has a button and a close button."
    onClose={() => alert('Closed')}
  >
    <AlertIconButton label="Click me" onClick={() => alert('Alert button clicked!')} />
  </Alert>
</Flex>
```

## With `AlertLink`

You can add a link to your alert using the `AlertLink` component. This is useful for directing users to relevant pages or actions.

```tsx
<Alert
  colorScheme="info"
  title="Information"
  text="This alert contains additional information that might be helpful."
>
  <AlertLink href="#example">Learn more</AlertLink>
</Alert>
```

If you need to you can also render the `AlertLink` as a `button` element using the `asChild` pattern:

```tsx
<AlertLink asChild>
  <button onClick={() => alert('Custom action')}>Custom action as button</button>
</AlertLink>
```

```tsx
<Flex direction="column" gap="400" alignItems="start">
  <Alert
    colorScheme="info"
    title="Information"
    text="This alert contains additional information that might be helpful."
  >
    <AlertLink href="#example">Learn more</AlertLink>
  </Alert>
  <Alert
    colorScheme="warning"
    title="Warning"
    text="This is a warning message with just an icon link."
  >
    <AlertLink href="#action" />
  </Alert>
  <Alert
    colorScheme="danger"
    title="Sorry, something went wrong"
    text={
      <>
        If the problem persists, please contact Partner Support on{' '}
        <InlineLink href="tel:+443337778777" style={{ color: 'inherit' }}>
          <Strong>0333&nbsp;7778777</Strong>
        </InlineLink>{' '}
        (Monday to Friday 09:00-17:30, Saturdays 10:00-13:00).
      </>
    }
  >
    <AlertLink asChild>
      <button onClick={() => alert('Custom action')}>Custom action as button</button>
    </AlertLink>
  </Alert>
</Flex>
```

## Title and Text

`Alert` supports a `title` and `text` prop to provide a clear and concise
message to users. The `title` is typically used for a brief headline, while the
`text` provides additional details.

These props are optional as they can be used together or separately, depending
on the context of the alert. While it is technically possible to provide a
custom title via the `children` prop, it is generally not recommended as it may
lead to a broken UI and a poor user experience.

## Dismissable

Alerts can be made dismissable by providing an `onClose` handler. This adds a
close button that users can click to dismiss the alert.
The `onClose` handler will be called when the alert is dismissed, allowing you
to perform any necessary cleanup or state updates. It will not handle the
actual hiding of the alert, so you will need to manage the visibility state of
the alert in your component.

```tsx
<Alert
  colorScheme="positive"
  title="Success"
  text="Your action was completed successfully."
  onClose={() => console.log('Alert dismissed')}
/>
```

```tsx
<Alert
  colorScheme="positive"
  title="Success"
  text="Your email address has been verified successfully."
  onClose={() => {}}
/>
```

## Accessibility

The `Alert` component uses `role="alert"` by default. This tells screen readers
the element is an alert region and carries two implicit behaviours defined by
the ARIA spec:

- **Assertive live region**: when an alert is dynamically injected into the DOM (e.g. after a form submission), screen readers will interrupt whatever they are currently announcing and read the alert immediately.
- **Atomic announcement**: the entire alert content is read as a single unit when it is announced.

### Static vs dynamic alerts

Live region behaviour only fires when content _changes_. If an `Alert` is
already present in the DOM when the page first loads, `role="alert"` has no
live-region effect and no special handling is required.

### Overriding the role

Because `role="alert"` causes an immediate, interruptive announcement, it
should be reserved for genuinely time-sensitive or critical messages. For less
urgent messages you should override the role:

**Polite announcement**: use `role="status"` when the message is informational
and should not interrupt the user (e.g. a save confirmation or a
background-process update):

```tsx
<Alert role="status" colorScheme="positive" title="Changes saved" />
```

**No live region**: if the alert is already present on page load, or its
content is described through other means, you can suppress live-region
behaviour entirely:

```tsx
<Alert role={undefined} colorScheme="info" title="Your plan includes..." />
```

### Icons

The icon is marked `aria-hidden="true"` because it is decorative.

### AlertLink

Use `AlertLink` to add navigational links within alerts.

```tsx
<Alert title="Information">
  <BodyText>This alert provides important information.</BodyText>
  <BodyText>The guide is helpful, you can read it below.</BodyText>
  <AlertLink href="/guide">Read Guide</AlertLink>
</Alert>
```

### AlertIconButton

Use `AlertIconButton` to add interactive buttons to alerts.

```tsx
<Alert title="Action Required" text="Click the button to continue.">
  <AlertIconButton label="Continue" onClick={() => handleAction()} />
</Alert>
```

## API

This component supports the following common props:

- AlignSelf
- Margin
- Flex item
- Grid item

| Prop          | Type                                            | Default | Description                            |
| ------------- | ----------------------------------------------- | ------- | -------------------------------------- |
| `title`       | `string`                                        | —       | Sets the title of the alert.           |
| `text`        | `ReactNode`                                     | —       | Sets the text of the alert.            |
| `colorScheme` | `"info" \| "positive" \| "danger" \| "warning"` | `info`  | Sets the colour scheme.                |
| `onClose`     | `(() => void)`                                  | —       | Sets the onClose handler of the alert. |
