import { Meta, StoryObj } from '@storybook/react-native';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '.';
import { UnstyledIconButton } from '../UnstyledIconButton';
import TableHeaderCell from './TableHeaderCell';

const meta: Meta<typeof TableHeaderCell> = {
  title: 'Stories / TableHeaderCell',
  component: TableHeaderCell,
};

export default meta;
type Story = StoryObj<typeof TableHeaderCell>;

export const Playground: Story = {
  args: {
    children: 'Name',
    color: 'purple',
  },
  render: args => (
    <Table container="subtle">
      <TableHeader color={args.color}>
        <TableHeaderCell
          {...args}
          trailingContent={
            <UnstyledIconButton accessibilityLabel="Sort by name" icon={ExpandSmallIcon} inverted />
          }
        />
        <TableHeaderCell color={args.color}>Email</TableHeaderCell>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHeaderCell row>Alex Morgan</TableHeaderCell>
          <TableCell>alex@example.com</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
