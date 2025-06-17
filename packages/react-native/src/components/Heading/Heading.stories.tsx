import { Meta, StoryObj } from '@storybook/react-vite';
import { Heading } from '.';
import { coloursAsArray } from '../../utils';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / Heading',
  component: Heading,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg', 'xl'],
      control: 'select',
      description: 'The size of the text.',
    },
    truncated: {
      type: 'boolean',
      control: 'boolean',
      description: 'Truncate the text.',
    },
    underline: {
      type: 'boolean',
      control: 'boolean',
      description: 'Underline the text.',
    },
    strikeThrough: {
      type: 'boolean',
      control: 'boolean',
      description: 'Strike through the text.',
    },
    color: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Color of the text. Use the color name from the theme.',
    },
    textDecorationLine: {
      options: ['none', 'underline', 'line-through'],
      control: 'select',
      description: 'Text decoration line.',
    },
    textDecorationColor: {
      options: coloursAsArray(),
      control: 'select',
      description: 'Color of the text decoration. Use the color name from the theme.',
    },
    textTransform: {
      options: ['none', 'uppercase', 'lowercase', 'capitalize'],
      control: 'select',
      description: 'Transform the text.',
    },
    textAlign: {
      options: ['auto', 'left', 'right', 'center', 'justify'],
      control: 'select',
      description: 'Align the text horizontally.',
    },
    textDecorationStyle: {
      options: ['solid', 'double', 'dotted', 'dashed'],
      control: 'select',
      description: 'Style of the text decoration.',
    },
    textAlignVertical: {
      options: ['auto', 'top', 'bottom', 'center'],
      control: 'select',
      description: 'Align the text vertically.',
    },
    userSelect: {
      options: ['auto', 'none', 'text', 'contain', 'all', 'all-scroll', 'auto', 'unset'],
      control: 'select',
      description: 'User select.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: "Hello there, I'm a heading!",
    size: 'md',
    truncated: false,
    underline: false,
    strikeThrough: false,
    color: 'grey1000',
    textDecorationColor: 'grey1000',
  },
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const KitchenSink: Story = {
  render: args => (
    <Box gap="200">
      <VariantTitle title="SM">
        <Heading {...args} size="sm">
          Hello there, I'm a heading!
        </Heading>
      </VariantTitle>
      <VariantTitle title="MD">
        <Heading {...args} size="md">
          Hello there, I'm a heading!
        </Heading>
      </VariantTitle>
      <VariantTitle title="LG">
        <Heading {...args} size="lg">
          Hello there, I'm a heading!
        </Heading>
      </VariantTitle>
      <VariantTitle title="XL">
        <Heading {...args} size="xl">
          Hello there, I'm a heading!
        </Heading>
      </VariantTitle>
    </Box>
  ),
};

export const Underline: Story = {
  args: {
    underline: true,
    children: 'Hello there, an underlined Heading!',
  },
};
