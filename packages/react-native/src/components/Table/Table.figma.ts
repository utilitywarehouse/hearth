// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6403-17515&t=pZwKJYFo1y1QRQD1-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Table/Table.tsx
// component=Table

import figma from 'figma';

const instance = figma.selectedInstance;

const container = instance.getEnum('Container', {
  Subtle: 'subtle',
  Emphasis: 'emphasis',
  None: 'none',
});

const pagination = instance.getBoolean('Pagination?');

export default {
  id: 'Table',
  imports: [
    "import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';",
    "import { UnstyledIconButton, Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from '@utilitywarehouse/hearth-react-native';",
  ],
  example: figma.code`<Table${figma.helpers.react.renderProp(
    'container',
    container
  )}${figma.helpers.react.renderProp('pagination', pagination)}>
      <TableHeader color="purple">
        <TableHeaderCell trailingContent={<UnstyledIconButton accessibilityLabel="Sort" icon={ExpandSmallIcon} inverted size="sm" />}>
          Header
        </TableHeaderCell>
        <TableHeaderCell trailingContent={<UnstyledIconButton accessibilityLabel="Sort" icon={ExpandSmallIcon} inverted size="sm" />}>
          Header
        </TableHeaderCell>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHeaderCell row>Row title</TableHeaderCell>
          <TableCell>Value</TableCell>
        </TableRow>
      </TableBody>
    </Table>`,
  metadata: {
    nestable: true,
    props: { container, pagination },
  },
};
