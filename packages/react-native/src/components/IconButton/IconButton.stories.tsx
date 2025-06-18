import React, { ComponentType } from 'react';
import { IconButton, IconButtonProps } from '.';
import { Meta, StoryObj } from '@storybook/react-vite';
import { VariantTitle } from '../../../docs/components';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { Box } from '../Box';
import { ButtonGroup } from '../Button';
import { Flex } from '../Flex';
import { DetailText } from '../DetailText';

const meta = {
  title: 'Stories / IconButton',
  component: IconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: 'select',
      description: 'The size of the button.',
    },
    variant: {
      options: ['emphasis', 'solid', 'outline', 'ghost'],
      control: 'select',
      description: 'The variant of the button.',
    },
    colorScheme: {
      options: ['yellow', 'red', 'green', 'grey'],
      control: 'select',
      description: 'The color scheme of the button.',
    },
    disabled: {
      type: 'boolean',
      control: 'boolean',
      description: 'To manually set disable to the button.',
    },
    inverted: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the button to be inverted. (To only be used on `purple` backgrounds)',
    },
    icon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Small'))],
      control: 'select',
      description: 'The icon component for the button.',
    },
    loading: {
      type: 'boolean',
      control: 'boolean',
      description: 'To show or hide the loading spinner component for the button.',
    },
    pressed: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the button to be pressed.',
    },
  },
  args: {
    size: 'md',
    variant: 'solid',
    colorScheme: 'yellow',
    icon: 'AddMediumIcon' as unknown as ComponentType,
    loading: false,
    disabled: false,
    inverted: false,
    pressed: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ icon: _icon, ...args }) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return <IconButton {...args} icon={icon} />;
  },
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  render: ({ icon: _icon, ...args }) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return (
      <ButtonGroup flexDirection="column" space="md">
        <>
          {args.colorScheme === 'yellow' && (
            <VariantTitle title="Emphasis" invert={args.inverted}>
              <IconButton {...args} variant="emphasis" icon={icon} />
            </VariantTitle>
          )}
          {args.colorScheme !== 'grey' && (
            <VariantTitle title="Solid" invert={args.inverted}>
              <IconButton {...args} variant="solid" icon={icon} />
            </VariantTitle>
          )}
          {args.colorScheme !== 'yellow' && (
            <>
              <VariantTitle title="Outline" invert={args.inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <IconButton {...args} variant="outline" icon={icon} />
              </VariantTitle>
              <VariantTitle title="Ghost" invert={args.inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <IconButton {...args} variant="ghost" icon={icon} />
              </VariantTitle>
            </>
          )}
        </>
      </ButtonGroup>
    );
  },
};

type ColorScheme = IconButtonProps['colorScheme'];
type Variant = IconButtonProps['variant'];

export const KitchenSink: Story = {
  parameters: {
    controls: { include: ['icon'] },
  },
  render: ({ icon: _icon, inverted, size }) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    const schemes: Array<ColorScheme> = ['yellow', 'red', 'green', 'grey'];
    const variants: Array<Variant> = ['emphasis', 'solid', 'outline', 'ghost'];
    return (
      <Flex direction="row" space="lg" wrap="wrap">
        {schemes.map(scheme => (
          <Flex direction="column" space="lg" key={scheme}>
            {variants
              .filter(variant => {
                if (inverted) {
                  if (scheme === 'yellow') {
                    return variant === 'emphasis' || variant === 'solid';
                  }
                  if (scheme === 'grey') {
                    return variant === 'outline' || variant === 'ghost';
                  } else return false;
                }
                if (scheme === 'yellow') {
                  return variant === 'emphasis' || variant === 'solid';
                }
                if (scheme === 'grey') {
                  return variant === 'outline' || variant === 'ghost';
                } else {
                  return variant === 'solid' || variant === 'ghost' || variant === 'outline';
                }
              })
              .map(variant => (
                <Box key={variant} mb="100">
                  <Box mb="100">
                    <DetailText size="lg" color={inverted ? 'warmWhite50' : 'grey1000'}>
                      {scheme} - {variant}
                    </DetailText>
                  </Box>
                  <Flex direction="column" space="lg">
                    <VariantTitle title="Default" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <IconButton
                        variant={variant}
                        colorScheme={scheme}
                        size={size}
                        inverted={inverted}
                        icon={icon}
                      />
                    </VariantTitle>
                    <VariantTitle title="Pressed" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <IconButton
                        pressed
                        variant={variant}
                        colorScheme={scheme}
                        size={size}
                        inverted={inverted}
                        icon={icon}
                      />
                    </VariantTitle>
                    <VariantTitle title="Disabled" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <IconButton
                        disabled
                        variant={variant}
                        colorScheme={scheme}
                        size={size}
                        inverted={inverted}
                        icon={icon}
                      />
                    </VariantTitle>
                    <VariantTitle title="Loading" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <IconButton
                        loading
                        variant={variant}
                        colorScheme={scheme}
                        disabled
                        size={size}
                        inverted={inverted}
                        icon={icon}
                      />
                    </VariantTitle>
                  </Flex>
                </Box>
              ))}
          </Flex>
        ))}
      </Flex>
    );
  },
};
