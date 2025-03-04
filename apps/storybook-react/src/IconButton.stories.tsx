import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Box, Flex, Heading, IconButton } from '@utilitywarehouse/hearth-react';
import { AddMediumIcon, AddSmallIcon } from '@utilitywarehouse/react-icons';

const sizes = ['md', 'sm'] as const;
const variants = ['solid', 'outline', 'ghost'] as const;
const solidColorSchemes = ['yellow', 'green', 'red'] as const;
const otherColorSchemes = ['grey', 'green', 'red'] as const;

const meta: Meta<typeof IconButton> = {
  title: 'Stories / IconButton',
  component: IconButton,
  parameters: {
    docs: {
      description: {
        component:
          'Icon Buttons are used to trigger an action on a page or to complete tasks in other components. Use Icon Buttons when you want to display an action quickly and visually, and when space is limited.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { control: { type: 'radio' }, options: ['emphasis', ...variants] },
    colorScheme: { options: ['yellow', ...otherColorSchemes], control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    onClick: fn(),
    variant: 'solid',
    colorScheme: 'yellow',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Workshop: Story = {
  render: args => (
    <IconButton {...args}>
      <AddMediumIcon />
    </IconButton>
  ),
};

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="48px">
        <Flex gap="200" direction="column">
          <Heading>Emphasis</Heading>
          <Flex gap="400" align="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <IconButton variant="emphasis" colorScheme="yellow" size={size} label="add">
                  <AddMediumIcon />
                </IconButton>
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" align="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <IconButton
                  disabled
                  variant="emphasis"
                  colorScheme="yellow"
                  size={size}
                  label="add"
                >
                  <AddMediumIcon />
                </IconButton>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex gap="16px" direction="column">
          <Heading style={{ textTransform: 'capitalize' }}>Solid</Heading>
          <Flex gap="32px" align="center">
            {sizes.map(size => (
              <Flex key={size} gap="8px">
                {solidColorSchemes.map(colorScheme => (
                  <IconButton
                    key={colorScheme}
                    variant="solid"
                    colorScheme={colorScheme}
                    size={size}
                    onClick={fn}
                    label="add"
                  >
                    <AddMediumIcon />
                  </IconButton>
                ))}
              </Flex>
            ))}
          </Flex>
          <Flex gap="32px" align="center">
            {sizes.map(size => (
              <Flex key={size} gap="8px">
                {solidColorSchemes.map(colorScheme => (
                  <IconButton
                    disabled
                    key={colorScheme}
                    variant="solid"
                    colorScheme={colorScheme}
                    size={size}
                    onClick={fn}
                    label="add"
                  >
                    <AddMediumIcon />
                  </IconButton>
                ))}
              </Flex>
            ))}
          </Flex>
        </Flex>
        {(['outline', 'ghost'] as const).map(variant => (
          <Flex key={variant} gap="16px" direction="column">
            <Heading style={{ textTransform: 'capitalize' }}>{variant}</Heading>
            <Flex gap="32px" align="center">
              {sizes.map(size => (
                <Flex key={size} gap="8px">
                  {otherColorSchemes.map(colorScheme => (
                    <IconButton
                      key={colorScheme}
                      variant={variant}
                      colorScheme={colorScheme}
                      size={size}
                      onClick={fn}
                      label="add"
                    >
                      <AddMediumIcon />
                    </IconButton>
                  ))}
                </Flex>
              ))}
            </Flex>
            <Flex gap="32px" align="center">
              {sizes.map(size => (
                <Flex key={size} gap="8px">
                  {otherColorSchemes.map(colorScheme => (
                    <IconButton
                      disabled
                      key={colorScheme}
                      variant={variant}
                      colorScheme={colorScheme}
                      size={size}
                      onClick={fn}
                      label="add"
                    >
                      <AddMediumIcon />
                    </IconButton>
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

export const AsLink: Story = {
  render: args => {
    return (
      <IconButton {...args} asChild>
        <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
          <AddMediumIcon />
        </a>
      </IconButton>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="emphasis" colorScheme="yellow" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="solid" colorScheme="yellow" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="outline" colorScheme="grey" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="grey" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const YellowColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="emphasis" colorScheme="yellow" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="solid" colorScheme="yellow" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const GreyColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="outline" colorScheme="grey" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="grey" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const RedColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="solid" colorScheme="red" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="outline" colorScheme="red" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="red" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const GreenColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="solid" colorScheme="green" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="outline" colorScheme="green" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="green" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="400" direction="column">
      <Flex gap="400">
        <IconButton variant="emphasis" size="md" label="add">
          <AddMediumIcon />
        </IconButton>
        <IconButton variant="solid" size="md" label="add">
          <AddMediumIcon />
        </IconButton>
        <IconButton variant="outline" size="md" label="add">
          <AddMediumIcon />
        </IconButton>
        <IconButton variant="ghost" size="md" label="add">
          <AddMediumIcon />
        </IconButton>
      </Flex>
      <Flex gap="400">
        <IconButton variant="emphasis" size="sm" label="add">
          <AddMediumIcon />
        </IconButton>
        <IconButton variant="solid" size="sm" label="add">
          <AddMediumIcon />
        </IconButton>
        <IconButton variant="outline" size="sm" label="add">
          <AddMediumIcon />
        </IconButton>
        <IconButton variant="ghost" size="sm" label="add">
          <AddMediumIcon />
        </IconButton>
      </Flex>
    </Flex>
  ),
};

export const ResponsiveSize: Story = {
  render: () => (
    <IconButton size={{ mobile: 'sm', desktop: 'md' }} label="add">
      <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
        <AddMediumIcon />
      </Box>
      <Box asChild display={{ desktop: 'none' }}>
        <AddSmallIcon />
      </Box>
    </IconButton>
  ),
};
