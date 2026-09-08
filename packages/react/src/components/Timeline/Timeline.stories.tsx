import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { DetailText } from '../DetailText/DetailText';
import { Timeline } from './Timeline';
import { TimelineItem } from './TimelineItem';

const variants = ['static', 'progress'] as const;

const meta: Meta<typeof Timeline> = {
  title: 'Components / Timeline',
  component: Timeline,
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'radio' },
    },
  },
  args: {
    variant: 'static',
  },
};
export default meta;
type Story = StoryObj<typeof Timeline>;

export const KitchenSink: Story = {
  tags: ['!manifest'],
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => (
    <Flex direction="column" gap="400">
      {variants.map(variant => (
        <Timeline key={variant} variant={variant}>
          <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026" />
          <TimelineItem state="active" label="First payment due" helperText="1 April 2026" />
          <TimelineItem state="incomplete" label="Final payment due" helperText="1 June 2026" />
        </Timeline>
      ))}
    </Flex>
  ),
};

export const Playground: Story = {
  render: args => (
    <Timeline {...args}>
      <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026" />
      <TimelineItem state="complete" label="First payment collected" helperText="1 April 2026" />
      <TimelineItem state="active" label="Second payment due" helperText="1 June 2026" />
      <TimelineItem state="incomplete" label="Final payment due" helperText="1 July 2026" />
    </Timeline>
  ),
};

export const Static: Story = {
  args: { variant: 'static' },
  render: args => (
    <Timeline {...args}>
      <TimelineItem state="complete" label="Order placed" helperText="12 January 2026" />
      <TimelineItem state="complete" label="Order dispatched" helperText="13 January 2026" />
      <TimelineItem
        state="incomplete"
        label="Order delivered"
        helperText="Estimated 15 January 2026"
      />
    </Timeline>
  ),
};

export const Progress: Story = {
  args: { variant: 'progress' },
  render: args => (
    <Timeline {...args}>
      <TimelineItem state="complete" label="Application submitted" helperText="12 January 2026" />
      <TimelineItem state="complete" label="Documents verified" helperText="14 January 2026" />
      <TimelineItem state="incomplete" label="Final approval" />
    </Timeline>
  ),
};

/**
 * A realistic budget plan schedule, mixing `helperText` with `children` for
 * additional per-item content such as an amount.
 */
export const BudgetPlanSchedule: Story = {
  args: { variant: 'progress' },
  render: args => (
    <Timeline {...args}>
      <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026">
        <DetailText>£45.00 collected</DetailText>
      </TimelineItem>
      <TimelineItem state="complete" label="First payment collected" helperText="1 April 2026">
        <DetailText>£45.00 collected</DetailText>
      </TimelineItem>
      <TimelineItem state="active" label="Second payment due" helperText="1 June 2026">
        <DetailText>£45.00 due</DetailText>
      </TimelineItem>
      <TimelineItem state="incomplete" label="Final payment due" helperText="1 July 2026">
        <DetailText>£45.00 due</DetailText>
      </TimelineItem>
    </Timeline>
  ),
};
