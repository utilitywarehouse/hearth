import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Platform } from 'react-native';
import { expect, fn, userEvent, within } from 'storybook/test';
import { VariantTitle } from '../../../docs/components';
import { Flex } from '../Flex';
import UnstyledIconButton from './UnstyledIconButton';

const meta = {
  title: 'Stories / UnstyledIconButton',
  component: UnstyledIconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: Platform.OS === 'android' ? 'radio' : 'select',
      description: 'The size of the button.',
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
      options: Object.keys(Icons).filter(icon => !icon.includes('Large')),
      control: 'select',
      description: 'The icon component for the button.',
      mapping: Icons,
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
    disabled: false,
    inverted: false,
    loading: false,
    icon: CloseMediumIcon,
    pressed: false,
    onPress: fn(),
  },
} satisfies Meta<typeof UnstyledIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    // Ensure the icon prop is the component itself, not its name string
    // The mapping in argTypes should handle this, but double-check rendering logic
    const iconComponent =
      typeof args.icon === 'string' ? Icons[args.icon as keyof typeof Icons] : args.icon;
    return <UnstyledIconButton {...args} icon={iconComponent} />;
  },
  play: async ({ args, canvasElement }) => {
    const canvas = within(canvasElement);
    const button = await canvas.findByRole('button');

    await userEvent.click(button);

    // Pressing an enabled button fires the `onPress` handler passed through from
    // the underlying `createButton()` Pressable.
    await expect(args.onPress).toHaveBeenCalledOnce();
  },
};

const statesOnPressDefault = fn();
const statesOnPressDisabled = fn();

export const States: Story = {
  parameters: {
    controls: { include: ['size', 'inverted', 'icon'] },
  },
  render: ({ size, inverted, icon: iconProp }) => {
    // Ensure the icon prop is the component itself
    const iconComponent =
      typeof iconProp === 'string' ? Icons[iconProp as keyof typeof Icons] : iconProp;
    return (
      <Flex direction="column" spacing="lg">
        <VariantTitle title="Default" invert={inverted}>
          <UnstyledIconButton
            size={size}
            inverted={inverted}
            icon={iconComponent}
            onPress={statesOnPressDefault}
            aria-label="Default"
          />
        </VariantTitle>
        <VariantTitle title="Pressed" invert={inverted}>
          <UnstyledIconButton size={size} inverted={inverted} icon={iconComponent} pressed />
        </VariantTitle>
        <VariantTitle title="Disabled" invert={inverted}>
          <UnstyledIconButton
            size={size}
            inverted={inverted}
            icon={iconComponent}
            disabled
            onPress={statesOnPressDisabled}
            aria-label="Disabled"
          />
        </VariantTitle>
        <VariantTitle title="Loading" invert={inverted}>
          <UnstyledIconButton size={size} inverted={inverted} icon={iconComponent} loading />
        </VariantTitle>
      </Flex>
    );
  },
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

    // The "Loading" variant renders `UnstyledIconButtonSpinner` (role="status",
    // aria-busy) in place of `UnstyledIconButtonIcon` (role="img") - only 3 of
    // the 4 buttons expose an icon's `img` role, the loading one shows a spinner
    // instead.
    const iconRoles = canvas.queryAllByRole('img', { hidden: true });
    const statusRoles = canvas.queryAllByRole('status');
    expect(iconRoles.length).toBe(3);
    expect(statusRoles.length).toBe(1);
    expect(buttons.length).toBe(4);
  },
};
