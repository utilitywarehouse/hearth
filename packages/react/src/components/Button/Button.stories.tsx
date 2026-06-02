import type { Meta, StoryObj } from '@storybook/react-vite';
import { Flex } from '../Flex/Flex';
import { Heading } from '../Heading/Heading';
import { TextInput } from '../TextInput/TextInput';
import { Button } from './Button';
import {
  ChevronRightSmallIcon,
  SettingsSmallIcon,
  TrashSmallIcon,
  UserSmallIcon,
} from '@utilitywarehouse/hearth-react-icons';

const sizes = ['md', 'sm'] as const;
const variants = ['solid', 'outline', 'ghost'] as const;
const solidColorSchemes = ['highlight', 'affirmative', 'destructive'] as const;
const otherColorSchemes = ['functional', 'affirmative', 'destructive'] as const;

const meta: Meta<typeof Button> = {
  title: 'Components / Button',
  component: Button,
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { control: { type: 'radio' }, options: ['emphasis', ...variants] },
    colorScheme: { options: ['highlight', ...otherColorSchemes], control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    loading: { control: { type: 'boolean' } },
    disabled: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Button',
    paddingNone: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Playground: Story = {
  args: {
    variant: 'solid',
    colorScheme: 'highlight',
  },
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
                <Button variant="emphasis" colorScheme="highlight" size={size}>
                  Button
                </Button>
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <Button disabled variant="emphasis" colorScheme="highlight" size={size}>
                  Button
                </Button>
              </Flex>
            ))}
          </Flex>
          <Flex gap="400" alignItems="center">
            {sizes.map(size => (
              <Flex key={size} gap="100">
                <Button loading variant="emphasis" colorScheme="highlight" size={size}>
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
  render: (args: { disabled?: boolean; loading?: boolean }) => {
    return (
      <Flex gap="200">
        <Button asChild>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>View UW services</a>
        </Button>
        <Button asChild loading>
          {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a href={args.disabled ? undefined : 'https://uw.co.uk/services'}>View UW services</a>
        </Button>
      </Flex>
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

export const HighlightColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <Button variant="emphasis" colorScheme="highlight">
        Emphasis
      </Button>
      <Button variant="solid" colorScheme="highlight">
        Solid
      </Button>
    </Flex>
  ),
};

export const FunctionalColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <Button variant="outline" colorScheme="functional">
        Outline
      </Button>
      <Button variant="ghost" colorScheme="functional">
        Ghost
      </Button>
    </Flex>
  ),
};

export const DestructiveColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <Button variant="solid" colorScheme="destructive">
        Solid
      </Button>
      <Button variant="outline" colorScheme="destructive">
        Outline
      </Button>
      <Button variant="ghost" colorScheme="destructive">
        Ghost
      </Button>
    </Flex>
  ),
};

export const AffirmativeColorScheme: Story = {
  render: () => (
    <Flex gap="400">
      <Button variant="solid" colorScheme="affirmative">
        Solid
      </Button>
      <Button variant="outline" colorScheme="affirmative">
        Outline
      </Button>
      <Button variant="ghost" colorScheme="affirmative">
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
    // @ts-expect-error: for illustration purposes only
    <Button variant="emphasis" colorScheme="grey">
      Invalid Button
    </Button>
  ),
};

export const WithIcons: Story = {
  render: args => {
    return (
      <Flex gap="200">
        <Button {...args} variant="solid" colorScheme="destructive">
          <TrashSmallIcon />
          Delete
        </Button>
        <Button {...args} variant="solid" colorScheme="highlight">
          Account
          <UserSmallIcon />
        </Button>
        <Button {...args} variant="outline" colorScheme="functional">
          <SettingsSmallIcon />
          Settings
        </Button>
      </Flex>
    );
  },
};

export const Inverted: Story = {
  render: () => (
    <Flex gap="400" backgroundColor="brand" padding="400">
      <Button variant="emphasis" inverted>
        Emphasis
      </Button>
      <Button variant="solid" colorScheme="highlight" inverted>
        Solid
      </Button>
      <Button variant="outline" colorScheme="functional" inverted>
        Outline
      </Button>
      <Button variant="ghost" colorScheme="functional" inverted>
        Ghost
      </Button>
    </Flex>
  ),
};

export const Loading: Story = {
  args: {
    loading: true,
  },
  render: (args: { disabled?: boolean; loading?: boolean }) => {
    return (
      <Flex gap="400" direction="column" alignItems="start">
        <Button loading={args.loading} variant="emphasis" colorScheme="highlight">
          This is a long button label
        </Button>
        <Button {...args} variant="solid" colorScheme="highlight">
          This is a long button label
        </Button>
        <Button {...args} variant="outline" colorScheme="functional">
          This is a long button label
        </Button>
        <Button {...args} variant="ghost" colorScheme="functional">
          This is a long button label
        </Button>
      </Flex>
    );
  },
};

export const PaddingNone: Story = {
  render: () => {
    return (
      <Flex direction="column" alignItems="start" gap="100" padding="200">
        <TextInput label="Postcode" required />
        <Button variant="ghost" colorScheme="functional" size="sm" paddingNone>
          Add address manually
        </Button>
      </Flex>
    );
  },
};
