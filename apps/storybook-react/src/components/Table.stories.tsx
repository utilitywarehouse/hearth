import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TableProps,
} from '@utilitywarehouse/hearth-react';
import type { SortDirection } from '@utilitywarehouse/hearth-react';

type ExtendedTableProps = TableProps & {
  numberOfRows: number;
};

const meta: Meta<ExtendedTableProps> = {
  title: 'Stories / Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          '`Table` displays data in a structured format with rows and columns. It features responsive layouts that adapt to mobile and tablet screens with horizontal scrolling.',
      },
    },
  },
  argTypes: {
    containerVariant: {
      control: { type: 'select' },
      options: ['subtle', 'emphasis', 'none'],
      description: 'The container variant of the table',
      table: {
        defaultValue: { summary: 'subtle' },
      },
    },
    numberOfRows: {
      control: { type: 'number', min: 1, max: 20, step: 1 },
      description: 'Number of rows to display in the table (Playground story only)',
      table: {
        defaultValue: { summary: '3' },
        type: { summary: 'number' },
      },
    },
  },
  args: {
    containerVariant: 'subtle',
    numberOfRows: 3,
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// Sample data - Personal details
const personalDetails = [
  {
    id: 1,
    firstName: 'Emma',
    lastName: 'Wilson',
    email: 'emma.wilson@email.com',
    phone: '+44 7700 900001',
    city: 'London',
  },
  {
    id: 2,
    firstName: 'Oliver',
    lastName: 'Brown',
    email: 'oliver.brown@email.com',
    phone: '+44 7700 900002',
    city: 'Manchester',
  },
  {
    id: 3,
    firstName: 'Ava',
    lastName: 'Taylor',
    email: 'ava.taylor@email.com',
    phone: '+44 7700 900003',
    city: 'Birmingham',
  },
  {
    id: 4,
    firstName: 'Noah',
    lastName: 'Davies',
    email: 'noah.davies@email.com',
    phone: '+44 7700 900004',
    city: 'Leeds',
  },
  {
    id: 5,
    firstName: 'Isla',
    lastName: 'Evans',
    email: 'isla.evans@email.com',
    phone: '+44 7700 900005',
    city: 'Glasgow',
  },
  {
    id: 6,
    firstName: 'George',
    lastName: 'Thomas',
    email: 'george.thomas@email.com',
    phone: '+44 7700 900006',
    city: 'Liverpool',
  },
  {
    id: 7,
    firstName: 'Amelia',
    lastName: 'Roberts',
    email: 'amelia.roberts@email.com',
    phone: '+44 7700 900007',
    city: 'Bristol',
  },
  {
    id: 8,
    firstName: 'Harry',
    lastName: 'Johnson',
    email: 'harry.johnson@email.com',
    phone: '+44 7700 900008',
    city: 'Sheffield',
  },
  {
    id: 9,
    firstName: 'Mia',
    lastName: 'Walker',
    email: 'mia.walker@email.com',
    phone: '+44 7700 900009',
    city: 'Edinburgh',
  },
  {
    id: 10,
    firstName: 'Jack',
    lastName: 'Wright',
    email: 'jack.wright@email.com',
    phone: '+44 7700 900010',
    city: 'Cardiff',
  },
  {
    id: 11,
    firstName: 'Sophie',
    lastName: 'Robinson',
    email: 'sophie.robinson@email.com',
    phone: '+44 7700 900011',
    city: 'Newcastle',
  },
  {
    id: 12,
    firstName: 'Charlie',
    lastName: 'Thompson',
    email: 'charlie.thompson@email.com',
    phone: '+44 7700 900012',
    city: 'Nottingham',
  },
  {
    id: 13,
    firstName: 'Emily',
    lastName: 'White',
    email: 'emily.white@email.com',
    phone: '+44 7700 900013',
    city: 'Southampton',
  },
  {
    id: 14,
    firstName: 'Oscar',
    lastName: 'Hughes',
    email: 'oscar.hughes@email.com',
    phone: '+44 7700 900014',
    city: 'Leicester',
  },
  {
    id: 15,
    firstName: 'Lily',
    lastName: 'Edwards',
    email: 'lily.edwards@email.com',
    phone: '+44 7700 900015',
    city: 'Coventry',
  },
  {
    id: 16,
    firstName: 'Thomas',
    lastName: 'Green',
    email: 'thomas.green@email.com',
    phone: '+44 7700 900016',
    city: 'Bradford',
  },
  {
    id: 17,
    firstName: 'Grace',
    lastName: 'Hall',
    email: 'grace.hall@email.com',
    phone: '+44 7700 900017',
    city: 'Belfast',
  },
  {
    id: 18,
    firstName: 'James',
    lastName: 'Lewis',
    email: 'james.lewis@email.com',
    phone: '+44 7700 900018',
    city: 'Brighton',
  },
  {
    id: 19,
    firstName: 'Ella',
    lastName: 'Clark',
    email: 'ella.clark@email.com',
    phone: '+44 7700 900019',
    city: 'Plymouth',
  },
  {
    id: 20,
    firstName: 'William',
    lastName: 'Turner',
    email: 'william.turner@email.com',
    phone: '+44 7700 900020',
    city: 'Cambridge',
  },
];

export const Playground: Story = {
  render: ({ numberOfRows, ...args }) => {
    return (
      <Table {...args}>
        <TableHeader>
          <TableHeaderCell>ID</TableHeaderCell>
          <TableHeaderCell>First Name</TableHeaderCell>
          <TableHeaderCell>Last Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Phone</TableHeaderCell>
          <TableHeaderCell>City</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {personalDetails.slice(0, numberOfRows).map(person => (
            <TableRow key={person.id}>
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
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

export const WithSorting: Story = {
  parameters: {
    docs: {
      description: {
        story:
          'Table with sortable columns. Click on column headers to sort. Clicking the same header cycles through ascending, descending, and no sort.',
      },
    },
  },
  render: args => {
    const [sortConfig, setSortConfig] = useState<{
      column: keyof typeof personalDetails[number] | null;
      direction: SortDirection;
    }>({
      column: null,
      direction: 'none',
    });

    const handleSort = (columnKey: string) => {
      setSortConfig(prev => {
        if (prev.column === columnKey) {
          const nextDirection: SortDirection =
            prev.direction === 'none' ? 'asc' : prev.direction === 'asc' ? 'desc' : 'none';
          return { column: columnKey, direction: nextDirection };
        }
        return { column: columnKey as keyof typeof personalDetails[number], direction: 'asc' };
      });
    };

    // Sort the data
    const sortedData = [...personalDetails].sort((a, b) => {
      if (!sortConfig.column || sortConfig.direction === 'none') return 0;

      const aValue = a[sortConfig.column];
      const bValue = b[sortConfig.column];

      if (aValue < bValue) return sortConfig.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });

    return (
      <Table {...args}>
        <TableHeader
          sortColumn={sortConfig.column}
          sortDirection={sortConfig.direction}
          onSort={handleSort}
        >
          <TableHeaderCell sortable sortKey="id">
            ID
          </TableHeaderCell>
          <TableHeaderCell sortable sortKey="firstName">
            First Name
          </TableHeaderCell>
          <TableHeaderCell sortable sortKey="lastName">
            Last Name
          </TableHeaderCell>
          <TableHeaderCell sortKey="email">
            Email
          </TableHeaderCell>
          <TableHeaderCell>
            Phone
          </TableHeaderCell>
          <TableHeaderCell sortable sortKey="city">
            City
          </TableHeaderCell>
        </TableHeader>
        <TableBody>
          {sortedData.slice(0, args.numberOfRows).map(person => (
            <TableRow key={person.id}>
              <TableCell>{person.id}</TableCell>
              <TableCell>{person.firstName}</TableCell>
              <TableCell>{person.lastName}</TableCell>
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

export const ContainerVariants: Story = {
  argTypes: {
    containerVariant: {
      table: {
        disable: true,
      },
    },
    numberOfRows: {
      table: {
        disable: true,
      },
    },
  },
  render: () => {
    const displayData = personalDetails.slice(0, 3);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
        <div>
          <h3 style={{ marginBottom: '1rem' }}>Subtle (default)</h3>
          <Table containerVariant="subtle">
            <TableHeader>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>First Name</TableHeaderCell>
              <TableHeaderCell>Last Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>City</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {displayData.map(person => (
                <TableRow key={person.id}>
                  <TableCell>{person.id}</TableCell>
                  <TableCell>{person.firstName}</TableCell>
                  <TableCell>{person.lastName}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>{person.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>Emphasis</h3>
          <Table containerVariant="emphasis">
            <TableHeader>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>First Name</TableHeaderCell>
              <TableHeaderCell>Last Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>City</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {displayData.map(person => (
                <TableRow key={person.id}>
                  <TableCell>{person.id}</TableCell>
                  <TableCell>{person.firstName}</TableCell>
                  <TableCell>{person.lastName}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>{person.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        <div>
          <h3 style={{ marginBottom: '1rem' }}>None</h3>
          <Table containerVariant="none">
            <TableHeader>
              <TableHeaderCell>ID</TableHeaderCell>
              <TableHeaderCell>First Name</TableHeaderCell>
              <TableHeaderCell>Last Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>City</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {displayData.map(person => (
                <TableRow key={person.id}>
                  <TableCell>{person.id}</TableCell>
                  <TableCell>{person.firstName}</TableCell>
                  <TableCell>{person.lastName}</TableCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>{person.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  },
};
