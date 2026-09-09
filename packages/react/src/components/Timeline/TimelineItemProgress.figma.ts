// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10562-2810&m=dev
// source=./TimelineItem.tsx
// component=TimelineItem
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
});
const state = instance.getEnum('State', {
  Complete: 'complete',
  Active: 'active',
  Incomplete: 'incomplete',
});

const slot = instance.getSlot('Slot');
const customContentInstance = instance.getBoolean('Custom content?', {
  true: instance.getInstanceSwap('Custom content')?.executeTemplate().example,
});
const customContent = [
  ...(slot?.connectedInstances.map(i => i.executeTemplate().example) ?? []),
  ...(customContentInstance ? [customContentInstance] : []),
];

export default {
  example: figma.code`<TimelineItem${figma.helpers.react.renderProp('state', state)}${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('helperText', helperText)}>${figma.helpers.react.renderChildren(customContent.flat())}</TimelineItem>`,
  imports: ['import { TimelineItem } from "@utilitywarehouse/hearth-react"'],
  id: 'timeline-item-progress',
  metadata: { nestable: true },
};
