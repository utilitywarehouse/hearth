import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Container } from '../src/components/Container';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Container',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const ContainerStates = () => {
  const { theme } = useUnistyles();
  const area = { backgroundColor: theme.color.surface.neutral.strong };
  const colors = [theme.color.surface.brand.default, theme.color.surface.highlight.default];
  const Block = ({ i }: { i: number }) => (
    <View style={{ height: 24, backgroundColor: colors[i % colors.length] }} />
  );

  return (
    <VTGrid>
      <VTRow label="Default layout margin and padding">
        <View style={[area, { width: '100%' }]}>
          <Container style={{ backgroundColor: theme.color.surface.energy.subtle }}>
            <Block i={0} />
            <Block i={1} />
          </Container>
        </View>
      </VTRow>
      <VTRow label="Padding 400, spacing xl">
        <View style={[area, { width: '100%' }]}>
          <Container
            padding="400"
            margin="0"
            spacing="xl"
            style={{ backgroundColor: theme.color.surface.energy.subtle }}
          >
            <Block i={0} />
            <Block i={1} />
          </Container>
        </View>
      </VTRow>
      <VTRow label="Horizontal margin 400, padding 100">
        <View style={[area, { width: '100%' }]}>
          <Container
            marginHorizontal="400"
            padding="100"
            spacing="sm"
            style={{ backgroundColor: theme.color.surface.energy.subtle }}
          >
            <Block i={0} />
            <Block i={1} />
          </Container>
        </View>
      </VTRow>
    </VTGrid>
  );
};

/** Container layout margin, padding and spacing, on a grey parent to show the margin. */
export const States: Story = {
  render: () => <ContainerStates />,
};
