// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3224-995&m=dev
// source=../src/components/Select/Select.tsx
// component=Select
import figma from 'figma';
const instance = figma.selectedInstance;

const label = instance.getString('Label');
const labelVariant = instance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const helperText = instance.getBoolean('Helper text?', {
  true: instance.getString('Helper text'),
  false: undefined,
});
// Read-only is deliberately unmapped: SelectProps has no read-only equivalent.
const variant = instance.getEnum('Variant', {
  Disabled: 'disabled',
  Invalid: 'invalid',
  Valid: 'valid',
});
const disabled = variant === 'disabled';
const validationStatus = variant === 'invalid' || variant === 'valid' ? variant : undefined;
const validationText = validationStatus ? instance.getString('Validation') : undefined;
const required = instance.getBoolean('Optional?', {
  true: false,
  false: true,
});
const valueType = instance.getEnum('Value type', { Placeholder: 'placeholder' });
const placeholder = valueType === 'placeholder' ? instance.getString('Value') : undefined;

export default {
  example: figma.code`<Select${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp('labelVariant', labelVariant)}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp('validationText', validationText)}${figma.helpers.react.renderProp('validationStatus', validationStatus)}${figma.helpers.react.renderProp('required', required)}${figma.helpers.react.renderProp('disabled', disabled)}${figma.helpers.react.renderProp('placeholder', placeholder)}>
    <SelectItem value="1">Item 1</SelectItem>
    <SelectItem value="2">Item 2</SelectItem>
    <SelectItem value="3">Item 3</SelectItem>
  </Select>`,
  imports: [
    'import { Select } from "@utilitywarehouse/hearth-react"',
    'import { SelectItem } from "@utilitywarehouse/hearth-react"',
  ],
  id: 'select',
  metadata: { nestable: true },
};
