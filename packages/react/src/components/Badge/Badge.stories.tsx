import type { Meta, StoryObj } from '@storybook/react-vite';
import { Box } from '../Box/Box';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Badge } from './Badge';
import { CloseSmallIcon, TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const variants = ['subtle', 'emphasis', 'outline'] as const;
const subtleOnlyColorSchemes = ['highlight'] as const;
const nonOutlineColorSchemes = [
  'energy',
  'mobile',
  'broadband',
  'insurance',
  'cashback',
  'pig',
] as const;
const allVariantColorSchemes = ['info', 'positive', 'danger', 'warning', 'functional'] as const;
const colorSchemes = [
  ...allVariantColorSchemes,
  ...nonOutlineColorSchemes,
  ...subtleOnlyColorSchemes,
] as const;
const sizes = ['sm', 'md'] as const;

const meta: Meta<typeof Badge> = {
  title: 'Components / Badge',
  component: Badge,
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { options: variants, control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    colorScheme: { options: colorSchemes, control: { type: 'select' } },
    flatBase: { control: { type: 'boolean' } },
  },
  args: {
    children: 'Badge',
    variant: 'subtle',
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
      <Flex direction="column" gap="500">
        {sizes.map(size => (
          <Flex key={size} direction="column" gap="200" alignItems="start">
            {variants.map(variant => (
              <Flex key={variant} gap="200" justifyContent="center" direction="row">
                {allVariantColorSchemes.map(colorScheme => (
                  <Badge
                    key={`${size}${variant}${colorScheme}`}
                    variant={variant}
                    colorScheme={colorScheme}
                    size={size}
                  >
                    Badge
                  </Badge>
                ))}
                {variant !== 'outline'
                  ? nonOutlineColorSchemes.map(colorScheme => (
                      <Badge
                        key={`${size}${variant}${colorScheme}`}
                        variant={variant}
                        colorScheme={colorScheme}
                        size={size}
                      >
                        Badge
                      </Badge>
                    ))
                  : null}
                {variant === 'subtle'
                  ? subtleOnlyColorSchemes.map(colorScheme => (
                      <Badge
                        key={`${size}${variant}${colorScheme}`}
                        variant={variant}
                        colorScheme={colorScheme}
                        size={size}
                      >
                        Badge
                      </Badge>
                    ))
                  : null}
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
      <Badge variant="subtle">Subtle</Badge>
      <Badge variant="emphasis">Emphasis</Badge>
      <Badge variant="outline">Outline</Badge>
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="200" alignItems="center">
      <Badge size="sm">Small</Badge>
      <Badge size="md">Medium</Badge>
      <Badge size={{ mobile: 'sm', desktop: 'md' }}>Responsive</Badge>
    </Flex>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Flex gap="200" wrap="wrap">
      <Badge colorScheme="info">Info</Badge>
      <Badge colorScheme="positive">Positive</Badge>
      <Badge colorScheme="danger">Danger</Badge>
      <Badge colorScheme="warning">Warning</Badge>
      <Badge colorScheme="functional">Functional</Badge>
      <Badge colorScheme="energy">Energy</Badge>
      <Badge colorScheme="mobile">Mobile</Badge>
      <Badge colorScheme="broadband">Broadband</Badge>
    </Flex>
  ),
};

export const FlatBase: Story = {
  render: () => (
    <Box>
      <Flex justifyContent="end" paddingRight="300" width="400px">
        <Badge colorScheme="positive" variant="emphasis" size="sm" flatBase>
          Multi SIM offer
        </Badge>
      </Flex>
      <Card width="400px" height="200px" colorScheme="neutralSubtle" />
    </Box>
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

export const SurfaceColours: Story = {
  render: () => (
    <Flex width="600px">
      <Flex gap="200" direction="column" padding="200" backgroundColor="primary">
        {nonOutlineColorSchemes.map(colorScheme => (
          <Badge
            key={colorScheme}
            variant="emphasis"
            colorScheme={colorScheme}
            textTransform="capitalize"
          >
            {colorScheme}
          </Badge>
        ))}
      </Flex>
      <Flex gap="200" direction="column" padding="200" backgroundColor="brand">
        {nonOutlineColorSchemes.map(colorScheme => (
          <Badge
            key={colorScheme}
            variant="emphasis"
            colorScheme={colorScheme}
            textTransform="capitalize"
          >
            {colorScheme}
          </Badge>
        ))}
      </Flex>
      <Flex gap="200" direction="column" padding="200" backgroundColor="secondary">
        {allVariantColorSchemes.map(colorScheme => (
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
