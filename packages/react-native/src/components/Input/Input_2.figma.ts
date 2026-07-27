// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=2161-1311&t=3uUSBVdxldgG5uz3-4
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/Input/Input.tsx
// component=Input

import figma from 'figma';

const loading = figma.selectedInstance.getEnum('State', {
  Loading: true,
});
const placeholder = figma.selectedInstance.getEnum('State', {
  Placeholder: figma.selectedInstance.getString('Value'),
});
const value = figma.selectedInstance.getEnum('State', {
  Filled: figma.selectedInstance.getString('Value'),
});
const label = figma.selectedInstance.getBoolean('Label?', {
  true: figma.selectedInstance.getString('Label'),
});
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
});

export default {
  id: 'Input',
  imports: ["import { Input } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<Input type="search"${figma.helpers.react.renderProp(
    'loading',
    loading
  )}${figma.helpers.react.renderProp('placeholder', placeholder)}${figma.helpers.react.renderProp(
    'value',
    value
  )}${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )}/>`,
  metadata: {
    nestable: true,
    props: {
      loading,
      placeholder,
      value,
      label,
      helperText,
    },
  },
};
