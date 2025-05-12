import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import {
  WarningMediumIcon,
  TickCircleMediumIcon,
  InfoMediumIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useAlertContext } from './Alert.context';
import { Icon } from '../Icon';
import type IconProps from '../Icon/Icon.props';
import { IconRef } from '../../types';

const AlertIcon = forwardRef<IconRef, IconProps>(({ ...props }, ref) => {
  const { colorScheme } = useAlertContext();
  const asProp = useMemo(() => {
    if (colorScheme === 'red' || colorScheme === 'orange') {
      return WarningMediumIcon;
    }
    if (colorScheme === 'green') {
      return TickCircleMediumIcon;
    }
    return InfoMediumIcon;
  }, [colorScheme]);
  return <Icon ref={ref} {...props} as={props.as ?? asProp} style={styles.icon} />;
});

AlertIcon.displayName = 'AlertIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    width: 24,
    height: 24,
    minWidth: 24,
    minHeight: 24,
    alignSelf: 'flex-start',
    color: theme.components.icon.color,
  },
}));

export default AlertIcon;
