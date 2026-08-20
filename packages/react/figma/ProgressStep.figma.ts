// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6056-1987&m=dev
// source=../src/components/ProgressStepper/ProgressStep.tsx
// component=ProgressStep
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const status = instance.getEnum('State', {
  Complete: 'complete',
  Active: 'active',
  Incomplete: 'incomplete',
});

export default {
  example: figma.code`<ProgressStep label="${label}"${figma.helpers.react.renderProp('status', status)} />`,
  imports: ['import { ProgressStep } from "@utilitywarehouse/hearth-react"'],
  id: 'progress-step',
  metadata: { nestable: true },
};
