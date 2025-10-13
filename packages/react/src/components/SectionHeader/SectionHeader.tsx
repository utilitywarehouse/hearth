import * as React from 'react';

import clsx from 'clsx';

import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Heading } from '../Heading/Heading';
import { HelperText } from '../HelperText/HelperText';
import { SectionHeaderProps } from './SectionHeader.props';
import { ValidationText } from '../ValidationText/ValidationText';

const COMPONENT_NAME = 'SectionHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SectionHeaderElement = ElementRef<'div'>;

export const SectionHeader = React.forwardRef<SectionHeaderElement, SectionHeaderProps>(
  ({
    className,
    heading,
    id,
    headingElement: HeadingEl = 'div',
    helperText,
    trailingContent,
    validationText,
    validationStatus,
    ...props
  }) => {
    const showValidationText = validationStatus !== undefined && validationText !== undefined;
    return (
      <div className={clsx(componentClassName, className)}>
        <Heading asChild size="md" id={id} {...props}>
          <HeadingEl>{heading}</HeadingEl>
        </Heading>
        {helperText ? <HelperText>{helperText}</HelperText> : null}
        {showValidationText ? (
          <ValidationText status={validationStatus}>{validationText}</ValidationText>
        ) : null}

        {trailingContent ? (
          <span className={`${componentClassName}TrailingContent`}>{trailingContent}</span>
        ) : null}
      </div>
    );
  }
);

SectionHeader.displayName = COMPONENT_NAME;
