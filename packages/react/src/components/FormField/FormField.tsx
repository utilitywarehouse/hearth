import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import React from 'react';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
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
    <div
      className={clsx(componentClassName, className)}
      data-validation-status={validationStatus ? validationStatus : undefined}
      {...props}
    >
      <div
        className={`${componentClassName}LabelContainer`}
        data-visually-hidden={hideLabel ? '' : undefined}
      >
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
      </div>

      {children}

      {showValidationText ? (
        <ValidationText status={validationStatus} disableUserSelect id={validationTextId}>
          {validationText}
        </ValidationText>
      ) : null}
    </div>
  );
};

FormField.displayName = COMPONENT_NAME;
