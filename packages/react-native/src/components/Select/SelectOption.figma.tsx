import figma from '@figma/code-connect';
import { SelectOption } from '../';

figma.connect(
  SelectOption,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3394-3663&m=dev',
  {
    props: {
      label: figma.string('Text'),
      disabled: figma.enum('State', {
        Disabled: true,
      }),
    },
    example: props => (
      <SelectOption label={props.label} value="some value" disabled={props.disabled} />
    ),
  }
);
