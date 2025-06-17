import { useMemo } from 'react';
import { Text } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { InlineLinkContext } from './InlineLink.context';
import InlineLinkProps from './InlineLink.props';

const InlineLinkRoot = ({
  children,
  inverted = false,
  states,
  ...props
}: InlineLinkProps & { states?: { active?: boolean; disabled?: boolean } }) => {
  const { active, disabled = false } = states || {};
  styles.useVariants({ disabled, inverted, active });
  const value = useMemo(() => ({ inverted, disabled, active }), [inverted, disabled, active]);
  return (
    <InlineLinkContext.Provider value={value}>
      <Text {...props} style={[styles.container, props.style]}>
        {children}
      </Text>
    </InlineLinkContext.Provider>
  );
};

InlineLinkRoot.displayName = 'InlineLinkRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    color: theme.components.inlineLink.color,
    textDecorationStyle: 'solid',
    textDecorationLine: 'underline',
    textDecorationColor: theme.components.inlineLink.color,
    _web: {
      '_focus-visible': {
        borderRadius: theme.borderRadius.xs,
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.components.focus.border,
        outlineOffset: 1,
        boxShadow: 'none',
      },
      _hover: {
        textDecorationLine: 'none',
      },
    },
    variants: {
      active: {
        true: {
          color: theme.components.inlineLink.color,
        },
      },
      inverted: {
        true: {
          color: theme.components.inlineLink.inverted.color,
          textDecorationColor: theme.components.inlineLink.inverted.color,
          _web: {
            '_focus-visible': {
              outlineColor: theme.components.focus.borderInverted,
            },
          },
        },
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      inline: {
        true: {
          color: theme.color.blue[700],
          textDecorationColor: theme.color.blue[700],
        },
      },
    },
    compoundVariants: [
      {
        inverted: true,
        active: true,
        styles: {
          color: theme.components.inlineLink.inverted.colorActive,
        },
      },
    ],
  },
}));

export default InlineLinkRoot;
