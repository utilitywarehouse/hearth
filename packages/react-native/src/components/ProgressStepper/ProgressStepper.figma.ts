// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=6056%3A2000
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/ProgressStepper/ProgressStepper.tsx
// component=ProgressStepper

import figma from 'figma';

const childLayers = figma.selectedInstance.findLayers(n => n.type === 'INSTANCE');
const steps = childLayers
  .filter(layer => layer.type === 'INSTANCE')
  .map(layer => layer.executeTemplate().example);

export default {
  id: 'ProgressStepper',
  imports: ["import { ProgressStepper } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ProgressStepper>${steps.flat()}</ProgressStepper>`,
  metadata: { nestable: true, props: { steps } },
};
