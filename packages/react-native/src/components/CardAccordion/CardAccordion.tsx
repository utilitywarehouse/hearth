import { Children, isValidElement, ReactNode, useCallback, useMemo, useState } from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { CardAccordionContext } from './CardAccordion.context';
import type { CardAccordionItemProps, CardAccordionProps } from './CardAccordion.props';
import { resolveInitialStep } from './CardAccordion.utils';
import CardAccordionItem from './CardAccordionItem';

const getSteps = (children: ReactNode) =>
  Children.toArray(children)
    .filter(child => isValidElement(child) && child.type === CardAccordionItem)
    .map(child => (child as { props: CardAccordionItemProps }).props.value);

/**
 * Use CardAccordion to split a long form into ordered steps, each in its own card. Completed
 * steps collapse to a summary with an edit button, the current step is expanded, and upcoming
 * steps show only their heading.
 * @summary A multi-step form where each step is a card.
 */
const CardAccordion = ({
  children,
  value,
  defaultValue,
  onValueChange,
  style,
  ...props
}: CardAccordionProps) => {
  const steps = getSteps(children);
  const [uncontrolledStep, setUncontrolledStep] = useState(() =>
    resolveInitialStep({ steps, controlledValue: value, defaultValue })
  );
  const currentStep = value !== undefined ? value : uncontrolledStep;
  const isControlled = value !== undefined;

  const setCurrentStep = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolledStep(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange]
  );

  const stepsKey = steps.join('\u0000');
  const context = useMemo(
    () => ({ steps: stepsKey ? stepsKey.split('\u0000') : [], currentStep, setCurrentStep }),
    [stepsKey, currentStep, setCurrentStep]
  );

  if (steps.length === 0) {
    if (__DEV__) {
      console.error(
        '[CardAccordion]: No CardAccordionItem children were found. Render each step as a direct CardAccordionItem child.'
      );
    }
    return null;
  }

  return (
    <CardAccordionContext.Provider value={context}>
      <View style={[styles.root, style]} {...props}>
        {children}
      </View>
    </CardAccordionContext.Provider>
  );
};

CardAccordion.displayName = 'CardAccordion';

const styles = StyleSheet.create(theme => ({
  root: {
    flexDirection: 'column',
    gap: theme.components.cardAccordion.gap,
  },
}));

export default CardAccordion;
