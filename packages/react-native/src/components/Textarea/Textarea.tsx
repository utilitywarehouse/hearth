import React from 'react';
import { createTextarea } from '@gluestack-ui/textarea';
import type TextareaProps from './Textarea.props';

import TextareaRoot from './TextareaRoot';
import TextareaFieldComponent from './TextareaField';
import { useFormFieldContext } from '../FormField';

export const TextareaComponent = createTextarea({
  Root: TextareaRoot,
  Input: TextareaFieldComponent,
});

export const TextareaField = TextareaComponent.Input;

const Textarea: React.FC<TextareaProps> = ({
  validationStatus = 'initial',
  children,
  disabled,
  focused,
  readonly,
  ...props
}) => {
  const formFieldContext = useFormFieldContext();
  const { disabled: formFieldDisabled } = formFieldContext;
  const validationStatusFromContext = formFieldContext?.validationStatus ?? validationStatus;

  return (
    <TextareaComponent
      {...(children ? props : {})}
      validationStatus={validationStatusFromContext}
      isInvalid={validationStatusFromContext === 'invalid'}
      isReadOnly={readonly}
      isDisabled={formFieldDisabled ?? disabled}
      isFocused={focused}
    >
      {children ? (
        <>{children}</>
      ) : (
        <>
          <TextareaField {...props} />
        </>
      )}
    </TextareaComponent>
  );
};

export default Textarea;
