import { Meta, StoryObj } from '@storybook/react-vite';
import { ToggleButton, ToggleButtonText } from '.';

const meta = {
  title: 'Stories / ToggleButtonText',
  component: ToggleButtonText,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    children: {
      control: 'text',
      description: 'The text label.',
    },
    toggled: {
      type: 'boolean',
      control: 'boolean',
      description: 'Overrides the toggled state read from the parent ToggleButton.',
    },
  },
  args: {
    children: 'Press me',
  },
} satisfies Meta<typeof ToggleButtonText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <ToggleButton toggled>
      <ToggleButtonText {...args} />
    </ToggleButton>
  ),
};
