import type { Meta, StoryObj } from '@storybook/react-native';
import { View } from 'react-native';
import { BodyText } from '../src/components/BodyText';
import { BottomSheet, BottomSheetView } from '../src/components/BottomSheet';
import { Box } from '../src/components/Box';
import { Button } from '../src/components/Button';
import { Heading } from '../src/components/Heading';

const meta = {
  title: 'Visual Tests/BottomSheet',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

/**
 * Inline sheet, open on mount via `index={0}`. `animateOnMount={false}` skips the
 * slide-in, so no imperative call or interaction is needed.
 */
export const Open: Story = {
  render: () => (
    <View style={{ flex: 1 }}>
      <BottomSheet
        index={0}
        snapPoints={['40%']}
        animateOnMount={false}
        enablePanDownToClose={false}
        onClose={noop}
        onChange={noop}
      >
        <BottomSheetView>
          <Box gap="200">
            <Heading size="lg">Sheet heading</Heading>
            <BodyText>A short block of body text inside the bottom sheet.</BodyText>
            <Button text="Continue" onPress={noop} />
          </Box>
        </BottomSheetView>
      </BottomSheet>
    </View>
  ),
};
