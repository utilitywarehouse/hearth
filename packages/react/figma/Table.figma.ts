// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6403-17515&m=dev
// source=../src/components/Table/Table.tsx
// component=Table
import figma from 'figma';
const instance = figma.selectedInstance;

// Container=None maps to `variant` being undefined (renders without the Card wrapper, per
// Table.props.ts). Device (Desktop/Mobile & Tablet) is a responsive preview toggle with no prop
// equivalent; Scroll bar? is a decorative-only affordance.
const variant = instance.getEnum('Container', {
  Subtle: 'subtle',
  Emphasis: 'emphasis',
});

export default {
  example: figma.code`<Table${figma.helpers.react.renderProp('variant', variant)}>
  <TableHeader>
    <TableHeaderCell>...</TableHeaderCell>
    <TableHeaderCell>...</TableHeaderCell>
  </TableHeader>
  <TableBody>
    <TableRow>
      <TableCell>...</TableCell>
      <TableCell>...</TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  imports: [
    'import { Table, TableHeader, TableBody, TableRow, TableHeaderCell, TableCell } from "@utilitywarehouse/hearth-react"',
  ],
  id: 'table',
};
