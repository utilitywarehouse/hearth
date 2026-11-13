import { View, ViewProps } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Expandable } from '../Expandable';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem.context';

const AccordionContent = ({ children, style, ...props }: ViewProps) => {
  const { noPadding: contextMoPadding, contentNoPadding } = useAccordionContext();
  const { noPadding, expanded = false, contentId, triggerId } = useAccordionItemContext();
  const noPaddingValue = noPadding ?? contextMoPadding;
  styles.useVariants({ noPadding: noPaddingValue, contentNoPadding });

  return (
    <Expandable expanded={expanded}>
      <View
        nativeID={contentId}
        accessibilityLabelledBy={triggerId}
        style={[styles.content, style]}
        {...props}
      >
        {children}
      </View>
    </Expandable>
  );
};

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
