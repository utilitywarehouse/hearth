import type { Meta, StoryObj } from '@storybook/react-native';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { View } from 'react-native';
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHeaderCell,
  TableRow,
} from '../src/components/Table';
import { UnstyledIconButton } from '../src/components/UnstyledIconButton';

const meta = {
  title: 'Visual Tests/Table',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

// Table has no sorted prop: sorting is composed by the consumer with a trailing
// sort button and pre-ordered rows, so the story does the same.
const SortButton = ({ inverted }: { inverted: boolean }) => (
  <UnstyledIconButton
    accessibilityLabel="Sort"
    icon={ExpandSmallIcon}
    inverted={inverted}
    onPress={noop}
    size="sm"
  />
);

const rows = [
  { id: '1', name: 'Priya Shah', plan: 'Energy', status: 'Active' },
  { id: '2', name: 'Alex Morgan', plan: 'Fibre', status: 'Pending' },
  { id: '3', name: 'Chris Brown', plan: 'Mobile', status: 'Paused' },
  { id: '4', name: 'Nina Evans', plan: 'Home', status: 'Closed' },
];

export const Variants: Story = {
  render: () => {
    return (
      <View>
        <Table container="subtle">
          <TableHeader color="purple">
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Plan</TableHeaderCell>
            <TableHeaderCell trailingContent={<SortButton inverted />}>Status</TableHeaderCell>
          </TableHeader>
          <TableBody>
            {rows.map(row => (
              <TableRow key={row.id}>
                <TableHeaderCell row>{row.name}</TableHeaderCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <View style={{ height: 16 }} />
        <Table container="none">
          <TableHeader color="white">
            <TableHeaderCell>Name</TableHeaderCell>
            <TableHeaderCell>Plan</TableHeaderCell>
            <TableHeaderCell trailingContent={<SortButton inverted={false} />}>
              Status
            </TableHeaderCell>
          </TableHeader>
          <TableBody>
            {rows.slice(0, 2).map(row => (
              <TableRow key={row.id}>
                <TableHeaderCell row>{row.name}</TableHeaderCell>
                <TableCell>{row.plan}</TableCell>
                <TableCell>{row.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </View>
    );
  },
};
