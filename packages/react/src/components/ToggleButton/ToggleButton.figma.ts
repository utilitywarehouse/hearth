// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=4842-1131&m=dev
// source=./ToggleButton.tsx
// component=ToggleButton
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');

export default {
  example: figma.code`<ToggleButton>${figma.helpers.react.renderChildren(label)}</ToggleButton>`,
  imports: ['import { ToggleButton } from "@utilitywarehouse/hearth-react"'],
  id: 'toggle-button',
  metadata: { nestable: true },
};
