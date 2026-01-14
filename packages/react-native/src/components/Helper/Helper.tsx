import {
  ErrorCircleSmallIcon,
  TickCircleSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import HelperProps from './Helper.props';
import { HelperContext } from './HelperContext';
import HelperIcon from './HelperIcon';
import HelperText from './HelperText';

const Helper = ({
  children,
  validationStatus = 'initial',
  showIcon,
  disabled,
  icon,
  text,
  ...props
}: HelperProps) => {
  styles.useVariants({ disabled });
  let Icon = icon;
  if (validationStatus === 'valid' && !icon) {
    Icon = TickCircleSmallIcon;
  }
  if (validationStatus === 'invalid' && !icon) {
    Icon = ErrorCircleSmallIcon;
  }

  const value = useMemo(() => ({ validationStatus, disabled }), [validationStatus, disabled]);

  return (
    <HelperContext.Provider value={value}>
      <View style={styles.container}>
        {children ? (
          children
        ) : (
          <>
            {showIcon && <HelperIcon as={Icon} />}
            <HelperText {...props}>{text}</HelperText>
          </>
        )}
      </View>
    </HelperContext.Provider>
  );
};

Helper.displayName = 'Helper';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    gap: theme.components.formField.helper.gap,
    alignItems: 'flex-start',
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
