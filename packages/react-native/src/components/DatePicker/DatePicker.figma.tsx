import figma from '@figma/code-connect';
import { DatePicker } from '../';

const selectedDate = '';
const handlePickerChange = () => {
  // Placeholder for onChange handler
};
const handleCancel = () => {
  // Placeholder for onCancel handler
};

const pickerRef = () => null;

figma.connect(
  DatePicker,
  'https://www.figma.com/design/6NKZXZhFSExXrcbBgc6zTR/Hearth-Components---Tokens?node-id=3797-6383&m=dev',
  {
    props: {
      // "grabber": figma.boolean('Grabber?'),
      header: figma.boolean('Header?', {
        true: false,
        false: true,
      }),
      footer: figma.boolean('Footer?', {
        true: false,
        false: true,
      }),
      initialView: figma.enum('Type', {
        Day: undefined,
        Month: 'month',
        Year: 'year',
      }),
    },
    example: props => (
      <DatePicker
        ref={pickerRef}
        mode="single"
        date={selectedDate}
        hideFooter={props.footer}
        hideHeader={props.header}
        initialView={props.initialView}
        onChange={handlePickerChange}
        onCancel={handleCancel}
      />
    ),
  }
);
