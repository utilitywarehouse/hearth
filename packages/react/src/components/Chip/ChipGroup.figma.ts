// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=16247-1787&m=dev
// source=./ChipGroup.tsx
// component=ChipGroup
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getBoolean('Label?', {
  true: instance.getString('Label'),
  false: undefined,
});

export default {
  example: figma.code`<ChipGroup${figma.helpers.react.renderProp('label', label)}>{/* Chip children */}</ChipGroup>`,
  imports: ['import { ChipGroup } from "@utilitywarehouse/hearth-react"'],
  id: 'chip-group',
};
