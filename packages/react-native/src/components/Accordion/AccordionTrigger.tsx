import React, { forwardRef } from 'react';
import { Pressable, PressableProps } from 'react-native';
import { PressableRef } from '../../types';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem.context';
import { StyleSheet } from 'react-native-unistyles';

export const AccordionTrigger = forwardRef<PressableRef, PressableProps>(
  ({ children, ...props }, ref) => {
    const { noPadding: contextMoPadding } = useAccordionContext();
    const { noPadding } = useAccordionItemContext();
    const noPaddingValue = noPadding ?? contextMoPadding;
    styles.useVariants({ noPadding: noPaddingValue });

    return (
      <Pressable ref={ref} style={styles.trigger} {...props}>
        {children}
      </Pressable>
    );
  }
);

AccordionTrigger.displayName = 'AccordionTrigger';

const styles = StyleSheet.create(theme => ({
  trigger: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: theme.components.accordion.item.heading.paddingHorizontal,
    paddingVertical: theme.components.accordion.item.heading.paddingVertical,
    gap: theme.components.accordion.item.heading.gap,
    width: '100%',
    variants: {
      noPadding: {
        true: {
          paddingHorizontal: 0,
        },
      },
    },
  },
}));

export default AccordionTrigger;
