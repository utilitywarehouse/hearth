import React, { forwardRef } from 'react';
import { createAccordion } from '@gluestack-ui/accordion';
import AccordionRoot from './AccordionRoot';
import AccordionContentTextComponent from './AccordionContentText';
import AccordionIconComponent from './AccordionIcon';
import AccordionContentComponent from './AccordionContent';
import AccordionHeaderComponent from './AccordionHeader';
import AccordionItemRoot from './AccordionItemRoot';
import AccordionTitleTextComponent from './AccordionTitleText';
import AccordionTriggerComponent from './AccordionTrigger';
import { View } from 'react-native';
import { AccordionProps } from './Accordion.props';
import { AccordionItemProps } from './AccordionItem.props';
import {
  ChevronDownSmallIcon,
  ChevronUpSmallIcon,
} from '@utilitywarehouse/hearth-react-native-icons';
import { AccordionHeading } from './AccordionHeading';

const AccordionComponent = createAccordion({
  Root: AccordionRoot,
  ContentText: AccordionContentTextComponent,
  Icon: AccordionIconComponent,
  Content: AccordionContentComponent,
  Header: AccordionHeaderComponent,
  Item: AccordionItemRoot,
  TitleText: AccordionTitleTextComponent,
  Trigger: AccordionTriggerComponent,
}) as React.ForwardRefExoticComponent<
  React.ComponentPropsWithoutRef<typeof AccordionRoot> & {
    isDisabled?: boolean;
    isCollapsible?: boolean;
  } & React.RefAttributes<View>
> & {
  ContentText: typeof AccordionContentTextComponent;
  Header: typeof AccordionHeaderComponent;
  Item: React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof AccordionItemRoot> & {
      isDisabled?: boolean;
    } & React.RefAttributes<View>
  >;
  Trigger: React.ForwardRefExoticComponent<
    Omit<React.ComponentPropsWithoutRef<typeof AccordionTriggerComponent>, 'children'> & {
      isExpanded?: boolean;
      children: JSX.Element | Array<JSX.Element> | ((props: any) => JSX.Element);
    } & React.RefAttributes<View>
  >;
  TitleText: typeof AccordionTitleTextComponent;
  Content: typeof AccordionContentComponent;
  Icon: typeof AccordionIconComponent;
};

const AccordionItemComponent = AccordionComponent.Item;
export const AccordionHeader = AccordionComponent.Header;
export const AccordionTrigger = AccordionComponent.Trigger;
export const AccordionContent = AccordionComponent.Content;
export const AccordionContentText = AccordionComponent.ContentText;
export const AccordionIcon = AccordionComponent.Icon;
export const AccordionTitleText = AccordionComponent.TitleText;

const Accordion = forwardRef<View, AccordionProps>(
  (
    {
      children,
      collapsible,
      type = 'multiple',
      headingText,
      headingHelperText,
      headingLinkText,
      headingLinkHref,
      headingLinkOnPress,
      headingLinkTarget,
      headingLinkDisabled,
      headingLinkIcon,
      headingLinkIconPosition,
      headingLinkShowIcon,
      ...props
    },
    ref
  ) => {
    return (
      <AccordionComponent
        ref={ref}
        isDisabled={props.disabled}
        isCollapsible={collapsible}
        type={type}
        contentNoPadding={props.contentNoPadding}
        {...props}
      >
        {headingText ? (
          <AccordionHeading
            text={headingText}
            helperText={headingHelperText}
            linkText={headingLinkText}
            linkHref={headingLinkHref}
            linkOnPress={headingLinkOnPress}
            linkTarget={headingLinkTarget}
            linkDisabled={headingLinkDisabled}
            linkIcon={headingLinkIcon}
            linkIconPosition={headingLinkIconPosition}
            linkShowIcon={headingLinkShowIcon}
          />
        ) : null}
        {children}
      </AccordionComponent>
    );
  }
);

export const AccordionItem = forwardRef<View, AccordionItemProps>(
  ({ children, value, title, expanded, triggerContent, ...props }, ref) => {
    if (!children) {
      return null;
    }

    const processedChildren = React.Children.toArray(children);
    const hasContentComponent = processedChildren.some(
      // @ts-expect-error - type
      child => React.isValidElement(child) && child.type.displayName === 'AccordionContent'
    );

    return (
      <AccordionItemComponent
        ref={ref}
        value={value ?? Math.random().toString()}
        title={title}
        isDisabled={props.disabled}
        {...props}
      >
        {hasContentComponent ? (
          children
        ) : (
          <>
            <AccordionHeader>
              <AccordionTrigger isExpanded={expanded}>
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
  }
);

AccordionItem.displayName = 'AccordionItem';
Accordion.displayName = 'Accordion';
AccordionHeader.displayName = 'AccordionHeader';
AccordionTrigger.displayName = 'AccordionTrigger';
AccordionContent.displayName = 'AccordionContent';
AccordionContentText.displayName = 'AccordionContentText';
AccordionIcon.displayName = 'AccordionIcon';
AccordionTitleText.displayName = 'AccordionTitleText';

export default Accordion;
