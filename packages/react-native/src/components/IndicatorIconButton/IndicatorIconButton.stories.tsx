import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { ComponentType } from 'react';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';
import { Flex } from '../Flex';
import IndicatorIconButton from './IndicatorIconButton';

const meta = {
  title: 'Stories / IndicatorIconButton',
  component: IndicatorIconButton,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    inverted: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the button to be inverted. (To only be used on `purple` backgrounds)',
    },
    icon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Medium'))],
      control: 'select',
      description: 'The icon component for the button.',
    },
    pressed: {
      type: 'boolean',
      control: 'boolean',
      description: 'To set the button to be pressed.',
    },
    indicator: {
      type: 'boolean',
      control: 'boolean',
      description: 'To show or hide the red dot indicator.',
    },
  },
  args: {
    icon: 'BellMediumIcon' as unknown as ComponentType,
    inverted: false,
    pressed: false,
    indicator: true,
  },
} satisfies Meta<typeof IndicatorIconButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: args => {
    const icon = typeof args.icon === 'string' ? Icons[args.icon as keyof typeof Icons] : args.icon;
    return <IndicatorIconButton {...args} icon={icon} />;
  },
};

export const Variants: Story = {
  parameters: {
    controls: { exclude: ['size'] },
  },
  render: args => {
    const icon = typeof args.icon === 'string' ? Icons[args.icon as keyof typeof Icons] : args.icon;
    return (
      <Flex direction="column" space="xl">
        <Flex direction="row" space="lg">
          <Box>
            <VariantTitle title="Without Indicator" invert={args.inverted}>
              <IndicatorIconButton {...args} icon={icon} indicator={false} />
            </VariantTitle>
          </Box>
          <Box>
            <VariantTitle title="With Indicator" invert={args.inverted}>
              <IndicatorIconButton {...args} icon={icon} indicator={true} />
            </VariantTitle>
          </Box>
        </Flex>
        <Flex direction="row" space="lg">
          <Box style={{ backgroundColor: 'purple', padding: 10, borderRadius: 8 }}>
            <VariantTitle title="Inverted" invert={!args.inverted}>
              <IndicatorIconButton {...args} icon={icon} inverted={true} />
            </VariantTitle>
          </Box>
        </Flex>
      </Flex>
    );
  },
};
