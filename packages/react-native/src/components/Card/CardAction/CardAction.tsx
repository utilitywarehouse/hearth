import { createPressable } from '@gluestack-ui/pressable';
import CardActionRoot from './CardActionRoot';

/**
 * A pressable, consistently styled row for an actionable item inside a `Card`. Use it, wrapped in
 * `CardActions`, to list navigable or triggerable actions within a card.
 */
const CardAction = createPressable({
  Root: CardActionRoot,
});

CardAction.displayName = 'CardAction';

export default CardAction;
