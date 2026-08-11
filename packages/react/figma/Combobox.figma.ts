// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=9359-2923&m=dev
// source=../src/components/Combobox/Combobox.tsx
// component=Combobox
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
const validationStatus = instance.getEnum('Variant', {
  Default: undefined,
  Invalid: 'invalid',
  Loading: undefined,
});
const validationText = validationStatus ? instance.getString('Validation') : undefined;
const loading = instance.getEnum('Variant', {
  Default: false,
  Invalid: false,
  Loading: true,
});
const required = instance.getBoolean('Optional?', {
  true: false,
  false: true,
});
const valueType = instance.getEnum('Value type', { Placeholder: 'placeholder' });
const placeholder = valueType === 'placeholder' ? instance.getString('Value') : undefined;

export default {
  example: figma.code`<Combobox${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('validationText', validationText)}${figma.helpers.react.renderProp('loading', loading)}${figma.helpers.react.renderProp('required', required)}${figma.helpers.react.renderProp('placeholder', placeholder)}/>`,
  imports: ['import { Combobox } from "@utilitywarehouse/hearth-react"'],
  id: 'combobox',
  metadata: { nestable: true },
};
