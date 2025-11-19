import type { Meta, StoryObj } from '@storybook/react-native';
import {
  DownloadSmallIcon,
  EditSmallIcon,
  SettingsMediumIcon,
  ShareSmallIcon,
  TickSmallIcon,
  TrashSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useRef } from 'react';
import { Platform, View } from 'react-native';
import { Button } from '../Button';
import { Menu, MenuItem, MenuTrigger } from './';
import type { MenuMethods } from './Menu.props';

import { ViewWrap } from '../../../docs/components';

const meta: Meta<typeof Menu> = {
  title: 'Stories / Menu',
  component: Menu,
  parameters: {
    layout: 'centered',
    noScroll: true,
  },
  argTypes: {},
  args: {
    heading: 'Menu Options',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Playground: Story = {
  render: ({ ...args }) => {
    const menuRef = useRef<MenuMethods>(null);

    const openMenu = () => {
      menuRef.current?.present();
    };

    return (
      <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : { flex: 1 }}>
        <ViewWrap>
          <MenuTrigger onPress={openMenu}>
            <Button>Open Menu</Button>
          </MenuTrigger>

          <Menu ref={menuRef} {...args}>
            <MenuItem
              icon={EditSmallIcon}
              text="Edit"
              onPress={() => console.log('Edit pressed')}
            />
            <MenuItem
              icon={ShareSmallIcon}
              text="Share"
              onPress={() => console.log('Share pressed')}
            />
            <MenuItem
              icon={DownloadSmallIcon}
              text="Download"
              onPress={() => console.log('Download pressed')}
            />
            <MenuItem
              icon={TrashSmallIcon}
              text="Delete"
              colorScheme="destructive"
              onPress={() => console.log('Delete pressed')}
            />
          </Menu>
        </ViewWrap>
      </View>
    );
  },
};

export const BasicMenu = () => {
  const menuRef = useRef<MenuMethods>(null);

  const openMenu = () => {
    menuRef.current?.present();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : { flex: 1 }}>
      <ViewWrap>
        <MenuTrigger onPress={openMenu}>
          <Button>Actions</Button>
        </MenuTrigger>

        <Menu ref={menuRef} heading="Actions">
          <MenuItem icon={EditSmallIcon} text="Edit" onPress={() => console.log('Edit pressed')} />
          <MenuItem
            icon={ShareSmallIcon}
            text="Share"
            onPress={() => console.log('Share pressed')}
          />
          <MenuItem
            icon={DownloadSmallIcon}
            text="Download"
            onPress={() => console.log('Download pressed')}
          />
        </Menu>
      </ViewWrap>
    </View>
  );
};

export const WithDestructiveAction = () => {
  const menuRef = useRef<MenuMethods>(null);

  const openMenu = () => {
    menuRef.current?.present();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
      <ViewWrap>
        <MenuTrigger onPress={openMenu}>
          <Button>File Options</Button>
        </MenuTrigger>

        <Menu ref={menuRef} heading="File Options">
          <MenuItem
            icon={EditSmallIcon}
            text="Rename"
            onPress={() => console.log('Rename pressed')}
          />
          <MenuItem
            icon={ShareSmallIcon}
            text="Share"
            onPress={() => console.log('Share pressed')}
          />
          <MenuItem
            icon={DownloadSmallIcon}
            text="Download"
            onPress={() => console.log('Download pressed')}
          />
          <MenuItem
            icon={TrashSmallIcon}
            text="Delete"
            colorScheme="destructive"
            onPress={() => console.log('Delete pressed')}
          />
        </Menu>
      </ViewWrap>
    </View>
  );
};

export const IconOnRight = () => {
  const menuRef = useRef<MenuMethods>(null);

  const openMenu = () => {
    menuRef.current?.present();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
      <ViewWrap>
        <MenuTrigger onPress={openMenu}>
          <Button>Settings</Button>
        </MenuTrigger>

        <Menu ref={menuRef} heading="Settings">
          <MenuItem
            icon={TickSmallIcon}
            iconPosition="right"
            text="Enable Notifications"
            onPress={() => console.log('Toggle notifications')}
          />
          <MenuItem
            icon={TickSmallIcon}
            iconPosition="right"
            text="Dark Mode"
            onPress={() => console.log('Toggle dark mode')}
          />
          <MenuItem
            icon={SettingsMediumIcon}
            iconPosition="right"
            text="Advanced Settings"
            onPress={() => console.log('Open advanced settings')}
          />
        </Menu>
      </ViewWrap>
    </View>
  );
};

export const WithoutIcons = () => {
  const menuRef = useRef<MenuMethods>(null);

  const openMenu = () => {
    menuRef.current?.present();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
      <ViewWrap>
        <MenuTrigger onPress={openMenu}>
          <Button>Sort By</Button>
        </MenuTrigger>

        <Menu ref={menuRef} heading="Sort By">
          <MenuItem text="Name" onPress={() => console.log('Sort by name')} />
          <MenuItem text="Date" onPress={() => console.log('Sort by date')} />
          <MenuItem text="Size" onPress={() => console.log('Sort by size')} />
          <MenuItem text="Type" onPress={() => console.log('Sort by type')} />
        </Menu>
      </ViewWrap>
    </View>
  );
};

export const WithDisabledItems = () => {
  const menuRef = useRef<MenuMethods>(null);

  const openMenu = () => {
    menuRef.current?.present();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
      <ViewWrap>
        <MenuTrigger onPress={openMenu}>
          <Button>Document Actions</Button>
        </MenuTrigger>

        <Menu ref={menuRef} heading="Document Actions">
          <MenuItem icon={EditSmallIcon} text="Edit" onPress={() => console.log('Edit pressed')} />
          <MenuItem
            icon={ShareSmallIcon}
            text="Share"
            disabled
            onPress={() => console.log('Share pressed')}
          />
          <MenuItem
            icon={DownloadSmallIcon}
            text="Download"
            disabled
            onPress={() => console.log('Download pressed')}
          />
          <MenuItem
            icon={TrashSmallIcon}
            text="Delete"
            colorScheme="destructive"
            onPress={() => console.log('Delete pressed')}
          />
        </Menu>
      </ViewWrap>
    </View>
  );
};

export const WithoutHeading = () => {
  const menuRef = useRef<MenuMethods>(null);

  const openMenu = () => {
    menuRef.current?.present();
  };

  return (
    <View style={Platform.OS === 'web' ? { width: 400, height: 400 } : {}}>
      <ViewWrap>
        <MenuTrigger onPress={openMenu}>
          <Button>Quick Actions</Button>
        </MenuTrigger>

        <Menu ref={menuRef}>
          <MenuItem icon={EditSmallIcon} text="Edit" onPress={() => console.log('Edit pressed')} />
          <MenuItem
            icon={ShareSmallIcon}
            text="Share"
            onPress={() => console.log('Share pressed')}
          />
          <MenuItem
            icon={DownloadSmallIcon}
            text="Download"
            onPress={() => console.log('Download pressed')}
          />
          <MenuItem
            icon={TrashSmallIcon}
            text="Delete"
            colorScheme="destructive"
            onPress={() => console.log('Delete pressed')}
          />
        </Menu>
      </ViewWrap>
    </View>
  );
};
