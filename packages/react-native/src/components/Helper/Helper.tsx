import React, { forwardRef, useMemo } from 'react';
import { StyleSheet } from 'react-native-unistyles';
import { View } from 'react-native';
import {
  WarningMediumContainedIcon,
  TickMediumContainedIcon,
} from '@utilitywarehouse/react-native-icons';
import HelperProps from './Helper.props';
import { HelperContext } from './HelperContext';
import HelperIcon from './HelperIcon';
import HelperText from './HelperText';

const Helper = forwardRef<View, HelperProps>(
  (
    { children, validationStatus = 'initial', showIcon, style, disabled, icon, text, ...props },
    ref
  ) => {
    styles.useVariants({ disabled });
    let Icon = icon;
    if (validationStatus === 'valid' && !icon) {
      Icon = TickMediumContainedIcon;
    }
    if (validationStatus === 'invalid' && !icon) {
      Icon = WarningMediumContainedIcon;
    }

    const value = useMemo(() => ({ validationStatus, disabled }), [validationStatus, disabled]);

    return (
      <HelperContext.Provider value={value}>
        <View ref={ref} style={styles.container}>
          {children ? (
            children
          ) : (
            <>
              {showIcon && <HelperIcon as={Icon} />}
              <HelperText ref={ref} {...props}>
                {text}
              </HelperText>
            </>
          )}
        </View>
      </HelperContext.Provider>
    );
  }
);

Helper.displayName = 'Helper';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.formField.helper.gap,
    alignItems: 'center',
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default Helper;
