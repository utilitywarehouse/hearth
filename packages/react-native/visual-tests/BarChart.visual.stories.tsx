import type { Meta, StoryObj } from '@storybook/react-native';
import { BarChart } from '../src/components/BarChart';
import { VTGrid, VTRow } from './_support';

const data = [
  { label: 'Jun 25', tooltipLabel: 'June', value: 12.4 },
  { label: 'Jul 25', tooltipLabel: 'July', value: 14.9 },
  { label: 'Aug 25', tooltipLabel: 'August', value: 21.8 },
  { label: 'Sep 25', tooltipLabel: 'September', value: 8.2 },
];

const formatCurrency = (value: number) => `£${value % 1 === 0 ? value : value.toFixed(2)}`;

const meta = {
  title: 'Visual Tests/BarChart',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

export const Selected: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="Last bar selected">
        <BarChart
          dataId="visual-tests"
          data={data}
          height={160}
          yMax={24}
          formatYLabel={formatCurrency}
        />
      </VTRow>
      <VTRow label="No selection">
        <BarChart
          dataId="visual-tests"
          data={data}
          height={160}
          yMax={24}
          formatYLabel={formatCurrency}
          selectedIndex={null}
        />
      </VTRow>
    </VTGrid>
  ),
};

export const Scrolling: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="More bars than fit">
        <BarChart
          dataId="visual-tests"
          data={[
            ...data,
            { label: 'Oct 25', tooltipLabel: 'October', value: 16.1 },
            { label: 'Nov 25', tooltipLabel: 'November', value: 19.3 },
            { label: 'Dec 25', tooltipLabel: 'December', value: 22.7 },
            { label: 'Jan 26', tooltipLabel: 'January', value: 11.5 },
          ]}
          height={160}
          yMax={24}
          formatYLabel={formatCurrency}
          defaultSelectedIndex={7}
        />
      </VTRow>
    </VTGrid>
  ),
};

export const ScrollingStart: Story = {
  render: () => (
    <VTGrid>
      <VTRow label="First bar selected, scrolled to the newest bar">
        <BarChart
          dataId="visual-tests"
          data={[
            ...data,
            { label: 'Oct 25', tooltipLabel: 'October', value: 16.1 },
            { label: 'Nov 25', tooltipLabel: 'November', value: 19.3 },
            { label: 'Dec 25', tooltipLabel: 'December', value: 22.7 },
            { label: 'Jan 26', tooltipLabel: 'January', value: 11.5 },
          ]}
          height={160}
          yMax={24}
          formatYLabel={formatCurrency}
          defaultSelectedIndex={0}
        />
      </VTRow>
    </VTGrid>
  ),
};

export const SelectedDark: Story = {
  ...Selected,
  parameters: { colorMode: 'dark' },
};
