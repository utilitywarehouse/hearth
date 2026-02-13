import figma from '@figma/code-connect';
import { SelectOption } from '../';

figma.connect(
  SelectOption,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=4340%3A1252',
  {
    props: {
      label: figma.string('Label'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: props => (
      <SelectOption label={props.label} value="some value" disabled={props.disabled} />
    ),
  }
);
