import { Meta, StoryObj } from '@storybook/react-native';
import { type ComponentProps, type ReactElement, useState } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
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
  },
};

export const AutomaticYAxis: Story = {
  args: {
    yMax: undefined,
    formatYLabel: undefined,
  },
};
