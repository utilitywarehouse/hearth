import type { Meta, StoryObj } from '@storybook/react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Box } from '../src/components/Box';
import { Center } from '../src/components/Center';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Center',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const CenterStates = () => {
  const { theme } = useUnistyles();
  const area = { backgroundColor: theme.color.surface.neutral.strong };
  const child = { backgroundColor: theme.color.surface.brand.default };
  return (
    <VTGrid>
      <VTRow label="Centred square">
        <Center width={160} height={160} style={area}>
          <Box width={48} height={48} style={child} />
        </Center>
        <Center width={160} height={160} style={area}>
          <Box width={96} height={32} style={child} />
        </Center>
      </VTRow>
      <VTRow label="Wide area, two children">
        <Center width="100%" height={120} style={area}>
          <Box width={48} height={24} style={child} />
          <Box width={24} height={24} marginTop="100" style={child} />
        </Center>
      </VTRow>
    </VTGrid>
  );
};

/** Center places its children in the middle of the area, both ways. */
export const States: Story = {
  render: () => <CenterStates />,
};
