import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { UnstyledIconButton } from '../UnstyledIconButton';
import { IndicatorIconButtonProps } from './IndicatorIconButton.props';

/**
 * Triggers an action or event, such as opening a dialog or navigating to another screen. Extends
 * `UnstyledIconButton` with an optional red dot indicator in the top-right corner, for showing
 * notifications or unread status.
 * @summary An icon button with an optional notification indicator.
 */
const IndicatorIconButton = ({ indicator = false, ...props }: IndicatorIconButtonProps) => {
  return (
    <View style={styles.container}>
      <UnstyledIconButton size="md" {...props} />
      {indicator && <View style={styles.indicator} />}
    </View>
  );
};

IndicatorIconButton.displayName = 'IndicatorIconButton';

const styles = StyleSheet.create(theme => ({
  container: {
    position: 'relative',
    width: theme.components.iconButton.unstyled.md.width,
    height: theme.components.iconButton.unstyled.md.height,
  },
  indicator: {
    position: 'absolute',
    top: 2,
    right: 1,
    width: theme.components.indicatorIconButton.indicator.width,
    height: theme.components.indicatorIconButton.indicator.height,
    borderRadius: theme.components.indicatorIconButton.indicator.radius,
    backgroundColor: theme.color.interactive.destructive.surface.strong.default,
    zIndex: 1,
  },
}));

export default IndicatorIconButton;
