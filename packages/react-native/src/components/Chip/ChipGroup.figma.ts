// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=16247-1787
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Chip/ChipGroup.tsx
// component=ChipGroup

import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getBoolean('Label?', {
  true: instance.getString('Label'),
  false: undefined,
});

const chipLayers = instance.findLayers(n => n.type === 'INSTANCE' && n.name === 'Chip');
const chips = chipLayers
  .map(layer => (layer.type === 'INSTANCE' ? layer.executeTemplate().example : ''))
  .flat();

export default {
  id: 'ChipGroup',
  imports: ["import { ChipGroup } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ChipGroup${figma.helpers.react.renderProp('label', label)}>
  ${chips}
</ChipGroup>`,
  metadata: { nestable: true, props: { label } },
};
