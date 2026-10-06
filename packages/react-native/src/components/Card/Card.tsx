import { createPressable } from '@gluestack-ui/pressable';
import CardRoot from './CardRoot';

/**
 * A visual container that groups related content and actions. Use it to present a distinct block
 * of information, optionally with `CardAction` items, inside a bordered, coloured surface.
 */
const Card = createPressable({
  Root: CardRoot,
});

Card.displayName = 'Card';

export default Card;
