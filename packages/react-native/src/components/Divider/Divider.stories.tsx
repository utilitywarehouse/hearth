import { Meta, StoryObj } from '@storybook/react-vite';
import { Divider } from '.';
import { coloursAsArray } from '../../utils';
import { Box } from '../Box';

const meta = {
  title: 'Stories / Divider',
  component: Divider,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    orientation: {
      options: ['horizontal', 'vertical'],
      control: 'radio',
      description: 'Orientation of the divider',
    },
    color: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Color of the divider',
    },
    space: {
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: 'select',
      description: 'Space between the divider',
    },
    flexItem: {
      control: 'boolean',
      description:
        'If true, a vertical divider will have the correct height when used in flex container. (By default, a vertical divider will have a calculated height of 0px if it is the child of a flex container.)',
    },
    width: {
      control: 'number',
      description: 'Width of the divider',
    },
    height: {
      control: 'number',
      description: 'Height of the divider',
    },
  },
  args: {
    orientation: 'horizontal',
    flexItem: false,
  },
} satisfies Meta<typeof Divider>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => (
    <Box
      minWidth={args.orientation === 'horizontal' ? 200 : 1}
      minHeight={args.orientation === 'horizontal' ? 1 : 30}
    >
      <Divider {...args} />
    </Box>
  ),
};
