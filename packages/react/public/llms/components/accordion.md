# Accordion

Use `Accordion` to allow users to expand or collapse individual content
sections, providing a compact way to present a large amount of information
while maintaining a clean and organised interface.

- [Accordion type](#accordion-type)
- [Value](#value)
- [Accordion items](#accordion-items)
- [Heading levels](#heading-levels)
- [Accessibility](#accessibility)
  - [Keyboard interactions](#keyboard-interactions)
- [SEO](#seo)
- [Migration](#migration)
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

By default only one `Accordion` item can be expanded at once. Set the
`multiple` prop to `true` to allow multiple items to be expanded
simultaneously — items are always collapsible, so all items can be closed at
the same time regardless of `multiple`.

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

When `multiple` is `true`, multiple items can be expanded at once.

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

The `value`, `defaultValue`, and `onValueChange` props always use an array of
`string` values, listing the currently expanded item(s), regardless of
whether `multiple` is set.

```tsx
<Accordion
  defaultValue={["item-1"]}
>
{...}
</Accordion>
```

```tsx
<Accordion
  multiple
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
<Accordion heading="Custom item headers">
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
  <Accordion heading="Custom item headers" helperText="Including a badge, for example">
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
SEO — for example, FAQ answers — use the `keepMounted` prop on `AccordionContent`
to keep it in the DOM at all times.

When `keepMounted` is set, collapsed content is hidden from view and the
accessibility tree using the `hidden` attribute, so it has no impact on the
visual layout or screen reader experience. The close animation plays before the
content is hidden.

```tsx
<AccordionContent keepMounted>Content</AccordionContent>
```

```tsx
<Box width="600px">
  <Accordion {...args}>
    {[1, 2, 3, 4, 5, 6].map(n => (
      <AccordionItem key={n} value={`item-${n}`} title={`Item ${n}`}>
        <AccordionContent keepMounted>{`Content ${n}`}</AccordionContent>
      </AccordionItem>
    ))}
  </Accordion>
</Box>
```

### Migrating from `v0.31.x`

`Accordion` has migrated from Radix UI to Base UI internally.

**Breaking changes:**

- `Accordion: type="single"` — remove `type`, the accordion now defaults to single-select behaviour.
- `Accordion: type="multiple"` — replace with `multiple` (or omit for the new default of single-select).
- `Accordion: collapsible` — remove entirely; single-mode panels are now always collapsible.
- `Accordion: value` / `defaultValue` — must now always be an array, e.g. `defaultValue="item-1"` becomes `defaultValue={['item-1']}`.
- `Accordion: onValueChange` — now always receives an array as its first argument.

**Deprecations (still work, log a dev-mode warning):**

- `AccordionContent: forceMount` is deprecated. Use `keepMounted` instead.

```tsx
{
  /* Before */
}
<Accordion type="single" collapsible defaultValue="item-1">
  <AccordionContent forceMount>...</AccordionContent>
</Accordion>;

{
  /* After */
}
<Accordion defaultValue={['item-1']}>
  <AccordionContent keepMounted>...</AccordionContent>
</Accordion>;
```

### Consumer migration prompt

Paste the following into an agent to update all Accordion usages in your codebase:

```
I'm upgrading @utilitywarehouse/hearth-react. The Accordion component has migrated
from Radix UI to Base UI internally. The following changes affect consumers:

BREAKING:
  - `Accordion: type="single"` → remove `type`, accordion defaults to single-select behaviour
  - `Accordion: type="multiple"` → replace with `multiple` (or omit for the new default)
  - `Accordion: collapsible` → remove entirely; single-mode panels are now always collapsible
  - `Accordion: value` / `defaultValue` → must now always be an array, e.g.
    `defaultValue="item-1"` becomes `defaultValue={['item-1']}`
  - `Accordion: onValueChange` → now always receives an array as its first argument

DEPRECATED (still works, logs a dev-mode warning):
  - `AccordionContent: forceMount` → use `keepMounted` instead

Please search this codebase for all usages of Accordion imported from
'@utilitywarehouse/hearth-react' and apply the above changes. Do not change any
other logic, styling, or structure. After making changes, run TypeScript to
confirm no type errors remain.
```

## API

This component is based on the `div` element and supports the following common props:

- Margin

| Prop               | Type                                                                                       | Default | Description                                                                                                                                                                                             |
| ------------------ | ------------------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `defaultValue`     | `AccordionValue<string>`                                                                   | —       | The uncontrolled value of the item(s) that should be initially expanded. To render a controlled accordion, use the `value` prop instead.                                                                |
| `value`            | `AccordionValue<string>`                                                                   | —       | The controlled value of the item(s) that should be expanded. To render an uncontrolled accordion, use the `defaultValue` prop instead.                                                                  |
| `disabled`         | `boolean`                                                                                  | `false` | Whether the component should ignore user interaction.                                                                                                                                                   |
| `hiddenUntilFound` | `boolean`                                                                                  | `false` | Allows the browser's built-in page search to find and expand the panel contents. Overrides the `keepMounted` prop and uses `hidden="until-found"` to hide the element without removing it from the DOM. |
| `keepMounted`      | `boolean`                                                                                  | `false` | Whether to keep the element in the DOM while the panel is closed. This prop is ignored when `hiddenUntilFound` is used.                                                                                 |
| `loopFocus`        | `boolean`                                                                                  | `true`  | Whether to loop keyboard focus back to the first item when the end of the list is reached while using the arrow keys.                                                                                   |
| `onValueChange`    | `((value: AccordionValue<string>, eventDetails: AccordionRootChangeEventDetails) => void)` | —       | Event handler called when an accordion item is expanded or collapsed. Provides the new value as an argument.                                                                                            |
| `multiple`         | `boolean`                                                                                  | `false` | Whether multiple items can be open at the same time.                                                                                                                                                    |
| `headingElement`   | `"h1" \| "h2" \| "h3" \| "h4"`                                                             | —       |                                                                                                                                                                                                         |
| `heading`          | `string`                                                                                   | —       | Actual string to display as section header                                                                                                                                                              |
| `helperText`       | `string`                                                                                   | —       | Optional helper text to provide additional context or instructions.                                                                                                                                     |
| `trailingContent`  | `ReactNode`                                                                                | —       | Optional trailing content element                                                                                                                                                                       |
| `validationStatus` | `"invalid"`                                                                                | —       | Indicates the validation state                                                                                                                                                                          |
| `validationText`   | `string`                                                                                   | —       | Text to display when the `validationStatus` is set.                                                                                                                                                     |
| `direction`        | `Responsive<"row" \| "column">`                                                            | —       | Responsive direction of the section header content. By default, the content is laid out in a row.                                                                                                       |

### AccordionItem

This component is based on the `div` element.

| Prop             | Type                                                                           | Default | Description                                                                                                                                                                                                                                                                                                                                                                          |
| ---------------- | ------------------------------------------------------------------------------ | ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `style`          | `CSSProperties \| ((state: AccordionItemState) => CSSProperties \| undefined)` | —       | Style applied to the element, or a function that returns a style object based on the component's state.                                                                                                                                                                                                                                                                              |
| `title`          | `string`                                                                       | —       |                                                                                                                                                                                                                                                                                                                                                                                      |
| `className`      | `string`                                                                       | —       |                                                                                                                                                                                                                                                                                                                                                                                      |
| `disabled`       | `boolean`                                                                      | `false` | Whether the component should ignore user interaction.                                                                                                                                                                                                                                                                                                                                |
| `value`          | `any`                                                                          | —       | A unique value that identifies this accordion item. If no value is provided, a unique ID will be generated automatically. Use when controlling the accordion programmatically, or to set an initial open state. @example `tsx <Accordion.Root value={['a']}>   <Accordion.Item value="a" /> // initially open   <Accordion.Item value="b" /> // initially closed </Accordion.Root> ` |
| `onOpenChange`   | `((open: boolean, eventDetails: AccordionItemChangeEventDetails) => void)`     | —       | Event handler called when the panel is opened or closed.                                                                                                                                                                                                                                                                                                                             |
| `description`    | `string`                                                                       | —       |                                                                                                                                                                                                                                                                                                                                                                                      |
| `headingElement` | `"h1" \| "h2" \| "h3" \| "h4"`                                                 | —       |                                                                                                                                                                                                                                                                                                                                                                                      |

### AccordionHeader

This component is based on the `h3` element.

| Prop        | Type                                                                             | Default | Description                                                                                             |
| ----------- | -------------------------------------------------------------------------------- | ------- | ------------------------------------------------------------------------------------------------------- |
| `style`     | `CSSProperties \| ((state: AccordionHeaderState) => CSSProperties \| undefined)` | —       | Style applied to the element, or a function that returns a style object based on the component's state. |
| `className` | `string`                                                                         | —       |                                                                                                         |
| `as`        | `"h3" \| "h1" \| "h2" \| "h4"`                                                   | `h3`    | Render the appropriate heading level for your page                                                      |

### AccordionContent

This component is based on the `div` element.

### AccordionTrigger

This component is based on the `button` element.
