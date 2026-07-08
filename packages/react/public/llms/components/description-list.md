# DescriptionList

Use the `DescriptionList` component when you need to present pairs of related information together.

```tsx
<Box width="550px">
  <DescriptionList {...args} trailingContent={<Link href="#">Link</Link>}>
    <DescriptionListItem
      heading="Heading"
      description="Description"
      link={<Link href="#">Link</Link>}
    />
    <DescriptionListItem
      heading="Heading"
      description="Description"
      link={<Link href="#">Link</Link>}
    />
    <DescriptionListItem
      heading="Heading"
      description="Description"
      link={<Link href="#">Link</Link>}
    />
    <DescriptionListItem
      heading="Heading"
      description="Description"
      link={<Link href="#">Link</Link>}
      validationText="Validation text"
      validationStatus="invalid"
    />
  </DescriptionList>
</Box>
```

- [Usage](#usage)
- [Heading](#heading)
- [Trailing content](#trailing-content)
- [Direction](#direction)
- [API](#api)
- [DescriptionListItem API](#descriptionlistitem-api)

## Usage

Use the `DescriptionList` element to wrap any number of `DescriptionListItem`
components. This will render a semantic `dl` element, containing `dt` & `dd`
elements, where the `DescriptionListItem` heading is the `description term
(dt)`, and the description is the `description details (dd)`.

```tsx
<DescriptionList heading="Contact details">
  <DescriptionListItem heading="Phone number" description="07123 456789" />
  <DescriptionListItem heading="Email address" description="design-systems@uw.co.uk" />
  <DescriptionListItem heading="Password" description="***************" />
</DescriptionList>
```

## Heading

The `heading` prop specifies the title of the list. This is useful for
providing context or describing the purpose of the list.

The `headingElement` prop allows you to specify the HTML element used for the
heading. This is important for maintaining semantic structure in your document.

- Use `'h1'`, `'h2'`, etc., for headings that are part of your page's hierarchy.
- Use `'div'` if the heading is purely decorative or doesn't fit into the semantic structure.

```tsx
<DescriptionList heading="Contact details" headingElement="h2">
  <DescriptionListItem heading="Phone number" description="07123 456789" />
  <DescriptionListItem heading="Email address" description="design-systems@uw.co.uk" />
</DescriptionList>
```

## Trailing content

Use the `trailingContent` prop to include a `Link`, `Button` or `Badge` component.

```tsx
<DescriptionList
  heading="My Bills"
  trailingContent={
    <Link href="https://uw.co.uk/bills">
      View all
      <ChevronRightSmallIcon />
    </Link>
  }
>
  {...}
</DescriptionList>
```

## Direction

The direction of the `DescriptionListItem` components can be controlled via the
root `DescriptionList`. This prop is responsive, so you can control the layout
per breakpoint.

```tsx
<Box width="100%" maxWidth="800px">
  <DescriptionList
    {...args}
    trailingContent={<Link href="#">Edit</Link>}
    direction={{ mobile: 'column', tablet: 'row' }}
  >
    <DescriptionListItem heading="Phone number" description="07123 456789" />
    <DescriptionListItem heading="Email address" description="design-systems@uw.co.uk" />
    <DescriptionListItem heading="Password" description="***************" />
  </DescriptionList>
</Box>
```

## API

This component is based on the `dl` element and supports the following common props:

- Margin
- Size (width props only)

| Prop               | Type                                    | Default | Description                                                                                       |
| ------------------ | --------------------------------------- | ------- | ------------------------------------------------------------------------------------------------- |
| `heading`          | `string`                                | —       | Actual string to display as section header                                                        |
| `headingElement`   | `"div" \| "h1" \| "h2" \| "h3" \| "h4"` | `h2`    |                                                                                                   |
| `helperText`       | `string`                                | —       | Optional helper text to provide additional context or instructions.                               |
| `trailingContent`  | `ReactNode`                             | —       | Optional trailing content element                                                                 |
| `validationStatus` | `"invalid"`                             | —       | Indicates the validation state                                                                    |
| `validationText`   | `string`                                | —       | Text to display when the `validationStatus` is set.                                               |
| `direction`        | `Responsive<"row" \| "column">`         | —       | Responsive direction of the section header content. By default, the content is laid out in a row. |

## DescriptionListItem API

This component is base on the `div` element.

| Prop               | Type        | Default | Description                                         |
| ------------------ | ----------- | ------- | --------------------------------------------------- |
| `heading`          | `string`    | —       | Description term                                    |
| `description`      | `string`    | —       | Description details                                 |
| `link`             | `ReactNode` | —       | Optional link element                               |
| `validationStatus` | `"invalid"` | —       | Indicates the validation state                      |
| `validationText`   | `string`    | —       | Text to display when the `validationStatus` is set. |
