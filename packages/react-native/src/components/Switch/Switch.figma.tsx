import figma from '@figma/code-connect';
import { Switch } from '../';

figma.connect(Switch, 'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3044%3A243', {
  props: {
    disabled: figma.enum('State', {
      Disabled: true,
    }),
    checked: figma.boolean('Checked?'),
    size: figma.enum('Size', {
      'MD-32': 'medium',
      'SM-24': 'small',
    }),
  },
  example: props => <Switch value={props.checked} disabled={props.disabled} size={props.size} />,
});
