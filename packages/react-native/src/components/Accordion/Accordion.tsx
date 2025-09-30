import { createAccordion } from '@gluestack-ui/core/accordion/creator';
import type { IAccordionTriggerProps } from '@gluestack-ui/core/lib/esm/accordion/creator/types';
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  ForwardRefExoticComponent,
  RefAttributes,
} from 'react';
import { Children, forwardRef, isValidElement, useMemo } from 'react';
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

type AccordionHeaderProps = ComponentPropsWithoutRef<typeof AccordionHeaderComponent>;
type AccordionHeaderRef = ComponentRef<typeof AccordionHeaderComponent>;
type AccordionHeaderComponentType = ForwardRefExoticComponent<
  AccordionHeaderProps & RefAttributes<AccordionHeaderRef>
>;
export const AccordionHeader: AccordionHeaderComponentType = forwardRef(
  (props: AccordionHeaderProps, ref) => <AccordionComponent.Header {...props} ref={ref} />
);

type AccordionTriggerBaseProps = ComponentPropsWithoutRef<typeof AccordionTriggerComponent>;
type AccordionTriggerProps = Omit<AccordionTriggerBaseProps, 'children'> &
  Omit<IAccordionTriggerProps, 'children'> & {
    children?: IAccordionTriggerProps['children'];
  };
type AccordionTriggerRef = ComponentRef<typeof AccordionTriggerComponent>;
type AccordionTriggerComponentType = ForwardRefExoticComponent<
  AccordionTriggerProps & RefAttributes<AccordionTriggerRef>
>;
export const AccordionTrigger: AccordionTriggerComponentType = forwardRef(
  ({ children, ...rest }: AccordionTriggerProps, ref) => {
    const triggerProps = {
      ...rest,
      children: (children ?? null) as IAccordionTriggerProps['children'],
    } as IAccordionTriggerProps;

    return <AccordionComponent.Trigger {...triggerProps} ref={ref} />;
  }
);

type AccordionContentProps = ComponentPropsWithoutRef<typeof AccordionContentComponent>;
type AccordionContentRef = ComponentRef<typeof AccordionContentComponent>;
type AccordionContentComponentType = ForwardRefExoticComponent<
  AccordionContentProps & RefAttributes<AccordionContentRef>
>;
export const AccordionContent: AccordionContentComponentType = forwardRef(
  (props: AccordionContentProps, ref) => <AccordionComponent.Content {...props} ref={ref} />
);

type AccordionContentTextProps = ComponentPropsWithoutRef<typeof AccordionContentTextComponent>;
type AccordionContentTextRef = ComponentRef<typeof AccordionContentTextComponent>;
type AccordionContentTextComponentType = ForwardRefExoticComponent<
  AccordionContentTextProps & RefAttributes<AccordionContentTextRef>
>;
export const AccordionContentText: AccordionContentTextComponentType = forwardRef(
  (props: AccordionContentTextProps, ref) => <AccordionComponent.ContentText {...props} ref={ref} />
);

type AccordionIconProps = ComponentPropsWithoutRef<typeof AccordionIconComponent>;
type AccordionIconRef = ComponentRef<typeof AccordionIconComponent>;
type AccordionIconComponentType = ForwardRefExoticComponent<
  AccordionIconProps & RefAttributes<AccordionIconRef>
>;
export const AccordionIcon: AccordionIconComponentType = forwardRef(
  (props: AccordionIconProps, ref) => <AccordionComponent.Icon {...props} ref={ref} />
);

type AccordionTitleTextProps = ComponentPropsWithoutRef<typeof AccordionTitleTextComponent>;
type AccordionTitleTextRef = ComponentRef<typeof AccordionTitleTextComponent>;
type AccordionTitleTextComponentType = ForwardRefExoticComponent<
  AccordionTitleTextProps & RefAttributes<AccordionTitleTextRef>
>;
export const AccordionTitleText: AccordionTitleTextComponentType = forwardRef(
  (props: AccordionTitleTextProps, ref) => <AccordionComponent.TitleText {...props} ref={ref} />
);

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
