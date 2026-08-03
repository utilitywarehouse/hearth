// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3044%3A243
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Switch/Switch.tsx
// component=Switch

import figma from 'figma';

const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
const checked = figma.selectedInstance.getBoolean('Checked?');
const size = figma.selectedInstance.getEnum('Size', {
  'MD-32': 'md',
  'SM-24': 'sm',
});

export default {
  id: 'switch',
  imports: ["import { Switch } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Switch${figma.helpers.react.renderProp(
    'value',
    checked
  )}${figma.helpers.react.renderProp('disabled', disabled)}${figma.helpers.react.renderProp(
    'size',
    size
  )}/>`,
  metadata: { nestable: true, props: { disabled, checked, size } },
};
