import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { BodyText } from '../BodyText/BodyText';
import { Badge } from '../Badge/Badge';
import { Card } from '../Card/Card';
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
      <TimelineItem state="complete" label="Plan starts" helperText="Today">
        <BodyText size="md" color="secondary">
          1 Jun 2025
        </BodyText>
      </TimelineItem>
      <TimelineItem
        state="incomplete"
        label="Plan health check"
        helperText="An automatic review 45 days after joining us to make sure your payments line up with how much energy you actually use."
      >
        <BodyText size="md" color="secondary">
          15 July 2025
        </BodyText>
      </TimelineItem>
      <TimelineItem
        state="incomplete"
        label="Annual plan review"
        helperText="We’ll review your full 12-month energy consumption to adjust your regular payments and get you closer to a zero balance."
      >
        <BodyText size="md" color="secondary">
          By May 2026
        </BodyText>
      </TimelineItem>
      <TimelineItem
        state="incomplete"
        label="Next 12-month cycle begins"
        helperText="Your refreshed plan kicks off for the year ahead, with your next automatic review scheduled for May 2027."
      >
        <BodyText size="md" color="secondary">
          1 Jun 2026
        </BodyText>
      </TimelineItem>
    </Timeline>
  ),
};

/**
 * Use `children` to render a `Card` alongside an item, for content that
 * needs its own visual grouping — such as an action the user needs to take.
 */
export const WithCard: Story = {
  args: { variant: 'progress' },
  render: args => (
    <Timeline {...args}>
      <TimelineItem
        state="complete"
        label="Application started"
        helperText="We have saved your draft"
      />
      <TimelineItem state="active" label="Additional information" helperText="Action needed">
        <Card variant="subtle" direction="column" gap="100">
          <Badge>Required</Badge>
          <BodyText size="sm">Upload proof of address to continue.</BodyText>
        </Card>
      </TimelineItem>
      <TimelineItem state="incomplete" label="Review complete" helperText="Pending" />
    </Timeline>
  ),
};

/**
 * `danglingRail` extends the final item's connector line beyond the list,
 * fading it to transparent, to suggest the timeline continues beyond what's
 * shown. It only applies to the `progress` variant, and only takes effect
 * when the final item's `state` is `incomplete`.
 */
export const DanglingRail: Story = {
  args: { variant: 'progress' },
  render: args => (
    <Timeline {...args} danglingRail>
      <TimelineItem state="complete" label="Direct debit set up" helperText="1 March 2026" />
      <TimelineItem state="active" label="First payment due" helperText="1 April 2026" />
      <TimelineItem state="incomplete" label="Ongoing payments" helperText="Monthly" />
    </Timeline>
  ),
};
