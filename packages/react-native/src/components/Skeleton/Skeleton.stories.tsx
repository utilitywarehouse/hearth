import { Meta, StoryObj } from '@storybook/react-vite';
import { Skeleton } from '.';
import { coloursAsArray } from '../../utils';

const meta = {
  title: 'Stories / Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    backgroundColor: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Background color of the skeleton. Use the color name from the theme.',
    },
    width: { control: 'number' },
    height: { control: 'number' },
    borderRadius: { control: 'number' },
  },
  args: {
    backgroundColor: undefined,
    width: 200,
    height: 16,
  },
} satisfies Meta<typeof Skeleton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => <Skeleton {...args} />,
};
