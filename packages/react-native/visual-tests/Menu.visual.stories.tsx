import type { Meta, StoryObj } from '@storybook/react-native';
import { EditSmallIcon, TrashSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { useEffect, useRef } from 'react';
import { View } from 'react-native';
import { BottomSheetModalProvider } from '../src/components/BottomSheet';
import { Menu, MenuItem } from '../src/components/Menu';
import type { MenuMethods } from '../src/components/Menu';

const meta = {
  title: 'Visual Tests/Menu',
  parameters: {
    // Belt and braces: `.rnstorybook/preview.tsx` disables snapshots globally.
    chromatic: { disableSnapshot: false },
  },
} satisfies Meta;

export default meta;

type Story = StoryObj<typeof meta>;

const noop = () => {};

const OpenMenu = () => {
  const menuRef = useRef<MenuMethods>(null);

  // `Menu` has no `open` prop: `present()` on mount is the supported way.
  useEffect(() => {
    menuRef.current?.present();
  }, []);

  return (
    <Menu ref={menuRef} heading="Menu heading" animationConfigs={{ duration: 0 }} onChange={noop}>
      <MenuItem text="Plain item" onPress={noop} />
      <MenuItem text="Icon item" icon={EditSmallIcon} onPress={noop} />
      <MenuItem text="Disabled item" disabled onPress={noop} />
      <MenuItem
        text="Destructive item"
        icon={TrashSmallIcon}
        colorScheme="destructive"
        onPress={noop}
      />
    </Menu>
  );
};

export const Open: Story = {
  // Opened through the portal, so allow it to settle before the capture.
  parameters: { chromatic: { disableSnapshot: false, delay: 500 } },
  render: () => (
    <BottomSheetModalProvider>
      <View style={{ flex: 1 }}>
        <OpenMenu />
      </View>
    </BottomSheetModalProvider>
  ),
};
