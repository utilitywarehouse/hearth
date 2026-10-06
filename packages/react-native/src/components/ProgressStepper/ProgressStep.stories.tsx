import { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex';
import { ProgressStepper } from '.';
import ProgressStep from './ProgressStep';

const meta: Meta<typeof ProgressStep> = {
  title: 'Stories / ProgressStep',
  component: ProgressStep,
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof ProgressStep>;

export const Playground: Story = {
  args: {
    id: '1',
    status: 'active',
  },
  render: args => (
    <Flex spacing="xl" direction="column" align="center" style={{ minWidth: 200 }}>
      <ProgressStepper>
        <ProgressStep id="1" status="complete" />
        <ProgressStep {...args} />
        <ProgressStep id="3" status="incomplete" />
      </ProgressStepper>
    </Flex>
  ),
};
