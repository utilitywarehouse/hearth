import { createPressable } from '@gluestack-ui/pressable';
import ExpandableCardTriggerRoot from './ExpandableCardTriggerRoot';

const ExpandableCardTrigger = createPressable({
  Root: ExpandableCardTriggerRoot,
});
ExpandableCardTrigger.displayName = 'ExpandableCardTrigger';

export default ExpandableCardTrigger;
