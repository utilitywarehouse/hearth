# Table

Table arranges structured data into rows and columns, with optional pagination beneath the rows. The React Native version uses horizontal scrolling automatically when the columns need more space than the viewport allows.

- [Playground](#playground)
- [Usage](#usage)
- [Props](#props)
- [Examples](#examples)

## Playground

```tsx
// Example usage
<Table {...args}>
  <TableHeader color={headerColor}>
    <TableHeaderCell
      trailingContent={<HeaderSortButton inverted={headerInverted} label="Sort by name" />}
    >
      Name
    </TableHeaderCell>
    <TableHeaderCell
      trailingContent={<HeaderSortButton inverted={headerInverted} label="Sort by email" />}
    >
      Email
    </TableHeaderCell>
    <TableHeaderCell
      trailingContent={<HeaderSortButton inverted={headerInverted} label="Sort by phone" />}
    >
      Phone
    </TableHeaderCell>
    <TableHeaderCell
      trailingContent={<HeaderSortButton inverted={headerInverted} label="Sort by city" />}
    >
      City
    </TableHeaderCell>
  </TableHeader>
  <TableBody>
    {rows.slice(0, 5).map(person => (
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

## Usage

```tsx
// Example usage
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Table container="subtle">
    <TableHeader color="purple">
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Email</TableHeaderCell>
      <TableHeaderCell>City</TableHeaderCell>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableHeaderCell row>Alex Morgan</TableHeaderCell>
        <TableCell>alex@example.com</TableCell>
        <TableCell>London</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
```

### Table Props

| Property       | Type                                              | Description                                                                                             | Default     |
| -------------- | ------------------------------------------------- | ------------------------------------------------------------------------------------------------------- | ----------- |
| `container`    | `'none' \| 'subtle' \| 'emphasis'`                | Applies the List-style outer container wrapping.                                                        | `'none'`    |
| `columnWidths` | `(number \| '${number}fr' \| { flex: number })[]` | Optional per-column sizing. Use numbers for fixed widths and `'2fr'`-style values for flexible columns. | `undefined` |
| `pagination`   | `ReactNode`                                       | Optional pagination content rendered below the rows.                                                    | `undefined` |

### TableHeader Props

| Property | Type                  | Description                                       | Default    |
| -------- | --------------------- | ------------------------------------------------- | ---------- |
| `color`  | `'purple' \| 'white'` | Controls the header background and text contrast. | `'purple'` |

### TableHeaderCell Props

| Property          | Type        | Description                                                | Default     |
| ----------------- | ----------- | ---------------------------------------------------------- | ----------- |
| `row`             | `boolean`   | Uses body-row header styling for the first cell in a row.  | `false`     |
| `trailingContent` | `ReactNode` | Optional content aligned to the trailing edge of the cell. | `undefined` |

### Containers

```tsx
// Example usage
<Flex direction="column" spacing="xl" style={{ width: '100%' }}>
  {[
    { container: 'none' as const, color: 'white' as const },
    { container: 'subtle' as const, color: 'purple' as const },
    { container: 'emphasis' as const, color: 'purple' as const },
  ].map(({ container, color }) => (
    <Table key={`${container}-${color}`} container={container}>
      <TableHeader color={color}>
        <TableHeaderCell
          trailingContent={<HeaderSortButton inverted={color === 'purple'} label="Sort by name" />}
        >
          Name
        </TableHeaderCell>
        <TableHeaderCell
          trailingContent={<HeaderSortButton inverted={color === 'purple'} label="Sort by plan" />}
        >
          Plan
        </TableHeaderCell>
        <TableHeaderCell
          trailingContent={
            <HeaderSortButton inverted={color === 'purple'} label="Sort by status" />
          }
        >
          Status
        </TableHeaderCell>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHeaderCell row>Alex Morgan</TableHeaderCell>
          <TableCell>Full Fibre 900</TableCell>
          <TableCell>Active</TableCell>
        </TableRow>
        <TableRow>
          <TableHeaderCell row>Priya Shah</TableHeaderCell>
          <TableCell>Energy Saver</TableCell>
          <TableCell>Pending</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ))}
</Flex>
```

```tsx
// Example usage
<Table container="subtle">
  <TableHeader color="purple">
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Plan</TableHeaderCell>
    <TableHeaderCell>Status</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableHeaderCell row>Alex Morgan</TableHeaderCell>
      <TableCell>Full Fibre 900</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

### With pagination

```tsx
// Example usage
<Table
  {...args}
  pagination={
    <TablePagination
      currentPage={currentPage}
      onPageChange={setCurrentPage}
      totalPages={totalPages}
    />
  }
>
  <TableHeader color={headerColor}>
    <TableHeaderCell
      trailingContent={<HeaderSortButton inverted={headerInverted} label="Sort by name" />}
    >
      Name
    </TableHeaderCell>
    <TableHeaderCell
      trailingContent={<HeaderSortButton inverted={headerInverted} label="Sort by email" />}
    >
      Email
    </TableHeaderCell>
    <TableHeaderCell
      trailingContent={<HeaderSortButton inverted={headerInverted} label="Sort by city" />}
    >
      City
    </TableHeaderCell>
  </TableHeader>
  <TableBody>
    {pageRows.map(person => (
      <TableRow key={person.id}>
        <TableHeaderCell row>{person.name}</TableHeaderCell>
        <TableCell>{person.email}</TableCell>
        <TableCell>{person.city}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

```tsx
// Example usage
const [currentPage, setCurrentPage] = useState(1);

<Table
  container="subtle"
  pagination={
    <TablePagination currentPage={currentPage} onPageChange={setCurrentPage} totalPages={10} />
  }
>
  <TableHeader color="purple">
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Email</TableHeaderCell>
    <TableHeaderCell>City</TableHeaderCell>
  </TableHeader>
  <TableBody>{/* paged rows */}</TableBody>
</Table>;
```

### Narrow viewport

```tsx
// Example usage
<Box style={{ width: 320 }}>
  <Table
    container="subtle"
    pagination={
      <TablePagination condensed currentPage={1} onPageChange={() => {}} totalPages={10} />
    }
  >
    <TableHeader color="purple">
      <TableHeaderCell trailingContent={<HeaderSortButton inverted label="Sort by account" />}>
        Account
      </TableHeaderCell>
      <TableHeaderCell trailingContent={<HeaderSortButton inverted label="Sort by type" />}>
        Type
      </TableHeaderCell>
      <TableHeaderCell trailingContent={<HeaderSortButton inverted label="Sort by monthly cost" />}>
        Monthly cost
      </TableHeaderCell>
      <TableHeaderCell trailingContent={<HeaderSortButton inverted label="Sort by renewal" />}>
        Renewal
      </TableHeaderCell>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableHeaderCell row>Energy</TableHeaderCell>
        <TableCell>Dual fuel</TableCell>
        <TableCell>£132.50</TableCell>
        <TableCell>12 Sep</TableCell>
      </TableRow>
      <TableRow>
        <TableHeaderCell row>Broadband</TableHeaderCell>
        <TableCell>Full Fibre 900</TableCell>
        <TableCell>£44.00</TableCell>
        <TableCell>22 Nov</TableCell>
      </TableRow>
    </TableBody>
  </Table>
</Box>
```

```tsx
// Example usage
<Box style={{ width: 320 }}>
  <Table container="subtle">
    <TableHeader color="purple">
      <TableHeaderCell>Account</TableHeaderCell>
      <TableHeaderCell>Type</TableHeaderCell>
      <TableHeaderCell>Monthly cost</TableHeaderCell>
      <TableHeaderCell>Renewal</TableHeaderCell>
    </TableHeader>
    <TableBody>{/* rows */}</TableBody>
  </Table>
</Box>
```

### Configured column widths

```tsx
// Example usage
<Table columnWidths={[180, '2fr', '1fr', 140]} container="subtle">
  <TableHeader color="purple">
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Email</TableHeaderCell>
    <TableHeaderCell>Plan</TableHeaderCell>
    <TableHeaderCell>Status</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableHeaderCell row>Alex Morgan</TableHeaderCell>
      <TableCell>alex.longer-email@example.com</TableCell>
      <TableCell>Full Fibre 900</TableCell>
      <TableCell>Active</TableCell>
    </TableRow>
    <TableRow>
      <TableHeaderCell row>Priya Shah</TableHeaderCell>
      <TableCell>priya@example.com</TableCell>
      <TableCell>Energy Saver</TableCell>
      <TableCell>Pending</TableCell>
    </TableRow>
  </TableBody>
</Table>
```

```tsx
// Example usage
<Table columnWidths={[180, '2fr', '1fr', 140]} container="subtle">
  <TableHeader color="purple">
    <TableHeaderCell>Name</TableHeaderCell>
    <TableHeaderCell>Email</TableHeaderCell>
    <TableHeaderCell>Plan</TableHeaderCell>
    <TableHeaderCell>Status</TableHeaderCell>
  </TableHeader>
  <TableBody>{/* rows */}</TableBody>
</Table>
```

### Custom sort function

```tsx
// Example usage
<Table columnWidths={[180, '2fr', 120]} container="subtle">
  <TableHeader color="purple">
    <TableHeaderCell>Customer</TableHeaderCell>
    <TableHeaderCell>Plan</TableHeaderCell>
    <TableHeaderCell
      trailingContent={
        <UnstyledIconButton
          accessibilityLabel="Sort by custom status order"
          icon={ExpandSmallIcon}
          inverted
          onPress={() => setDirection(current => (current === 'asc' ? 'desc' : 'asc'))}
          size="sm"
        />
      }
    >
      Status
    </TableHeaderCell>
  </TableHeader>
  <TableBody>
    {sortedRows.map(item => (
      <TableRow key={item.id}>
        <TableHeaderCell row>{item.customer}</TableHeaderCell>
        <TableCell>{item.plan}</TableCell>
        <TableCell>{item.status}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

```tsx
// Example usage
const statusOrder = {
  Active: 0,
  Pending: 1,
  Paused: 2,
  Cancelled: 3,
} as const;

const sortRowsByStatus = (items, direction = 'asc') => {
  const multiplier = direction === 'asc' ? 1 : -1;

  return [...items].sort((left, right) => {
    const statusDifference = (statusOrder[left.status] - statusOrder[right.status]) * multiplier;

    if (statusDifference !== 0) {
      return statusDifference;
    }

    return left.customer.localeCompare(right.customer) * multiplier;
  });
};

const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
const sortedRows = sortRowsByStatus(rows, direction);

<Table columnWidths={[180, '2fr', 120]} container="subtle">
  <TableHeader color="purple">
    <TableHeaderCell>Customer</TableHeaderCell>
    <TableHeaderCell>Plan</TableHeaderCell>
    <TableHeaderCell
      trailingContent={
        <UnstyledIconButton
          accessibilityLabel="Sort by custom status order"
          icon={ExpandSmallIcon}
          inverted
          onPress={() => setDirection(current => (current === 'asc' ? 'desc' : 'asc'))}
          size="sm"
        />
      }
    >
      Status
    </TableHeaderCell>
  </TableHeader>
  <TableBody>{/* sortedRows */}</TableBody>
</Table>;
```
