import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { IconContainer } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';
import { Flex } from '../Flex';

type IconKey = keyof typeof Icons;

const meta: Meta<typeof IconContainer> = {
  title: 'Stories / IconContainer',
  component: IconContainer,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    icon: {
      control: 'select',
      options: Object.keys(Icons),
      mapping: Icons,
      description: 'Icon component rendered inside the container',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    radiusNone: {
      control: 'boolean',
      description: 'Remove border radius (square edges)',
    },
    variant: {
      control: 'select',
      options: ['subtle', 'emphasis'],
      description: 'Background emphasis style',
    },
    color: {
      control: 'select',
      options: ['pig', 'energy', 'broadband', 'mobile', 'insurance', 'cashback', 'highlight'],
      description: 'Semantic color surface family',
    },
  },
  args: {
    icon: Icons[Object.keys(Icons)[0] as IconKey],
    size: 'md',
    radiusNone: false,
    variant: 'subtle',
    color: 'pig',
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Playground: Story = { render: args => <IconContainer {...args} /> };

export const Subtle: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  args: {
    variant: 'subtle',
  },
};

export const Emphasis: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  args: {
    variant: 'emphasis',
  },
};

export const RadiusNone: Story = {
  parameters: {
    controls: { exclude: ['radiusNone'] },
  },
  args: {
    radiusNone: true,
  },
};

export const KitchenSink: Story = {
  parameters: {
    controls: { exclude: ['radiusNone', 'variant', 'color', 'size'] },
  },
  render: ({ icon }) => {
    const sizes: Array<'sm' | 'md' | 'lg'> = ['sm', 'md', 'lg'];
    const colors: Array<
      'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight'
    > = ['pig', 'energy', 'broadband', 'mobile', 'insurance', 'cashback', 'highlight'];
    return (
      <Flex direction="column" space="lg">
        {sizes.map(size => (
          <Box key={size} gap="300">
            <VariantTitle title={`Size: ${size.toUpperCase()} / Subtle`}> </VariantTitle>
            <Flex direction="row" wrap="wrap" space="md">
              {colors.map(color => (
                <IconContainer
                  key={`${size}-subtle-${color}`}
                  icon={icon}
                  size={size}
                  variant="subtle"
                  color={color}
                />
              ))}
            </Flex>
            <VariantTitle title={`Size: ${size.toUpperCase()} / Emphasis`}> </VariantTitle>
            <Flex direction="row" wrap="wrap" space="md">
              {colors.map(
                color =>
                  color !== 'highlight' && (
                    <IconContainer
                      key={`${size}-emphasis-${color}`}
                      icon={icon}
                      size={size}
                      variant="emphasis"
                      color={color}
                    />
                  )
              )}
            </Flex>
          </Box>
        ))}
      </Flex>
    );
  },
};
