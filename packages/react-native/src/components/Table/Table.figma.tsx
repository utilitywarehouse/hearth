import figma from '@figma/code-connect';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { UnstyledIconButton } from '../UnstyledIconButton';
import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from './';

figma.connect(
  Table,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6403-17515&t=pZwKJYFo1y1QRQD1-4',
  {
    props: {},
    example: () => (
      <Table container="subtle">
        <TableHeader color="purple">
          <TableHeaderCell
            trailingContent={
              <UnstyledIconButton
                accessibilityLabel="Sort"
                icon={ExpandSmallIcon}
                inverted
                size="sm"
              />
            }
          >
            Header
          </TableHeaderCell>
          <TableHeaderCell
            trailingContent={
              <UnstyledIconButton
                accessibilityLabel="Sort"
                icon={ExpandSmallIcon}
                inverted
                size="sm"
              />
            }
          >
            Header
          </TableHeaderCell>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableHeaderCell row>Row title</TableHeaderCell>
            <TableCell>Value</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
  }
);

figma.connect(
  TableHeaderCell,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6414-6728&t=pZwKJYFo1y1QRQD1-4',
  {
    props: {},
    example: () => (
      <TableHeaderCell
        trailingContent={
          <UnstyledIconButton accessibilityLabel="Sort" icon={ExpandSmallIcon} size="sm" />
        }
      >
        Header
      </TableHeaderCell>
    ),
  }
);
