import { useState } from 'react';
import { Card } from '../Card';
import type ExpandableCardProps from './ExpandableCard.props';
import ExpandableCardExpandedContent from './ExpandableCardExpandedContent';
import ExpandableCardTrigger from './ExpandableCardTrigger';

const ExpandableCard = ({
  expanded: controlledExpanded,
  onExpandedChange,
  heading,
  helperText,
  leadingIcon,
  leadingContent,
  badge,
  badgePosition = 'bottom',
  numericValue,
  triggerContent,
  expandedContent,
  duration = 200,
  animateOpacity = true,
  disabled = false,
  testID = 'expandable-card',
  children,
  ...cardProps
}: ExpandableCardProps) => {
  const [internalExpanded, setInternalExpanded] = useState(false);

  // Use controlled or uncontrolled state
  const isExpanded = controlledExpanded !== undefined ? controlledExpanded : internalExpanded;

  const handlePress = () => {
    if (disabled) return;

    const newExpanded = !isExpanded;

    if (controlledExpanded === undefined) {
      setInternalExpanded(newExpanded);
    }

    onExpandedChange?.(newExpanded);
  };

  const triggerProps =
    triggerContent !== undefined
      ? { triggerContent }
      : {
          heading,
          helperText,
          leadingIcon,
          leadingContent,
          badge,
          badgePosition,
          numericValue,
        };

  const renderDefaultContent = () => (
    <>
      <ExpandableCardTrigger
        onPress={handlePress}
        disabled={disabled}
        {...triggerProps}
        isExpanded={isExpanded}
        testID={`${testID}-trigger`}
      />
      <ExpandableCardExpandedContent
        isExpanded={isExpanded}
        duration={duration}
        animateOpacity={animateOpacity}
      >
        {expandedContent}
      </ExpandableCardExpandedContent>
    </>
  );

  return (
    <Card noPadding {...cardProps} testID={testID}>
      {children || renderDefaultContent()}
    </Card>
  );
};

ExpandableCard.displayName = 'ExpandableCard';

export default ExpandableCard;
