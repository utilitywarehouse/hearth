import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Button, Flex, Heading, BodyText } from '@utilitywarehouse/hearth-react';
import {
  ChevronRightSmallIcon,
  SettingsSmallIcon,
  TrashSmallIcon,
  UserSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const sizes = ['md', 'sm'] as const;
const variants = ['solid', 'outline', 'ghost'] as const;
const solidColorSchemes = ['yellow', 'green', 'red'] as const;
const otherColorSchemes = ['grey', 'green', 'red'] as const;

const meta: Meta<typeof Button> = {
  title: 'Stories / Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: 'Trigger an action or event, such as submitting a form or displaying a dialog.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { control: { type: 'radio' }, options: ['emphasis', ...variants] },
    colorScheme: { options: ['yellow', ...otherColorSchemes], control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    loading: { control: { type: 'boolean' } },
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

export const Playground: Story = {};

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="600">
        <Flex gap="200" direction="column">
          <Heading>Emphasis</Heading>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <Button variant="emphasis" colorScheme="yellow" size={size}>
                  Button
                </Button>
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <Button disabled variant="emphasis" colorScheme="yellow" size={size}>
                  Button
                </Button>
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <Button loading variant="emphasis" colorScheme="yellow" size={size}>
                  Button
                </Button>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex gap="200" direction="column">
          <Heading>Solid</Heading>
          <Flex gap="400" alignItems="center">
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
          <Flex gap="400" alignItems="center">
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
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                {solidColorSchemes.map(colorScheme => (
                  <Button
                    loading
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
            <Flex gap="400" alignItems="center">
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
            <Flex gap="400" alignItems="center">
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
            <Flex gap="400" alignItems="center">
              {sizes.map(size => (
                <Flex key={size} gap="100">
                  {otherColorSchemes.map(colorScheme => (
                    <Button
                      loading
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
      <Button asChild>
        <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>View UW services</a>
      </Button>
    );
  },
};

export const ButtonVariants: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="200" alignItems="start">
        <Button variant="emphasis">Emphasis Button</Button>

        <Flex gap="100">
          {solidColorSchemes.map(colorScheme => (
            <Button key={colorScheme} variant="solid" colorScheme={colorScheme}>
              Solid Button
            </Button>
          ))}
        </Flex>

        <Flex gap="100">
          {otherColorSchemes.map(colorScheme => (
            <Button key={colorScheme} variant="outline" colorScheme={colorScheme}>
              Outline Button
            </Button>
          ))}
        </Flex>
        <Flex gap="100">
          {otherColorSchemes.map(colorScheme => (
            <Button key={colorScheme} variant="ghost" colorScheme={colorScheme}>
              Ghost Button
            </Button>
          ))}
        </Flex>
      </Flex>
    );
  },
};

export const FullWidth: Story = {
  render: () => (
    <Flex direction="column" gap="200">
      <Flex direction="column" gap="100">
        <Button>
          Full width button with icon
          <ChevronRightSmallIcon />
        </Button>
        <Button variant="emphasis">Full width emphasis button</Button>
      </Flex>
      <Flex direction="column" alignItems={{ mobile: 'stretch', desktop: 'start' }}>
        <Button>Responsive full width button</Button>
      </Flex>
    </Flex>
  ),
};

export const YellowColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <Button variant="emphasis" colorScheme="yellow">
        Emphasis
      </Button>
      <Button variant="solid" colorScheme="yellow">
        Solid
      </Button>
    </Flex>
  ),
};

export const GreyColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <Button variant="outline" colorScheme="grey">
        Outline
      </Button>
      <Button variant="ghost" colorScheme="grey">
        Ghost
      </Button>
    </Flex>
  ),
};

export const RedColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <Button variant="solid" colorScheme="red">
        Solid
      </Button>
      <Button variant="outline" colorScheme="red">
        Outline
      </Button>
      <Button variant="ghost" colorScheme="red">
        Ghost
      </Button>
    </Flex>
  ),
};

export const GreenColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <Button variant="solid" colorScheme="green">
        Solid
      </Button>
      <Button variant="outline" colorScheme="green">
        Outline
      </Button>
      <Button variant="ghost" colorScheme="green">
        Ghost
      </Button>
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="400" direction="column">
      <Flex gap="400">
        <Button variant="emphasis" size="md">
          Emphasis
        </Button>
        <Button variant="solid" size="md">
          Solid
        </Button>
        <Button variant="outline" size="md">
          Outline
        </Button>
        <Button variant="ghost" size="md">
          Ghost
        </Button>
      </Flex>
      <Flex gap="400">
        <Button variant="emphasis" size="sm">
          Emphasis
        </Button>
        <Button variant="solid" size="sm">
          Solid
        </Button>
        <Button variant="outline" size="sm">
          Outline
        </Button>
        <Button variant="ghost" size="sm">
          Ghost
        </Button>
      </Flex>
    </Flex>
  ),
};

export const DeadPropCombinations: Story = {
  render: () => (
    // @ts-ignore: for illustration purposes only
    <Button variant="emphasis" colorScheme="grey">
      Invalid Button
    </Button>
  ),
};

export const WithIcons: Story = {
  render: args => {
    return (
      <Flex gap="200">
        <Button {...args} variant="solid" colorScheme="red">
          <TrashSmallIcon />
          Delete
        </Button>
        <Button {...args} variant="solid" colorScheme="yellow">
          Account
          <UserSmallIcon />
        </Button>
        <Button {...args} variant="outline" colorScheme="grey">
          <SettingsSmallIcon />
          Settings
        </Button>
      </Flex>
    );
  },
};

export const Inverted: Story = {
  render: () => (
    <Flex gap="400" backgroundColor="purple700" padding="400">
      <Button variant="emphasis" inverted>
        Emphasis
      </Button>
      <Button variant="solid" colorScheme="yellow" inverted>
        Solid
      </Button>
      <Button variant="outline" colorScheme="grey" inverted>
        Outline
      </Button>
      <Button variant="ghost" colorScheme="grey" inverted>
        Ghost
      </Button>
    </Flex>
  ),
};

export const Loading: Story = {
  render: args => (
    <Flex gap="400" direction="column">
      <Button {...args} variant="emphasis" colorScheme="yellow">
        This is a long button label
      </Button>
      <Button {...args} variant="solid" colorScheme="yellow">
        This is a long button label
      </Button>
      <Button {...args} variant="outline" colorScheme="grey">
        This is a long button label
      </Button>
      <Button {...args} variant="ghost" colorScheme="grey">
        This is a long button label
      </Button>
    </Flex>
  ),
  args: {
    loading: false,
  },
};
