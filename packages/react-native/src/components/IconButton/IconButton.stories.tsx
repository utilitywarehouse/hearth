import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import {
  BroadbandMediumIcon,
  CashbackCardMediumIcon,
  ElectricityMediumIcon,
  InsuranceMediumIcon,
  MobileMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { ComponentType } from 'react';
import { expect, fn, userEvent, within } from 'storybook/test';
import { IconButton, IconButtonProps } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';
import { ButtonGroup } from '../Button';
import { DetailText } from '../DetailText';
import { Flex } from '../Flex';

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
      options: ['highlight', 'destructive', 'affirmative', 'functional'],
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
    colorScheme: 'highlight',
    icon: 'AddMediumIcon' as unknown as ComponentType,
    loading: false,
    disabled: false,
    inverted: false,
    pressed: false,
    onPress: fn(),
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
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    await userEvent.click(button);

    // Pressing an enabled button fires the `onPress` handler passed through to
    // the underlying `Pressable`.
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
        <IconButton
          size={size}
          variant={variant}
          colorScheme={colorScheme}
          inverted={inverted}
          icon={Icons.AddMediumIcon}
          onPress={statesOnPressDefault}
          aria-label="Default"
        />
      </VariantTitle>
      <VariantTitle title="Disabled" invert={inverted}>
        <IconButton
          size={size}
          variant={variant}
          colorScheme={colorScheme}
          inverted={inverted}
          icon={Icons.AddMediumIcon}
          disabled
          onPress={statesOnPressDisabled}
          aria-label="Disabled"
        />
      </VariantTitle>
      <VariantTitle title="Loading" invert={inverted}>
        <IconButton
          size={size}
          variant={variant}
          colorScheme={colorScheme}
          inverted={inverted}
          icon={Icons.AddMediumIcon}
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
    // characterization itself. `disabled` maps to the DOM `disabled`/
    // `aria-disabled` attributes here (react-native-web's one special case for
    // accessibilityState, verified via live DOM inspection).
    const disabledButton = await canvas.findByRole('button', { name: 'Disabled' });
    expect(disabledButton).toBeDisabled();
    expect(disabledButton).toHaveAttribute('aria-disabled', 'true');
    expect(statesOnPressDisabled).not.toHaveBeenCalled();

    // The "Loading" variant renders `IconButtonSpinner` (role="status", aria-busy)
    // in place of `IconButtonIcon` (role="img") - only 2 of the 3 buttons expose
    // an icon's `img` role, the loading one shows a spinner instead.
    const iconRoles = canvas.queryAllByRole('img', { hidden: true });
    const statusRoles = canvas.queryAllByRole('status');
    expect(iconRoles.length).toBe(2);
    expect(statusRoles.length).toBe(1);
    expect(buttons.length).toBe(3);
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
      <ButtonGroup flexDirection="column" spacing="md">
        <>
          {args.colorScheme === 'highlight' && (
            <VariantTitle title="Emphasis" invert={args.inverted}>
              <IconButton {...args} variant="emphasis" icon={icon} />
            </VariantTitle>
          )}
          {args.colorScheme !== 'functional' && (
            <VariantTitle title="Solid" invert={args.inverted}>
              <IconButton {...args} variant="solid" icon={icon} />
            </VariantTitle>
          )}
          {args.colorScheme !== 'highlight' && (
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
                    <DetailText size="lg" color={inverted ? 'warmWhite50' : 'grey1000'}>
                      {scheme} - {variant}
                    </DetailText>
                  </Box>
                  <Flex direction="column" spacing="lg">
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

export const ServiceIconButtons: Story = {
  render: () => {
    return (
      <ButtonGroup spacing="md">
        <IconButton
          icon={ElectricityMediumIcon}
          backgroundColor="energyBlue200"
          activeBackgroundColor="energyBlue300"
          variant="emphasis"
          shadowColor="energyBlue300"
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon={BroadbandMediumIcon}
          backgroundColor="broadbandGreen200"
          activeBackgroundColor="broadbandGreen300"
          variant="emphasis"
          shadowColor="broadbandGreen300"
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon={MobileMediumIcon}
          backgroundColor="mobileRose200"
          activeBackgroundColor="mobileRose300"
          variant="emphasis"
          shadowColor="mobileRose400"
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon={InsuranceMediumIcon}
          backgroundColor="insuranceOrange300"
          activeBackgroundColor="insuranceOrange400"
          variant="emphasis"
          shadowColor="insuranceOrange400"
          onPress={() => console.log('Pressed')}
        />
        <IconButton
          icon={CashbackCardMediumIcon}
          backgroundColor="cashbackLilac300"
          activeBackgroundColor="cashbackLilac400"
          variant="emphasis"
          shadowColor="cashbackLilac500"
          onPress={() => console.log('Pressed')}
        />
      </ButtonGroup>
    );
  },
};
