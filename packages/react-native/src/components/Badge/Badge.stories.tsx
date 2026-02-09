import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Badge } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';
import { Flex } from '../Flex';
import type BadgeProps from './Badge.props';

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
      options: ['subtle', 'emphasis', 'outline'],
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
        'highlight',
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
    variant: 'subtle',
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
  render: () => {
    const colorSchemes: NonNullable<BadgeProps['colorScheme']>[] = [
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
      'highlight',
    ];
    const sizes: Array<BadgeProps['size']> = ['sm', 'md'];

    return (
      <Flex direction="column" spacing="lg" style={{ width: '100%' }}>
        {colorSchemes.map(cs => {
          // Determine allowed variants per color scheme based on design constraints:
          // - Remove 'outline' for energy, broadband, mobile, insurance, cashback, pig, highlight
          // - For highlight only show 'subtle'
          const noOutlineSchemes: Array<BadgeProps['colorScheme']> = [
            'energy',
            'broadband',
            'mobile',
            'insurance',
            'cashback',
            'pig',
            'highlight',
          ];
          let variantsForScheme: Array<BadgeProps['variant']> = ['subtle', 'emphasis', 'outline'];

          if (noOutlineSchemes.includes(cs)) {
            variantsForScheme = ['subtle', 'emphasis'];
          }
          if (cs === 'highlight') {
            variantsForScheme = ['subtle'];
          }

          return (
            <Box key={cs} gap="200">
              <VariantTitle title={cs.charAt(0).toUpperCase() + cs.slice(1)}>
                <Flex direction="column" spacing="sm">
                  {sizes.map(sz => (
                    <Flex key={sz} direction="row" align="center" spacing="md">
                      {variantsForScheme.map(variant => (
                        <Badge
                          key={`${cs}-${sz}-${variant}`}
                          colorScheme={cs}
                          size={sz}
                          variant={variant}
                        >
                          {`${variant} ${sz}`}
                        </Badge>
                      ))}
                    </Flex>
                  ))}
                </Flex>
              </VariantTitle>
            </Box>
          );
        })}
      </Flex>
    );
  },
};
