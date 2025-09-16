import type { Meta, StoryObj } from '@storybook/react-vite';
import { Badge, Box, Flex } from '@utilitywarehouse/hearth-react';
import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const variants = ['solid', 'outline'] as const;
const colorSchemes = ['info', 'positive', 'danger', 'warning', 'functional'] as const;
const sizes = ['sm', 'md'] as const;

const meta: Meta<typeof Badge> = {
  title: 'Stories / Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component:
          'A `Badge` is a visual label or indicator used to convey status or highlight content. Badges are read-only status indicators or labels and are not interactive.',
      },
    },
  },
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { options: variants, control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    colorScheme: { options: colorSchemes, control: { type: 'radio' } },
    flatBase: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Badge',
    variant: 'solid',
    size: 'md',
    colorScheme: 'info',
    flatBase: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="row" gap="600">
        {sizes.map(size => (
          <Flex direction="row" gap="400">
            {variants.map(variant => (
              <Flex key={variant} gap="400" justifyContent="center" direction="column">
                {colorSchemes.map(colorScheme => (
                  <Flex key={colorScheme} direction="row" gap="200">
                    <Badge variant={variant} colorScheme={colorScheme} size={size}>
                      Badge
                    </Badge>
                    <Badge variant={variant} colorScheme={colorScheme} size={size} flatBase>
                      Badge
                    </Badge>
                  </Flex>
                ))}
              </Flex>
            ))}
          </Flex>
        ))}
      </Flex>
    );
  },
};

export const Playground: Story = {};

export const Variants: Story = {
  render: () => (
    <Flex gap="200">
      {variants.map(variant => (
        <Badge key={variant} variant={variant} textTransform="capitalize">
          {variant}
        </Badge>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="200">
      {sizes.map(size => (
        <Badge key={size} size={size}>
          {size} badge
        </Badge>
      ))}
    </Flex>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Flex gap="200">
      {colorSchemes.map(colorScheme => (
        <Badge key={colorScheme} colorScheme={colorScheme} textTransform="capitalize">
          {colorScheme}
        </Badge>
      ))}
    </Flex>
  ),
};

export const FlatBase: Story = {
  render: () => {
    return (
      <Box>
        <Flex justifyContent="end" paddingRight="300" width="400px">
          <Badge colorScheme="positive" variant="solid" flatBase>
            Multi SIM offer
          </Badge>
        </Flex>
        <Box
          width="400px"
          height="200px"
          backgroundColor="grey0"
          borderColor="green700"
          borderStyle="solid"
          borderWidth="2"
          borderRadius="sm"
        />
      </Box>
    );
  },
};

export const SurfaceColours: Story = {
  render: () => (
    <Flex width="600px">
      <Flex gap="200" direction="column" padding="200" backgroundColor="grey0">
        {colorSchemes.map(colorScheme => (
          <Badge
            key={colorScheme}
            variant="solid"
            colorScheme={colorScheme}
            textTransform="capitalize"
          >
            {colorScheme}
          </Badge>
        ))}
      </Flex>
      <Flex gap="200" direction="column" padding="200" backgroundColor="purple1000">
        {colorSchemes.map(colorScheme => (
          <Badge
            key={colorScheme}
            variant="solid"
            colorScheme={colorScheme}
            textTransform="capitalize"
          >
            {colorScheme}
          </Badge>
        ))}
      </Flex>
      <Flex gap="200" direction="column" padding="200" backgroundColor="grey0">
        {colorSchemes.map(colorScheme => (
          <Badge
            key={colorScheme}
            variant="outline"
            colorScheme={colorScheme}
            textTransform="capitalize"
          >
            {colorScheme}
          </Badge>
        ))}
      </Flex>
    </Flex>
  ),
};

export const Icons: Story = {
  render: () => (
    <Flex gap="200">
      <Badge colorScheme="positive">
        <TickSmallIcon />
        Success
      </Badge>
      <Badge colorScheme="danger">
        <CloseSmallIcon />
        Unsuccessful
      </Badge>
    </Flex>
  ),
};
