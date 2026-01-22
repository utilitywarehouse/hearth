import figma from '@figma/code-connect';
import { DatePickerInput } from '../';

figma.connect(
  DatePickerInput,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR?node-id=3917%3A7057',
  {
    props: {},
    example: props => <DatePickerInput />,
  }
);
