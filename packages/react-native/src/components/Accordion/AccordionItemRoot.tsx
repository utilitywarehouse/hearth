import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { useAccordionContext } from './Accordion.context';
import AccordionItemContext from './AccordionItem.context';
import { AccordionItemProps } from './AccordionItem.props';

const AccordionItem = ({ children, style, noPadding, disabled, ...props }: AccordionItemProps) => {
  const context = useMemo(() => ({ noPadding, disabled }), [noPadding, disabled]);
  const { disabled: contextDisabled } = useAccordionContext();
  // A disabled Accordion disables every item, so an item-level `disabled={false}` must not win.
  styles.useVariants({ disabled: !!(disabled || contextDisabled) });
  return (
    <AccordionItemContext.Provider value={context}>
      <View style={[styles.item, style]} {...props}>
        {children}
      </View>
    </AccordionItemContext.Provider>
  );
};

AccordionItem.displayName = 'AccordionItemRoot';

const styles = StyleSheet.create(theme => ({
  item: {
    borderBottomWidth: theme.components.divider.size,
    borderBottomColor: theme.components.divider.color,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
}));

export default AccordionItem;
