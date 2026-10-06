// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10592-5189&m=dev
// source=./TimelineItem.tsx
// component=TimelineItem
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const customContent =
  instance.getSlot('Slot')?.connectedInstances.map(i => i.executeTemplate().example) ?? [];

export default {
  example: figma.code`<TimelineItem${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('helperText', helperText)}>${figma.helpers.react.renderChildren(customContent.flat())}</TimelineItem>`,
  imports: ['import { TimelineItem } from "@utilitywarehouse/hearth-react"'],
  id: 'timeline-item-static',
  metadata: { nestable: true },
};
