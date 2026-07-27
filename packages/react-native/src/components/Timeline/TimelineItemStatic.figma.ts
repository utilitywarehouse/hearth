// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10592-5189&t=pZwKJYFo1y1QRQD1-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Timeline/TimelineItem.tsx
// component=TimelineItem

import figma from 'figma';

const label = figma.selectedInstance.getString('Label');
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
});
const position = figma.selectedInstance.getEnum('Variant', {
  Start: 'start',
  Middle: 'middle',
  End: 'end',
});

const slot = figma.selectedInstance.getSlot('Slot');
const customContentInstance = figma.selectedInstance.getBoolean('Custom content?', {
  true: figma.selectedInstance.getInstanceSwap('Custom content')?.executeTemplate().example,
});
const customContent = [
  ...(slot?.connectedInstances.map(i => i.executeTemplate().example) ?? []),
  ...(customContentInstance ? [customContentInstance] : []),
];

export default {
  id: 'TimelineItem',
  imports: ['import { TimelineItem } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<TimelineItem variant="static"${figma.helpers.react.renderProp(
    'position',
    position
  )}${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}>${figma.helpers.react.renderChildren(customContent.flat())}</TimelineItem>`,
  metadata: {
    nestable: true,
    props: { label, helperText, position, customContent },
  },
};
