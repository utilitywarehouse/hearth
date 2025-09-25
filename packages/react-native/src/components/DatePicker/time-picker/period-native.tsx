import { memo } from 'react';
import { PickerOption } from '../DatePicker.props';
import WheelPicker from './wheel-picker';

interface PeriodProps {
  value: string;
  setValue?: (value: any) => void;
}

const options: PickerOption[] = [
  { value: 'AM', text: 'AM' },
  { value: 'PM', text: 'PM' },
];

const PeriodNative = ({ value, setValue = () => {} }: PeriodProps) => {
  return (
    <WheelPicker
      value={value}
      options={options}
      onChange={setValue}
      //containerStyle={defaultStyles.container}
      itemHeight={44}
      decelerationRate="fast"
    />
  );
};

const customComparator = (prev: Readonly<PeriodProps>, next: Readonly<PeriodProps>) => {
  const areEqual = prev.value === next.value && prev.setValue === next.setValue;

  return areEqual;
};

export default memo(PeriodNative, customComparator);
