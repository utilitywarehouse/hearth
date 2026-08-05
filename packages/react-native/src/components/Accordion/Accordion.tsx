import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { Children, isValidElement, useCallback, useMemo, useState } from 'react';
import { SectionHeader } from '../SectionHeader';
import { AccordionProps } from './Accordion.props';
import { resolveActiveValues, resolveInitialValues, resolveToggledValues } from './Accordion.utils';
import AccordionContentComponent from './AccordionContent';
import AccordionContentTextComponent from './AccordionContentText';
import AccordionHeaderComponent from './AccordionHeader';
import AccordionIconComponent from './AccordionIcon';
import { useAccordionContext } from './Accordion.context';
import { AccordionItemProps } from './AccordionItem.props';
import AccordionItemRoot from './AccordionItemRoot';
import AccordionRoot from './AccordionRoot';
import AccordionTitleTextComponent from './AccordionTitleText';
import AccordionTriggerComponent from './AccordionTrigger';

export const AccordionHeader = AccordionHeaderComponent;
export const AccordionTrigger = AccordionTriggerComponent;
export const AccordionContent = AccordionContentComponent;
export const AccordionContentText = AccordionContentTextComponent;
export const AccordionIcon = AccordionIconComponent;
export const AccordionTitleText = AccordionTitleTextComponent;

const Accordion = ({
  children,
  collapsible = true,
  type = 'multiple',
  heading,
  helperText,
  disabled,
  value,
  defaultValue,
  onValueChange,
  ...props
}: AccordionProps) => {
  const [uncontrolledValues, setUncontrolledValues] = useState<string[]>(() =>
    resolveInitialValues({ controlledValue: value, defaultValue })
  );
  const expandedValues = resolveActiveValues({
    controlledValue: value,
    uncontrolledValue: uncontrolledValues,
  });

  const toggleItem = useCallback(
    (itemValue: string, itemDisabled?: boolean) => {
      if (itemDisabled) return;
      const next = resolveToggledValues({ type, collapsible, selectedValues: expandedValues, itemValue });
      setUncontrolledValues(next);
      onValueChange?.(next);
    },
    [type, collapsible, expandedValues, onValueChange]
  );

  return (
    <AccordionRoot disabled={disabled} expandedValues={expandedValues} toggleItem={toggleItem} {...props}>
      {heading ? <SectionHeader heading={heading} helperText={helperText} /> : null}
      {children}
    </AccordionRoot>
  );
};

let accordionItemCounter = 0;

export const AccordionItem = ({
  children,
  value,
  title,
  disabled,
  triggerContent,
  testID,
  // `expanded`/`toggleItem` are declared on AccordionItemProps but have never been wired to
  // anything (pre-existing, unrelated to this migration) — destructured here purely so they
  // don't collide with this component's own real `expanded` state via the `...props` spread.
  expanded: _expandedProp,
  toggleItem: _toggleItemProp,
  ...props
}: AccordionItemProps) => {
  void _expandedProp;
  void _toggleItemProp;
  const { expandedValues, toggleItem, disabled: groupDisabled } = useAccordionContext();

  const itemValue = useMemo(() => {
    if (value !== undefined) {
      return value;
    }
    const newId = `accordion-item-${accordionItemCounter}`;
    accordionItemCounter += 1;
    return newId;
  }, [value]);

  const isDisabled = disabled || groupDisabled || false;
  const expandedState = expandedValues?.includes(itemValue) ?? false;
  const handlePress = useCallback(
    () => toggleItem?.(itemValue, isDisabled),
    [toggleItem, itemValue, isDisabled]
  );
  const triggerId = `accordion-trigger-${itemValue}`;
  const contentId = `accordion-content-${itemValue}`;

  if (!children) {
    return null;
  }

  const processedChildren = Children.toArray(children);
  const hasContentComponent = processedChildren.some(
    // @ts-expect-error - type
    child => isValidElement(child) && child.type.displayName === 'AccordionContent'
  );

  return (
    <AccordionItemRoot
      disabled={isDisabled}
      expanded={expandedState}
      onPress={handlePress}
      triggerId={triggerId}
      contentId={contentId}
      {...props}
    >
      {hasContentComponent ? (
        children
      ) : (
        <>
          <AccordionHeader>
            <AccordionTrigger testID={testID}>
              {({ expanded }) => {
                return (
                  <>
                    <AccordionTitleText>{title}</AccordionTitleText>
                    {triggerContent}
                    {expanded ? (
                      <AccordionIcon as={ChevronUpSmallIcon} />
                    ) : (
                      <AccordionIcon as={ChevronDownSmallIcon} />
                    )}
                  </>
                );
              }}
            </AccordionTrigger>
          </AccordionHeader>
          <AccordionContent>{children}</AccordionContent>
        </>
      )}
    </AccordionItemRoot>
  );
};

AccordionItem.displayName = 'AccordionItem';
Accordion.displayName = 'Accordion';
AccordionHeader.displayName = 'AccordionHeader';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';
AccordionContentText.displayName = 'AccordionContentText';
AccordionIcon.displayName = 'AccordionIcon';
AccordionTitleText.displayName = 'AccordionTitleText';

export default Accordion;
