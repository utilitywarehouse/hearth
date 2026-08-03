// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10592-5483&t=pZwKJYFo1y1QRQD1-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Timeline/Timeline.tsx
// component=Timeline

import figma from 'figma';
import type { InstanceHandle } from 'figma';

const variant = figma.selectedInstance.getEnum('Variant', {
  Progress: 'progress',
  Static: 'static',
});

const itemLayers = figma.selectedInstance
  .findLayers(n => n.type === 'INSTANCE')
  .filter((layer): layer is InstanceHandle => layer.type === 'INSTANCE');
const items = itemLayers
  .filter(layer => layer.hasCodeConnect())
  .map(layer => layer.executeTemplate().example);

export default {
  id: 'Timeline',
  imports: ['import { Timeline } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<Timeline${figma.helpers.react.renderProp(
    'variant',
    variant
  )}>${figma.helpers.react.renderChildren(items.flat())}</Timeline>`,
  metadata: {
    nestable: true,
    props: { variant, items },
  },
};
