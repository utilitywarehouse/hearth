// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10592-5483&m=dev
// source=./Timeline.tsx
// component=Timeline
import figma from 'figma';
const instance = figma.selectedInstance;

const variant = instance.getEnum('Variant', {
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
  example: figma.code`<Timeline${figma.helpers.react.renderProp('variant', variant)}>${figma.helpers.react.renderChildren(items.flat())}</Timeline>`,
  imports: ['import { Timeline } from "@utilitywarehouse/hearth-react"'],
  id: 'timeline',
  metadata: {
    nestable: true,
    props: { variant, items },
  },
};
