import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Badge } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';
import { Flex } from '../Flex';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: 'Stories / Badge',
  component: Badge,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    children: { control: 'text' },
    variant: {
      options: ['solid', 'outline'],
      control: 'radio',
      description: 'Variant of the badge.',
    },
    colorScheme: {
      options: [
        'info',
        'positive',
        'danger',
        'warning',
        'functional',
        'energy',
        'broadband',
        'mobile',
        'insurance',
        'cashback',
        'pig',
      ],
      control: 'select',
      description: 'Color scheme of the badge.',
    },
    flatBase: {
      type: 'boolean',
      control: 'boolean',
      description: 'Whether the badge has a flat base.',
    },
    icon: {
      options: ['none', ...Object.keys(Icons).filter(icon => icon.includes('Small'))],
      control: 'select',
      description: 'The icon component for the button.',
    },
  },
  // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
  args: {
    children: 'Badge',
    variant: 'solid',
    colorScheme: 'info',
    flatBase: false,
    size: 'sm',
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ icon: _icon, ...args }) => {
    // @ts-expect-error - This is a playground
    const icon = _icon === 'none' ? undefined : Icons[_icon];
    return <Badge {...args} icon={icon} />;
  },
};

export const Solid: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  args: {
    variant: 'solid',
  },
};

export const Outline: Story = {
  parameters: {
    controls: { exclude: ['variant'] },
  },
  args: {
    variant: 'outline',
  },
};

export const FlatBase: Story = {
  parameters: {
    controls: { exclude: ['flatBase'] },
  },
  args: {
    flatBase: true,
  },
};

export const Icon: Story = {
  render: args => <Badge {...args} icon={TickSmallIcon} />,
};

export const KitchenSink: Story = {
  render: () => (
    <Flex direction="row" wrap="wrap" space="md">
      {['sm', 'md'].map(
        size =>
          size && (
            <Box gap="200">
              <VariantTitle title={`Info - Solid - ${size}`}>
                <Badge colorScheme="info" size={size as 'sm' | 'md'}>
                  Info badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Positive - Solid - ${size}`}>
                <Badge colorScheme="positive" size={size as 'sm' | 'md'}>
                  Positive badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Danger - Solid - ${size}`}>
                <Badge colorScheme="danger" size={size as 'sm' | 'md'}>
                  Danger badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Warning - Solid - ${size}`}>
                <Badge colorScheme="warning" size={size as 'sm' | 'md'}>
                  Warning badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Functional - Solid - ${size}`}>
                <Badge colorScheme="functional" size={size as 'sm' | 'md'}>
                  Functional badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Energy - Solid - ${size}`}>
                <Badge colorScheme="energy" size={size as 'sm' | 'md'}>
                  Energy badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Broadband - Solid - ${size}`}>
                <Badge colorScheme="broadband" size={size as 'sm' | 'md'}>
                  Broadband badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Mobile - Solid - ${size}`}>
                <Badge colorScheme="mobile" size={size as 'sm' | 'md'}>
                  Mobile badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Insurance - Solid - ${size}`}>
                <Badge colorScheme="insurance" size={size as 'sm' | 'md'}>
                  Insurance badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Cashback - Solid - ${size}`}>
                <Badge colorScheme="cashback" size={size as 'sm' | 'md'}>
                  Cashback badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Pig - Solid - ${size}`}>
                <Badge colorScheme="pig" size={size as 'sm' | 'md'}>
                  Pig badge
                </Badge>
              </VariantTitle>

              <VariantTitle title={`Info - Outline - ${size}`}>
                <Badge colorScheme="info" size={size as 'sm' | 'md'} variant="outline">
                  Info badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Positive - Outline - ${size}`}>
                <Badge colorScheme="positive" size={size as 'sm' | 'md'} variant="outline">
                  Positive badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Danger - Outline - ${size}`}>
                <Badge colorScheme="danger" size={size as 'sm' | 'md'} variant="outline">
                  Danger badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Warning - Outline - ${size}`}>
                <Badge colorScheme="warning" size={size as 'sm' | 'md'} variant="outline">
                  Warning badge
                </Badge>
              </VariantTitle>
              <VariantTitle title={`Functional - Outline - ${size}`}>
                <Badge colorScheme="functional" size={size as 'sm' | 'md'} variant="outline">
                  Functional badge
                </Badge>
              </VariantTitle>
            </Box>
          )
      )}
    </Flex>
  ),
};
