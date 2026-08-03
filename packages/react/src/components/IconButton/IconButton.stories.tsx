import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { IconButton } from './IconButton';
import { AddMediumIcon, AddSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const sizes = ['md', 'sm'] as const;
const variants = ['solid', 'outline', 'ghost'] as const;
const solidColorSchemes = ['highlight', 'affirmative', 'destructive'] as const;
const otherColorSchemes = ['functional', 'affirmative', 'destructive'] as const;

const meta: Meta<typeof IconButton> = {
  title: 'Components / IconButton',
  component: IconButton,
  argTypes: {
    variant: { control: { type: 'radio' }, options: ['emphasis', ...variants] },
    colorScheme: { options: ['highlight', ...otherColorSchemes], control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    disabled: { control: { type: 'boolean' } },
    loading: { control: { type: 'boolean' } },
  },
  args: {
    variant: 'solid',
    colorScheme: 'highlight',
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof IconButton>;

export const Playground: Story = {
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
      <Flex direction="column" gap="600">
        <Flex gap="200" direction="column">
          <Heading>Emphasis</Heading>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <IconButton variant="emphasis" colorScheme="highlight" size={size} label="add">
                  <AddMediumIcon />
                </IconButton>
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <IconButton
                  disabled
                  variant="emphasis"
                  colorScheme="highlight"
                  size={size}
                  label="add"
                >
                  <AddMediumIcon />
                </IconButton>
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <IconButton
                  loading
                  variant="emphasis"
                  colorScheme="highlight"
                  size={size}
                  label="add"
                >
                  <AddMediumIcon />
                </IconButton>
              </Flex>
            ))}
          </Flex>
        </Flex>
        <Flex gap="200" direction="column">
          <Heading style={{ textTransform: 'capitalize' }}>Solid</Heading>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                {solidColorSchemes.map(colorScheme => (
                  <IconButton
                    key={colorScheme}
                    variant="solid"
                    colorScheme={colorScheme}
                    size={size}
                    label="add"
                  >
                    <AddMediumIcon />
                  </IconButton>
                ))}
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                {solidColorSchemes.map(colorScheme => (
                  <IconButton
                    disabled
                    key={colorScheme}
                    variant="solid"
                    colorScheme={colorScheme}
                    size={size}
                    label="add"
                  >
                    <AddMediumIcon />
                  </IconButton>
                ))}
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                {solidColorSchemes.map(colorScheme => (
                  <IconButton
                    loading
                    key={colorScheme}
                    variant="solid"
                    colorScheme={colorScheme}
                    size={size}
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
          <Flex key={variant} gap="200" direction="column">
            <Heading style={{ textTransform: 'capitalize' }}>{variant}</Heading>
            <Flex gap="400" alignItems="center">
              {sizes.map(size => (
                <Flex key={size} gap="100">
                  {otherColorSchemes.map(colorScheme => (
                    <IconButton
                      key={colorScheme}
                      variant={variant}
                      colorScheme={colorScheme}
                      size={size}
                      label="add"
                    >
                      <AddMediumIcon />
                    </IconButton>
                  ))}
                </Flex>
              ))}
            </Flex>
            <Flex gap="400" alignItems="center">
              {sizes.map(size => (
                <Flex key={size} gap="100">
                  {otherColorSchemes.map(colorScheme => (
                    <IconButton
                      disabled
                      key={colorScheme}
                      variant={variant}
                      colorScheme={colorScheme}
                      size={size}
                      label="add"
                    >
                      <AddMediumIcon />
                    </IconButton>
                  ))}
                </Flex>
              ))}
            </Flex>
            <Flex gap="400" alignItems="center">
              {sizes.map(size => (
                <Flex key={size} gap="100">
                  {otherColorSchemes.map(colorScheme => (
                    <IconButton
                      loading
                      key={colorScheme}
                      variant={variant}
                      colorScheme={colorScheme}
                      size={size}
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
  render: (args: { disabled?: boolean; loading?: boolean }) => {
    return (
      <Flex gap="200">
        <IconButton {...args} asChild label="add">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
            <AddMediumIcon />
          </a>
        </IconButton>
        <IconButton {...args} asChild loading label="add">
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>
            <AddMediumIcon />
          </a>
        </IconButton>
      </Flex>
    );
  },
};

export const Variants: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="emphasis" colorScheme="highlight" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="solid" colorScheme="highlight" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="outline" colorScheme="functional" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="functional" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const HighlightColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="emphasis" colorScheme="highlight" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="solid" colorScheme="highlight" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const FunctionalColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="outline" colorScheme="functional" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="functional" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const DestructiveColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="solid" colorScheme="destructive" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="outline" colorScheme="destructive" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="destructive" label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};

export const AffirmativeColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <IconButton variant="solid" colorScheme="affirmative" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="outline" colorScheme="affirmative" label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="affirmative" label="add">
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
  render: args => (
    <IconButton {...args} size={{ mobile: 'sm', desktop: 'md' }} label="add">
      <Box asChild display={{ mobile: 'none', desktop: 'block' }}>
        <AddMediumIcon />
      </Box>
      <Box asChild display={{ desktop: 'none' }}>
        <AddSmallIcon />
      </Box>
    </IconButton>
  ),
};

export const Inverted: Story = {
  render: () => (
    <Flex gap="400" backgroundColor="brand" padding="400">
      <IconButton variant="emphasis" inverted label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="solid" colorScheme="highlight" inverted label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="outline" colorScheme="functional" inverted label="add">
        <AddMediumIcon />
      </IconButton>
      <IconButton variant="ghost" colorScheme="functional" inverted label="add">
        <AddMediumIcon />
      </IconButton>
    </Flex>
  ),
};
