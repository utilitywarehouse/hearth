// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=4348%3A15595
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/PillGroup/Pill.tsx
// component=Pill

import figma from 'figma';

const instance = figma.selectedInstance;

const label = instance.getString('Label');
const iconName = instance.getBoolean('Icon?', {
  true: instance.getInstanceSwap('Icon-20')?.executeTemplate().metadata?.props?.componentName as
    | string
    | undefined,
});
const icon = iconName ? figma.helpers.react.reactComponent(iconName) : undefined;

export default {
  id: 'Pill',
  imports: [
    "import { Pill } from '@utilitywarehouse/hearth-react-native';",
    ...(iconName
      ? [`import { ${iconName} } from '@utilitywarehouse/hearth-react-native-icons';`]
      : []),
  ],
  example: figma.code`<Pill${figma.helpers.react.renderProp(
    'value',
    label
  )}${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp(
    'icon',
    icon
  )}/>`,
  metadata: { nestable: true, props: { label, icon } },
};
