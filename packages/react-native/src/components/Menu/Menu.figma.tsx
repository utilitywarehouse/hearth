import figma from '@figma/code-connect';
import { useRef } from 'react';
import { Button, Menu, MenuTrigger } from '../';

figma.connect(Menu, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3263%3A18832', {
  props: {
    menuItems: figma.children('Menu Item'),
    heading: figma.boolean('Heading?', {
      true: figma.string('Heading'),
    }),
    showHandle: figma.boolean('Grabber?', {
      true: {
        showHandle: true,
      },
    }),
  },
  example: props => {
    const menuRef = useRef(null);

    return (
      <>
        <MenuTrigger onPress={() => menuRef.current?.present()} bottomSheetProps={props.showHandle}>
          <Button>Open Menu</Button>
        </MenuTrigger>

        <Menu ref={menuRef} heading={props.heading}>
          {props.menuItems}
        </Menu>
      </>
    );
  },
});
