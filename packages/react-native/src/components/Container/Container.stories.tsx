import { Meta, StoryObj } from '@storybook/react-vite';
import { Container } from '.';
import { lightTheme } from '../../core/themes';
import { useTheme } from '../../hooks';
import { BodyText } from '../BodyText';
import { Box } from '../Box';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / Container',
  component: Container,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    padding: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The padding of the container.',
    },
    p: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The padding of the container.',
    },
    paddingHorizontal: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The horizontal padding of the container.',
    },
    px: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The horizontal padding of the container.',
    },
    paddingVertical: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The vertical padding of the container.',
    },
    py: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The vertical padding of the container.',
    },
    paddingTop: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The top padding of the container.',
    },
    pt: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The top padding of the container.',
    },
    paddingBottom: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The bottom padding of the container.',
    },
    pb: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The bottom padding of the container.',
    },
    paddingLeft: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The left padding of the container.',
    },
    pl: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The left padding of the container.',
    },
    paddingRight: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The right padding of the container.',
    },
    pr: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The right padding of the container.',
    },
    margin: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The margin of the container.',
    },
    m: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The margin of the container.',
    },
    marginHorizontal: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The horizontal margin of the container.',
    },
    mx: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The horizontal margin of the container.',
    },
    marginVertical: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The vertical margin of the container.',
    },
    my: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The vertical margin of the container.',
    },
    marginTop: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The top margin of the container.',
    },
    mt: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The top margin of the container.',
    },
    marginBottom: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The bottom margin of the container.',
    },
    mb: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The bottom margin of the container.',
    },
    marginLeft: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The left margin of the container.',
    },
    ml: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The left margin of the container.',
    },
    marginRight: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The right margin of the container.',
    },
    mr: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The right margin of the container.',
    },
    spacing: {
      options: ['none', '2xs', 'xs', 'sm', 'md', 'lg', 'xl', '2xl'],
      control: 'radio',
      description: 'The spacing between child elements (gap).',
    },
    gap: {
      options: Object.keys(lightTheme.space),
      control: 'select',
      description: 'The space between child elements.',
    },
    backgroundColor: {
      options: ['brand', 'primary', 'secondary', 'transparent'],
      control: 'select',
      description: 'The background color of the container.',
    },
    bg: {
      options: ['brand', 'primary', 'secondary', 'transparent'],
      control: 'select',
      description: 'The background color of the container.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    space: 'md',
  },
} satisfies Meta<typeof Container>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    const { color } = useTheme();
    return (
      <Box backgroundColor={color.red['100']}>
        <Container {...args} backgroundColor="secondary">
          <Box bg={color.blue['400']} p="200" borderRadius="md">
            <BodyText>Container content 1</BodyText>
          </Box>
          <Box bg={color.purple['400']} p="200" borderRadius="md">
            <BodyText>Container content 2</BodyText>
          </Box>
          <Box bg={color.piggyPink['400']} p="200" borderRadius="md">
            <BodyText>Container content 3</BodyText>
          </Box>
        </Container>
      </Box>
    );
  },
};

export const WithPadding: Story = {
  args: {
    padding: '300',
  },
  render: args => {
    const { color } = useTheme();
    return (
      <Box backgroundColor={color.red['100']}>
        <Container {...args} backgroundColor="secondary">
          <Box bg={color.blue['400']} p="200" borderRadius="md">
            <BodyText>Container with padding</BodyText>
          </Box>
        </Container>
      </Box>
    );
  },
};

export const WithMargin: Story = {
  args: {
    margin: '300',
  },
  render: args => {
    const { color } = useTheme();
    return (
      <Box backgroundColor={color.red['100']}>
        <Container {...args} backgroundColor="secondary">
          <Box bg={color.blue['400']} p="200" borderRadius="md">
            <BodyText>Container with margin</BodyText>
          </Box>
        </Container>
      </Box>
    );
  },
};

export const WithCustomSpacing: Story = {
  args: {
    space: 'xl',
    paddingHorizontal: '200',
    paddingVertical: '300',
  },
  render: args => {
    const { color } = useTheme();
    return (
      <Box backgroundColor={color.red['100']}>
        <Container {...args} backgroundColor="secondary">
          <Box bg={color.blue['400']} p="200" borderRadius="md">
            <BodyText>Item 1</BodyText>
          </Box>
          <Box bg={color.purple['400']} p="200" borderRadius="md">
            <BodyText>Item 2</BodyText>
          </Box>
          <Box bg={color.piggyPink['400']} p="200" borderRadius="md">
            <BodyText>Item 3</BodyText>
          </Box>
          <Box bg={color.orange['400']} p="200" borderRadius="md">
            <BodyText>Item 4</BodyText>
          </Box>
        </Container>
      </Box>
    );
  },
};

export const LayoutTokens: Story = {
  render: () => {
    const { color } = useTheme();
    return (
      <Box backgroundColor={color.red['100']}>
        <Container backgroundColor="secondary">
          <Box bg={color.blue['200']} p="200" borderRadius="md">
            <BodyText>
              This Container uses the responsive layout tokens from the design system. It will
              automatically adjust margin and padding based on the current breakpoint.
            </BodyText>
          </Box>
        </Container>
      </Box>
    );
  },
};
