import { useId } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import type { ChipGroupProps } from './ChipGroup.props';

/**
 * Use ChipGroup to lay out a collection of `Chip` components, such as the
 * filters currently applied to a list of results. Pass `label` to introduce
 * the group, e.g. "Currently showing:".
 *
 * @summary A wrapping layout container for a collection of `Chip` components.
 */
export const ChipGroup = ({
  children,
  label,
  style,
  'aria-labelledby': ariaLabelledby,
  ...props
}: ChipGroupProps) => {
  const labelId = `chip-group-label-${useId()}`;

  return (
    <View
      role="group"
      aria-labelledby={ariaLabelledby ?? (label && !props['aria-label'] ? labelId : undefined)}
      {...props}
      style={[styles.group, style]}
    >
      {label ? (
        <BodyText weight="semibold" nativeID={labelId}>
          {label}
        </BodyText>
      ) : null}
      {children}
    </View>
  );
};

ChipGroup.displayName = 'ChipGroup';

const styles = StyleSheet.create(theme => ({
  group: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    gap: theme.components.chip.group.gap,
  },
}));
