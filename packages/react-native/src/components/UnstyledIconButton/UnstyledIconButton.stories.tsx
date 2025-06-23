import UnstyledIconButton from './UnstyledIconButton';
import { Meta, StoryObj } from '@storybook/react-vite';
import { VariantTitle } from '../../../docs/components';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { Flex } from '../Flex';
import { Platform } from 'react-native';
import { CloseMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';

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
};

export const States: Story = {
  parameters: {
    controls: { include: ['size', 'inverted', 'icon'] },
  },
  render: ({ size, inverted, icon: iconProp }) => {
    // Ensure the icon prop is the component itself
    const iconComponent =
      typeof iconProp === 'string' ? Icons[iconProp as keyof typeof Icons] : iconProp;
    return (
      <Flex direction="column" space="lg">
        <VariantTitle title="Default" invert={inverted}>
          <UnstyledIconButton size={size} inverted={inverted} icon={iconComponent} />
        </VariantTitle>
        <VariantTitle title="Pressed" invert={inverted}>
          <UnstyledIconButton size={size} inverted={inverted} icon={iconComponent} pressed />
        </VariantTitle>
        <VariantTitle title="Disabled" invert={inverted}>
          <UnstyledIconButton size={size} inverted={inverted} icon={iconComponent} disabled />
        </VariantTitle>
        <VariantTitle title="Loading" invert={inverted}>
          <UnstyledIconButton size={size} inverted={inverted} icon={iconComponent} loading />
        </VariantTitle>
      </Flex>
    );
  },
};
