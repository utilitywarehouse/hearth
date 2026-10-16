import { Meta, StoryObj } from '@storybook/react-native';
import { type ComponentProps, type ReactElement, useState } from 'react';
import { expect, fn, userEvent, waitFor, within } from 'storybook/test';
import { BarChart } from '.';
import { Box } from '../Box';
import { Button } from '../Button';

const monthlyCashback = [
  { label: 'Jun 25', tooltipLabel: 'June', value: 12.4 },
  { label: 'Jul 25', tooltipLabel: 'July', value: 14.9 },
  { label: 'Aug 25', tooltipLabel: 'August', value: 21.8 },
  { label: 'Sep 25', tooltipLabel: 'September', value: 8.2 },
];

const manyMonths = [
  { label: 'Jan 25', tooltipLabel: 'January', value: 9.6 },
  { label: 'Feb 25', tooltipLabel: 'February', value: 11.2 },
  { label: 'Mar 25', tooltipLabel: 'March', value: 7.4 },
  { label: 'Apr 25', tooltipLabel: 'April', value: 15.8 },
  { label: 'May 25', tooltipLabel: 'May', value: 18.3 },
  { label: 'Jun 25', tooltipLabel: 'June', value: 12.4 },
  { label: 'Jul 25', tooltipLabel: 'July', value: 14.9 },
  { label: 'Aug 25', tooltipLabel: 'August', value: 21.8 },
  { label: 'Sep 25', tooltipLabel: 'September', value: 8.2 },
  { label: 'Oct 25', tooltipLabel: 'October', value: 16.1 },
  { label: 'Nov 25', tooltipLabel: 'November', value: 19.3 },
  { label: 'Dec 25', tooltipLabel: 'December', value: 22.7 },
];

const formatCurrency = (value: number) => `£${value % 1 === 0 ? value : value.toFixed(2)}`;

const MOBILE_WIDTH = 390;

const MobileWidth = ({ Story }: { Story: () => ReactElement }) => (
  <Box style={{ width: MOBILE_WIDTH }}>
    <Story />
  </Box>
);

const meta: Meta<typeof BarChart> = {
  title: 'Stories / BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    height: {
      control: { type: 'number' },
      description: 'Height of the plot area in dp.',
    },
    barWidth: {
      control: { type: 'number' },
      description: 'Width of each bar in dp. The chart scrolls when the bars do not fit.',
    },
    yTicks: {
      control: { type: 'number' },
      description: 'Number of y-axis labels and gridlines, including the baseline.',
    },
    yMax: {
      control: { type: 'number' },
      description: 'The value at the top of the y-axis.',
    },
  },
  args: {
    data: monthlyCashback,
    dataId: 'monthly-cashback',
    height: 240,
    barWidth: 48,
    yTicks: 6,
    yMax: 24,
    formatYLabel: formatCurrency,
  },
  decorators: [Story => <MobileWidth Story={Story} />],
} satisfies Meta<typeof BarChart>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const selected = canvas.getByRole('radio', { name: 'September, £8.20' });
    await expect(selected).toHaveAttribute('aria-checked', 'true');
  },
};

export const SelectBar: Story = {
  args: {
    onSelectedChange: fn(),
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByRole('radio', { name: 'August, £21.80' }));

    await expect(args.onSelectedChange).toHaveBeenCalledWith(2, monthlyCashback[2]);
    await expect(canvas.getByRole('radio', { name: 'August, £21.80' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    await expect(canvas.getByRole('radio', { name: 'September, £8.20' })).toHaveAttribute(
      'aria-checked',
      'false'
    );
  },
};

export const NoSelection: Story = {
  args: {
    selectedIndex: null,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: 'September, £8.20' })).toHaveAttribute(
      'aria-checked',
      'false'
    );
  },
};

const ControlledExample = (args: ComponentProps<typeof BarChart>) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);

  return (
    <Box gap="200">
      <BarChart {...args} selectedIndex={selectedIndex} onSelectedChange={setSelectedIndex} />
      <Button variant="outline" colorScheme="functional" onPress={() => setSelectedIndex(null)}>
        Clear selection
      </Button>
    </Box>
  );
};

