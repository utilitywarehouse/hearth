import { useMemo } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import AccordionItemContext from './AccordionItem.context';
import { AccordionItemProps } from './AccordionItem.props';

type AccordionItemRootProps = Omit<AccordionItemProps, 'expanded'> & {
  expanded?: boolean;
  onPress?: () => void;
  triggerId?: string;
  contentId?: string;
};

const AccordionItem = ({
  children,
  style,
  noPadding,
  disabled,
  expanded,
  onPress,
  triggerId,
  contentId,
  ...props
}: AccordionItemRootProps) => {
  const context = useMemo(
    () => ({ noPadding, disabled, expanded, onPress, triggerId, contentId }),
    [noPadding, disabled, expanded, onPress, triggerId, contentId]
  );
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
  },
}));

export default AccordionItem;
