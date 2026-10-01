import type { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline } from './Timeline';
import { TimelineItem } from './TimelineItem';

const states = ['complete', 'active', 'incomplete'] as const;

const meta: Meta<typeof TimelineItem> = {
  title: 'Components / Timeline / TimelineItem',
  component: TimelineItem,
  argTypes: {
    state: {
      options: states,
      control: { type: 'radio' },
    },
  },
  args: {
    state: 'complete',
    label: 'Direct debit set up',
    helperText: '1 March 2026',
  },
};
export default meta;
type Story = StoryObj<typeof TimelineItem>;

/** Interactive sandbox — use the controls panel to explore all props. */
export const Playground: Story = {
  parameters: {
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: args => (
    <Timeline>
      <TimelineItem {...args} />
    </Timeline>
  ),
};

/**
 * Use `children` to add extra content beyond the label and helper text —
 * here, an amount alongside the schedule date.
 */
export const WithCustomContent: Story = {
  parameters: {
    controls: { disable: true },
    actions: { disable: true },
    interactions: { disable: true },
  },
  render: () => (
    <Timeline>
      <TimelineItem state="complete" label="First payment collected" helperText="1 April 2026">
        £45.00 collected
      </TimelineItem>
    </Timeline>
  ),
};
