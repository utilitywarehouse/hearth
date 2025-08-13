import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { AddSmallIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Platform } from 'react-native';
import type { ButtonProps } from '.';
import { Button, ButtonGroup } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';
import { DetailText } from '../DetailText';
import { Flex } from '../Flex';

const meta = {
  title: 'Stories / Button',
  component: Button,
  parameters: {
    layout: 'centedestructive',
  },
  argTypes: {
    text: {
      type: 'string',
      control: 'text',
      description: 'The text of the button.',
    },
    size: {
      options: ['sm', 'md'],
      control: Platform.OS === 'android' ? 'radio' : 'select',
      description: 'The size of the button.',
    },
    variant: {
      options: ['emphasis', 'solid', 'outline', 'ghost'],
      control: Platform.OS === 'android' ? 'radio' : 'select',
      description: 'The variant of the button.',
    },
    colorScheme: {
      options: ['highlight', 'destructive', 'affirmative', 'functional'],
      control: Platform.OS === 'android' ? 'radio' : 'select',
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
    iconPosition: {
      options: ['left', 'right'],
      control: 'select',
      description: 'The position of the icon component in the button.',
    },
    loading: {
      type: 'boolean',
      control: 'boolean',
      description: 'To show or hide the loading spinner component for the button.',
    },
    paddingNone: {
      type: 'boolean',
      control: 'boolean',
      description: 'To remove the padding from the button.',
    },
    pressed: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the button to be pressed.',
    },
  },
  args: {
    text: 'Press me',
    size: 'md',
    variant: 'solid',
    colorScheme: 'highlight',
    disabled: false,
    inverted: false,
    loading: false,
    icon: undefined,
    iconPosition: 'left',
    paddingNone: false,
    pressed: false,
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  render: ({ icon: _icon, children: _, ...args }) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return <Button {...args} icon={icon} />;
  },
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  render: ({ icon: _icon, children: _, ...args }) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return (
      <ButtonGroup flexDirection="column" space="md">
        <>
          {args.colorScheme === 'highlight' && (
            <VariantTitle title="Emphasis" invert={args.inverted}>
              <Button {...args} variant="emphasis" icon={icon} />
            </VariantTitle>
          )}
          {args.colorScheme !== 'functional' && (
            <VariantTitle title="Solid" invert={args.inverted}>
              <Button {...args} variant="solid" icon={icon} />
            </VariantTitle>
          )}
          {args.colorScheme !== 'highlight' && (
            <>
              <VariantTitle title="Outline" invert={args.inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <Button {...args} variant="outline" icon={icon} />
              </VariantTitle>
              <VariantTitle title="Ghost" invert={args.inverted}>
                {/* @ts-expect-error - story loop types don't match */}
                <Button {...args} variant="ghost" icon={icon} />
              </VariantTitle>
            </>
          )}
        </>
      </ButtonGroup>
    );
  },
};

type ColorScheme = ButtonProps['colorScheme'];
type Variant = ButtonProps['variant'];

export const KitchenSink: Story = {
  parameters: {
    controls: { include: ['text', 'size', 'inverted'] },
  },
  render: ({ text, inverted, size }) => {
    const schemes: Array<ColorScheme> = ['highlight', 'destructive', 'affirmative', 'functional'];
    const variants: Array<Variant> = ['emphasis', 'solid', 'outline', 'ghost'];
    return (
      <Flex direction="row" space="lg" wrap="wrap">
        {schemes.map(scheme => (
          <Flex direction="column" space="lg" key={scheme}>
            {variants
              .filter(variant => {
                if (inverted) {
                  if (scheme === 'highlight') {
                    return variant === 'emphasis' || variant === 'solid';
                  }
                  if (scheme === 'functional') {
                    return variant === 'outline' || variant === 'ghost';
                  } else return false;
                }
                if (scheme === 'highlight') {
                  return variant === 'emphasis' || variant === 'solid';
                }
                if (scheme === 'functional') {
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
                      <Button
                        text={text}
                        variant={variant}
                        colorScheme={scheme}
                        size={size}
                        inverted={inverted}
                      />
                    </VariantTitle>
                    <VariantTitle title="Pressed" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <Button
                        text={text}
                        pressed
                        variant={variant}
                        colorScheme={scheme}
                        size={size}
                        inverted={inverted}
                      />
                    </VariantTitle>
                    <VariantTitle title="Disabled" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <Button
                        text={text}
                        disabled
                        variant={variant}
                        colorScheme={scheme}
                        size={size}
                        inverted={inverted}
                      />
                    </VariantTitle>
                    <VariantTitle title="Icon Left" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <Button
                        text={text}
                        icon={AddSmallIcon}
                        variant={variant}
                        colorScheme={scheme}
                        size={size}
                        inverted={inverted}
                      />
                    </VariantTitle>
                    <VariantTitle title="Icon Left" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <Button
                        text={text}
                        icon={ChevronRightSmallIcon}
                        iconPosition="right"
                        variant={variant}
                        colorScheme={scheme}
                        size={size}
                        inverted={inverted}
                      />
                    </VariantTitle>
                    <VariantTitle title="Loading" invert={inverted}>
                      {/* @ts-expect-error - story loop types don't match */}
                      <Button
                        text={text}
                        loading
                        variant={variant}
                        colorScheme={scheme}
                        disabled
                        size={size}
                        inverted={inverted}
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
