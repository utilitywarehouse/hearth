// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=16247-1724&m=dev
// source=./Chip.tsx
// component=Chip
import figma from 'figma';
const instance = figma.selectedInstance;

const children = instance.getString('Label');

export default {
  example: figma.code`<Chip>${figma.helpers.react.renderChildren(children)}</Chip>`,
  imports: ['import { Chip } from "@utilitywarehouse/hearth-react"'],
  id: 'chip',
};
