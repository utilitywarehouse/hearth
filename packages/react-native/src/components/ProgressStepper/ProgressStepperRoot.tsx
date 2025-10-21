import React from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useStyleProps } from '../../hooks';
import { ProgressStepperRootProps } from './ProgressStepper.props';

const ProgressStepperRoot = ({
  children,
  style,
  ...rest
}: ProgressStepperRootProps) => {
  // Extract style props using our custom hook
  const { computedStyles, remainingProps } = useStyleProps(rest);

  return (
    <View
      {...remainingProps}
      style={[styles.root, computedStyles, style as ViewStyle]}
    >
      {children}
    </View>
  );
};

ProgressStepperRoot.displayName = 'ProgressStepperRoot';

const styles = StyleSheet.create(() => ({
  root: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

export default ProgressStepperRoot;
