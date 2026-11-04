import { Children, isValidElement } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import type { CardAccordionButtonProps, CardAccordionFooterProps } from './CardAccordion.props';
import CardAccordionButton from './CardAccordionButton';

const isPreviousButton = (child: unknown) =>
  isValidElement(child) &&
  child.type === CardAccordionButton &&
  (child.props as CardAccordionButtonProps).action === 'previous';

/**
 * Holds a step's `CardAccordionButton`s. The previous button always comes first in reading order,
 * whatever order the buttons are written in. Buttons stack full width on small screens, with
 * Next on top, and sit in a row from the `md` breakpoint.
 */
const CardAccordionFooter = ({ children, style, ...props }: CardAccordionFooterProps) => {
  const items = Children.toArray(children);
  const ordered = [...items.filter(isPreviousButton), ...items.filter(c => !isPreviousButton(c))];

  return (
    <View style={[styles.footer, style]} {...props}>
      {ordered}
    </View>
  );
};

CardAccordionFooter.displayName = 'CardAccordionFooter';

const styles = StyleSheet.create(theme => ({
  footer: {
    flexDirection: { base: 'column-reverse', md: 'row' },
    alignItems: { base: 'stretch', md: 'flex-start' },
    gap: theme.components.cardAccordion.buttonGroup.gap,
  },
}));

export default CardAccordionFooter;
