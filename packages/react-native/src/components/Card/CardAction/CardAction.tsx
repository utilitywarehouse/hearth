import { createPressable } from '@gluestack-ui/pressable';
import CardActionRoot from './CardActionRoot';

const CardAction = createPressable({
  Root: CardActionRoot,
});

CardAction.displayName = 'CardAction';

export default CardAction;
