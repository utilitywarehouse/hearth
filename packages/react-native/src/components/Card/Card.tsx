import { createPressable } from '@gluestack-ui/core/pressable/creator';
import CardRoot from './CardRoot';

const Card = createPressable({
  Root: CardRoot,
});

Card.displayName = 'Card';

export default Card;
