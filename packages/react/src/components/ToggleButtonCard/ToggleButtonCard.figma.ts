// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2164-727&m=dev
// source=./ToggleButtonCard.tsx
// component=ToggleButtonCard
import figma from 'figma';
const instance = figma.selectedInstance;

const toggleButtonInstance = instance.findInstance('Toggle Button');
const label =
  toggleButtonInstance && toggleButtonInstance.type !== 'ERROR'
    ? toggleButtonInstance.getString('Label')
    : undefined;

const content =
  instance.getSlot('Content')?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

export default {
  example: figma.code`/* Related ToggleButtonCard components must be wrapped in a ToggleGroup */
  <ToggleButtonCard${figma.helpers.react.renderProp('label', label)}>${content.flat()}</ToggleButtonCard>`,
  imports: ['import { ToggleButtonCard } from "@utilitywarehouse/hearth-react"'],
  id: 'toggle-button-card',
  metadata: { nestable: true },
};
