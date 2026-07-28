// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3263%3A18832
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Menu/Menu.tsx
// component=Menu

import figma from 'figma';

const heading = figma.selectedInstance.getBoolean('Heading?', {
  true: figma.selectedInstance.getString('Heading'),
});
const showHandle = figma.selectedInstance.getBoolean('Grabber?', {
  true: true,
});
const menuItemLayers = figma.selectedInstance.findConnectedInstances(n => n.hasCodeConnect());
const menuItems = menuItemLayers.map(layer => layer.executeTemplate().example) ?? [];

export default {
  id: 'Menu',
  imports: [
    "import { Button, Menu, MenuTrigger } from '@utilitywarehouse/hearth-react-native';",
    "import { useRef } from 'react';",
  ],
  example: figma.code`function Example() {
  const menuRef = useRef(null);
  return (<>
    <MenuTrigger onPress={() => menuRef.current?.present()}>
      <Button>Open Menu</Button>
    </MenuTrigger>
    <Menu ref={menuRef}${figma.helpers.react.renderProp(
      'heading',
      heading
    )}${figma.helpers.react.renderProp('showHandle', showHandle)}>
      ${figma.helpers.react.renderChildren(menuItems.flat())}
    </Menu>
  </>);
}`,
  metadata: {
    props: { heading, showHandle, menuItems },
  },
};
