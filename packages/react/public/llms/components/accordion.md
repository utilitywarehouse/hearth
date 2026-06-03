# Accordion

Use `Accordion` to allow users to expand or collapse individual content
sections, providing a compact way to present a large amount of information
while maintaining a clean and organised interface.

- [Accordion type](#accordion-type)
- [Collapsible](#collapsible)
- [Value](#value)
- [Accordion items](#accordion-items)
- [Heading levels](#heading-levels)
- [Accessibility](#accessibility)
  - [Keyboard interactions](#keyboard-interactions)
- [SEO](#seo)
- [API](#api)

```tsx
<Box width="600px">
  <Accordion {...args}>
    {[1, 2, 3, 4, 5, 6].map(n => (
      <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
        <AccordionContent>{`Content ${n}`}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</Box>
```

## Accordion type

`Accordion` can be rendered as one of two types; `single` or `multiple`. The `type` prop is required.

When `type` is set to `single`, only one item can be expanded at once.

```tsx
<Box width="600px">
  <Accordion {...args}>
    {[1, 2, 3, 4, 5, 6].map(n => (
      <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
        <AccordionContent>{`Content ${n}`}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</Box>
```

When `type` is set to `multiple`, then multiple items can be expanded at once.

```tsx
<Box width="600px">
  <Accordion {...args}>
    {[1, 2, 3, 4, 5, 6].map(n => (
      <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
        <AccordionContent>{`Content ${n}`}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</Box>
```

## Collapsible

The `collapsible` prop can be used when the `type` is set to `single`. When
`true` items can be collapsed, allowing all items to be closed at the same
time.

```tsx
<Box width="600px">
  <Accordion {...args}>
    {[1, 2, 3, 4, 5, 6].map(n => (
      <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
        <AccordionContent>{`Content ${n}`}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</Box>
```

## Value

The `value` prop differs depending on whether the `type` is set to `single` or
`multiple`. This also affects the `defaultValue` and `onValueChange` props.

When using a `single` type `Accordion`, the value is a `string`.

```tsx
<Accordion
  type="single"
  defaultValue="item-1"
>
{...}
</Accordion>
```

When using a `multiple` type `Accordion`, the value is an array of `string` values.

```tsx
<Accordion
  type="multiple"
  defaultValue={["item-1", "item-2"]}
>
{...}
</Accordion>
```

## Accordion items

The `AccordionItem` component, in tandem with `AccordionContent`, is intended
to cover most use cases, and uses the header & trigger components internally.
However if you need something more custom, you can use the internal subcomponents;
`AccordionHeader` & `AccordionTrigger`, ensuring you wrap the trigger in a header component.

```tsx
<Accordion type="multiple" heading="Custom item headers">
  <AccordionItem value='item-1'>
    <AccordionHeader>
      <AccordionTrigger>
        <Flex width="100%" alignItems="center" justifyContent="between">
          <BodyText weight="semibold">Custom Header</BodyText>
          <Badge size="sm" colorScheme="positive">New</Badge>
        </Flex>
      </AccordionTrigger>
    </AccordionHeader>
    <AccordionContent>{...}</AccordionContent>
  </AccordionItem>
  {...}
</Accordion>
```

```tsx
<Box width="600px">
  <Accordion
    type="multiple"
    heading="Custom item headers"
    helperText="Including a badge, for example"
  >
    {[1, 2, 3].map(n => (
      <AccordionItem key={n} value={`item-${n}`}>
        <AccordionHeader>
          <AccordionTrigger>
            <Flex width="100%" alignItems="center" justifyContent="between">
              <BodyText weight="semibold">Custom Header</BodyText>
              <Badge size="sm" colorScheme="positive">
                New
              </Badge>
            </Flex>
          </AccordionTrigger>
        </AccordionHeader>
        <AccordionContent>{`Content ${n}`}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</Box>
```

## Heading levels

By default the `Accordion` heading renders an `h2` element, and each item
renders an `h3` element. If this doesn't follow the structure of your page, you
can use the `headingElement` prop on `Accordion` and `AccordionItem` to update
these to an appropriate heading level.

```tsx
<Box width="600px">
  <Accordion {...args}>
    {[1, 2, 3, 4, 5, 6].map(n => (
      <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`} headingElement="h2">
        <AccordionContent>{`Content ${n}`}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</Box>
```

## Accessibility

Follows the [Accordion WAI-ARIA design pattern](https://www.w3.org/WAI/ARIA/apg/patterns/accordion).

While `Accordion` is meant to present multiple disclosure items, if you have
variable data that could return only a single item, then using an `Accordion` is
still OK. If you know ahead of time you only need to show/hide a single item,
then an alternative disclosure pattern should be used.

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
      key: 'Space',
      description:
        'When focus is on an AccordionTrigger of a collapsed section, expands the section.',
    },
    {
      key: 'Enter',
      description:
        'When focus is on an AccordionTrigger of a collapsed section, expands the section.',
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
      key: 'ArrowDown',
      description: 'Moves focus to the next AccordionTrigger.',
    },
    {
      key: 'ArrowUp',
      description: 'Moves focus to the previous AccordionTrigger.',
    },
  ].map((kbi, i) => (
    <>
      <Flex>
        <Box width="300px">
          <kbd>{kbi.key}</kbd>
        </Box>
        <BodyText as="span">{kbi.description}</BodyText>
      </Flex>
      {i < 4 ? <Divider /> : null}
    </>
  ))}
</Flex>

## SEO

By default, `AccordionContent` is removed from the DOM when collapsed, which
means search engines may not index its content. If the content is important for
SEO — for example, FAQ answers — use the `forceMount` prop on `AccordionContent`
to keep it in the DOM at all times.

When `forceMount` is set, collapsed content is hidden from view and the
accessibility tree using the `hidden` attribute, so it has no impact on the
visual layout or screen reader experience. The close animation plays before the
content is hidden.

```tsx
<AccordionContent forceMount>Content</AccordionContent>
```

```tsx
<Box width="600px">
  <Accordion {...args}>
    {[1, 2, 3, 4, 5, 6].map(n => (
      <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
        <AccordionContent forceMount>{`Content ${n}`}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</Box>
```

## API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop               | Type                                                                                                                                                                                                       | Default | Description                                                                                                                                                                                                                                                                                                                                    |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue`     | `string \| string[]`                                                                                                                                                                                       | —       | The value of the item whose content is expanded when the accordion is initially rendered. Use `defaultValue` if you do not need to control the state of an accordion. The value of the items whose contents are expanded when the accordion is initially rendered. Use `defaultValue` if you do not need to control the state of an accordion. |
| `heading`          | `string`                                                                                                                                                                                                   | —       | Actual string to display as section header                                                                                                                                                                                                                                                                                                     |
| `type`             | `"single" \| "multiple"`                                                                                                                                                                                   | —       |                                                                                                                                                                                                                                                                                                                                                |
| `value`            | `string \| string[]`                                                                                                                                                                                       | —       | The controlled stateful value of the accordion item whose content is expanded. The controlled stateful value of the accordion items whose contents are expanded.                                                                                                                                                                               |
| `onValueChange`    | `((value: string) => void) \| ((value: string[]) => void)`                                                                                                                                                 | —       | The callback that fires when the state of the accordion changes.                                                                                                                                                                                                                                                                               |
| `collapsible`      | `boolean`                                                                                                                                                                                                  | —       |                                                                                                                                                                                                                                                                                                                                                |
| `disabled`         | `boolean`                                                                                                                                                                                                  | —       | Whether or not an accordion is disabled from user interaction. @defaultValue false                                                                                                                                                                                                                                                             |
| `headingElement`   | `"h1" \| "h2" \| "h3" \| "h4"`                                                                                                                                                                             | —       |                                                                                                                                                                                                                                                                                                                                                |
| `helperText`       | `string`                                                                                                                                                                                                   | —       | Optional helper text to provide additional context or instructions.                                                                                                                                                                                                                                                                            |
| `trailingContent`  | `ReactNode`                                                                                                                                                                                                | —       | Optional trailing content element                                                                                                                                                                                                                                                                                                              |
| `validationStatus` | `"invalid"`                                                                                                                                                                                                | —       | Indicates the validation state                                                                                                                                                                                                                                                                                                                 |
| `validationText`   | `string`                                                                                                                                                                                                   | —       | Text to display when the `validationStatus` is set.                                                                                                                                                                                                                                                                                            |
| `direction`        | `Responsive<"row" \| "column">`                                                                                                                                                                            | —       | Responsive direction of the section header content. By default, the content is laid out in a row.                                                                                                                                                                                                                                              |
| `margin`           | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                |
| `marginTop`        | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                |
| `marginRight`      | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                |
| `marginBottom`     | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                |
| `marginLeft`       | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                |
| `marginX`          | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                |
| `marginY`          | `Responsive<"0" \| "auto" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —       |                                                                                                                                                                                                                                                                                                                                                |

### AccordionItem

This component is based on the `div` element.

| Prop             | Type                           | Default | Description                                                                                     |
| ---------------- | ------------------------------ | ------- | ----------------------------------------------------------------------------------------------- |
| `title`          | `string`                       | —       |                                                                                                 |
| `disabled`       | `boolean`                      | —       | Whether or not an accordion item is disabled from user interaction. @defaultValue false         |
| `value`          | `string`                       | —       | A string value for the accordion item. All items within an accordion should use a unique value. |
| `description`    | `string`                       | —       |                                                                                                 |
| `headingElement` | `"h1" \| "h2" \| "h3" \| "h4"` | —       |                                                                                                 |

### AccordionHeader

This component is based on the `h3` element.

| Prop | Type                           | Default | Description                                        |
| ---- | ------------------------------ | ------- | -------------------------------------------------- |
| `as` | `"h3" \| "h1" \| "h2" \| "h4"` | `h3`    | Render the appropriate heading level for your page |

### AccordionContent

This component is based on the `div` element.

### AccordionTrigger

This component is based on the `button` element.
