import type { Meta, StoryObj } from '@storybook/react-vite';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { IconContainer } from './IconContainer';
import { PlaceholderSmallIcon, PlaceholderMediumIcon } from '@utilitywarehouse/hearth-react-icons';

const variants = ['subtle', 'emphasis'] as const;
const subtleOnlyColorSchemes = ['highlight'] as const;
const otherColorSchemes = [
  'energy',
  'mobile',
  'broadband',
  'insurance',
  'cashback',
  'pig',
] as const;
const colorSchemes = [...otherColorSchemes, ...subtleOnlyColorSchemes] as const;
const sizes = ['sm', 'md', 'lg'] as const;

const meta: Meta<typeof IconContainer> = {
  title: 'Components / IconContainer',
  component: IconContainer,
  argTypes: {
    children: { control: { type: 'text' } },
    variant: { options: variants, control: { type: 'radio' } },
    size: { control: { type: 'radio' }, options: sizes },
    colorScheme: { options: colorSchemes, control: { type: 'radio' } },
  },
  args: {
    variant: 'subtle',
    size: 'md',
    colorScheme: 'pig',
  },
};

export default meta;
type Story = StoryObj<typeof IconContainer>;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="500">
        {sizes.map(size => (
          <Flex key={size} direction="column" gap="200" alignItems="start">
            {variants.map(variant => (
              <Flex key={variant} gap="200" justifyContent="center" direction="row">
                {otherColorSchemes.map(colorScheme => (
                  <IconContainer
                    key={`${size}${variant}${colorScheme}`}
                    variant={variant}
                    colorScheme={colorScheme}
                    size={size}
                  >
                    {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
                  </IconContainer>
                ))}
                {variant === 'subtle'
                  ? subtleOnlyColorSchemes.map(colorScheme => (
                      <IconContainer
                        key={`${size}${variant}${colorScheme}`}
                        variant={variant}
                        colorScheme={colorScheme}
                        size={size}
                      >
                        {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
                      </IconContainer>
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

export const Playground: Story = {
  render: (args: { size?: string }) => (
    <IconContainer {...args}>
      {args.size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
    </IconContainer>
  ),
};

export const Variants: Story = {
  render: () => (
    <Flex gap="200">
      {variants.map(variant => (
        <IconContainer key={variant} variant={variant}>
          <PlaceholderMediumIcon />
        </IconContainer>
      ))}
    </Flex>
  ),
};

export const Sizes: Story = {
  render: () => (
    <Flex gap="200">
      {sizes.map(size => (
        <IconContainer key={size} size={size}>
          {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
        </IconContainer>
      ))}
    </Flex>
  ),
};

export const ColorSchemes: Story = {
  render: () => (
    <Flex gap="200">
      {colorSchemes.map(colorScheme => (
        <IconContainer key={colorScheme} colorScheme={colorScheme}>
          <PlaceholderMediumIcon />
        </IconContainer>
      ))}
    </Flex>
  ),
};

export const RadiusNone: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="column" gap="500">
        {sizes.map(size => (
          <Flex key={size} direction="column" gap="200" alignItems="start">
            {variants.map(variant => (
              <Flex key={variant} gap="200" justifyContent="center" direction="row">
                {otherColorSchemes.map(colorScheme => (
                  <IconContainer
                    key={`${size}${variant}${colorScheme}`}
                    variant={variant}
                    colorScheme={colorScheme}
                    size={size}
                    borderRadius="none"
                  >
                    {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
                  </IconContainer>
                ))}
                {variant === 'subtle'
                  ? subtleOnlyColorSchemes.map(colorScheme => (
                      <IconContainer
                        key={`${size}${variant}${colorScheme}`}
                        variant={variant}
                        colorScheme={colorScheme}
                        size={size}
                        borderRadius="none"
                      >
                        {size === 'sm' ? <PlaceholderSmallIcon /> : <PlaceholderMediumIcon />}
                      </IconContainer>
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

export const Fill: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Flex direction="row" gap="200">
        <Card width="200px" height="200px" paddingNone>
          <IconContainer fill="both" borderRadius="inherit">
            <PlaceholderSmallIcon />
          </IconContainer>
        </Card>
        <Card width="200px" height="200px" paddingNone>
          <IconContainer
            fill="height"
            borderRadius="none"
            borderTopLeftRadius="inherit"
            borderBottomLeftRadius="inherit"
          >
            <PlaceholderSmallIcon />
          </IconContainer>
        </Card>
        <Card width="200px" height="200px" paddingNone>
          <IconContainer
            fill="width"
            borderRadius="none"
            borderTopLeftRadius="inherit"
            borderTopRightRadius="inherit"
          >
            <PlaceholderSmallIcon />
          </IconContainer>
        </Card>
      </Flex>
    );
  },
};
