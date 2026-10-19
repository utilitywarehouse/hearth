import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Box } from '../src/components/Box';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Box',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const BoxStates = () => {
  const { theme } = useUnistyles();
  const outer = { backgroundColor: theme.color.surface.neutral.strong };
  const inner = { backgroundColor: theme.color.surface.brand.default };
  const child = { backgroundColor: theme.color.surface.highlight.default };
  return (
    <VTGrid>
      <VTRow label="Padding 100, 200, 400">
        <Box padding="100" style={outer}>
          <Box width={24} height={24} style={child} />
        </Box>
        <Box padding="200" style={outer}>
          <Box width={24} height={24} style={child} />
        </Box>
        <Box padding="400" style={outer}>
          <Box width={24} height={24} style={child} />
        </Box>
      </VTRow>
      <VTRow label="Margin 0, 200, 400 (grey is the parent)">
        <View style={[outer, { width: '100%', flexDirection: 'row' }]}>
          <Box width={48} height={48} style={inner} />
          <Box margin="200" width={48} height={48} style={inner} />
          <Box margin="400" width={48} height={48} style={inner} />
        </View>
      </VTRow>
      <VTRow label="Border and radius">
        <Box
          width={64}
          height={64}
          borderWidth={2}
          borderColor={theme.color.border.strong}
          style={inner}
        />
        <Box
          width={64}
          height={64}
          borderWidth={2}
          borderColor={theme.color.border.strong}
          borderRadius={16}
          style={inner}
        />
        <Box width={64} height={64} borderRadius={32} style={inner} />
      </VTRow>
      <VTRow label="Width, height and mixed padding">
        <Box width={120} height={64} paddingHorizontal="300" paddingVertical="100" style={outer}>
          <Box width={24} height={24} style={child} />
        </Box>
      </VTRow>
    </VTGrid>
  );
};

/** Box utility props: padding, margin, border, radius and size. */
export const States: Story = {
  render: () => <BoxStates />,
};
