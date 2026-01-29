import figma from '@figma/code-connect';
import { Checkbox } from './Checkbox';

figma.connect(Checkbox, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3087-7316', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    checked: figma.boolean('Checked?'),
    label: figma.string('Label'),
    helperText: figma.boolean('Helper text?', {
      true: figma.string('Helper text'),
      false: undefined,
    }),
    validationText: figma.string('Validation text'),
  },
  example: props => (
    <Checkbox
      disabled={props.disabled}
      checked={props.checked}
      label={props.label}
      helperText={props.helperText}
      invalidText={props.validationText}
    />
  ),
});
