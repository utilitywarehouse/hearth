import { MobileSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleButton, ToggleButtonIcon } from '.';

const meta = {
  title: 'Stories / ToggleButtonIcon',
  component: ToggleButtonIcon,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    toggled: {
      type: 'boolean',
      control: 'boolean',
      description: 'Overrides the toggled state read from the parent ToggleButton.',
    },
  },
  args: {
    as: MobileSmallIcon,
  },
} satisfies Meta<typeof ToggleButtonIcon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <ToggleButton toggled>
      <ToggleButtonIcon {...args} />
    </ToggleButton>
  ),
};
