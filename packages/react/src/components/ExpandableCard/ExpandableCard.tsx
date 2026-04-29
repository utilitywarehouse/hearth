'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { Collapsible as CollapsiblePrimitive } from 'radix-ui';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { ExpandableCardProps } from './ExpandableCard.props';
import { ChevronDownSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Divider } from '../Divider/Divider';
import { HelperText } from '../HelperText/HelperText';
import { BodyText } from '../BodyText/BodyText';
import { IconContainer } from '../IconContainer/IconContainer';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'ExpandableCard';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ExpandableCardElement = ComponentRef<'div'>;

export const ExpandableCard = forwardRef<ExpandableCardElement, ExpandableCardProps>(
  (props, ref) => {
    const {
      className,
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      badge,
      numericValue,
      children,
      ...restProps
    } = extractProps(props, marginPropDefs);

    return (
      <CollapsiblePrimitive.Root
        ref={ref}
        className={cn(componentClassName, className)}
        {...restProps}
      >
        <CollapsiblePrimitive.Trigger className={`${componentClassName}Trigger`}>
          {leadingIcon ? (
            leadingIconContainerColorScheme ? (
              <IconContainer colorScheme={leadingIconContainerColorScheme} size="sm">
                {leadingIcon}
              </IconContainer>
            ) : (
              <div className={`${componentClassName}LeadingIcon`}>{leadingIcon}</div>
            )
          ) : null}
          <Flex flex="1" gap="50" direction="column" alignItems="start">
            <div>
              <BodyText size="md" weight="semibold">
                {heading}
              </BodyText>
              {helperText ? <HelperText>{helperText}</HelperText> : null}
            </div>
            {badge ? badge : null}
          </Flex>
          {numericValue ? (
            <BodyText size="md" weight="semibold">
              {numericValue}
            </BodyText>
          ) : null}
          <ChevronDownSmallIcon className={`${componentClassName}Chevron`} aria-hidden />
        </CollapsiblePrimitive.Trigger>
        <CollapsiblePrimitive.Content className={`${componentClassName}Content`}>
          <Divider decorative />
          <div className={`${componentClassName}ContentInner`}>{children}</div>
        </CollapsiblePrimitive.Content>
      </CollapsiblePrimitive.Root>
    );
  }
);

ExpandableCard.displayName = COMPONENT_NAME;
