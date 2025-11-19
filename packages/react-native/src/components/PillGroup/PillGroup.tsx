import React from 'react';
import { ScrollViewProps, ViewStyle } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { StyleSheet } from 'react-native-unistyles';
import { Box } from '../Box';

export interface PillGroupProps
  extends Omit<ScrollViewProps, 'horizontal' | 'contentContainerStyle' | 'showsHorizontalScrollIndicator'> {
  children: React.ReactNode;
  wrap?: boolean;
  style?: ViewStyle | ViewStyle[];
}

export const PillGroup = ({ children, wrap = false, style, ...props }: PillGroupProps) => {
  return wrap ? (
    <Box style={[styles.group, styles.wrap, style]} {...props}>
      {children}
    </Box>
  ) : (
    <ScrollView
      horizontal
      contentContainerStyle={[styles.group, style]}
      showsHorizontalScrollIndicator={false}
      {...props}
    >
      {children}
    </ScrollView>
  );
};

PillGroup.displayName = 'PillGroup';

const styles = StyleSheet.create(theme => ({
  group: {
    flexDirection: 'row',
    gap: theme.components.pill.group.gap,
  },
  wrap: {
    flexWrap: 'wrap',
  },
}));
