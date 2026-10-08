import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, fn, userEvent, within } from 'storybook/test';
import { useMemo, useState } from 'react';
import { Flex } from '../Flex/Flex';
import { Table } from './Table';
import { TableBody } from './TableBody';
import { TableCell } from './TableCell';
import { TableHeader } from './TableHeader';
import { TableHeaderCell } from './TableHeaderCell';
import { TablePagination } from './TablePagination';
import { TableRow } from './TableRow';
import seedrandom from 'seedrandom';
import { Card } from '../Card/Card';

const variants = [undefined, 'subtle', 'emphasis'] as const;

const meta: Meta<typeof Table> = {
  title: 'Components / Table',
  component: Table,
  argTypes: {
    variant: { control: { type: 'radio' }, options: variants },
  },
  args: {
    variant: 'emphasis',
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

/** Visual matrix of Table variants. */
export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
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

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
  },
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
  play: async ({ canvasElement }) => {
    const table = within(canvasElement).getByRole('table');

    await expect(
      within(table)
        .getAllByRole('columnheader')
        .map(cell => cell.textContent)
    ).toEqual(['Name', 'Email', 'Phone', 'City']);
    await expect(within(table).getAllByRole('row')).toHaveLength(4);
  },
};

/** Nest a Table inside a Card to group it with related content. */
export const InsideCard: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => {
    return (
      <Card colorScheme="neutralStrong" variant="subtle" paddingNone>
        <Table>
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
      </Card>
    );
  },
};

// **NOTE** If this seems overengineered for generating paginated data, it's
// because it probably is! I've been using this story to explore and improve my
// usage of AI tools, so please forgive any excesses in complexity. Though it
// did start from a real need to fix instability in Chromatic tests, caused by
// the use of Math.random() in data shuffling.

/**
 * A hook that takes a small array and creates a larger, predictably shuffled,
 * and paginated dataset for use in environments like Chromatic.
 * @template T - The type of the data object, must contain an `id`.
 * @param {T[]} data - The base array of items to multiply and shuffle.
 * @param {number} multiplier - How many times to duplicate the base set.
 * @param {string} seed - The string used to anchor the randomness (e.g., 'hearth').
 * @param {number} currentPage - The current active page (1-indexed).
 * @param {number} itemsPerPage - Number of items to return per page.
 * @returns {{ pageData: T[], totalItems: number }} A stable, shuffled, and paginated subset with total count.
 */
function usePaginatedSeededData<T extends { id: string | number }>(
  data: Array<T>,
  multiplier: number,
  seed: string,
  currentPage: number,
  itemsPerPage: number
): { pageData: Array<T>; totalItems: number } {
  const shuffledData = useMemo(() => {
    if (!data.length) return [];

    const rng = seedrandom(seed);

    const shuffle = (arr: Array<T>): Array<T> => {
      const result = [...arr];
      for (let i = result.length - 1; i > 0; i--) {
        const j = Math.floor(rng() * (i + 1));
        [result[i], result[j]] = [result[j]!, result[i]!];
      }
      return result;
    };

    return shuffle(data);
  }, [data, seed]);

  const totalItems = shuffledData.length * multiplier;

  const pageData = useMemo(() => {
    if (!shuffledData.length) return [];

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const result: Array<T> = [];

    for (let i = startIndex; i < endIndex && i < totalItems; i++) {
      const cycleIndex = i % shuffledData.length;
      const multiplierIndex = Math.floor(i / shuffledData.length);
      const item = shuffledData[cycleIndex]!;

      result.push({
        ...item,
        id: `seeded-${seed}-${multiplierIndex}-${item.id}`,
      });
    }

    return result;
  }, [shuffledData, currentPage, itemsPerPage, totalItems, seed]);

  return { pageData, totalItems };
}

/** Pass a TablePagination element to the pagination prop to paginate long datasets. */
export const Pagination: Story = {
  parameters: {
    chromatic: { disableSnapshot: false },
    controls: { disable: true },
    actions: { disable: true },
  },
  render: args => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;
    const multiplier = 5;

    const { pageData, totalItems } = usePaginatedSeededData(
      personalDetails,
      multiplier,
      'hearth',
      currentPage,
      itemsPerPage
    );

    const totalPages = Math.ceil(totalItems / itemsPerPage);

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
          {pageData.map(person => (
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
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const rowHeaders = () => canvas.getAllByRole('rowheader').map(cell => cell.textContent);
    const firstPage = rowHeaders();

    await expect(firstPage).toHaveLength(5);

    await userEvent.click(canvas.getByRole('button', { name: 'Go to next page' }));
    await expect(rowHeaders()).not.toEqual(firstPage);

    await userEvent.click(canvas.getByRole('button', { name: 'Go to previous page' }));
    await expect(rowHeaders()).toEqual(firstPage);
    (document.activeElement as HTMLElement | null)?.blur();
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

const defaultTableRef = fn<(element: HTMLTableElement | null) => void>();
const cardTableRef = fn<(element: HTMLTableElement | null) => void>();

/** Test-only: a ref reaches the table element with and without a card variant. */
export const RefForwarding: Story = {
  tags: ['!dev', '!autodocs', '!manifest'],
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
  },
  render: () => (
    <Flex direction="column" gap="400">
      {[defaultTableRef, cardTableRef].map((tableRef, index) => (
        <Table key={index} ref={tableRef} variant={index === 0 ? undefined : 'subtle'}>
          <TableHeader>
            <TableHeaderCell>Heading</TableHeaderCell>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableHeaderCell row>Row heading</TableHeaderCell>
            </TableRow>
          </TableBody>
        </Table>
      ))}
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const [defaultTable, cardTable] = within(canvasElement).getAllByRole('table');

    await expect(defaultTableRef).toHaveBeenCalledWith(defaultTable);
    await expect(cardTableRef).toHaveBeenCalledWith(cardTable);
    await expect(within(defaultTable!).getByRole('rowheader')).toHaveAttribute('scope', 'row');
  },
};
