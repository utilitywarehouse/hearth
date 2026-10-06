// SPIKE (UWDS-5137): throwaway probes for native Chromatic behaviour. Not for merge.
import type { Meta, StoryObj } from '@storybook/react-native';
import { Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const meta = {
  title: 'Visual Tests/Spike',
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const Probe = () => {
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();
  return (
    <View style={{ padding: 8, gap: 4, backgroundColor: '#fff' }}>
      <Text style={{ color: '#000' }}>flag: {String(process.env.EXPO_PUBLIC_VISUAL_TESTS)}</Text>
      <Text style={{ color: '#000' }}>
        window: {Math.round(width)} x {Math.round(height)}
      </Text>
      <Text style={{ color: '#000' }}>
        insets t{insets.top} r{insets.right} b{insets.bottom} l{insets.left}
      </Text>
    </View>
  );
};

export const EnvProbe: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => <Probe />,
};

export const TallContent: Story = {
  parameters: { chromatic: { disableSnapshot: false } },
  render: () => (
    <View>
      {Array.from({ length: 24 }, (_, i) => (
        <View
          key={i}
          style={{
            height: 50,
            justifyContent: 'center',
            paddingLeft: 8,
            backgroundColor: i % 2 ? '#ddd' : '#fff',
          }}
        >
          <Text style={{ color: '#000' }}>{`ruler ${i * 50}pt`}</Text>
        </View>
      ))}
    </View>
  ),
};

// Inherits the global `disableSnapshot: true` from .rnstorybook/preview.tsx.
export const DisabledProbe: Story = {
  render: () => (
    <View style={{ padding: 8, backgroundColor: '#fff' }}>
      <Text style={{ color: '#000' }}>should not be snapshotted</Text>
    </View>
  ),
};
