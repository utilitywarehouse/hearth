import { createPressable } from '@gluestack-ui/pressable';
import CardRoot from './CardRoot';

const Card = createPressable({
  Root: CardRoot,
});

Card.displayName = 'Card';

export default Card;
