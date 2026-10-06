// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2926-2430&m=dev
// source=./UnstyledIconButton.tsx
// component=UnstyledIconButton
import figma from 'figma';
const instance = figma.selectedInstance;

const icon24 = instance.getInstanceSwap('Icon-24')?.executeTemplate().example;
const icon20 = instance.getInstanceSwap('Icon-20')?.executeTemplate().example;

export default {
  example: figma.code`<UnstyledIconButton label="A label is required">${figma.helpers.react.renderChildren(icon20)}${figma.helpers.react.renderChildren(icon24)}</UnstyledIconButton>`,
  imports: ['import { UnstyledIconButton } from "@utilitywarehouse/hearth-react"'],
  id: 'unstyled-icon-button',
};
