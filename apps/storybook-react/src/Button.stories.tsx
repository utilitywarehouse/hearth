import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, Flex, Heading } from '@utilitywarehouse/hearth-react';

const sizes = ['md', 'sm'] as const;
const variants = ['solid', 'outline', 'ghost'] as const;
const solidColorSchemes = ['yellow', 'green', 'red'] as const;
const otherColorSchemes = ['grey', 'green', 'red'] as const;

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Button> = {
  title: 'Stories / Button',
  component: Button,
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { control: { type: 'radio' }, options: variants },
    colorScheme: { options: ['yellow', ...otherColorSchemes], control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Button',
    onClick: fn(),
    variant: 'solid',
    colorScheme: 'yellow',
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Workshop: Story = {};

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="600">
        <Flex gap="16px" direction="column">
          <Heading>Solid</Heading>
          <Flex gap="400" align="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                {solidColorSchemes.map(colorScheme => (
                  <Button key={colorScheme} variant="solid" colorScheme={colorScheme} size={size}>
                    Button
                  </Button>
                ))}
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" align="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                {solidColorSchemes.map(colorScheme => (
                  <Button
                    disabled
                    key={colorScheme}
                    variant="solid"
                    colorScheme={colorScheme}
                    size={size}
                  >
                    Button
                  </Button>
                ))}
              </Flex>
            ))}
          </Flex>
        </Flex>
        {(['outline', 'ghost'] as const).map(variant => (
          <Flex key={variant} gap="200" direction="column">
            <Heading style={{ textTransform: 'capitalize' }}>{variant}</Heading>
            <Flex gap="400" align="center">
              {sizes.map(size => (
                <Flex key={size} gap="100">
                  {otherColorSchemes.map(colorScheme => (
                    <Button
                      key={colorScheme}
                      variant={variant}
                      colorScheme={colorScheme}
                      size={size}
                    >
                      Button
                    </Button>
                  ))}
                </Flex>
              ))}
            </Flex>
            <Flex gap="400" align="center">
              {sizes.map(size => (
                <Flex key={size} gap="100">
                  {otherColorSchemes.map(colorScheme => (
                    <Button
                      disabled
                      key={colorScheme}
                      variant={variant}
                      colorScheme={colorScheme}
                      size={size}
                    >
                      Button
                    </Button>
                  ))}
                </Flex>
              ))}
            </Flex>
          </Flex>
        ))}
      </Flex>
    );
  },
};

export const ResponsiveSize: Story = {
  args: {
    children: 'Responsive size button',
    size: {
      mobile: 'md',
      tablet: 'sm',
      desktop: 'md',
      wide: 'sm',
    },
  },
};

export const AsLink: Story = {
  render: args => {
    return (
      <Button {...args} asChild>
        <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>View UW services</a>
      </Button>
    );
  },
};
