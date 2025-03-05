import type { Meta, StoryObj } from '@storybook/react';
import { Box, BoxProps, Flex, spaceTokens } from '@utilitywarehouse/hearth-react';
import { useRef } from 'react';

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
    padding: { options: spaceTokens, control: { type: 'select' } },
    paddingInline: { options: spaceTokens, control: { type: 'select' } },
    paddingBlock: { options: spaceTokens, control: { type: 'select' } },
    paddingTop: { options: spaceTokens, control: { type: 'select' } },
    paddingRight: { options: spaceTokens, control: { type: 'select' } },
    paddingBottom: { options: spaceTokens, control: { type: 'select' } },
    paddingLeft: { options: spaceTokens, control: { type: 'select' } },
    width: { control: { type: 'text' } },
    minWidth: { control: { type: 'text' } },
    maxWidth: { control: { type: 'text' } },
    height: { control: { type: 'text' } },
    minHeight: { control: { type: 'text' } },
    maxHeight: { control: { type: 'text' } },
    color: { control: { type: 'text' } },
    backgroundColor: { control: { type: 'text' } },
  },
} satisfies Meta<typeof Box>;

export default meta;
type Story = StoryObj<typeof Box>;

export const Playground: Story = {
  args: {
    className: 'hearth-sb-Placeholder',
    padding: '600',
    width: 'fit-content',
  },
};

export const ResponsiveProps: Story = {
  args: {
    className: 'hearth-sb-Placeholder',
    children: 'Responsive props',
    padding: {
      mobile: '40px',
      tablet: '200',
      desktop: '8rem',
      wide: '400',
    },
    width: {
      mobile: '400px',
      tablet: '600px',
      desktop: '800px',
      wide: '200px',
    },
    margin: {
      mobile: '16px',
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
        className="hearth-sb-Placeholder"
        display={{ mobile: 'none', tablet: 'block' }}
        padding="300"
      >
        hidden on mobile screens
      </Box>
      <Box
        className="hearth-sb-Placeholder"
        display={{ mobile: 'block', tablet: 'none', desktop: 'block' }}
        padding="300"
      >
        hidden on tablet screens
      </Box>
      <Box
        className="hearth-sb-Placeholder"
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
    <Box
      asChild
      {...props}
      padding="100"
      color="rebeccapurple"
      style={{ textDecoration: 'underline' }}
    >
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
