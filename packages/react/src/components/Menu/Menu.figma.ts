// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3263-18832&m=dev
// source=./Menu.tsx
// component=Menu
import figma from 'figma';
const instance = figma.selectedInstance;

// Grabber? and Device type (Web/App) are Figma-only preview toggles for the bottom-sheet-on-mobile
// vs dropdown-on-web presentation - MenuProps has no corresponding prop (Base UI Menu.Root handles
// this via CSS/media queries, not a React prop).
const menuItemLayers = instance.findLayers(n => n.type === 'INSTANCE' && n.name === 'Menu Item');
const menuItems = menuItemLayers
  .map(item => (item.type === 'INSTANCE' ? item.executeTemplate().example : undefined))
  .filter(Boolean);

export default {
  example: figma.code`<Menu>
        <MenuTrigger>
          <Button>
            Menu trigger
            <ExpandSmallIcon />
          </Button>
        </MenuTrigger>
        <MenuContent>
          ${menuItems.flat()}
        </MenuContent>
      </Menu>`,
  imports: [
    'import { Menu, MenuTrigger, MenuContent, MenuItem, Button } from "@utilitywarehouse/hearth-react"',
    'import { ExpandSmallIcon } from "@utilitywarehouse/hearth-react-icons"',
  ],
  id: 'menu',
};
