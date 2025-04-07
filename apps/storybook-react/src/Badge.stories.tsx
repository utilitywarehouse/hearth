import type { Meta, StoryObj } from '@storybook/react';
import { Badge, Box, Flex } from '@utilitywarehouse/hearth-react';
import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const variants = ['solid', 'outline'] as const;
const colorSchemes = ['blue', 'green', 'red', 'orange', 'grey'] as const;

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
    colorScheme: { options: colorSchemes, control: { type: 'radio' } },
    flatBase: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Badge',
    variant: 'solid',
    colorScheme: 'blue',
    flatBase: false,
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="row" gap="400">
        {variants.map(variant => (
          <Flex key={variant} gap="400" justify="center" direction="column">
            {colorSchemes.map(colorScheme => (
              <Flex key={colorScheme} direction="row" gap="200">
                <Badge variant={variant} colorScheme={colorScheme}>
                  Badge
                </Badge>
                <Badge variant={variant} colorScheme={colorScheme} flatBase>
                  Badge
                </Badge>
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
          {variant} badge
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
          {colorScheme} badge
        </Badge>
      ))}
    </Flex>
  ),
};

export const FlatBase: Story = {
  render: () => {
    return (
      <Box>
        <Flex justify="end" paddingRight="300" width="400px">
          <Badge colorScheme="green" variant="solid" flatBase>
            Multi SIM offer
          </Badge>
        </Flex>
        <Box
          width="400px"
          height="200px"
          backgroundColor="white"
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
      <Flex gap="200" direction="column" padding="200" backgroundColor="white">
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
      <Flex gap="200" direction="column" padding="200" backgroundColor="darkPurple">
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
      <Flex gap="200" direction="column" padding="200" backgroundColor="white">
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
      <Badge colorScheme="green">
        <TickSmallIcon />
        Success
      </Badge>
      <Badge colorScheme="red">
        <CloseSmallIcon />
        Unsuccessful
      </Badge>
    </Flex>
  ),
};
