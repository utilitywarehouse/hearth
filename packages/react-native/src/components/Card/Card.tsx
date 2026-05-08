import { createPressable } from '@gluestack-ui/pressable';
import type React from 'react';
import CardRoot from './CardRoot';

const Card: React.ComponentType<React.ComponentProps<typeof CardRoot>> = createPressable({
  Root: CardRoot,
}) as unknown as React.ComponentType<React.ComponentProps<typeof CardRoot>>;

Card.displayName = 'Card';

export default Card;
