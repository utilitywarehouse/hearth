import { Meta, StoryObj } from '@storybook/react-native';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { AddSmallIcon, ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Platform } from 'react-native';
import { expect, fn, userEvent, within } from 'storybook/test';
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
    layout: 'centered',
    // Play functions here click a Pressable whose colorScheme/variant is animated by
    // react-native-unistyles' reanimated-backed color transition, which throws a stray
    // `UpdatePropsManager` ReanimatedError on web (react-native-reanimated has no web
    // implementation for that native-only code path). All assertions still pass — see UWDS-4922.
    test: {
      dangerouslyIgnoreUnhandledErrors: true,
    },
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
    onPress: fn(),
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  render: ({ icon: _icon, children: _, ...args }: StoryObj<typeof meta.args>) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return <Button {...args} icon={icon} />;
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button', { name: 'Press me' });

    await userEvent.click(button);
    await expect(args.onPress).toHaveBeenCalledOnce();
  },
};

const statesOnPressDefault = fn();
const statesOnPressDisabled = fn();

export const States: Story = {
  parameters: {
    controls: { include: ['size', 'variant', 'colorScheme'] },
  },
  render: ({ size, variant, colorScheme, inverted }) => (
    <Flex direction="column" spacing="lg">
      <VariantTitle title="Default" invert={inverted}>
        <Button
          size={size}
          variant={variant}
          colorScheme={colorScheme}
          inverted={inverted}
          text="Default"
          onPress={statesOnPressDefault}
        />
      </VariantTitle>
      <VariantTitle title="Disabled" invert={inverted}>
        <Button
          size={size}
          variant={variant}
          colorScheme={colorScheme}
          inverted={inverted}
          text="Disabled"
          disabled
          onPress={statesOnPressDisabled}
        />
      </VariantTitle>
      <VariantTitle title="Loading" invert={inverted}>
        <Button
          size={size}
          variant={variant}
          colorScheme={colorScheme}
          inverted={inverted}
          text="Loading"
          loading
        />
      </VariantTitle>
    </Flex>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const buttons = canvas.getAllByRole('button');

    const defaultButton = await canvas.findByRole('button', { name: 'Default' });
    await userEvent.click(defaultButton);
    // Pressing the enabled "Default" button fires its `onPress` handler.
    expect(statesOnPressDefault).toHaveBeenCalledOnce();

    // A disabled button renders with `pointer-events: none` - a real user cannot
    // click it at all (userEvent.click throws on a pointer-events: none element,
    // which is itself proof it can't respond), so its disabled state is the
    // characterization itself.
    const disabledButton = await canvas.findByRole('button', { name: 'Disabled' });
    expect(disabledButton).toBeDisabled();
    expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
    expect(statesOnPressDisabled).not.toHaveBeenCalled();

    expect(buttons.length).toBe(3);
  },
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  render: ({ icon: _icon, children: _, ...args }: StoryObj<typeof meta.args>) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return (
      <ButtonGroup flexDirection="column" spacing="md">
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
                <Button {...args} variant="outline" icon={icon} />
              </VariantTitle>
              <VariantTitle title="Ghost" invert={args.inverted}>
                <Button {...args} variant="ghost" icon={icon} />
              </VariantTitle>
            </>
          )}
        </>
      </ButtonGroup>
    );
  },
};

export const PaddingNone: Story = {
  parameters: {
    controls: {
      include: ['text', 'size', 'inverted', 'icon', 'iconPosition'],
    },
  },
  /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
  render: ({ icon: _icon, children: _, ...args }: StoryObj<typeof meta.args>) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];

    return (
      <Flex direction="column" spacing="lg">
        <VariantTitle title="Default Padding" invert={args.inverted}>
          <Flex direction="row" align="center" spacing="none">
            <Box backgroundColor="brand" width="100" height="100" />
            <Button
              {...args}
              colorScheme="functional"
              variant="ghost"
              icon={icon}
              paddingNone={false}
            />
            <Box backgroundColor="brand" width="100" height="100" />
          </Flex>
        </VariantTitle>
        <VariantTitle title="No Padding (paddingNone)" invert={args.inverted}>
          <Flex direction="row" align="center" spacing="none">
            <Box backgroundColor="brand" width="100" height="100" />
            <Button {...args} colorScheme="functional" variant="ghost" icon={icon} paddingNone />
            <Box backgroundColor="brand" width="100" height="100" />
          </Flex>
        </VariantTitle>
      </Flex>
    );
  },
};

type ColorScheme = ButtonProps['colorScheme'];
type Variant = ButtonProps['variant'];

export const KitchenSink: Story = {
  parameters: {
    controls: { include: ['text', 'size', 'inverted'] },
  },
  render: ({ text, inverted, size }: StoryObj<typeof meta.args>) => {
    const schemes: Array<ColorScheme> = ['highlight', 'destructive', 'affirmative', 'functional'];
    const variants: Array<Variant> = ['emphasis', 'solid', 'outline', 'ghost'];
    return (
      <Flex direction="row" spacing="lg" wrap="wrap">
        {schemes.map(scheme => (
          <Flex direction="column" spacing="lg" key={scheme}>
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
                    <DetailText size="lg" inverted={inverted}>
                      {scheme} - {variant}
                    </DetailText>
                  </Box>
                  <Flex direction="column" spacing="lg">
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
