import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { useUnistyles } from 'react-native-unistyles';
import { Flex } from '../src/components/Flex';
import { VTGrid, VTRow } from './_support';

const meta = {
  title: 'Visual Tests/Flex',
  parameters: {
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const FlexStates = () => {
  const { theme } = useUnistyles();
  const area = { backgroundColor: theme.color.surface.neutral.strong };
  const colors = [
    theme.color.surface.brand.default,
    theme.color.surface.highlight.default,
    theme.color.surface.energy.default,
  ];
  const Block = ({ i, w = 32, h = 32 }: { i: number; w?: number; h?: number }) => (
    <View style={{ width: w, height: h, backgroundColor: colors[i % colors.length] }} />
  );

  return (
    <VTGrid>
      <VTRow label="Direction row, spacing md">
        <Flex direction="row" width="100%" style={area}>
          <Block i={0} />
          <Block i={1} />
          <Block i={2} />
        </Flex>
      </VTRow>
      <VTRow label="Direction column, spacing xl">
        <Flex direction="column" spacing="xl" width={120} style={area}>
          <Block i={0} />
          <Block i={1} />
          <Block i={2} />
        </Flex>
      </VTRow>
      <VTRow label="Row, justify space-between, align center">
        <Flex
          direction="row"
          justify="space-between"
          align="center"
          width="100%"
          style={[area, { height: 64 }]}
        >
          <Block i={0} h={16} />
          <Block i={1} h={48} />
          <Block i={2} h={32} />
        </Flex>
      </VTRow>
      <VTRow label="Row, justify center, align flex-end">
        <Flex
          direction="row"
          justify="center"
          align="flex-end"
          width="100%"
          style={[area, { height: 64 }]}
        >
          <Block i={0} h={16} />
          <Block i={1} h={48} />
          <Block i={2} h={32} />
        </Flex>
      </VTRow>
      <VTRow label="Row, wrap">
        <Flex direction="row" wrap="wrap" spacing="sm" width={140} style={area}>
          <Block i={0} w={48} />
          <Block i={1} w={48} />
          <Block i={2} w={48} />
          <Block i={0} w={48} />
        </Flex>
      </VTRow>
    </VTGrid>
  );
};

/** Flex direction, spacing, alignment, justification and wrapping. */
export const States: Story = {
  render: () => <FlexStates />,
};
