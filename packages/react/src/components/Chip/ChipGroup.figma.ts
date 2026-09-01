// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=16247-1787&m=dev
// source=./ChipGroup.tsx
// component=ChipGroup
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getBoolean('Label?', {
  true: instance.getString('Label'),
  false: undefined,
});

const chipLayers = instance.findLayers(n => n.type === 'INSTANCE' && n.name === 'Chip');
const children = chipLayers
  .map(chip => (chip.type === 'INSTANCE' ? chip.executeTemplate().example : undefined))
  .filter(Boolean);

export default {
  example: figma.code`<ChipGroup${figma.helpers.react.renderProp('label', label)}>${children.flat()}</ChipGroup>`,
  imports: ['import { ChipGroup } from "@utilitywarehouse/hearth-react"'],
  id: 'chip-group',
};
