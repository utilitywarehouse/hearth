// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=6056-2000&m=dev
// source=../src/components/ProgressStepper/ProgressStepper.tsx
// component=ProgressStepper
import figma from 'figma';
const instance = figma.selectedInstance;

// Step is a plain nested instance, not a Figma Slot property (Progress Stepper's own live
// properties are empty) - use findLayers()+executeTemplate(), matching SegmentedControl.figma.ts.
const stepLayers = instance.findLayers(n => n.type === 'INSTANCE' && n.name === 'Step');
const steps = stepLayers
  .map(item => (item.type === 'INSTANCE' ? item.executeTemplate().example : undefined))
  .filter(Boolean);

export default {
  example: figma.code`<ProgressStepper>${steps.flat()}</ProgressStepper>`,
  imports: ['import { ProgressStepper } from "@utilitywarehouse/hearth-react"'],
  id: 'progress-stepper',
};

