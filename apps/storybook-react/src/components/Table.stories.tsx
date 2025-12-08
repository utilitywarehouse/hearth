import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderCell,
  TableRow,
  TableCell,
  TablePagination,
  Flex,
} from '@utilitywarehouse/hearth-react';

const variants = [undefined, 'subtle', 'emphasis'] as const;

const meta: Meta<typeof Table> = {
  title: 'Stories / Table',
  component: Table,
  parameters: {
    docs: {
      description: {
        component:
          'Use a `Table` to arrange data in rows and columns. They are used to communicate relationships between content and to display references, comparisons, and choices.',
      },
    },
  },
  argTypes: {
    variant: { control: { type: 'radio' }, options: variants },
  },
  args: {
    variant: 'emphasis',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

export const Playground: Story = {
  render: args => {
    return (
      <Table {...args}>
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Phone</TableHeaderCell>
          <TableHeaderCell>City</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {personalDetails.slice(0, 3).map(person => (
            <TableRow key={person.id}>
              <TableCell>{person.name}</TableCell>
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

export const KitchenSink: Story = {
  render: () => {
    return (
      <Flex direction="column" gap="600">
        {variants.map(variant => (
          <Table key={variant} variant={variant}>
            <TableHeader>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Email</TableHeaderCell>
              <TableHeaderCell>Phone</TableHeaderCell>
              <TableHeaderCell>City</TableHeaderCell>
            </TableHeader>
            <TableBody>
              {personalDetails.slice(0, 5).map(person => (
                <TableRow key={person.id}>
                  <TableHeaderCell row>{person.name}</TableHeaderCell>
                  <TableCell>{person.email}</TableCell>
                  <TableCell>{person.phone}</TableCell>
                  <TableCell>{person.city}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      </Flex>
    );
  },
};

export const Pagination: Story = {
  render: args => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const totalPages = Math.ceil((5 * personalDetails.length) / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const currentData = [
      ...personalDetails
        .sort(() => 0.5 - Math.random())
        .map((p, i) => ({ ...p, id: p.id + i * 1000 })),
      ...personalDetails
        .sort(() => 0.5 - Math.random())
        .map((p, i) => ({ ...p, id: p.id + (i + 10) * 1000 })),
      ...personalDetails
        .sort(() => 0.5 - Math.random())
        .map((p, i) => ({ ...p, id: p.id + (i + 20) * 1000 })),
      ...personalDetails
        .sort(() => 0.5 - Math.random())
        .map((p, i) => ({ ...p, id: p.id + (i + 30) * 1000 })),
      ...personalDetails
        .sort(() => 0.5 - Math.random())
        .map((p, i) => ({ ...p, id: p.id + (i + 40) * 1000 })),
    ].slice(startIndex, endIndex);

    return (
      <Table
        {...args}
        pagination={
          <TablePagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        }
      >
        <TableHeader>
          <TableHeaderCell>Name</TableHeaderCell>
          <TableHeaderCell>Email</TableHeaderCell>
          <TableHeaderCell>Phone</TableHeaderCell>
          <TableHeaderCell>City</TableHeaderCell>
        </TableHeader>
        <TableBody>
          {currentData.map(person => (
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

const personalDetails = [
  {
    id: 1,
    name: 'Emma Wilson',
    email: 'emma.wilson@email.com',
    phone: '+44 7700 900001',
    city: 'London',
  },
  {
    id: 2,
    name: 'Oliver Brown',
    email: 'oliver.brown@email.com',
    phone: '+44 7700 900002',
    city: 'Manchester',
  },
  {
    id: 3,
    name: 'Ava Taylor',
    email: 'ava.taylor@email.com',
    phone: '+44 7700 900003',
    city: 'Birmingham',
  },
  {
    id: 4,
    name: 'Noah Davies',
    email: 'noah.davies@email.com',
    phone: '+44 7700 900004',
    city: 'Leeds',
  },
  {
    id: 5,
    name: 'Isla Evans',
    email: 'isla.evans@email.com',
    phone: '+44 7700 900005',
    city: 'Glasgow',
  },
  {
    id: 6,
    name: 'George Thomas',
    email: 'george.thomas@email.com',
    phone: '+44 7700 900006',
    city: 'Liverpool',
  },
  {
    id: 7,
    name: 'Amelia Roberts',
    email: 'amelia.roberts@email.com',
    phone: '+44 7700 900007',
    city: 'Bristol',
  },
  {
    id: 8,
    name: 'Harry Johnson',
    email: 'harry.johnson@email.com',
    phone: '+44 7700 900008',
    city: 'Sheffield',
  },
  {
    id: 9,
    name: 'Mia Walker',
    email: 'mia.walker@email.com',
    phone: '+44 7700 900009',
    city: 'Edinburgh',
  },
  {
    id: 10,
    name: 'Jack Wright',
    email: 'jack.wright@email.com',
    phone: '+44 7700 900010',
    city: 'Cardiff',
  },
];
