---
'@utilitywarehouse/hearth-react-native': minor
---

🌟 [FEATURE]: Add `Table` component

The package now includes a composable `Table` API for presenting structured data with headers, rows, cells, optional card-style containers, horizontal scrolling for narrow viewports, configurable column widths, and pagination support through `TablePagination`. Header cells support trailing actions such as sort controls, and the API is split into smaller building blocks so layouts can be assembled to fit different datasets.

**Components affected**:
- `Table`
- `TableHeader`
- `TableHeaderCell`
- `TableBody`
- `TableRow`
- `TableCell`
- `TablePagination`

**Developer changes**:

Import the table primitives from `@utilitywarehouse/hearth-react-native` and compose them to match your data shape. Add `columnWidths` when you need fixed or weighted columns, and pass `pagination` when rows should be paged.

```tsx
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '@utilitywarehouse/hearth-react-native';

const MyComponent = () => (
  <Table columnWidths={[180, '2fr', '1fr']} container="subtle">
    <TableHeader color="purple">
      <TableHeaderCell>Name</TableHeaderCell>
      <TableHeaderCell>Email</TableHeaderCell>
      <TableHeaderCell>Status</TableHeaderCell>
    </TableHeader>
    <TableBody>
      <TableRow>
        <TableHeaderCell row>Alex Morgan</TableHeaderCell>
        <TableCell>alex@example.com</TableCell>
        <TableCell>Active</TableCell>
      </TableRow>
    </TableBody>
  </Table>
);
```