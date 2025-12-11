'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { DescriptionListItemProps } from './DescriptionListItem.props';
import { DescriptionListContext } from '../DescriptionList/DescriptionList.context';
import { Flex } from '../Flex/Flex';
import { ValidationText } from '../ValidationText/ValidationText';
import * as React from 'react';

const COMPONENT_NAME = 'DescriptionListItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const DescriptionListItem = ({
  className,
  heading,
  description,
  link,
  validationStatus,
  validationText,
  ...props
}: DescriptionListItemProps) => {
  const { direction } = React.useContext(DescriptionListContext);
  const showValidationText = validationStatus !== undefined && validationText !== undefined;
  return (
    <Flex {...props} className={clsx(componentClassName, className)}>
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
};

DescriptionListItem.displayName = COMPONENT_NAME;
