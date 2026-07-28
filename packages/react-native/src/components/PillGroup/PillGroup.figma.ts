// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=4348%3A15988
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/PillGroup/PillGroup.tsx
// component=PillGroup

import figma from 'figma';

const instance = figma.selectedInstance;

const wrap = instance.getBoolean('Wrap?');
const pillLayers = instance.findLayers(n => n.type === 'INSTANCE');
const pills = pillLayers
  .map(layer => (layer.type === 'INSTANCE' ? layer.executeTemplate().example : ''))
  .flat();

export default {
  id: 'PillGroup',
  imports: ["import { PillGroup } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<PillGroup value=""${figma.helpers.react.renderProp('wrap', wrap)}>
  ${pills}
</PillGroup>`,
  metadata: { nestable: true, props: { wrap } },
};
