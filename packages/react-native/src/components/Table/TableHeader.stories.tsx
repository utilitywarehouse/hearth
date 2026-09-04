import { Meta, StoryObj } from '@storybook/react-native';
import { Table, TableBody, TableCell, TableHeaderCell, TableRow } from '.';
import TableHeader from './TableHeader';

const meta: Meta<typeof TableHeader> = {
  title: 'Stories / TableHeader',
  component: TableHeader,
};

export default meta;
type Story = StoryObj<typeof TableHeader>;

export const Playground: Story = {
  args: {
    color: 'purple',
  },
  render: args => (
    <Table container="subtle">
      <TableHeader {...args}>
        <TableHeaderCell>Name</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
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
