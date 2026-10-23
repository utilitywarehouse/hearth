import { GestureResponderEvent } from 'react-native';
import { Button } from '../Button';
import { useCardAccordionContext, useCardAccordionItemContext } from './CardAccordion.context';
import type { CardAccordionButtonProps } from './CardAccordion.props';
import { getAdjacentStep } from './CardAccordion.utils';

/**
 * Moves a `CardAccordion` to the next or previous step. Render it inside a `CardAccordionFooter`.
 */
const CardAccordionButton = ({ action, children, onPress, ...props }: CardAccordionButtonProps) => {
  const { steps, setCurrentStep } = useCardAccordionContext();
  const { value } = useCardAccordionItemContext();

  const handlePress = (event: GestureResponderEvent) => {
    onPress?.(event);
    if (event?.isDefaultPrevented?.()) return;
    const target = getAdjacentStep(steps, value, action);
    if (target !== undefined) setCurrentStep(target);
  };

  if (action === 'next') {
    return (
      <Button variant="solid" colorScheme="highlight" {...props} onPress={handlePress}>
        {children ?? 'Next'}
      </Button>
    );
  }

  return (
    <Button variant="outline" colorScheme="functional" {...props} onPress={handlePress}>
      {children ?? 'Previous'}
    </Button>
  );
};

CardAccordionButton.displayName = 'CardAccordionButton';

export default CardAccordionButton;
