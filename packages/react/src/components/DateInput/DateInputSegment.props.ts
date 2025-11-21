import { InputBaseProps } from '../InputBase/InputBase.props';
import { DateInputProps } from './DateInput.props';

export type DateInputSegmentProps = InputBaseProps &
  Pick<DateInputProps, 'validationText' | 'label' | 'helperText'>;
