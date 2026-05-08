import { createPressable } from '@gluestack-ui/pressable';
import type React from 'react';
import ExpandableCardTriggerRoot from './ExpandableCardTriggerRoot';

const ExpandableCardTrigger: React.ComponentType<React.ComponentProps<typeof ExpandableCardTriggerRoot>> = createPressable({
  Root: ExpandableCardTriggerRoot,
}) as unknown as React.ComponentType<React.ComponentProps<typeof ExpandableCardTriggerRoot>>;

ExpandableCardTrigger.displayName = 'ExpandableCardTrigger';

export default ExpandableCardTrigger;
