import { Meta, StoryObj } from '@storybook/react-vite';
import { BodyText } from '.';
import { VariantTitle } from '../../../docs/components';
import { coloursAsArray } from '../../utils';
import { textColorKeys } from '../../utils/coloursAsArray';
import { Box } from '../Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / BodyText',
  component: BodyText,
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
    weight: {
      options: ['regular', 'semibold', 'bold'],
      control: 'select',
      description: 'The weight of the text.',
    },
    italic: {
      type: 'boolean',
      control: 'boolean',
      description: 'Italicize the text.',
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
      options: textColorKeys,
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
    children: "Hello there, I'm some body text!",
    size: 'md',
    truncated: false,
    weight: 'regular',
    italic: false,
    underline: false,
    strikeThrough: false,
    color: undefined,
    textDecorationColor: 'grey1000',
  },
} satisfies Meta<typeof BodyText>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {};

export const KitchenSink: Story = {
  render: args => (
    <Box gap="200">
      <VariantTitle title="SM">
        <BodyText {...args} size="sm">
          Hello there, I'm some body text!
        </BodyText>
      </VariantTitle>
      <VariantTitle title="MD">
        <BodyText {...args} size="md">
          Hello there, I'm some body text!
        </BodyText>
      </VariantTitle>
      <VariantTitle title="LG">
        <BodyText {...args} size="lg">
          Hello there, I'm some body text!
        </BodyText>
      </VariantTitle>
      <VariantTitle title="XL">
        <BodyText {...args} size="xl">
          Hello there, I'm some body text!
        </BodyText>
      </VariantTitle>
    </Box>
  ),
};

export const SemiBold: Story = {
  args: {
    weight: 'semibold',
    children: "Hello there, I'm some semi bold body text!",
  },
};

export const Underline: Story = {
  args: {
    underline: true,
    children: "Hello there, I'm some underlined body text!",
  },
};
