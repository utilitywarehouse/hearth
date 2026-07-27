// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3394-3663&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Select/SelectOption.tsx
// component=SelectOption

import figma from 'figma';

const label = figma.selectedInstance.getString('Text');
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
const selected = figma.selectedInstance.getBoolean('Selected?#3481:0');

export default {
  id: 'SelectOption',
  imports: ["import { SelectOption } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<SelectOption${figma.helpers.react.renderProp(
    'label',
    label
  )} value="some value"${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('selected', selected)}/>`,
  metadata: {
    nestable: true,
    props: {
      label,
      disabled,
      selected,
    },
  },
};
