// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=7849-5704
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/ProgressBar/ProgressBar.tsx
// component=ProgressBar

import figma from 'figma';

const value = figma.selectedInstance.getEnum('Progress', {
  '0%': 0,
  '10%': 10,
  '20%': 20,
  '30%': 30,
  '40%': 40,
  '50%': 50,
  '60%': 60,
  '70%': 70,
  '80%': 80,
  '90%': 90,
  '100%': 100,
});
const colorScheme = figma.selectedInstance.getEnum('Color Scheme', {
  Default: 'default',
  Success: 'success',
  Danger: 'danger',
});
const label = figma.selectedInstance.getBoolean('Label?', {
  true: figma.selectedInstance.getString('Label'),
});

export default {
  id: 'progress-bar-linear',
  imports: ["import { ProgressBar } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<ProgressBar variant="linear"${figma.helpers.react.renderProp(
    'value',
    value
  )}${figma.helpers.react.renderProp('colorScheme', colorScheme)}${figma.helpers.react.renderProp(
    'label',
    label
  )}/>`,
  metadata: { nestable: true, props: { value, colorScheme, label } },
};
