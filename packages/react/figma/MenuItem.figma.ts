// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3253-8193&m=dev
// source=../src/components/Menu/MenuItem.tsx
// component=MenuItem
import figma from 'figma';
const instance = figma.selectedInstance;

const text = instance.getString('Text');
const iconLeft = instance.getBoolean('Icon left?', {
  true: instance.getInstanceSwap('Icon left-20')?.executeTemplate().example,
  false: undefined,
});
const iconRight = instance.getBoolean('Icon right?', {
  true: instance.getInstanceSwap('Icon right-20')?.executeTemplate().example,
  false: undefined,
});
const colorScheme = instance.getEnum('Color Scheme', {
  Functional: 'functional',
  Destructive: 'destructive',
});

export default {
  example: figma.code`<MenuItem${figma.helpers.react.renderProp('colorScheme', colorScheme)}>${
    iconLeft ? iconLeft : ''
  }${figma.helpers.react.renderChildren(text)}${
    iconRight ? iconRight : ''
  }</MenuItem>`,
  imports: ['import { MenuItem } from "@utilitywarehouse/hearth-react"'],
  id: 'menu-item',
  metadata: { nestable: true },
};
