import figma from '@figma/code-connect';
import { TimePicker } from '../';

const selectedDate = '';
const handlePickerChange = () => {
  // Placeholder for onChange handler
};
const handleCancel = () => {
  // Placeholder for onCancel handler
};

const pickerRef = () => null;

figma.connect(
  TimePicker,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=10334-16770&t=Jg2fPJPQNzOyspmQ-4',
  {
    props: {
      use12Hours: figma.boolean('Use 12 hour'),
    },
    example: props => (
      <TimePicker
        ref={pickerRef}
        date={selectedDate}
        use12Hours={props.use12Hours}
        onChange={handlePickerChange}
        onCancel={handleCancel}
      />
    ),
  }
);
