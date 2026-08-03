// url=https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2277%3A14708
// source=https://github.com/utilitywarehouse/hearth/blob/main/packages/react-native/src/components/DateInput/DateInput.tsx
// component=DateInput

import figma from 'figma';

const required = figma.selectedInstance.getBoolean('Optional?', {
  true: false,
  false: true,
});
const hideDay = figma.selectedInstance.getBoolean('Day?', {
  true: false,
  false: true,
});
const hideMonth = figma.selectedInstance.getBoolean('Month?', {
  true: false,
  false: true,
});
const monthPlaceholder = figma.selectedInstance.getEnum('Value type', {
  Placeholder: figma.selectedInstance.getBoolean('Month?', {
    true: figma.selectedInstance.getString('Month value'),
  }),
});
const yearPlaceholder = figma.selectedInstance.getEnum('Value type', {
  Placeholder: figma.selectedInstance.getString('Year value'),
});
const dayPlaceholder = figma.selectedInstance.getEnum('Value type', {
  Placeholder: figma.selectedInstance.getBoolean('Day?', {
    true: figma.selectedInstance.getString('Day value'),
  }),
});
const dayValue = figma.selectedInstance.getEnum('Value type', {
  Filled: figma.selectedInstance.getBoolean('Day?', {
    true: figma.selectedInstance.getString('Day value'),
  }),
});
const monthValue = figma.selectedInstance.getEnum('Value type', {
  Filled: figma.selectedInstance.getBoolean('Month?', {
    true: figma.selectedInstance.getString('Month value'),
  }),
});
const yearValue = figma.selectedInstance.getEnum('Value type', {
  Filled: figma.selectedInstance.getString('Year value'),
});
const disabled = figma.selectedInstance.getEnum('State', {
  Disabled: true,
});
const readonly = figma.selectedInstance.getEnum('State', {
  'Read-only': true,
});
const label = figma.selectedInstance.getString('Label');
const helperText = figma.selectedInstance.getString('Helper text');
const validText = figma.selectedInstance.getEnum('State', {
  Valid: figma.selectedInstance.getString('Validation'),
});
const invalidText = figma.selectedInstance.getEnum('State', {
  Invalid: figma.selectedInstance.getString('Validation'),
});
const validationStatus = figma.selectedInstance.getEnum('State', {
  Default: undefined,
  Valid: 'valid',
  Invalid: 'invalid',
});

export default {
  id: 'DateInput',
  imports: ["import { DateInput } from '@utilitywarehouse/hearth-react-native';"],
  example: figma.code`<DateInput${figma.helpers.react.renderProp(
    'required',
    required
  )}${figma.helpers.react.renderProp('hideDay', hideDay)}${figma.helpers.react.renderProp(
    'hideMonth',
    hideMonth
  )}${figma.helpers.react.renderProp(
    'monthPlaceholder',
    monthPlaceholder
  )}${figma.helpers.react.renderProp(
    'yearPlaceholder',
    yearPlaceholder
  )}${figma.helpers.react.renderProp('dayValue', dayValue)}${figma.helpers.react.renderProp(
    'monthValue',
    monthValue
  )}${figma.helpers.react.renderProp('yearValue', yearValue)}${figma.helpers.react.renderProp(
    'disabled',
    disabled
  )}${figma.helpers.react.renderProp('readonly', readonly)}${figma.helpers.react.renderProp(
    'label',
    label
  )}${figma.helpers.react.renderProp('helperText', helperText)}${figma.helpers.react.renderProp(
    'validText',
    validText
  )}${figma.helpers.react.renderProp('invalidText', invalidText)}${figma.helpers.react.renderProp(
    'validationStatus',
    validationStatus
  )}/>`,
  metadata: {
    nestable: true,
    props: {
      required,
      hideDay,
      hideMonth,
      monthPlaceholder,
      yearPlaceholder,
      dayPlaceholder,
      dayValue,
      monthValue,
      yearValue,
      disabled,
      readonly,
      label,
      helperText,
      validText,
      invalidText,
      validationStatus,
    },
  },
};
