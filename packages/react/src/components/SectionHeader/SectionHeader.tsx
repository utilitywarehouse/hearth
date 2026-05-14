import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Heading } from '../Heading/Heading';
import { HelperText } from '../HelperText/HelperText';
import type { SectionHeaderProps } from './SectionHeader.props';
import { ValidationText } from '../ValidationText/ValidationText';
import { Box } from '../Box/Box';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'SectionHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SectionHeaderElement = ComponentRef<'div'>;

export const SectionHeader = forwardRef<SectionHeaderElement, SectionHeaderProps>(
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
      direction,
      ...props
    },
    ref
  ) => {
    const showValidationText = validationStatus !== undefined && validationText !== undefined;

    return (
      <Flex
        ref={ref}
        className={cn(componentClassName, className)}
        direction={direction}
        data-testid={componentClassName}
        {...props}
      >
        <Box className={`${componentClassName}Content`}>
          <Heading asChild size="md" id={id}>
            <HeadingEl>{heading}</HeadingEl>
          </Heading>
          {helperText ? <HelperText>{helperText}</HelperText> : null}
          {showValidationText ? (
            <ValidationText status={validationStatus}>{validationText}</ValidationText>
          ) : null}
        </Box>

        {trailingContent ? (
          <span className={`${componentClassName}TrailingContent`}>{trailingContent}</span>
        ) : null}
      </Flex>
    );
  }
);

SectionHeader.displayName = COMPONENT_NAME;
