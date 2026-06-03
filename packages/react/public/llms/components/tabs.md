# Tabs

Use Tabs to organize and navigate between content sections within the same context without leaving the page.

- [Usage](#usage)
- [Examples](#examples)
  - [Controlled](#controlled)
  - [Overflow & Scrolling](#overflow--scrolling)
  - [With icons](#with-icons)
- [Size variants](#size-variants)
- [Activation mode](#activation-mode)
- [Accessibility](#accessibility)
- [API](#api)

```tsx
<Tabs {...args}>
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="billing">Billing</Tab>
  </TabsList>
  <TabContent value="account">
    <BodyText>Manage your personal details and preferences.</BodyText>
  </TabContent>
  <TabContent value="security">
    <BodyText>Update your password and security settings.</BodyText>
  </TabContent>
  <TabContent value="billing">
    <BodyText>View invoices and update payment methods.</BodyText>
  </TabContent>
</Tabs>
```

## Usage

Use Tabs to organize and navigate between content sections within the same page context.

```tsx
import { Tabs, TabsList, Tab, TabContent } from '@utilitywarehouse/hearth-react';

<Tabs defaultValue="account">
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="billing">Billing</Tab>
  </TabsList>
  <TabContent value="account">Account content</TabContent>
  <TabContent value="security">Security content</TabContent>
  <TabContent value="billing">Billing content</TabContent>
</Tabs>;
```

### Spacing

The `spacing` prop on the `Tabs` component controls the space between the `TabsList` and the `TabContent`.
It is set to `"xl"` by default, and can be overridden as needed.

```tsx
<Tabs defaultValue="account" spacing="lg">
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="security">Security</Tab>
    <Tab value="billing">Billing</Tab>
  </TabsList>
  <TabContent value="account">Account content</TabContent>
  <TabContent value="security">Security content</TabContent>
  <TabContent value="billing">Billing content</TabContent>
</Tabs>
```

## Controlled

Tabs can be controlled by passing `value` and `onValueChange` to the `Tabs` root.

```tsx
const [tab, setTab] = useState('account');
<Tabs value={tab} onValueChange={setTab}>
  <TabsList>
    <Tab value="account">Account</Tab>
    <Tab value="billing">Billing</Tab>
    <Tab value="usage">Usage</Tab>
  </TabsList>
  <TabContent value="account">Account content</TabContent>
  <TabContent value="billing">Billing content</TabContent>
  <TabContent value="usage">Usage metrics content</TabContent>
</Tabs>;
```

```tsx
<Flex direction="row" gap="400" alignItems="center">
  <Tabs value={value} onValueChange={setValue}>
    <TabsList>
      <Tab value="account">Account</Tab>
      <Tab value="billing">Billing</Tab>
      <Tab value="usage">Usage</Tab>
    </TabsList>
    <TabContent value="account">
      <BodyText>Account content</BodyText>
    </TabContent>
    <TabContent value="billing">
      <BodyText>Billing content</BodyText>
    </TabContent>
    <TabContent value="usage">
      <BodyText>Usage metrics content</BodyText>
    </TabContent>
  </Tabs>
  <Button onClick={next}>Next Tab</Button>
</Flex>
```

## Overflow & Scrolling

When tab labels exceed the available width, the list becomes horizontally
scrollable. Contextual scroll buttons appear only when further scrolling is
possible.

```tsx
<Tabs defaultValue="one">
  <TabsList>
    <Tab value="one">One</Tab>
    <Tab value="two">Two</Tab>
    <Tab value="three">Three</Tab>
    <Tab value="four">Four</Tab>
    <Tab value="five">Five</Tab>
    <Tab value="six">Six</Tab>
    <Tab value="seven">Seven</Tab>
    <Tab value="eight">Eight</Tab>
    <Tab value="nine">Nine</Tab>
    <Tab value="ten">Ten</Tab>
    <Tab value="eleven">Eleven</Tab>
    <Tab value="twelve">Twelve</Tab>
    <Tab value="thirteen">Thirteen</Tab>
    <Tab value="fourteen">Fourteen</Tab>
    <Tab value="fifteen">Fifteen</Tab>
    <Tab value="sixteen">Sixteen</Tab>
    <Tab value="seventeen">Seventeen</Tab>
    <Tab value="eighteen">Eighteen</Tab>
    <Tab value="nineteen">Nineteen</Tab>
    <Tab value="twenty">Twenty</Tab>
  </TabsList>
  <TabContent value="one">
    <BodyText>One panel</BodyText>
  </TabContent>
  <TabContent value="two">
    <BodyText>Two panel</BodyText>
  </TabContent>
  <TabContent value="three">
    <BodyText>Three panel</BodyText>
  </TabContent>
  <TabContent value="four">
    <BodyText>Four panel</BodyText>
  </TabContent>
  <TabContent value="five">
    <BodyText>Five panel</BodyText>
  </TabContent>
  <TabContent value="six">
    <BodyText>Six panel</BodyText>
  </TabContent>
  <TabContent value="seven">
    <BodyText>Seven panel</BodyText>
  </TabContent>
  <TabContent value="eight">
    <BodyText>Eight panel</BodyText>
  </TabContent>
  <TabContent value="nine">
    <BodyText>Nine panel</BodyText>
  </TabContent>
  <TabContent value="ten">
    <BodyText>Ten panel</BodyText>
  </TabContent>
  <TabContent value="eleven">
    <BodyText>Eleven panel</BodyText>
  </TabContent>
  <TabContent value="twelve">
    <BodyText>Twelve panel</BodyText>
  </TabContent>
  <TabContent value="thirteen">
    <BodyText>Thirteen panel</BodyText>
  </TabContent>
  <TabContent value="fourteen">
    <BodyText>Fourteen panel</BodyText>
  </TabContent>
  <TabContent value="fifteen">
    <BodyText>Fifteen panel</BodyText>
  </TabContent>
  <TabContent value="sixteen">
    <BodyText>Sixteen panel</BodyText>
  </TabContent>
  <TabContent value="seventeen">
    <BodyText>Seventeen panel</BodyText>
  </TabContent>
  <TabContent value="eighteen">
    <BodyText>Eighteen panel</BodyText>
  </TabContent>
  <TabContent value="nineteen">
    <BodyText>Nineteen panel</BodyText>
  </TabContent>
  <TabContent value="twenty">
    <BodyText>Twenty panel</BodyText>
  </TabContent>
</Tabs>
```

### With icons

You can include icons directly as children inside a `Tab`.

```tsx
<Tabs defaultValue="one">
  <TabsList>
    <Tab value="one">
      <ElectricityMediumIcon /> Energy
    </Tab>
    <Tab value="two">
      <BroadbandMediumIcon /> Broadband
    </Tab>
    <Tab value="three">
      <MobileMediumIcon /> Mobile
    </Tab>
    <Tab value="four">
      <InsuranceMediumIcon /> Insurance
    </Tab>
  </TabsList>
  <TabContent value="one">
    <BodyText>One panel</BodyText>
  </TabContent>
  <TabContent value="two">
    <BodyText>Two panel</BodyText>
  </TabContent>
  <TabContent value="three">
    <BodyText>Three panel</BodyText>
  </TabContent>
  <TabContent value="four">
    <BodyText>Four panel</BodyText>
  </TabContent>
</Tabs>
```

## Size variants

```tsx
<Flex direction="column" gap="400">
  <Tabs size="md" defaultValue="a">
    <TabsList>
      <Tab value="a">Medium A</Tab>
      <Tab value="b">Medium B</Tab>
      <Tab value="c">Medium C</Tab>
    </TabsList>
    <TabContent value="a">
      <BodyText>Medium A panel</BodyText>
    </TabContent>
    <TabContent value="b">
      <BodyText>Medium B panel</BodyText>
    </TabContent>
    <TabContent value="c">
      <BodyText>Medium C panel</BodyText>
    </TabContent>
  </Tabs>

  <Tabs size="lg" defaultValue="a">
    <TabsList>
      <Tab value="a">Large A</Tab>
      <Tab value="b">Large B</Tab>
      <Tab value="c">Large C</Tab>
    </TabsList>
    <TabContent value="a">
      <BodyText>Large A panel</BodyText>
    </TabContent>
    <TabContent value="b">
      <BodyText>Large B panel</BodyText>
    </TabContent>
    <TabContent value="c">
      <BodyText>Large C panel</BodyText>
    </TabContent>
  </Tabs>
</Flex>
```

## Activation mode

The `activationMode` prop controls how keyboard focus activates a tab:

- `automatic` (default): arrow keys both move focus and select the focused tab.
- `manual`: arrow keys move focus between tabs; selection changes when you press <kbd>Space</kbd> or <kbd>Enter</kbd>.

```tsx
<Tabs defaultValue="a" activationMode="manual">
  ...
</Tabs>
```

### Performance considerations

The default `automatic` mode provides the best user experience for most cases.
However, **use `manual` mode when tab panels contain heavily loaded content**
that might cause lag during automatic activation. This prevents automatic panel
switching as users navigate with arrow keys, avoiding performance issues.

**Prefetching panel data is the preferred solution** over relying on manual
activation mode. Consider preloading content for adjacent tabs to provide a
smooth experience while maintaining the benefits of automatic activation.

## Accessibility

- The `Tabs` root provides the `tablist` role; each `Tab` is a `tab`; each `TabContent` is a `tabpanel`.
- Selection is communicated via ARIA attributes and `data-state` provided by the underlying primitives.
- The animated indicator respects the user's reduced motion preferences.
- Overflow scroll buttons are hidden from assistive technologies and only render when scrolling is possible.
- Provide concise, descriptive tab labels; avoid relying on icons alone.

### Tabs

| Prop             | Type                                                               | Default | Description                                                |
| ---------------- | ------------------------------------------------------------------ | ------- | ---------------------------------------------------------- |
| `defaultValue`   | `string`                                                           | —       | The value of the tab to select by default, if uncontrolled |
| `value`          | `string`                                                           | —       | The value for the selected tab, if controlled              |
| `onValueChange`  | `((value: string) => void)`                                        | —       | A function called when a new tab is selected               |
| `activationMode` | `"manual" \| "automatic"`                                          | —       | Activation mode for tabs                                   |
| `size`           | `Responsive<"md" \| "lg">`                                         | —       | Size variant                                               |
| `spacing`        | `"none" \| "md" \| "lg" \| "2xs" \| "xs" \| "sm" \| "xl" \| "2xl"` | —       |                                                            |
