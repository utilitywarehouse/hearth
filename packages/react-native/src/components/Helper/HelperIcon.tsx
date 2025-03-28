import React, { forwardRef } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { SvgRef } from '../../types';
import IconProps from '../Icon/Icon.props';
import { useHelperContext } from './HelperContext';
import { Platform, StyleProp, ViewStyle } from 'react-native';

const HelperIcon = forwardRef<SvgRef, IconProps>(({ style, ...props }, ref) => {
  const { validationStatus } = useHelperContext();
  styles.useVariants({ validationStatus });

  return (
    <Icon
      ref={ref}
      style={
        Platform.OS === 'web'
          ? StyleSheet.compose(styles.icon as StyleProp<ViewStyle>, style)
          : [styles.icon as StyleProp<ViewStyle>, style]
      }
      {...props}
    />
  );
});

HelperIcon.displayName = 'HelperIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    width: 20,
    height: 20,
    variants: {
      validationStatus: {
        valid: {
          color: theme.components.text.colorValid,
        },
        invalid: {
          color: theme.components.text.colorInvalid,
        },
        initial: {},
      },
    },
  },
}));

export default HelperIcon;
