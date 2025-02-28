/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, { forwardRef } from 'react';
import { type StyleProp, type ViewStyle } from 'react-native';
import { useLinkContext } from './Link.context';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import { IconRef } from '../../types';
import IconProps from '../Icon/Icon.props';

const LinkIcon = forwardRef<IconRef, IconProps>(({ children, ...props }, ref) => {
  const { active, inverted, disabled } = useLinkContext();
  styles.useVariants({ active, inverted, disabled });

  return (
    <Icon ref={ref} {...props} style={[styles.icon as StyleProp<ViewStyle>, props.style]}>
      {children}
    </Icon>
  );
});

LinkIcon.displayName = 'LinkIcon';

const styles = StyleSheet.create(theme => ({
  icon: {
    color: theme.components.link.color,
    variants: {
      active: {
        true: {
          color: theme.components.link.colorActive,
        },
      },
      inverted: {
        true: {
          color: theme.components.link.inverted.color,
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
    compoundVariants: [
      {
        inverted: true,
        active: true,
        styles: {
          color: theme.components.link.inverted.colorActive,
        },
      },
    ],
  },
}));

export default LinkIcon;
