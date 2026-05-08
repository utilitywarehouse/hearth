import { createPressable } from '@gluestack-ui/pressable';
import type React from 'react';
import CardActionRoot from './CardActionRoot';

const CardAction: React.ComponentType<React.ComponentProps<typeof CardActionRoot>> = createPressable({
  Root: CardActionRoot,
}) as unknown as React.ComponentType<React.ComponentProps<typeof CardActionRoot>>;

CardAction.displayName = 'CardAction';

export default CardAction;
