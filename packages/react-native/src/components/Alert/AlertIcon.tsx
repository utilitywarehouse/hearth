import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import {
  WarningMediumContainedIcon,
  TickMediumContainedIcon,
  InformationMediumContainedIcon,
} from '@utilitywarehouse/react-native-icons';
import { useAlertContext } from './Alert.context';
import { Icon } from '../Icon';
import type IconProps from '../Icon/Icon.props';
import { IconRef } from '../../types';

const AlertIcon = forwardRef<IconRef, IconProps>(({ ...props }, ref) => {
  const { colorScheme } = useAlertContext();
  const asProp = useMemo(() => {
    if (colorScheme === 'red' || colorScheme === 'gold') {
      return WarningMediumContainedIcon;
    }
    if (colorScheme === 'green') {
      return TickMediumContainedIcon;
    }
    return InformationMediumContainedIcon;
  }, [colorScheme]);
  const color = useMemo(() => {
    if (colorScheme === 'cyan') {
      return '$cyan700';
    }
    if (colorScheme === 'red') {
      return '$red700';
    }
    if (colorScheme === 'green') {
      return '$green700';
    }
    if (colorScheme === 'gold') {
      return '$gold700';
    }
    return '$cyan700';
  }, [colorScheme]);
  return <Icon ref={ref} {...props} as={props.as ?? asProp} style={styles.icon} color={color} />;
});

AlertIcon.displayName = 'AlertIcon';

const styles = StyleSheet.create({
  icon: {
    width: 24,
    height: 24,
    minWidth: 24,
    minHeight: 24,
    alignSelf: 'flex-start',
  },
});

export default AlertIcon;
