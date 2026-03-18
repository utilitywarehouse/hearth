import { Meta, StoryObj } from '@storybook/react-native';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useState } from 'react';
import { Box } from '../Box';
import { Flex } from '../Flex';
import { UnstyledIconButton } from '../UnstyledIconButton';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TablePagination,
  TableRow,
} from './';

type SortDirection = 'asc' | 'desc';
type SortStatus = 'Active' | 'Pending' | 'Paused' | 'Cancelled';

const rows = [
  {
    id: '1',
    name: 'Alex Morgan',
    email: 'alex@example.com',
    phone: '020 7946 0931',
    city: 'London',
  },
  {
    id: '2',
    name: 'Priya Shah',
    email: 'priya@example.com',
    phone: '0161 496 0124',
    city: 'Manchester',
  },
  {
    id: '3',
    name: 'Chris Brown',
    email: 'chris@example.com',
    phone: '0117 496 1820',
    city: 'Bristol',
  },
  {
    id: '4',
    name: 'Nina Evans',
    email: 'nina@example.com',
    phone: '0141 496 2048',
    city: 'Glasgow',
  },
  {
    id: '5',
    name: 'Luca Rossi',
    email: 'luca@example.com',
    phone: '029 2199 4412',
    city: 'Cardiff',
  },
  {
    id: '6',
    name: 'Sarah Kent',
    email: 'sarah@example.com',
    phone: '0131 496 2755',
    city: 'Edinburgh',
  },
  {
    id: '7',
    name: 'Tom Hall',
    email: 'tom@example.com',
    phone: '0121 496 3901',
    city: 'Birmingham',
  },
  { id: '8', name: 'Emma Dale', email: 'emma@example.com', phone: '0113 496 1140', city: 'Leeds' },
  {
    id: '9',
    name: 'James Cole',
    email: 'james@example.com',
    phone: '0191 496 4502',
    city: 'Newcastle',
  },
  {
    id: '10',
    name: 'Mia White',
    email: 'mia@example.com',
    phone: '0151 496 5620',
    city: 'Liverpool',
  },
];

const sortableRows = [
  { id: '1', customer: 'Alex Morgan', plan: 'Full Fibre 900', status: 'Pending' as SortStatus },
  { id: '2', customer: 'Priya Shah', plan: 'Energy Saver', status: 'Active' as SortStatus },
  { id: '3', customer: 'Chris Brown', plan: 'Mobile Unlimited', status: 'Paused' as SortStatus },
  { id: '4', customer: 'Nina Evans', plan: 'Home Insurance', status: 'Cancelled' as SortStatus },
];

const statusOrder = {
  Active: 0,
  Pending: 1,
  Paused: 2,
  Cancelled: 3,
} as const;

const sortRowsByStatus = (items: typeof sortableRows, direction: SortDirection = 'asc') => {
  const multiplier = direction === 'asc' ? 1 : -1;

  return [...items].sort((left, right) => {
    const statusDifference = (statusOrder[left.status] - statusOrder[right.status]) * multiplier;

    if (statusDifference !== 0) {
      return statusDifference;
    }

    return left.customer.localeCompare(right.customer) * multiplier;
  });
};

const meta = {
  title: 'Stories / Table',
  component: Table,
  args: {
    container: 'subtle',
  },
  argTypes: {
    container: {
      control: 'radio',
      options: ['none', 'subtle', 'emphasis'],
    },
    pagination: {
      control: false,
    },
    children: {
      control: false,
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

const HeaderSortButton = ({ inverted, label }: { inverted: boolean; label: string }) => (
  <UnstyledIconButton
    accessibilityLabel={label}
    icon={ExpandSmallIcon}
    inverted={inverted}
    size="sm"
  />
);

export const Playground: Story = {
  render: (args: StoryObj<typeof meta.args>) => {
    const headerColor = args.container === 'none' ? 'white' : 'purple';
    const headerInverted = headerColor === 'purple';

    return (
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
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" spacing="xl" style={{ width: '100%' }}>
      {[
        { container: 'none' as const, color: 'white' as const },
        { container: 'subtle' as const, color: 'purple' as const },
        { container: 'emphasis' as const, color: 'purple' as const },
      ].map(({ container, color }) => (
        <Table key={`${container}-${color}`} container={container}>
          <TableHeader color={color}>
            <TableHeaderCell
              trailingContent={
                <HeaderSortButton inverted={color === 'purple'} label="Sort by name" />
              }
            >
              Name
            </TableHeaderCell>
            <TableHeaderCell
              trailingContent={
                <HeaderSortButton inverted={color === 'purple'} label="Sort by plan" />
              }
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
  ),
};

export const WithPagination: Story = {
  render: (args: StoryObj<typeof meta.args>) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;
    const totalPages = Math.ceil(rows.length / itemsPerPage);
    const pageRows = rows.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
    const headerColor = args.container === 'none' ? 'white' : 'purple';
    const headerInverted = headerColor === 'purple';

    return (
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
    );
  },
};

export const NarrowViewport: Story = {
  render: () => (
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
          <TableHeaderCell
            trailingContent={<HeaderSortButton inverted label="Sort by monthly cost" />}
          >
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
  ),
};

export const ConfiguredColumnWidths: Story = {
  render: () => (
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
  ),
};

export const WithCustomSortFunction: Story = {
  render: () => {
    const [direction, setDirection] = useState<SortDirection>('asc');
    const sortedRows = sortRowsByStatus(sortableRows, direction);

    return (
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
    );
  },
};
