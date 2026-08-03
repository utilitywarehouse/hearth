// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6185-1021&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/SegmentedControl/SegmentedControl.tsx
// component=SegmentedControl

import figma from 'figma';

const size = figma.selectedInstance.getEnum('Size', {
  'SM-32': 'sm',
  'MD-48': 'md',
});
const optionLayers = figma.selectedInstance.findLayers(n => n.type === 'INSTANCE');
const option0 =
  optionLayers[0]?.type === 'INSTANCE' ? optionLayers[0].executeTemplate().example : undefined;
const option1 =
  optionLayers[1]?.type === 'INSTANCE' ? optionLayers[1].executeTemplate().example : undefined;
const option2 =
  optionLayers[2]?.type === 'INSTANCE' ? optionLayers[2].executeTemplate().example : undefined;

export default {
  id: 'segmented-control',
  imports: ["import { SegmentedControl } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<SegmentedControl defaultValue="option-1"${figma.helpers.react.renderProp(
    'size',
    size
  )}>
        ${option0}${option1}${option2}
      </SegmentedControl>`,
  metadata: { nestable: true, props: { size, option0, option1, option2 } },
};
