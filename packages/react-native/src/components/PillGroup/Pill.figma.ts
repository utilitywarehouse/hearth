// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=4348%3A15595
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/PillGroup/Pill.tsx
// component=Pill

import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const icon = instance.getBoolean('Icon?', {
  true: instance.getInstanceSwap('Icon-20')?.executeTemplate().example,
});

export default {
  id: 'Pill',
  imports: ["import { Pill } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Pill${figma.helpers.react.renderProp(
    'value',
    label
  )}${figma.helpers.react.renderProp('label', label)}${icon ? ` icon={${icon}}` : ''}/>`,
  metadata: { nestable: true, props: { label, icon } },
};
