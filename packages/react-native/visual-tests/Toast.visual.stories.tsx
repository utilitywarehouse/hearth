import type { Meta, StoryObj } from '@storybook/react-native';
import { UserSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useEffect } from 'react';
import { View } from 'react-native';
import { ToastProvider, useToast } from '../src/components/Toast';

const meta = {
  title: 'Visual Tests/Toast',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const ShowToasts = () => {
  const { addToast } = useToast();

  useEffect(() => {
    // `duration: 0` turns the auto-dismiss timer off. The stack puts the newest toast on
    // top, so add them in reverse of the order they should read.
    addToast({ text: 'With icon', icon: UserSmallIcon, duration: 0 });
    addToast({ text: 'With action', actionText: 'Undo', onPress: () => {}, duration: 0 });
    addToast({ text: 'Without dismiss icon', showDismissIcon: false, duration: 0 });
    addToast({ text: 'Default toast', duration: 0 });
    // Run once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
};

/** Toast variants shown at once, without auto-dismiss. */
export const Variants: Story = {
  // Toasts are added from an effect, so they render after a state update on mount.
  parameters: { chromatic: { disableSnapshot: false, delay: 300 } },
  render: () => (
    // The stack is absolutely positioned at the bottom of its parent, so give it a box.
    <View style={{ height: 320 }}>
      <ToastProvider safeAreaPadding={false}>
        <ShowToasts />
      </ToastProvider>
    </View>
  ),
};
