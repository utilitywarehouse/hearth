// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7863-3977&m=dev
// source=../src/components/ProgressBar/ProgressBar.tsx
// component=ProgressBar
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const colorScheme = instance.getEnum('Color Scheme', {
  Default: 'default',
  Success: 'success',
  Danger: 'danger',
});
const size = instance.getEnum('Size', {
  'MD-140': 'md',
  'SM-80': 'sm',
});

export default {
  example: figma.code`<ProgressBar label="${label}"${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp('size', size)} value={10} variant="circular" />`,
  imports: ['import { ProgressBar } from "@utilitywarehouse/hearth-react"'],
  id: 'progress-bar-circular',
};

