import * as React from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Heading } from '../Heading/Heading';
import { HelperText } from '../HelperText/HelperText';
import type { SectionHeaderProps } from './SectionHeader.props';
import { ValidationText } from '../ValidationText/ValidationText';
import { Box } from '../Box/Box';

const COMPONENT_NAME = 'SectionHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SectionHeaderElement = ComponentRef<'div'>;

export const SectionHeader = React.forwardRef<SectionHeaderElement, SectionHeaderProps>(
  (
    {
      className,
      heading,
      id,
      headingElement: HeadingEl = 'div',
      helperText,
      trailingContent,
      validationText,
      validationStatus,
      ...props
    },
    ref
  ) => {
    const showValidationText = validationStatus !== undefined && validationText !== undefined;
    return (
      <Box ref={ref} className={cn(componentClassName, className)} {...props}>
        <Heading asChild size="md" id={id}>
          <HeadingEl>{heading}</HeadingEl>
        </Heading>
        {helperText ? <HelperText>{helperText}</HelperText> : null}
        {showValidationText ? (
          <ValidationText status={validationStatus}>{validationText}</ValidationText>
        ) : null}

        {trailingContent ? (
          <span className={`${componentClassName}TrailingContent`}>{trailingContent}</span>
        ) : null}
      </Box>
    );
  }
);

SectionHeader.displayName = COMPONENT_NAME;
