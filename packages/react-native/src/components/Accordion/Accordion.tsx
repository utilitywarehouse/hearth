import { createAccordion } from '@gluestack-ui/accordion';
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { Children, isValidElement, useMemo } from 'react';
import { SectionHeader } from '../SectionHeader';
import { AccordionProps } from './Accordion.props';
import AccordionContentComponent from './AccordionContent';
import AccordionContentTextComponent from './AccordionContentText';
import AccordionHeaderComponent from './AccordionHeader';
import AccordionIconComponent from './AccordionIcon';
import { AccordionItemProps } from './AccordionItem.props';
import AccordionItemRoot from './AccordionItemRoot';
import AccordionRoot from './AccordionRoot';
import AccordionTitleTextComponent from './AccordionTitleText';
import AccordionTriggerComponent from './AccordionTrigger';

const AccordionComponent = createAccordion({
  Root: AccordionRoot,
  ContentText: AccordionContentTextComponent,
  Icon: AccordionIconComponent,
  Content: AccordionContentComponent,
  Header: AccordionHeaderComponent,
  Item: AccordionItemRoot,
  TitleText: AccordionTitleTextComponent,
  Trigger: AccordionTriggerComponent,
});

const AccordionItemComponent = AccordionComponent.Item;
export const AccordionHeader = AccordionComponent.Header;
export const AccordionTrigger = AccordionComponent.Trigger;
export const AccordionContent = AccordionComponent.Content;
export const AccordionContentText = AccordionComponent.ContentText;
export const AccordionIcon = AccordionComponent.Icon;
export const AccordionTitleText = AccordionComponent.TitleText;

const Accordion = ({
  children,
  collapsible,
  type = 'multiple',
  heading,
  helperText,
  ...props
}: AccordionProps) => (
  <AccordionComponent
    isDisabled={props.disabled}
    isCollapsible={collapsible}
    type={type}
    contentNoPadding={props.contentNoPadding}
    {...props}
  >
    {heading ? <SectionHeader heading={heading} helperText={helperText} /> : null}
    {children}
  </AccordionComponent>
);

let accordionItemCounter = 0;

export const AccordionItem = ({
  children,
  value,
  title,
  expanded,
  triggerContent,
  testID,
  ...props
}: AccordionItemProps) => {
  const itemValue = useMemo(() => {
    if (value !== undefined) {
      return value;
    }
    const newId = `accordion-item-${accordionItemCounter}`;
    accordionItemCounter += 1;
    return newId;
  }, [value]);

  if (!children) {
    return null;
  }

  const processedChildren = Children.toArray(children);
  const hasContentComponent = processedChildren.some(
    // @ts-expect-error - type
    child => isValidElement(child) && child.type.displayName === 'AccordionContent'
  );

  return (
    <AccordionItemComponent value={itemValue} title={title} isDisabled={props.disabled} {...props}>
      {hasContentComponent ? (
        children
      ) : (
        <>
          <AccordionHeader>
            <AccordionTrigger isExpanded={expanded} testID={testID}>
              {({ isExpanded }: { isExpanded: boolean }) => {
                return (
                  <>
                    <AccordionTitleText>{title}</AccordionTitleText>
                    {triggerContent}
                    {isExpanded ? (
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
    </AccordionItemComponent>
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