export const Controlled: Story = {
  render: args => <ControlledExample {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: 'June, £12.40' })).toHaveAttribute(
      'aria-checked',
      'true'
    );

    await userEvent.click(canvas.getByRole('radio', { name: 'July, £14.90' }));
    await expect(canvas.getByRole('radio', { name: 'July, £14.90' })).toHaveAttribute(
      'aria-checked',
      'true'
    );

    await userEvent.click(canvas.getByRole('button', { name: 'Clear selection' }));
    await expect(canvas.getByRole('radio', { name: 'July, £14.90' })).toHaveAttribute(
      'aria-checked',
      'false'
    );
  },
};

export const Scrolling: Story = {
  args: {
    data: manyMonths,
    dataId: 'many-months',
  },
};

export const AutomaticYAxis: Story = {
  args: {
    yMax: undefined,
    formatYLabel: undefined,
  },
};

export const DefaultSelectedIndex: Story = {
  args: {
    defaultSelectedIndex: 1,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: 'July, £14.90' })).toHaveAttribute(
      'aria-checked',
      'true'
    );

    await userEvent.click(canvas.getByRole('radio', { name: 'June, £12.40' }));
    await expect(canvas.getByRole('radio', { name: 'June, £12.40' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
    await expect(canvas.getByRole('radio', { name: 'July, £14.90' })).toHaveAttribute(
      'aria-checked',
      'false'
    );
  },
};

export const OutOfRangeSelection: Story = {
  args: {
    selectedIndex: 99,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: 'September, £8.20' })).toHaveAttribute(
      'aria-checked',
      'true'
    );
  },
};

const findScrollContainer = (element: HTMLElement): HTMLElement | null => {
  let node: HTMLElement | null = element.parentElement;
  while (node && node.scrollWidth <= node.clientWidth) {
    node = node.parentElement;
  }
  return node;
};

const scrollTolerance = 2;

const isScrolledToEnd = (container: HTMLElement) =>
  Math.abs(container.scrollLeft + container.clientWidth - container.scrollWidth) <= scrollTolerance;

const DataChangeExample = (args: ComponentProps<typeof BarChart>) => {
  const [data, setData] = useState(monthlyCashback);

  return (
    <Box gap="200">
      <BarChart {...args} data={data} dataId={data === manyMonths ? 'year' : 'quarter'} />
      <Button variant="outline" colorScheme="functional" onPress={() => setData(manyMonths)}>
        Show a year
      </Button>
      <Button variant="outline" colorScheme="functional" onPress={() => setData(monthlyCashback)}>
        Show a quarter
      </Button>
    </Box>
  );
};

export const DataChange: Story = {
  render: args => <DataChangeExample {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByRole('radio', { name: 'September, £8.20' })).toHaveAttribute(
      'aria-checked',
      'true'
    );

    // More bars than fit: the chart scrolls to the newest one and selects it, even after the user
    // picked a bar in the previous data.
    await userEvent.click(canvas.getByRole('radio', { name: 'July, £14.90' }));
    await userEvent.click(canvas.getByRole('button', { name: 'Show a year' }));
    const december = await canvas.findByRole('radio', { name: 'December, £22.70' });
    await expect(december).toHaveAttribute('aria-checked', 'true');
    await waitFor(async () => {
      const container = findScrollContainer(december);
      await expect(container).not.toBeNull();
      await expect(isScrolledToEnd(container!)).toBe(true);
    });

    // Fewer bars again: the selection follows the data and the chart is back at the start.
    await userEvent.click(canvas.getByRole('button', { name: 'Show a quarter' }));
    const september = await canvas.findByRole('radio', { name: 'September, £8.20' });
    await expect(september).toHaveAttribute('aria-checked', 'true');
    await expect(canvas.queryByRole('radio', { name: 'December, £22.70' })).toBeNull();
    await waitFor(async () => {
      await expect(findScrollContainer(september)?.scrollLeft ?? 0).toBe(0);
    });
  },
};

const cashback2024 = manyMonths.map(datum => ({
  ...datum,
  label: datum.label.replace('25', '24'),
  value: datum.value + 1,
}));

