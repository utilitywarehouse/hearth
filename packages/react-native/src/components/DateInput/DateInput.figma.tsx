import figma from '@figma/code-connect';
import { DateInput } from '../';

figma.connect(
  DateInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=2277%3A14708',
  {
    props: {
      hideDay: figma.boolean('Day?', {
        true: false,
        false: true,
      }),
      hideMonth: figma.boolean('Month?', {
        true: false,
        false: true,
      }),
      // hideYear: figma.boolean('Year?'),
      monthPlaceholder: figma.enum('Value type', {
        Placeholder: figma.boolean('Month?', {
          true: figma.string('Month value'),
        }),
      }),
      yearPlaceholder: figma.enum('Value type', {
        Placeholder: figma.string('Year value'),
      }),
      dayPlaceholder: figma.enum('Value type', {
        Placeholder: figma.boolean('Day?', {
          true: figma.string('Day value'),
        }),
      }),
      dayValue: figma.enum('Value type', {
        Filled: figma.boolean('Day?', {
          true: figma.string('Day value'),
        }),
      }),
      monthValue: figma.enum('Value type', {
        Filled: figma.boolean('Month?', {
          true: figma.string('Month value'),
        }),
      }),
      yearValue: figma.enum('Value type', {
        Filled: figma.string('Year value'),
      }),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
      readonly: figma.enum('State', {
        'Read-only': true,
      }),
      label: figma.string('Label'),
      helperText: figma.string('Helper text'),
      validText: figma.enum('State', {
        Valid: figma.string('Validation'),
      }),
      invalidText: figma.enum('State', {
        Invalid: figma.string('Validation'),
      }),
      validationStatus: figma.enum('State', {
        Default: undefined,
        Valid: 'valid',
        Invalid: 'invalid',
      }),
      // No matching props could be found for these Figma properties:
      // "labelVariant": figma.enum('Label variant', {
      //   "Body": "body",
      //   "Heading": "heading"
      // })
    },
    example: props => (
      <DateInput
        hideDay={props.hideDay}
        hideMonth={props.hideMonth}
        monthPlaceholder={props.monthPlaceholder}
        yearPlaceholder={props.yearPlaceholder}
        dayValue={props.dayValue}
        monthValue={props.monthValue}
        yearValue={props.yearValue}
        disabled={props.disabled}
        readonly={props.readonly}
        label={props.label}
        helperText={props.helperText}
        validText={props.validText}
        invalidText={props.invalidText}
        validationStatus={props.validationStatus}
      />
    ),
  }
);
