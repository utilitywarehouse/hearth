# Table

Use a `Table` to arrange data in rows and columns. They are used to communicate relationships between content and to display references, comparisons, and choices.

- [Usage](#usage)
- [Variants](#variants)
- [Pagination](#pagination)
- [Header cells](#header-cells)
- [API](#api)

```tsx
<Table {...args}>
  <TableHeader>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Email</TableHeaderCell>
    <TableHeaderCell>Phone</TableHeaderCell>
    <TableHeaderCell>City</TableHeaderCell>
  </TableHeader>
  <TableBody>
    {personalDetails.slice(0, 3).map(person => (
      <TableRow key={person.id}>
        <TableCell>{person.name}</TableCell>
        <TableCell>{person.email}</TableCell>
        <TableCell>{person.phone}</TableCell>
        <TableCell>{person.city}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Usage

- `Table` groups the `TableHeader` and `TableBody` components, and provides UI variants.
- `TableHeader` groups table column headers
- `TableBody` provides the body of the table, grouping table rows.
- `TableRow` wraps rows of data cells
- `TableHeaderCell` provides the header cell, which can be used within both `TableHeader` and `TableRow` components.
- `TableCell` for data cells within a `TableRow`.
- `TablePagination` provides pagination controls for the table.

## Variants

`Table` supports the following variants, based on the `Card` component:

- `undefined` - No `Card` container, minimal styling
- `subtle` - Subtle `Card` container
- `emphasis` - Emphasis `Card` container

```tsx
<Table variant="subtle">
  <TableHeader>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Occupation</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableHeaderCell row>Toni Morrison</TableCell>
      <TableCell>Writer</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

```tsx
<Flex direction="column" gap="600">
  {variants.map(variant => (
    <Table key={variant} variant={variant}>
      <TableHeader>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Phone</TableHeaderCell>
        <TableHeaderCell>City</TableHeaderCell>
      </TableHeader>
      <TableBody>
        {personalDetails.slice(0, 5).map(person => (
          <TableRow key={person.id}>
            <TableHeaderCell row>{person.name}</TableHeaderCell>
            <TableCell>{person.email}</TableCell>
            <TableCell>{person.phone}</TableCell>
            <TableCell>{person.city}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  ))}
</Flex>
```

## Pagination

Use the `pagination` prop to include pagination.

```tsx
<Table
  pagination={
    <TablePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  }
>
  <TableHeader>{...}</TableHeader>
  <TableBody>{...}</TableBody>
</Table>
```

```tsx
<Table
  {...args}
  pagination={
    <TablePagination
      currentPage={currentPage}
      totalPages={totalPages}
      onPageChange={setCurrentPage}
    />
  }
>
  <TableHeader>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Email</TableHeaderCell>
    <TableHeaderCell>Phone</TableHeaderCell>
    <TableHeaderCell>City</TableHeaderCell>
  </TableHeader>
  <TableBody>
    {pageData.map(person => (
      <TableRow key={person.id}>
        <TableHeaderCell row>{person.name}</TableHeaderCell>
        <TableCell>{person.email}</TableCell>
        <TableCell>{person.phone}</TableCell>
        <TableCell>{person.city}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

## Header cells

The `TableHeaderCell` component is used for column header cell within the `TableHeader` component.

When the `row` prop is set it can also be used as the first cell in a `TableRow`.

```tsx
<Table>
  <TableHeader>
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Occupation</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableHeaderCell row>Toni Morrison</TableHeaderCell>
      <TableCell>Writer</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## Text Align

You can align the text in both the `TableHeaderCell` and `TableCell` components using the `textAlign` prop.

```tsx
<Table>
  <TableHeader>
    <TableHeaderCell textAlign="left">Name</TableHeaderCell>
    <TableHeaderCell textAlign="center">Occupation</TableHeaderCell>
    <TableHeaderCell textAlign="right">Location</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell textAlign="left">Toni Morrison</TableCell>
      <TableCell textAlign="center">Writer</TableCell>
      <TableCell textAlign="right">United States</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

## API

This component is based on the `table` element and supports the following common props:

- Margin

| Prop         | Type                                                                       | Default | Description                                                                                         |
| ------------ | -------------------------------------------------------------------------- | ------- | --------------------------------------------------------------------------------------------------- |
| `variant`    | `"emphasis" \| "subtle"`                                                   | —       | Sets the visual variant of the table. When undefined, the table is rendered without a Card wrapper. |
| `pagination` | `ReactElement<TablePaginationProps, string \| JSXElementConstructor<any>>` | —       |                                                                                                     |

### TableHeader API

This component is based on the `thead` element.

### TableHeaderCell API

This component is based on the `th` element and supports the following common props:

- Text Align

| Prop        | Type                                        | Default | Description |
| ----------- | ------------------------------------------- | ------- | ----------- |
| `row`       | `boolean`                                   | —       |             |
| `textAlign` | `Responsive<"center" \| "left" \| "right">` | —       |             |

### TableBody API

This component is based on the `tbody` element.

### TableRow API

This component is based on the `tr` element.

### TableCell API

This component is based on the `td` element and supports the following common props:

- Text Align

### TablePagination API

This component is based on the `Pagination` component.
