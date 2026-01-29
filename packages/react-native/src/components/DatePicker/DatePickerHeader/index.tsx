import { memo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { HeaderProps } from './DatePickerHeader.props';
import NextButton from './DatePickerNextButton';
import PrevButton from './DatePickerPrevButton';
import Selectors from './DatePickerSelectors';

const NavigationButtons = () => (
  <View style={styles.navigation}>
    <PrevButton />
    <NextButton />
  </View>
);

const Header = ({ navigationPosition = 'around' }: HeaderProps) => (
  <View style={[styles.headerContainer]}>
    <View style={styles.container}>
      {navigationPosition === 'left' ? (
        <>
          <NavigationButtons />
          <Selectors position="left" />
        </>
      ) : navigationPosition === 'right' ? (
        <>
          <Selectors position="right" />
          <NavigationButtons />
        </>
      ) : (
        <>
          <PrevButton />
          <Selectors position="around" />
          <NextButton />
        </>
      )}
    </View>
  </View>
);

const styles = StyleSheet.create(theme => ({
  headerContainer: {
    paddingVertical: 3,
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  navigation: {
    flexDirection: 'row',
    gap: theme.components.datePicker.header.controlGap,
  },
}));

const customComparator = (prev: Readonly<HeaderProps>, next: Readonly<HeaderProps>) => {
  const areEqual =
    prev.PrevIcon === next.PrevIcon &&
    prev.NextIcon === next.NextIcon &&
    prev.navigationPosition === next.navigationPosition;

  return areEqual;
};

export default memo(Header, customComparator);
