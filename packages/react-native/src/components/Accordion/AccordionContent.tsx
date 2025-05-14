import React, { forwardRef } from 'react';
import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem.context';

export const AccordionContent = forwardRef<View, ViewProps>(
  ({ children, style, ...props }, ref) => {
    const { noPadding: contextMoPadding, contentNoPadding } = useAccordionContext();
    const { noPadding } = useAccordionItemContext();
    const noPaddingValue = noPadding ?? contextMoPadding;
    styles.useVariants({ noPadding: noPaddingValue, contentNoPadding });

    return (
      <View ref={ref} style={[styles.content, style]} {...props}>
        {children}
      </View>
    );
  }
);

AccordionContent.displayName = 'AccordionContent';

const styles = StyleSheet.create(theme => ({
  content: {
    paddingTop: theme.components.accordion.item.content.paddingTop,
    paddingHorizontal: theme.components.accordion.item.content.paddingHorizontal,
    paddingBottom: theme.components.accordion.item.content.paddingBottom,
    gap: theme.components.accordion.item.content.gap,
    variants: {
      noPadding: {
        true: {
          paddingHorizontal: 0,
        },
      },
      contentNoPadding: {
        true: {
          paddingTop: 0,
          paddingHorizontal: 0,
          paddingBottom: 0,
        },
      },
    },
  },
}));

export default AccordionContent;
