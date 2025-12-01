import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import React from 'react';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { ValidationText } from '../ValidationText/ValidationText';
import { BodyText } from '../BodyText/BodyText';
import { FormFieldProps } from './FormField.props';

const COMPONENT_NAME = 'FormField';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const FormField: React.FC<FormFieldProps> = ({
  className,
  validationStatus,
  validationText,
  label,
  helperText,
  children,
  id,
  labelId,
  helperTextId,
  validationTextId,
  hideLabel,
  required,
  ...props
}) => {
  const showValidationText = Boolean(
    validationStatus !== undefined && validationText !== undefined
  );

  return (
    <Flex
      className={clsx(componentClassName, className)}
      width="100%"
      direction="column"
      gap="75"
      {...props}
    >
      <Flex direction="column" data-visually-hidden={hideLabel ? '' : undefined}>
        <Label htmlFor={id} id={labelId} disableUserSelect fontWeight="semibold">
          {label}
          {required ? null : (
            <BodyText as="span" marginLeft="50">
              (optional)
            </BodyText>
          )}
        </Label>
        {helperText ? (
          <HelperText id={helperTextId} disableUserSelect>
            {helperText}
          </HelperText>
        ) : null}
      </Flex>

      {children}

      {showValidationText ? (
        <ValidationText status={validationStatus} disableUserSelect id={validationTextId}>
          {validationText}
        </ValidationText>
      ) : null}
    </Flex>
  );
};

FormField.displayName = COMPONENT_NAME;
