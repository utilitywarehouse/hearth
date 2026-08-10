// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=163-562&m=dev
// source=../src/components/Link/Link.tsx
// component=Link
import figma from 'figma';
const instance = figma.selectedInstance;

const iconLeft = instance.getBoolean('Icon left?', {
  true: instance.getInstanceSwap('Icon left-20')?.executeTemplate().example,
  false: undefined,
});
const iconRight = instance.getBoolean('Icon right?', {
  true: instance.getInstanceSwap('Icon right-20')?.executeTemplate().example,
  false: undefined,
});
const inverted = instance.getBoolean('Inverted?');
const children = instance.getString('Text');

export default {
  example: figma.code`<Link${figma.helpers.react.renderProp('inverted', inverted)} href="#">${figma.helpers.react.renderChildren(iconLeft)}${figma.helpers.react.renderChildren(children)}${figma.helpers.react.renderChildren(iconRight)}</Link>`,
  imports: ['import { Link } from "@utilitywarehouse/hearth-react"'],
  id: 'link',
  metadata: { nestable: true },
};
