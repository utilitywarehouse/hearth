import { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box';
import { Timeline } from '.';
import TimelineItem from './TimelineItem';

const meta: Meta<typeof TimelineItem> = {
  title: 'Stories / TimelineItem',
  component: TimelineItem,
};

export default meta;
type Story = StoryObj<typeof TimelineItem>;

export const Playground: Story = {
  args: {
    label: 'Engineer booked',
    helperText: 'Your appointment has been reserved',
    state: 'active',
  },
  render: args => (
    <Box style={{ width: 280 }}>
      <Timeline variant="progress">
        <TimelineItem label="Order placed" helperText="We have received your request" state="complete" />
        <TimelineItem {...args} />
        <TimelineItem label="Service live" helperText="Everything is ready to go" state="incomplete" />
      </Timeline>
    </Box>
  ),
};
