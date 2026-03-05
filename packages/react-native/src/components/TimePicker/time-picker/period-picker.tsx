import { Platform } from 'react-native';
import PeriodNative from './period-native';
import PeriodWeb from './period-web';

type PeriodProps = {
  value: string;
  setValue?: (value: any) => void;
};

const PeriodPicker = (props: PeriodProps) => {
  const Component = Platform.OS === 'web' ? PeriodWeb : PeriodNative;
  return <Component {...props} />;
};

export default PeriodPicker;
