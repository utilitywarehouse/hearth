import { memo } from 'react';
import { Pressable, StyleSheet, View } from 'react-native';
import { isEqual } from '../../../../utils';
import { BodyText } from '../../../BodyText';
import { ClassNames, Styles } from '../../types';

interface PeriodProps {
  value: string;
  setValue?: (value: any) => void;
  styles?: Styles;
  classNames?: ClassNames;
}

const PeriodWeb = ({ value, setValue = () => {}, styles, classNames }: PeriodProps) => {
  return (
    <Pressable onPress={() => setValue(value == 'AM' ? 'PM' : 'AM')}>
      <View
        style={[defaultStyles.period, styles?.time_selected_indicator]}
        className={classNames?.time_selected_indicator}
      >
        <BodyText style={styles?.time_label} className={classNames?.time_label}>
          {value}
        </BodyText>
      </View>
    </Pressable>
  );
};

const defaultStyles = StyleSheet.create({
  period: {
    width: 65,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const customComparator = (prev: Readonly<PeriodProps>, next: Readonly<PeriodProps>) => {
  const areEqual =
    prev.value === next.value &&
    prev.setValue === next.setValue &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames);

  return areEqual;
};

export default memo(PeriodWeb, customComparator);
