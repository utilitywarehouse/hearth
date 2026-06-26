import type { Meta, StoryObj } from '@storybook/react-vite';
import { spaceTokens } from '../../tokens/space';
import { Flex } from '../Flex/Flex';
import { Box } from './Box';
import { BoxProps } from './Box.props';
import { useRef } from 'react';
import { Placeholder } from '../../../docs/storybook-components/Placeholder';

const borderStyleValues = ['none', 'solid'] as const;
const borderWidthValues = ['0', '1', '2'] as const;
const borderRadiusValues = ['none', 'xs', 'sm', 'md', 'lg', 'xl', 'full'] as const;
const borderColorValues = ['strong', 'subtle'] as const;
const colorValues = ['primary', 'secondary', 'brand', 'affirmative', 'inverted'] as const;
const backgroundColorValues = ['primary', 'secondary', 'brand'] as const;

const meta: Meta<typeof Box> = {
  title: 'Layout / Box',
  component: Box,
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
  args: {
    height: '128px',
    width: '128px',
    padding: '400',
    children: 'Box',
    borderRadius: 'xs',
    borderWidth: '1',
    borderColor: 'subtle',
  },
  render: args => <Box {...args} />,
};

export const BorderColorVarProps: Story = {
  args: {
    paddingY: '200',
    borderWidth: '1',
    borderColor: 'var(--h-color-purple-800)',
    borderTopColor: 'var(--h-color-purple-800)',
    borderRightColor: 'var(--h-color-purple-800)',
    borderBottomColor: 'var(--h-color-purple-800)',
    borderLeftColor: 'var(--h-color-purple-800)',
  },
  render: args => <Box {...args} />,
};

export const ResponsiveProps: Story = {
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
  render: args => (
    <Box {...args}>
      <Placeholder />
    </Box>
  ),
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
        display={{ mobile: 'block', desktop: 'none', wide: 'block' }}
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
