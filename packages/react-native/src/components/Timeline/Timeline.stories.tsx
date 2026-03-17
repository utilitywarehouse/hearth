import { Meta, StoryObj } from '@storybook/react-vite';
import { Timeline, TimelineItem } from '.';
import { VariantTitle } from '../../../docs/components';
import { Badge } from '../Badge';
import { BodyText } from '../BodyText';
import { Box } from '../Box';
import { Card } from '../Card';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / Timeline',
  component: Timeline,
  argTypes: {
    variant: {
      options: ['static', 'progress'],
      control: 'select',
      description: 'The timeline indicator style.',
    },
  },
  args: {
    variant: 'progress',
  },
} satisfies Meta<typeof Timeline>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    const isProgress = args.variant === 'progress';

    return (
      <Box style={{ width: 280 }}>
        <Timeline {...args}>
          <TimelineItem
            label="Order placed"
            helperText="We have received your request"
            state={isProgress ? 'complete' : undefined}
          />
          <TimelineItem
            label="Checking details"
            helperText="We are validating the information"
            state={isProgress ? 'complete' : undefined}
          />
          <TimelineItem
            label="Engineer booked"
            helperText="Your appointment has been reserved"
            state={isProgress ? 'active' : undefined}
          />
          <TimelineItem
            label="Service live"
            helperText="Everything is ready to go"
            state={isProgress ? 'incomplete' : undefined}
          />
        </Timeline>
      </Box>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Flex direction="column" spacing="xl" style={{ width: 320 }}>
      <VariantTitle title="Progress">
        <Timeline variant="progress">
          <TimelineItem label="Account created" helperText="Done" state="complete" />
          <TimelineItem label="Documents uploaded" helperText="Done" state="complete" />
          <TimelineItem label="Verification" helperText="In progress" state="active" />
          <TimelineItem label="Decision" helperText="Pending" state="incomplete" />
        </Timeline>
      </VariantTitle>
      <VariantTitle title="Static">
        <Timeline variant="static">
          <TimelineItem label="Collected" helperText="08:15" />
          <TimelineItem label="Sorted" helperText="10:40" />
          <TimelineItem label="Out for delivery" helperText="13:25" />
        </Timeline>
      </VariantTitle>
    </Flex>
  ),
};

export const WithCustomContent: Story = {
  render: () => (
    <Box style={{ width: 320 }}>
      <Timeline variant="progress">
        <TimelineItem
          label="Application started"
          helperText="We have saved your draft"
          state="complete"
        />
        <TimelineItem label="Additional information" helperText="Action needed" state="active">
          <Card variant="subtle" spacing="md">
            <Badge>Required</Badge>
            <BodyText size="sm">Upload proof of address to continue.</BodyText>
          </Card>
        </TimelineItem>
        <TimelineItem label="Review complete" helperText="Pending" state="incomplete" />
      </Timeline>
    </Box>
  ),
};