const DataChangeSameLengthExample = (args: ComponentProps<typeof BarChart>) => {
  const [year, setYear] = useState<'2024' | '2025'>('2025');
  const [bump, setBump] = useState(0);
  const base = year === '2025' ? manyMonths : cashback2024;
  const data = base.map(datum => ({ ...datum, value: datum.value + bump }));

  return (
    <Box gap="200">
      <BarChart {...args} data={data} dataId={year} />
      <Button variant="outline" colorScheme="functional" onPress={() => setYear('2024')}>
        Show 2024
      </Button>
      <Button variant="outline" colorScheme="functional" onPress={() => setYear('2025')}>
        Show 2025
      </Button>
      <Button variant="outline" colorScheme="functional" onPress={() => setBump(1)}>
        Update values
      </Button>
    </Box>
  );
};

export const DataChangeSameLength: Story = {
  render: args => <DataChangeSameLengthExample {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const december = await canvas.findByRole('radio', { name: 'December, £22.70' });
    await waitFor(async () => {
      await expect(isScrolledToEnd(findScrollContainer(december)!)).toBe(true);
    });

    // A new `dataId` with the same number of bars scrolls to the newest bar again.
    findScrollContainer(december)!.scrollLeft = 0;
    await userEvent.click(canvas.getByRole('button', { name: 'Show 2024' }));
    const december2024 = await canvas.findByRole('radio', { name: 'December, £23.70' });
    await waitFor(async () => {
      await expect(isScrolledToEnd(findScrollContainer(december2024)!)).toBe(true);
    });

    // The same `dataId` with new values leaves the scroll position alone.
    findScrollContainer(december2024)!.scrollLeft = 0;
    await userEvent.click(canvas.getByRole('button', { name: 'Update values' }));
    await canvas.findByRole('radio', { name: 'December, £24.70' });
    await expect(findScrollContainer(december2024)!.scrollLeft).toBe(0);
  },
};

const smallValues = [
  { label: 'Jun 25', tooltipLabel: 'June', value: 2.4 },
  { label: 'Jul 25', tooltipLabel: 'July', value: 5.1 },
  { label: 'Aug 25', tooltipLabel: 'August', value: 3.8 },
  { label: 'Sep 25', tooltipLabel: 'September', value: 7.2 },
];

const largeValues = [
  { label: 'Jun 25', tooltipLabel: 'June', value: 820 },
  { label: 'Jul 25', tooltipLabel: 'July', value: 1450 },
  { label: 'Aug 25', tooltipLabel: 'August', value: 2300 },
  { label: 'Sep 25', tooltipLabel: 'September', value: 4900 },
];

const YAxisRescaleExample = (args: ComponentProps<typeof BarChart>) => {
  const [isLarge, setIsLarge] = useState(false);

  return (
    <Box gap="200">
      <BarChart
        {...args}
        data={isLarge ? largeValues : smallValues}
        dataId={isLarge ? 'large-values' : 'small-values'}
      />
      <Button variant="outline" colorScheme="functional" onPress={() => setIsLarge(false)}>
        Show small values
      </Button>
      <Button variant="outline" colorScheme="functional" onPress={() => setIsLarge(true)}>
        Show large values
      </Button>
    </Box>
  );
};

export const YAxisRescale: Story = {
  args: {
    yMax: undefined,
  },
  render: args => <YAxisRescaleExample {...args} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText('£10')).toBeVisible();
    await expect(canvas.queryByText('£5000')).toBeNull();

    // The axis rescales to the new maximum and the newest bar is selected again.
    await userEvent.click(canvas.getByRole('button', { name: 'Show large values' }));
    await expect(await canvas.findByText('£5000')).toBeVisible();
    await expect(canvas.queryByText('£10')).toBeNull();
    await expect(canvas.getByRole('radio', { name: 'September, £4900' })).toHaveAttribute(
      'aria-checked',
      'true'
    );

    await userEvent.click(canvas.getByRole('button', { name: 'Show small values' }));
    await expect(await canvas.findByText('£10')).toBeVisible();
    await expect(canvas.queryByText('£5000')).toBeNull();
  },
};
