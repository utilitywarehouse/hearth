import { useMemo } from 'react';
import { View } from 'react-native';
import Animated from 'react-native-reanimated';
import { StyleSheet } from 'react-native-unistyles';
import { TextareaContext } from './Textarea.context';
import InputProps from './Textarea.props';

const AnimatedView = Animated.createAnimatedComponent(View);

const TextareaRoot = ({
  children,
  style,
  states,
  validationStatus,
  ...props
}: InputProps & { states?: { focus?: boolean; disabled?: boolean; readonly?: boolean } }) => {
  const { focus = false, disabled = false, readonly = false } = states || {};
  styles.useVariants({ validationStatus, focus, disabled, readonly });

  const value = useMemo(
    () => ({ focused: focus, disabled, readonly, validationStatus }),
    [focus, disabled, readonly, validationStatus]
  );

  return (
    <TextareaContext.Provider value={value}>
      <AnimatedView {...props} style={[styles.container, style]}>
        {children}
      </AnimatedView>
    </TextareaContext.Provider>
  );
};

TextareaRoot.displayName = 'TextareaRoot';

const styles = StyleSheet.create(theme => ({
  container: {
    borderColor: theme.color.border.strong,
    height: theme.components.input.textArea.height,
    borderRadius: theme.components.input.borderRadius,
    position: 'relative',
    flexDirection: 'row',
    overflow: 'hidden',
    alignContent: 'center',
    paddingHorizontal: theme.components.input.paddingHorizontal,
    paddingVertical: theme.components.input.paddingVertical,
    backgroundColor: theme.color.surface.neutral.strong,
    gap: theme.components.input.gap,
    outlineStyle: 'solid',
    outlineWidth: theme.components.input.borderWidth,
    outlineColor: theme.color.border.strong,
    variants: {
      focus: {
        true: {
          outlineWidth: theme.components.input.borderWidthFocused,
        },
      },
      validationStatus: {
        invalid: {
          borderColor: theme.color.feedback.danger.border,
          outlineColor: theme.color.feedback.danger.border,
        },
        valid: {
          borderColor: theme.color.feedback.positive.border,
          outlineColor: theme.color.feedback.positive.border,
        },
        initial: {},
      },
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
      readonly: {
        true: {
          borderColor: theme.color.border.subtle,
        },
      },
    },
  },
}));

export default TextareaRoot;
