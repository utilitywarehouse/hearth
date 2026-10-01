// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=17380%3A345
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/ProgressStepper/ProgressStepperText.tsx
// component=ProgressStepperText

import figma from 'figma';

const currentStep = figma.selectedInstance.getString('Current step');
const totalSteps = figma.selectedInstance.getString('Total steps');

export default {
  id: 'ProgressStepperText',
  imports: ["import { ProgressStepperText } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ProgressStepperText currentStep={${currentStep}} totalSteps={${totalSteps}} />`,
  metadata: { nestable: true, props: { currentStep, totalSteps } },
};
