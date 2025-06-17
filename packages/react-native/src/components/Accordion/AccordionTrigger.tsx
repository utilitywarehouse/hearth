import { Pressable, PressableProps } from 'react-native';
import { useAccordionContext } from './Accordion.context';
import { useAccordionItemContext } from './AccordionItem.context';
import { StyleSheet } from 'react-native-unistyles';

const AccordionTrigger = ({
  states,
  ...props
}: PressableProps & { states?: { active?: boolean } }) => {
  const { active } = states || { active: false };
  const { noPadding: contextMoPadding } = useAccordionContext();
  const { noPadding } = useAccordionItemContext();
  const noPaddingValue = noPadding ?? contextMoPadding;
  styles.useVariants({ noPadding: noPaddingValue, active });

  return <Pressable style={styles.trigger} {...props} />;
};

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
    _web: {
      _hover: {
        backgroundColor: theme.components.accordion.item.backgroundColorHover,
      },
      '_focus-visible': theme.helpers.focusVisible,
      _active: {
        backgroundColor: theme.components.accordion.item.backgroundColorActive,
      },
    },
    variants: {
      noPadding: {
        true: {
          paddingHorizontal: 0,
        },
      },
      active: {
        true: {
          backgroundColor: theme.components.accordion.item.backgroundColorActive,
        },
      },
    },
  },
}));

export default AccordionTrigger;
