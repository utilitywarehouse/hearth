// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=6056%3A1987
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/ProgressStepper/ProgressStep.tsx
// component=ProgressStep

import figma from 'figma';

const status = figma.selectedInstance.getEnum('State', {
  Complete: 'complete',
  Active: 'active',
  Incomplete: 'incomplete',
});
const label = figma.selectedInstance.getString('Label');
const id = figma.selectedInstance.getString('Step number');

export default {
  id: 'ProgressStep',
  imports: ["import { ProgressStep } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ProgressStep${figma.helpers.react.renderProp(
    'id',
    id
  )}${figma.helpers.react.renderProp('status', status)}/>`,
  metadata: { nestable: true, props: { status, label, id } },
};
