import React from 'react';
import { View, ViewStyle } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { ProgressStepperRootProps } from './ProgressStepper.props';

const ProgressStepperRoot = ({
  children,
  style,
  ...rest
}: ProgressStepperRootProps) => {
  return (
    <View
      style={[styles.root, style as ViewStyle]}
      {...rest}
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
