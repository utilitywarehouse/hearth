import type { Meta, StoryObj } from '@storybook/react-vite';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import { TableRow } from './TableRow';

const meta: Meta<typeof TableHeaderCell> = {
  title: 'Components / Table / TableHeaderCell',
  component: TableHeaderCell,
  argTypes: {
    textAlign: { control: { type: 'radio' }, options: [undefined, 'left', 'center', 'right'] },
  },
};

export default meta;
type Story = StoryObj<typeof TableHeaderCell>;

export const Playground: Story = {
  render: args => (
    <Table>
      <TableHeader>
        <TableHeaderCell {...args}>Name</TableHeaderCell>
        <TableHeaderCell>Email</TableHeaderCell>
        <TableHeaderCell>Phone</TableHeaderCell>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableHeaderCell row>Toni Morrison</TableHeaderCell>
          <TableCell>toni@example.com</TableCell>
          <TableCell>01234 567890</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  ),
};
