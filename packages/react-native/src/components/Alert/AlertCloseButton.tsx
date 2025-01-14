import React, { ComponentProps, forwardRef, useMemo } from 'react';
import { Pressable, type PressableProps } from 'react-native';
import { StyleSheet, Variants } from 'react-native-unistyles';
import { CloseSmallIcon } from '@utilitywarehouse/react-native-icons';
import { useAlertContext } from './Alert.context';
import { PressableRef } from '../../types';
import { Icon } from '../Icon';

const AlertCloseButton = forwardRef<PressableRef, PressableProps>(({ children, ...props }, ref) => {
  return (
    <Pressable ref={ref} {...props} style={[styles.container]}>
      {children}
    </Pressable>
  );
});

export const AlertCloseButtonIcon: React.FC<ComponentProps<typeof CloseSmallIcon>> = ({
  ...props
}) => {
  const { colorScheme } = useAlertContext();
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
  return (
    <Variants variants={{ colorScheme }}>
      <Icon as={CloseSmallIcon} {...props} style={styles.icon} color={color} />
    </Variants>
  );
};

AlertCloseButton.displayName = 'AlertCloseButton';
AlertCloseButtonIcon.displayName = 'AlertCloseButtonIcon';

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    minWidth: 24,
    minHeight: 24,
    padding: 0,
    display: 'flex',
    alignContent: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  icon: {
    width: 16,
    height: 16,
    minWidth: 16,
    minHeight: 16,
    alignSelf: 'center',
  },
});

export default AlertCloseButton;
