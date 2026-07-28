// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=8364%3A1546
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/FormField/FormField.tsx
// component=FormField

import figma from 'figma';

const instance = figma.selectedInstance;

const labelInstance = instance.findInstance('Label');
// @ts-expect-error - findInstance returns ErrorHandle | InstanceHandle, but we know it will be InstanceHandle in practice
const label = labelInstance?.getString('Label');
// @ts-expect-error - findInstance returns ErrorHandle | InstanceHandle, but we know it will be InstanceHandle in practice
const required = !labelInstance?.getBoolean('Optional?');

const showHelperText = instance.getBoolean('Helper text?');
const helperTextInstance = instance.findInstance('Helper Text');
// @ts-expect-error - findInstance returns ErrorHandle | InstanceHandle, but we know it will be InstanceHandle in practice
const helperText = showHelperText ? helperTextInstance?.getString('Helper text') : undefined;

export default {
  id: 'formfield',
  imports: ['import { FormField } from "@utilitywarehouse/hearth-react-native";'],
  example: figma.code`<FormField${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('required', required)}${figma.helpers.react.renderProp(
    'helperText',
    helperText
  )} />`,
  metadata: {
    nestable: true,
    props: {
      label,
      required,
      helperText,
    },
  },
};
