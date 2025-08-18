import { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from '@utilitywarehouse/hearth-react-native-icons';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Badge } from '.';
import { VariantTitle } from '../../../docs/components';
import { Box } from '../Box';

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
      options: ['info', 'positive', 'danger', 'warning', 'functional'],
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
    <Box gap="200">
      <VariantTitle title="Info - Solid">
        <Badge colorScheme="info">Info badge</Badge>
      </VariantTitle>
      <VariantTitle title="Positive - Solid">
        <Badge colorScheme="positive">Positive badge</Badge>
      </VariantTitle>
      <VariantTitle title="Danger - Solid">
        <Badge colorScheme="danger">Danger badge</Badge>
      </VariantTitle>
      <VariantTitle title="Warning - Solid">
        <Badge colorScheme="warning">Warning badge</Badge>
      </VariantTitle>
      <VariantTitle title="Functional - Solid">
        <Badge colorScheme="functional">Functional badge</Badge>
      </VariantTitle>
      <VariantTitle title="Info - Outline">
        <Badge colorScheme="info" variant="outline">
          Info badge
        </Badge>
      </VariantTitle>
      <VariantTitle title="Positive - Outline">
        <Badge colorScheme="positive" variant="outline">
          Positive badge
        </Badge>
      </VariantTitle>
      <VariantTitle title="Danger - Outline">
        <Badge colorScheme="danger" variant="outline">
          Danger badge
        </Badge>
      </VariantTitle>
      <VariantTitle title="Warning - Outline">
        <Badge colorScheme="warning" variant="outline">
          Warning badge
        </Badge>
      </VariantTitle>
      <VariantTitle title="Functional - Outline">
        <Badge colorScheme="functional" variant="outline">
          Functional badge
        </Badge>
      </VariantTitle>
    </Box>
  ),
};
