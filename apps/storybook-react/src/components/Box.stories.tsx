import type { Meta, StoryObj } from '@storybook/react-vite';
import {
  Box,
  BoxProps,
  Flex,
  spaceTokens,
  colorValues,
  backgroundColorValues,
  borderColorValues,
} from '@utilitywarehouse/hearth-react';
import { useRef } from 'react';
import { Placeholder } from '../storybook-components/Placeholder';

const borderStyleValues = ['none', 'solid'] as const;
const borderWidthValues = ['0', '1', '2'] as const;
const borderRadiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;

const meta: Meta<typeof Box> = {
  title: 'Stories / Box',
  component: Box,
  parameters: {
    docs: {
      description: {
        component:
          '`Box` is a fundamental primitive, based on the `div` element, for creating layouts, styling content and as a building block for other elements.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    as: { options: ['div', 'span'], control: { type: 'radio' } },
    color: { options: colorValues, control: { type: 'select' } },
    backgroundColor: { options: backgroundColorValues, control: { type: 'select' } },
    padding: { options: spaceTokens, control: { type: 'select' } },
    paddingX: { options: spaceTokens, control: { type: 'select' } },
    paddingY: { options: spaceTokens, control: { type: 'select' } },
    paddingTop: { options: spaceTokens, control: { type: 'select' } },
    paddingRight: { options: spaceTokens, control: { type: 'select' } },
    paddingBottom: { options: spaceTokens, control: { type: 'select' } },
    paddingLeft: { options: spaceTokens, control: { type: 'select' } },
    margin: { options: spaceTokens, control: { type: 'select' } },
    marginX: { options: spaceTokens, control: { type: 'select' } },
    marginY: { options: spaceTokens, control: { type: 'select' } },
    marginTop: { options: spaceTokens, control: { type: 'select' } },
    marginRight: { options: spaceTokens, control: { type: 'select' } },
    marginBottom: { options: spaceTokens, control: { type: 'select' } },
    marginLeft: { options: spaceTokens, control: { type: 'select' } },
    width: { control: { type: 'text' } },
    minWidth: { control: { type: 'text' } },
    maxWidth: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    minHeight: { control: { type: 'text' } },
    maxHeight: { control: { type: 'text' } },
    borderColor: { options: borderColorValues, control: { type: 'select' } },
    borderStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderTopColor: { options: borderColorValues, control: { type: 'select' } },
    borderTopStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderTopWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderRightColor: { options: borderColorValues, control: { type: 'select' } },
    borderRightStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderRightWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderBottomColor: { options: borderColorValues, control: { type: 'select' } },
    borderBottomStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderBottomWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderLeftColor: { options: borderColorValues, control: { type: 'select' } },
    borderLeftStyle: { options: borderStyleValues, control: { type: 'select' } },
    borderLeftWidth: { options: borderWidthValues, control: { type: 'select' } },
    borderRadius: { options: borderRadiusValues, control: { type: 'select' } },
    borderRadiusTopLeftNone: { control: 'boolean' },
    borderRadiusTopRightNone: { control: 'boolean' },
    borderRadiusTopNone: { control: 'boolean' },
    borderRadiusBottomLeftNone: { control: 'boolean' },
    borderRadiusBottomRightNone: { control: 'boolean' },
    borderRadiusBottomNone: { control: 'boolean' },
    position: {
      options: ['static', 'relative', 'absolute', 'fixed', 'sticky'],
      control: { type: 'select' },
    },
    inset: { control: { type: 'number' } },
    top: { control: { type: 'number' } },
    right: { control: { type: 'number' } },
    bottom: { control: { type: 'number' } },
    left: { control: { type: 'number' } },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

export const Playground: Story = {
  render: args => <Box {...args} />,
  args: {
    height: '128px',
    width: '128px',
    padding: '400',
    children: 'Box',
    borderRadius: 'xs',
    borderWidth: '1',
    borderColor: 'subtle',
  },
};

export const ResponsiveProps: Story = {
  render: args => (
    <Box {...args}>
      <Placeholder />
    </Box>
  ),
  args: {
    asChild: true,
    children: 'Responsive props',
    padding: {
      mobile: '400',
      tablet: '200',
      desktop: '800',
      wide: '400',
    },
    width: {
      mobile: '400px',
      tablet: '600px',
      desktop: '800px',
      wide: '200px',
    },
    margin: {
      mobile: '600',
      tablet: '0',
      desktop: '300',
      wide: '500',
    },
  },
};

export const HideContent: Story = {
  name: 'Responsively hide content',
  render: () => (
    <Flex gap="300" direction="column">
      <Box
        borderColor="strong"
        borderStyle="solid"
        borderWidth="1"
        display={{ mobile: 'none', tablet: 'block' }}
        padding="300"
      >
        hidden on mobile screens
      </Box>
      <Box
        borderColor="strong"
        borderStyle="solid"
        borderWidth="1"
        display={{ mobile: 'block', tablet: 'none', desktop: 'block' }}
        padding="300"
      >
        hidden on tablet screens
      </Box>
      <Box
        borderColor="strong"
        borderStyle="solid"
        borderWidth="1"
        display={{ mobile: 'block', desktop: 'none' }}
        padding="300"
      >
        hidden on desktop screens
      </Box>
    </Flex>
  ),
};

type Props = React.ComponentPropsWithoutRef<'a'> & BoxProps;
const CustomAnchor = ({ onClick, href, ...props }: Props) => {
  const ref = useRef<HTMLAnchorElement>(null);
  return (
    <Box asChild {...props} padding="100" color="brand" style={{ textDecoration: 'underline' }}>
      <a onClick={onClick} href={href} ref={ref}>
        Custom Component
      </a>
    </Box>
  );
};

export const CustomAnchorStory: Story = {
  name: 'Custom Component',
  render: () => <CustomAnchor />,
};
