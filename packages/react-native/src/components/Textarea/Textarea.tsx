import { createTextarea } from '@gluestack-ui/core/textarea/creator';
import type TextareaProps from './Textarea.props';

import { useFormFieldContext } from '../FormField';
import TextareaFieldComponent from './TextareaField';
import TextareaRoot from './TextareaRoot';

export const TextareaComponent = createTextarea({
  Root: TextareaRoot,
  Input: TextareaFieldComponent,
});

export const TextareaField = TextareaComponent.Input;

const Textarea = ({
  validationStatus = 'initial',
  children,
  disabled,
  focused,
  readonly,
  ...props
}: TextareaProps) => {
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
