// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10612%3A1860&m=dev
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/StepperInput/StepperInput.tsx
// component=StepperInput

import figma from 'figma';

const value = figma.selectedInstance.getString('Value');
const label = figma.selectedInstance.getString('Label');
const labelVariant = figma.selectedInstance.getEnum('Label variant', {
  Body: 'body',
  Heading: 'heading',
});
const helperText = figma.selectedInstance.getBoolean('Helper text?', {
  true: figma.selectedInstance.getString('Helper text'),
  false: undefined,
});
const validationStatus = figma.selectedInstance.getEnum('State', {
  Default: 'initial',
  Invalid: 'invalid',
});
const invalidText = figma.selectedInstance.getEnum('State', {
  Default: undefined,
  Invalid: figma.selectedInstance.getString('Validation'),
});
const focused = figma.selectedInstance.getEnum('Focus?', { True: true });

export default {
  id: 'StepperInput',
  imports: ["import { StepperInput } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<StepperInput${figma.helpers.react.renderProp(
    'value',
    value
  )}${figma.helpers.react.renderProp('label', label)}${figma.helpers.react.renderProp(
    'labelVariant',
    labelVariant
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}${figma.helpers.react.renderProp(
    'focused',
    focused
  )} onChangeText={() => {}}/>`,
  metadata: {
    nestable: true,
    props: { value, label, labelVariant, helperText, validationStatus, invalidText, focused },
  },
};
