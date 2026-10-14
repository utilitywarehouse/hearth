import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Grid } from '../src/components/Grid';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Grid',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const GridStates = () => {
  const { theme } = useUnistyles();
  const colors = [
    theme.color.surface.brand.default,
    theme.color.surface.highlight.default,
    theme.color.surface.energy.default,
  ];
  const Cell = ({ i }: { i: number }) => (
    <View style={{ height: 32, backgroundColor: colors[i % colors.length] }} />
  );
  const cells = (n: number) => Array.from({ length: n }, (_, i) => <Cell key={i} i={i} />);

  return (
    <VTGrid>
      <VTRow label="Columns 2 (default), gap 8">
        <Grid gap="100">{cells(4)}</Grid>
      </VTRow>
      <VTRow label="Columns 3, gap 8">
        <Grid columns={3} gap="100">
          {cells(6)}
        </Grid>
      </VTRow>
      <VTRow label="Columns 4, spacing lg, last row short">
        <Grid columns={4} spacing="lg">
          {cells(6)}
        </Grid>
      </VTRow>
      <VTRow label="Column gap 4, row gap 16">
        <Grid columns={3} columnGap="50" rowGap="200">
          {cells(6)}
        </Grid>
      </VTRow>
    </VTGrid>
  );
};

/** Grid column count, gap, spacing and separate column and row gaps. */
export const States: Story = {
  render: () => <GridStates />,
};
