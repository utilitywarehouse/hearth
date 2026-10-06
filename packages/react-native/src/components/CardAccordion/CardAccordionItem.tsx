import { useEffect, useMemo, useRef } from 'react';
import {
  AccessibilityInfo,
  findNodeHandle,
  GestureResponderEvent,
  Platform,
  Text,
  View,
} from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Button } from '../Button';
import { Card } from '../Card';
import { Heading } from '../Heading';
import { HelperText } from '../Helper';
import { CardAccordionItemContext, useCardAccordionContext } from './CardAccordion.context';
import type { CardAccordionItemProps } from './CardAccordion.props';
import { getStepState } from './CardAccordion.utils';
import CardAccordionAnimatedHeight from './CardAccordionAnimatedHeight';

/**
 * A single step in a `CardAccordion`. Its state — completed, current or upcoming — comes from
 * its position relative to the current step.
 */
const CardAccordionItem = ({
  value,
  title,
  description,
  summaryTitle,
  summaryDescription,
  editButtonText = 'Edit',
  onEditPress,
  children,
  style,
  ...props
}: CardAccordionItemProps) => {
  const { steps, currentStep, setCurrentStep } = useCardAccordionContext();
  const step = getStepState(steps, currentStep, value);
  const isCurrent = step === 'current';
  const isPrevious = step === 'previous';
  const heading = isPrevious && summaryTitle ? summaryTitle : title;

  // Move screen reader focus to the heading when this step becomes current, so users know where
  // they've landed after pressing Next, Previous or Edit. Skipped on first render so mounting the
  // accordion doesn't steal focus.
  const headingRef = useRef<Text>(null);
  const hasMountedRef = useRef(false);
  useEffect(() => {
    if (!hasMountedRef.current) {
      hasMountedRef.current = true;
      return;
    }
    if (!isCurrent || Platform.OS === 'web') return;
    const nodeHandle = findNodeHandle(headingRef.current);
    if (nodeHandle) AccessibilityInfo.setAccessibilityFocus(nodeHandle);
  }, [isCurrent]);

  const handleEditPress = (event: GestureResponderEvent) => {
    setCurrentStep(value);
    onEditPress?.(event);
  };

  const itemContext = useMemo(() => ({ value }), [value]);

  return (
    <CardAccordionItemContext.Provider value={itemContext}>
      <Card
        variant={isCurrent ? 'emphasis' : 'subtle'}
        colorScheme={isCurrent ? 'neutralStrong' : 'neutralSubtle'}
        style={style}
        {...props}
      >
        <View style={styles.header}>
          <View style={styles.heading}>
            <Heading ref={headingRef} size="md">
              {heading}
            </Heading>
            {description ? <HelperText>{description}</HelperText> : null}
          </View>
          {isPrevious ? (
            <Button
              size="sm"
              variant="ghost"
              colorScheme="functional"
              paddingNone
              accessibilityLabel={`${editButtonText} ${heading}`}
              onPress={handleEditPress}
            >
              {editButtonText}
            </Button>
          ) : null}
        </View>
        <CardAccordionAnimatedHeight>
          {isCurrent ? children : isPrevious ? summaryDescription : null}
        </CardAccordionAnimatedHeight>
      </Card>
    </CardAccordionItemContext.Provider>
  );
};

CardAccordionItem.displayName = 'CardAccordionItem';

const styles = StyleSheet.create(theme => ({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: theme.components.cardAccordion.buttonGroup.gap,
  },
  heading: {
    flex: 1,
  },
}));

export default CardAccordionItem;
