# List

The `List` component is a flexible and customizable component for displaying a
list of items. It supports various visual variants, color schemes, and
additional features like helper text and links.

```tsx
<Box width="400px">
  <List
    {...args}
    trailingContent={
      <Link href="#">
        Link
        <ChevronRightSmallIcon />
      </Link>
    }
  >
    <ListItem>List item</ListItem>
    <ListItem>
      <ListItemContent heading="List item" helperText="Helper text" />
    </ListItem>
    <ListItem>
      <ListItemButton
        heading="List item button"
        helperText="Helper text"
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListItemButton
        heading="List item button"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListItemButton
        disabled
        heading="List item disabled button"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListItemLink heading="List item as link" href="#" />
    </ListItem>
    <ListItem>
      <ListItemLink
        heading="List item link"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        href="#"
      />
    </ListItem>
    <ListItem>
      <ListActionButton>List action</ListActionButton>
    </ListItem>
    <ListItem>
      <ListActionButton disabled>Disabled list action</ListActionButton>
    </ListItem>
  </List>
</Box>
```

- [Usage](#usage)
- [Appearance](#appearance)
  - [Variant](#variant)
  - [ColorScheme](#colorscheme)
  - [Padding None](#padding-none)
- [Heading](#heading)
- [Leading content](#leading-content)
- [Trailing content](#trailing-content)
- [Advanced Content](#advanced-content)
- [List actions](#list-actions)
- [API](#api)

## Usage

- The `List` component can be customized with different variants and color schemes.
- Use `ListItem` by itself for simple text content, or as a container for more complex, or interactive, content.
- Use `ListItemContent` as a child of `ListItem` to include `helperText` or a `leadingIcon`.
- Use `ListItemButton` as a child of `ListItem` when you need the list item to perform an action.
- Use `ListItemLink` as a child of `ListItem` when you need the list item to navigate somewhere.
- Use `ListActionLink` as a child of `ListItem` when you need an action for the list to navigate somewhere.
- Use `ListActionButton` as a child of `ListItem` when you need an action for the list to do something.

### With Next.js

You can use the `ListItemLink` component with Next.js's `Link` component by using the
`asChild` prop. This allows you to wrap the `ListItemLink` around Next.js's `Link`
component, enabling client-side navigation while maintaining the styling and
functionality of the `ListItemLink`.

```tsx
import NextLink from 'next/link';
import { List, ListItem, ListItemLink } from '@utilitywarehouse/hearth-react';

[...]

<List>
  <ListItem>
    <ListItemLink heading="Page One" asChild>
      <NextLink href="/one" />
    </ListItemLink>
  </ListItem>
  <ListItem>
    <ListItemLink heading="Page Two" asChild>
      <NextLink href="/two" />
    </ListItemLink>
  </ListItem>
</List>
```

## Appearance

**Important:** The `variant` prop must be used together with the `colorScheme`
prop. If either `variant` or `colorScheme` is `undefined`, the list will fall
back to its default appearance.

```tsx
<Flex direction="column" gap="600">
  <Box width="300px">
    <List {...args}>
      <ListItem>List item</ListItem>
      <ListItem>List item</ListItem>
      <ListItem>List item</ListItem>
      <ListItem>List item</ListItem>
      <ListItem>List item</ListItem>
    </List>
  </Box>
  {(['subtle', 'emphasis'] as const).map(variant => (
    <Flex key={variant} gap="400">
      {(['neutralStrong', 'neutralSubtle'] as const).map(colorScheme => (
        <Box key={colorScheme} width="300px">
          <List
            {...args}
            key={`${variant}${colorScheme}`}
            variant={variant}
            colorScheme={colorScheme}
          >
            <ListItem>List item</ListItem>
            <ListItem>List item</ListItem>
            <ListItem>List item</ListItem>
            <ListItem>List item</ListItem>
            <ListItem>List item</ListItem>
          </List>
        </Box>
      ))}
    </Flex>
  ))}
</Flex>
```

### Variant

The `variant` prop controls the overall style of the list. It can be used to
adjust the visual prominence of the list.

- **`undefined`**: Default appearance with no special styling.
- **`'subtle'`**: A minimal style with subtle borders and background.
- **`'emphasis'`**: A more pronounced style with stronger borders and background.

### ColorScheme

The `colorScheme` prop adjusts the background color of the list. It works in
conjunction with the `variant` prop.

- **`undefined`**: Default color scheme.
- **`'neutralStrong'`**: A clean, neutral white background.
- **`'neutralSubtle'`**: A softer, warmer white background.

### Padding None

You can remove the inline padding from all list items with the `paddingNone`
prop. This only has an effect when the variant or colorScheme are not set.

## Heading

The `heading` prop specifies the title of the list. This is useful for
providing context or describing the purpose of the list.

The `headingElement` prop allows you to specify the HTML element used for the
heading. This is important for maintaining semantic structure in your document.

- Use `'h1'`, `'h2'`, etc., for headings that are part of your page's hierarchy.
- Use `'div'` if the heading is purely decorative or doesn't fit into the semantic structure.

```tsx
<List heading="My List" headingElement="h2">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>
```

### Link

Use the `link` prop to provide a call-to-action or navigation link.

```tsx
<List
  heading="My Bills"
  link={
    <Link href="https://uw.co.uk/bills">
      View all
      <ChevronRightSmallIcon />
    </Link>
  }
>
  <ListItem>January 2025</ListItem>
  <ListItem>February 2025</ListItem>
</List>
```

### Helper text

The `helperText` prop provides additional context or instructions for the list.
It is displayed below the heading.

### Badge

You can include a `Badge` component, using the `badge` prop, with the
`badgePlacement` prop enabling you to change the position between `top` &
`bottom`.

```tsx
<Box width="300px">
  <List {...args}>
    <ListItem>
      <ListItemContent
        heading="List item content"
        helperText="Helper text"
        badge={<Badge size="sm">Badge</Badge>}
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="List item content"
        helperText="Helper text"
        badgePlacement="top"
        badge={
          <Badge size="sm" marginBottom="100">
            Badge
          </Badge>
        }
      />
    </ListItem>
  </List>
</Box>
```

## Leading content

Use the `leadingContent` prop on the `ListItemContent`, `ListItemButton` &
`ListItemLink` components to include a visual element at the start of a list
item. Typically, this would be an icon, `IconContainer`, or `Avatar`.

```tsx
<Box width="400px">
  <List {...args}>
    <ListItem>
      <ListItemContent heading="Icon leading content" leadingContent={<InfoMediumIcon />} />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Icon leading content"
        helperText="Helper text"
        leadingContent={<InfoMediumIcon />}
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Icon container leading content"
        leadingContent={
          <IconContainer variant="subtle" colorScheme="cashback" size="sm">
            <CashbackCardSmallIcon />
          </IconContainer>
        }
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Icon container leading content"
        helperText="Helper text"
        leadingContent={
          <IconContainer variant="subtle" colorScheme="cashback" size="sm">
            <CashbackCardSmallIcon />
          </IconContainer>
        }
      />
    </ListItem>
    <ListItem>
      <ListItemContent heading="Avatar leading content" leadingContent={<Avatar size="sm" />} />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Avatar leading content"
        helperText="Helper text"
        leadingContent={<Avatar size="sm" />}
      />
    </ListItem>
  </List>
</Box>
```

## Trailing content

Use the `trailingContent` prop on the `ListItemContent`, `ListItemButton` &
`ListItemLink` components to include a visual element at the end of a list
item. Typically, this would be an icon, `Switch`, `Link` or transaction, though
interactive elements such as `Switch` & `Link` should **NOT** be used as
trailing content with the `ListItemButton` & `ListItemLink` components.

```tsx
<Box width="400px">
  <List {...args}>
    <ListItem>
      <ListItemContent
        heading="Trailing content"
        helperText="With custom icon"
        trailingContent={<InfoMediumIcon />}
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Trailing content"
        helperText="With Switch"
        trailingContent={<Switch aria-label="list item switch" size="sm" />}
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Trailing content"
        helperText="With Link"
        trailingContent={<Link href="#">Link</Link>}
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Transaction trailing content"
        helperText="With multiple transactions"
        trailingContent={
          <Flex direction="column">
            <BodyText size="md" as="span">
              -£100.00
            </BodyText>
            <BodyText size="md" as="span" style={{ color: 'var(--h-text-brand)' }}>
              +£1.00 CB
            </BodyText>
          </Flex>
        }
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Transaction trailing content"
        helperText="With a single transaction"
        trailingContent={
          <Flex>
            <BodyText size="md" as="span" style={{ color: 'var(--h-text-affirmative)' }}>
              +£10.00
            </BodyText>
          </Flex>
        }
      />
    </ListItem>
  </List>
</Box>
```

### Custom trailing content

You can also include custom content, such as a transaction. The layout should
be handled for you, however if necessary you can always wrap your custom
content in a `Flex` component.

```tsx
<ListItem>
  <ListItemContent
    heading="Transaction"
    trailingContent={
      <>
        <BodyText size="md" as="span">
          -£100.00
        </BodyText>
        <BodyText size="md" as="span" style={{ color: 'var(--h-text-brand)' }}>
          +£1.00 CB
        </BodyText>
      </>
    }
  />
</ListItem>
```

```tsx
<Box width="300px">
  <List {...args}>
    <ListItem>
      <ListItemContent
        heading="Boots"
        helperText="5:30pm"
        trailingContent={
          <Flex direction="column" alignItems="end">
            <BodyText size="md" as="span">
              -£100.00
            </BodyText>
            <BodyText size="md" as="span" color="brand">
              +£1.00 CB
            </BodyText>
          </Flex>
        }
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="Top-up"
        helperText="4:00pm"
        trailingContent={
          <Flex alignSelf="start">
            <BodyText size="md" as="span" color="affirmative">
              +£10.00
            </BodyText>
          </Flex>
        }
      />
    </ListItem>
  </List>
</Box>
```

## Advanced Content

You can compose more complex content within the `ListItem` component. The
`ListItemButton` and `ListItemLink` components will continue to make the entire
list item interactive.

```tsx
<List {...args} aria-label="Partner events">
  {events.map(event => (
    <ListItem key={event.title}>
      <Flex direction="column" width="44px" textAlign="center">
        <BodyText size="md">{event.date.month}</BodyText>
        <DetailText size="2xl">{event.date.day}</DetailText>
      </Flex>

      <ListItemButton
        heading={event.title}
        helperText={event.location}
        badgePlacement="top"
        badge={
          <Badge
            colorScheme={event.type.includes('Buzz') ? 'positive' : 'info'}
            size="sm"
            marginBottom="100"
          >
            {event.type}
          </Badge>
        }
      />
    </ListItem>
  ))}
</List>
```

## List actions

A single List Action can be applied to any List that sits within a container.
Use List Action to apply to actions that apply to the content of the list. For
example, "View older bills"

```tsx
<Flex gap="400" width="700px">
  <List {...args}>
    <ListItem>
      <ListItemButton
        heading="List item"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListItemButton
        heading="List item"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListItemButton
        heading="List item"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListActionLink href="#">List action link</ListActionLink>
    </ListItem>
  </List>

  <List {...args}>
    <ListItem>
      <ListItemButton
        heading="List item"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListItemButton
        heading="List item"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListItemButton
        heading="List item"
        helperText="Helper text"
        leadingContent={<SettingsMediumIcon />}
        onClick={() => console.log('clickety click')}
      />
    </ListItem>
    <ListItem>
      <ListActionButton>List action button</ListActionButton>
    </ListItem>
  </List>
</Flex>
```

## API

This component is based on the `ul` element and supports the following common props:

- Margin

| Prop               | Type                                                                                                                                                                                                       | Default     | Description                                                                                       |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------- |
| `heading`          | `string`                                                                                                                                                                                                   | —           | Actual string to display as section header                                                        |
| `headingElement`   | `"div" \| "h1" \| "h2" \| "h3" \| "h4"`                                                                                                                                                                    | `h2`        |                                                                                                   |
| `helperText`       | `string`                                                                                                                                                                                                   | —           | Optional helper text to provide additional context or instructions.                               |
| `trailingContent`  | `ReactNode`                                                                                                                                                                                                | —           | Optional trailing content element                                                                 |
| `validationStatus` | `"invalid"`                                                                                                                                                                                                | —           | Indicates the validation state                                                                    |
| `validationText`   | `string`                                                                                                                                                                                                   | —           | Text to display when the `validationStatus` is set.                                               |
| `direction`        | `Responsive<"row" \| "column">`                                                                                                                                                                            | —           | Responsive direction of the section header content. By default, the content is laid out in a row. |
| `margin`           | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                                   |
| `marginTop`        | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                                   |
| `marginRight`      | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                                   |
| `marginBottom`     | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                                   |
| `marginLeft`       | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                                   |
| `marginX`          | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                                   |
| `marginY`          | `Responsive<"auto" \| "0" \| "25" \| "50" \| "75" \| "100" \| "150" \| "175" \| "200" \| "250" \| "300" \| "350" \| "400" \| "500" \| "600" \| "700" \| "800" \| "900" \| "1000" \| `var(--h-${string})`>` | —           |                                                                                                   |
| `variant`          | `"emphasis" \| "subtle"`                                                                                                                                                                                   | `undefined` | Sets the visual variant of the list.                                                              |
| `colorScheme`      | `"neutralStrong" \| "neutralSubtle"`                                                                                                                                                                       | —           | Sets the color scheme of the list.                                                                |
| `as`               | `"ol" \| "ul"`                                                                                                                                                                                             | `ul`        | Shorthand for changing the default rendered element into a semantically appropriate alternative.  |
| `paddingNone`      | `boolean`                                                                                                                                                                                                  | —           | Remove the inline padding for better alignment with other elements.                               |

## ListItem

The `ListItem` component represents an individual item in the `List`. It can be
used by itself to present simple text content. It also works as a wrapper when
you need to present advanced content or interactive list items.

```tsx
<List heading="Example List">
  <ListItem>Item 1</ListItem>
  <ListItem>Item 2</ListItem>
</List>
```

This component is base on the `li` element and supports the following common props:

- Size
- Gap

As well as the following Flex component props:

- direction
- alignItems
- alignContent
- justifyContent
- wrap

## ListItemContent

The `ListItemContent` component is used to render more advanced text content.

```tsx
<Box width="300px">
  <List {...args}>
    <ListItem>
      <ListItemContent
        heading="List item content"
        leadingContent={<SettingsMediumIcon />}
        helperText="Helper text"
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="List item content"
        leadingContent={<SettingsMediumIcon />}
        helperText="Helper text"
      />
    </ListItem>
    <ListItem>
      <ListItemContent
        heading="List item content"
        leadingContent={<SettingsMediumIcon />}
        helperText="Helper text"
      />
    </ListItem>
  </List>
</Box>
```

This component is base on the `div` element.

| Prop              | Type                | Default  | Description                                                         |
| ----------------- | ------------------- | -------- | ------------------------------------------------------------------- |
| `heading`         | `string`            | —        |                                                                     |
| `helperText`      | `ReactNode`         | —        | Optional helper text to provide additional context or instructions. |
| `leadingContent`  | `ReactNode`         | —        |                                                                     |
| `trailingContent` | `ReactNode`         | —        |                                                                     |
| `badge`           | `ReactNode`         | —        |                                                                     |
| `badgePlacement`  | `"top" \| "bottom"` | `bottom` | Placement of the badge element                                      |

## ListItemButton

The `ListItemButton` component is used to render a list item as a button, and
should be wrapped in a `ListItem` component.

This component is base on the `button` element and extends the
`ListItemContent` component, so it supports all the same props.

```tsx
<Box width="300px">
  <List {...args}>
    <ListItem>
      <ListItemButton heading="List item button" />
    </ListItem>
    <ListItem>
      <ListItemButton heading="List item button" />
    </ListItem>
    <ListItem>
      <ListItemButton heading="List item button" />
    </ListItem>
    <ListItem>
      <ListItemButton heading="List item button" />
    </ListItem>
    <ListItem>
      <ListItemButton heading="List item button" />
    </ListItem>
  </List>
</Box>
```

## ListItemLink

The `ListItemLink` component is used to render a list item as a link, and
should be wrapped in a `ListItem` component.

```tsx
<Box width="300px">
  <List {...args}>
    <ListItem>
      <ListItemLink heading="List item link" />
    </ListItem>
    <ListItem>
      <ListItemLink heading="List item link" />
    </ListItem>
    <ListItem>
      <ListItemLink heading="List item link" />
    </ListItem>
    <ListItem>
      <ListItemLink heading="List item link" />
    </ListItem>
    <ListItem>
      <ListItemLink heading="List item link" />
    </ListItem>
  </List>
</Box>
```

This component is base on the `a` element and extends the `ListItemContent`
component, so it supports all the same props, as well as the following
additional props:

| Prop              | Type                | Default    | Description                                                                                          |
| ----------------- | ------------------- | ---------- | ---------------------------------------------------------------------------------------------------- |
| `heading`         | `string`            | —          |                                                                                                      |
| `helperText`      | `ReactNode`         | —          | Optional helper text to provide additional context or instructions.                                  |
| `leadingContent`  | `ReactNode`         | —          |                                                                                                      |
| `trailingContent` | `ReactNode`         | —          |                                                                                                      |
| `badge`           | `ReactNode`         | —          |                                                                                                      |
| `badgePlacement`  | `"top" \| "bottom"` | `'bottom'` | Placement of the badge element                                                                       |
| `asChild`         | `boolean`           | —          | Change the default rendered element for the one passed as a child, merging their props and behavior. |

## ListActionLink

A single `ListActionLink` component can render a list action as a link, and
should be wrapped in a `ListItem` component.

This component is based on the `a` element.

## ListActionButton

A single `ListActionButton` component can render a list action as a button, and
should be wrapped in a `ListItem` component.

This component is based on the `button` element.
