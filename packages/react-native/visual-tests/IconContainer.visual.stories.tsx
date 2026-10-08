import type { Meta, StoryObj } from '@storybook/react-native';
import { HomeMediumIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { IconContainer } from '../src/components/IconContainer';
import type IconContainerProps from '../src/components/IconContainer/IconContainer.props';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/IconContainer',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const colors: NonNullable<IconContainerProps['color']>[] = [
  'pig',
  'energy',
  'broadband',
  'mobile',
  'insurance',
  'cashback',
  'highlight',
];

const sizes: NonNullable<IconContainerProps['size']>[] = ['sm', 'md', 'lg'];

const Sizes = ({ variant }: { variant: NonNullable<IconContainerProps['variant']> }) => (
  <VTGrid>
    {sizes.map(size => (
      <VTRow key={size} label={size}>
        {colors.map(color => (
          <IconContainer
            key={color}
            icon={HomeMediumIcon}
            size={size}
            color={color}
            variant={variant}
          />
        ))}
      </VTRow>
    ))}
  </VTGrid>
);

export const Subtle: Story = { render: () => <Sizes variant="subtle" /> };

export const Emphasis: Story = { render: () => <Sizes variant="emphasis" /> };
