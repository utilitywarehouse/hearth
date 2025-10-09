import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { DescriptionListItemProps } from './DescriptionListItem.props';
import { DescriptionListContext } from '../DescriptionList/DescriptionList.context';
import { Flex } from '../Flex/Flex';
import { ValidationText } from '../ValidationText/ValidationText';

const COMPONENT_NAME = 'DescriptionListItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DescriptionListItemElement = ElementRef<'div'>;

export const DescriptionListItem = React.forwardRef<
  DescriptionListItemElement,
  DescriptionListItemProps
>(({ className, heading, description, link, validationStatus, validationText, ...props }, ref) => {
  const { direction } = React.useContext(DescriptionListContext);
  const showValidationText = validationStatus !== undefined && validationText !== undefined;
  return (
    <Flex ref={ref} {...props} className={clsx(componentClassName, className)}>
      <Flex direction={direction}>
        <dt>{heading}</dt>
        <Flex>
          <dd>{description}</dd>
          {showValidationText ? (
            <ValidationText status={validationStatus}>{validationText}</ValidationText>
          ) : null}
        </Flex>
      </Flex>
      {link}
    </Flex>
  );
});

DescriptionListItem.displayName = COMPONENT_NAME;
