// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6185-1021&m=dev
// source=../src/components/SegmentedControl/SegmentedControl.tsx
// component=SegmentedControl
import figma from 'figma';
const instance = figma.selectedInstance;

const size = instance.getEnum('Size', {
  'SM-32': 'sm',
  'MD-48': 'md',
});

const optionLayers = instance.findLayers(n => n.type === 'INSTANCE');
const option0 = optionLayers[0]?.type === 'INSTANCE' ? optionLayers[0].executeTemplate().example : undefined;
const option1 = optionLayers[1]?.type === 'INSTANCE' ? optionLayers[1].executeTemplate().example : undefined;
const option2 = optionLayers[2]?.type === 'INSTANCE' ? optionLayers[2].executeTemplate().example : undefined;

export default {
  example: figma.code`<SegmentedControl size="${size}" defaultValue={[/* first option value */]}>
  ${option0}${option1}${option2}
</SegmentedControl>`,
  imports: [
    'import { SegmentedControl, SegmentedControlOption } from "@utilitywarehouse/hearth-react"',
  ],
  id: 'segmented-control',
};
