import { CloseSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import { Icon } from '../Icon';
import type { ChipProps } from './Chip.props';

/**
 * Use Chip to represent an input, attribute, or filter that a user can remove
 * with a single press. Commonly used to show active filters applied to a list
 * of results.
 *
 * @summary A compact, removable element representing an active filter or attribute.
 */
export const Chip = ({
  children,
  disabled,
  style,
  accessibilityLabel,
  'aria-label': ariaLabel,
  ...props
}: ChipProps) => {
  // A Chip's only interaction is removal, so its accessible name should say
  // so rather than just repeating the visible label.
  // Pass `aria-label` or `accessibilityLabel` to override this for a different action or wording.
  const defaultLabel = typeof children === 'string' ? `Remove ${children} filter` : undefined;

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={ariaLabel ?? accessibilityLabel ?? defaultLabel}
      accessibilityState={{ disabled: !!disabled }}
      disabled={disabled}
      {...props}
      style={state => [
        styles.chip,
        state.pressed && !disabled && styles.active,
        typeof style === 'function' ? style(state) : style,
      ]}
    >
      <BodyText weight="semibold" style={styles.text}>
        {children}
      </BodyText>
      <Icon as={CloseSmallIcon} size={20} style={styles.icon} />
    </Pressable>
  );
};

Chip.displayName = 'Chip';

const styles = StyleSheet.create(theme => ({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
    gap: theme.components.chip.gap,
    // The border is drawn inside the chip in the design, so remove it from the
    // padding to keep the overall size in line with Figma and the React package.
    paddingVertical: theme.components.chip.paddingVertical - theme.components.chip.borderWidth,
    paddingHorizontal: theme.components.chip.paddingHorizontal - theme.components.chip.borderWidth,
    borderRadius: theme.components.chip.borderRadius,
    borderWidth: theme.components.chip.borderWidth,
    borderColor: theme.color.interactive.functional.border.subtle,
    backgroundColor: 'transparent',
    _web: {
      cursor: 'pointer',
      _hover: {
        backgroundColor: theme.color.interactive.functional.surface.subtle.hover,
      },
      '_focus-visible': {
        outlineStyle: 'solid',
        outlineWidth: 2,
        outlineColor: theme.color.focus.primary,
        outlineOffset: 1,
        boxShadow: 'none',
      },
    },
  },
  active: {
    backgroundColor: theme.color.interactive.functional.surface.subtle.active,
    _web: {
      _hover: {
        backgroundColor: theme.color.interactive.functional.surface.subtle.active,
      },
    },
  },
  text: {
    color: theme.color.interactive.functional.foreground.subtle,
  },
  icon: {
    color: theme.color.interactive.functional.foreground.subtle,
  },
}));
