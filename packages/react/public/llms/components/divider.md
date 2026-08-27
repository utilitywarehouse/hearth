# Divider

Use Divider to provide a visual break and semantically divide content.
It renders an `hr` with a `separator` role by default — use the
`decorative` prop instead of CSS styling when you need a purely visual
separation removed from the accessibility tree. A vertical orientation
is only visible inside a flex or grid container.

```tsx
<Flex direction="column" gap="400" width="100%" maxWidth="800px" padding="200">
  <Flex direction="column" gap="100" paddingX="400">
    <Heading>Mobile number: 07891123456</Heading>
    <Flex gap="300" alignItems="center">
      <BodyText>Unlimited Tariff</BodyText>
      <Divider decorative orientation="vertical" />
      <BodyText>
        Budget control: <Strong>On</Strong>
      </BodyText>
      <Divider decorative orientation="vertical" />
      <BodyText>
        SIM number: <Strong>249320592996</Strong>
      </BodyText>
    </Flex>
  </Flex>
  <Divider />
  <Flex direction="column" gap="100" paddingX="400">
    <Heading>Mobile number: 07875123456</Heading>
    <Flex gap="300" alignItems="center">
      <BodyText>Value Tariff</BodyText>
      <Divider decorative orientation="vertical" />
      <BodyText>
        Budget control: <Strong>On</Strong>
      </BodyText>
      <Divider decorative orientation="vertical" />
      <BodyText>
        SIM number: <Strong>249320592996</Strong>
      </BodyText>
    </Flex>
  </Flex>
  <Divider />
  <Flex direction="column" gap="100" paddingX="400">
    <Heading>Mobile number: 07929123456</Heading>
    <Flex gap="300" alignItems="center">
      <BodyText>Unlimited Tariff</BodyText>
      <Divider decorative orientation="vertical" />
      <BodyText>
        Budget control: <Strong>Off</Strong>
      </BodyText>
      <Divider decorative orientation="vertical" />
      <BodyText>
        SIM number: <Strong>249320592996</Strong>
      </BodyText>
    </Flex>
  </Flex>
</Flex>
```

## Accessibility

Follows the [Separator role requirements](https://www.w3.org/TR/wai-aria-1.2/#separator).

By default the `Divider` component renders an `hr` which has a role of
`separator` by default. This is a semantically meaningful division between
elements, and should be used considerately.

If you need a purely visual separation you can use the `decorative` prop, which
will remove the element from the accessibility tree. Alternatively you could
use CSS styling, such as `border-color`, instead of this component.

```tsx
<Divider decorative />
```

## API

This component is based on the `hr` element, and supports the following common props:

- Margin

| Prop          | Type                         | Default      | Description                                                                                                                                                                          |
| ------------- | ---------------------------- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `orientation` | `"horizontal" \| "vertical"` | `horizontal` | Sets whether the divider is drawn as a horizontal or vertical line.                                                                                                                  |
| `decorative`  | `boolean`                    | —            | Whether or not the component is purely decorative. When true, accessibility-related attributes are updated so that that the rendered element is removed from the accessibility tree. |
