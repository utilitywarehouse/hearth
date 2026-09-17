// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=17380-345&m=dev
// source=./ProgressStepperText.tsx
// component=ProgressStepperText
import figma from 'figma';
const instance = figma.selectedInstance;

const currentStep = instance.getString('Current step');
const totalSteps = instance.getString('Number of steps');

export default {
  example: figma.code`<ProgressStepperText currentStep={${currentStep}} totalSteps={${totalSteps}} />`,
  imports: ['import { ProgressStepperText } from "@utilitywarehouse/hearth-react"'],
  id: 'progress-stepper-text',
};
