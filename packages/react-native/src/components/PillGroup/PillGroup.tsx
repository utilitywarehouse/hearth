import { useMemo } from 'react';
import { ScrollView } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Box } from '../Box';
import { PillGroupContext, PillGroupContextValue } from './PillGroup.context';
import type { PillGroupProps } from './PillGroup.props';
import { toggleSelection } from './PillGroup.utils';

export const PillGroup = ({
  children,
  value,
  multiple = false,
  wrap = true,
  onChange,
  onValueChange,
  style,
  ...props
}: PillGroupProps) => {
  const normalizedValue = Array.isArray(value) ? value : [value];

  const contextValue: PillGroupContextValue = useMemo(
    () => ({
      value: normalizedValue,
      onChange: (pillValue: string) => {
        const newValue = toggleSelection({ currentValue: normalizedValue, pillValue, multiple });
        if (multiple) {
          (onChange as (value: string[]) => void)?.(newValue as string[]);
          (onValueChange as (value: string[]) => void)?.(newValue as string[]);
        } else {
          (onChange as (value: string) => void)?.(newValue as string);
          (onValueChange as (value: string) => void)?.(newValue as string);
        }
      },
    }),
    [normalizedValue, multiple, onChange, onValueChange]
  );

  return (
    <PillGroupContext.Provider value={contextValue}>
      {wrap ? (
        <Box style={[styles.group, styles.wrap, style]} {...props}>
          {children}
        </Box>
      ) : (
        <ScrollView
          horizontal
          style={styles.scrollView}
          contentContainerStyle={[styles.group, style]}
          showsHorizontalScrollIndicator={false}
          {...props}
        >
          {children}
        </ScrollView>
      )}
    </PillGroupContext.Provider>
  );
};

PillGroup.displayName = 'PillGroup';

const styles = StyleSheet.create(theme => ({
  scrollView: {
    flexGrow: 0,
  },
  group: {
    flexDirection: 'row',
    gap: theme.components.pill.group.gap,
  },
  wrap: {
    flexWrap: 'wrap',
  },
}));
