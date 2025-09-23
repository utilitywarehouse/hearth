import { memo, useMemo } from 'react';
import { StyleSheet, View } from 'react-native';
import { isEqual } from '../../../../utils';
import NextButton from './next-button';
import PrevButton from './prev-button';
import Selectors from './selectors';
import type { HeaderProps, NavigationProps } from './types';

const createDefaultStyles = () =>
  StyleSheet.create({
    headerContainer: {
      paddingVertical: 3,
    },
    container: {
      padding: 5,
      gap: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    navigation: {
      flexDirection: 'row',
    },
  });

const NavigationButtons = ({ styles, classNames }: NavigationProps) => {
  const style = useMemo(() => createDefaultStyles(), []);

  return (
    <View style={style.navigation}>
      <PrevButton style={styles?.button_prev} imageStyle={styles?.button_prev_image} />
      <NextButton style={styles?.button_next} imageStyle={styles?.button_next_image} />
    </View>
  );
};

const Header = ({ navigationPosition = 'around', styles = {}, classNames = {} }: HeaderProps) => {
  const style = useMemo(() => createDefaultStyles(), []);

  return (
    <View style={[style.headerContainer, styles?.header]} className={classNames?.header}>
      <View style={style.container}>
        {navigationPosition === 'left' ? (
          <>
            <NavigationButtons styles={styles} classNames={classNames} />
            <Selectors position="left" />
          </>
        ) : navigationPosition === 'right' ? (
          <>
            <Selectors position="right" />
            <NavigationButtons styles={styles} classNames={classNames} />
          </>
        ) : (
          <>
            <PrevButton style={styles?.button_prev} imageStyle={styles?.button_prev_image} />
            <Selectors position="around" />
            <NextButton style={styles?.button_next} imageStyle={styles?.button_next_image} />
          </>
        )}
      </View>
    </View>
  );
};

const customComparator = (prev: Readonly<HeaderProps>, next: Readonly<HeaderProps>) => {
  const areEqual =
    prev.PrevIcon === next.PrevIcon &&
    prev.NextIcon === next.NextIcon &&
    prev.navigationPosition === next.navigationPosition &&
    isEqual(prev.styles, next.styles) &&
    isEqual(prev.classNames, next.classNames);

  return areEqual;
};

export default memo(Header, customComparator);
