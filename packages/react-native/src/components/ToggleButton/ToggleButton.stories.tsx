import { ToggleButton } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';

const meta = {
  title: 'Stories / ToggleButton',
  component: ToggleButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    text: {
      type: 'string',
      control: 'text',
      description: 'The text of the button.',
    },
    toggled: {
      type: 'boolean',
      control: 'boolean',
      description: 'Whether the button is toggled or not.',
    },
  },
  args: {
    text: 'Press me',
    toggled: false,
  },
} satisfies Meta<typeof ToggleButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    return <ToggleButton {...args} />;
  },
};
