import { memo } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../../BodyText';

interface PeriodProps {
  value: string;
  setValue?: (value: any) => void;
}

const PeriodWeb = ({ value, setValue = () => {} }: PeriodProps) => {
  return (
    <Pressable onPress={() => setValue(value == 'AM' ? 'PM' : 'AM')}>
      <View style={[styles.period]}>
        <BodyText size="lg">{value}</BodyText>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  period: {
    width: 65,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const customComparator = (prev: Readonly<PeriodProps>, next: Readonly<PeriodProps>) => {
  const areEqual = prev.value === next.value && prev.setValue === next.setValue;

  return areEqual;
};

export default memo(PeriodWeb, customComparator);
