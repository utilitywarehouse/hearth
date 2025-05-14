import React, { forwardRef, useMemo } from 'react';
import { View } from 'react-native';
import { AccordionItemProps } from './AccordionItem.props';
import AccordionItemContext from './AccordionItem.context';
import { StyleSheet } from 'react-native-unistyles';

export const AccordionItem = forwardRef<View, AccordionItemProps>(
  ({ children, style, noPadding, disabled, ...props }, ref) => {
    const context = useMemo(() => ({ noPadding, disabled }), [noPadding, disabled]);
    return (
      <AccordionItemContext.Provider value={context}>
        <View ref={ref} style={[styles.item, style]} {...props}>
          {children}
        </View>
      </AccordionItemContext.Provider>
    );
  }
);

AccordionItem.displayName = 'AccordionItemRoot';

const styles = StyleSheet.create(theme => ({
  item: {
    borderBottomWidth: theme.components.divider.borderWidth,
    borderBottomColor: theme.components.divider.color,
  },
}));

export default AccordionItem;
