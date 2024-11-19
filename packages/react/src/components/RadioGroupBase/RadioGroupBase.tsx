import * as React from 'react';
import type { ElementRef } from 'react';

import { Root as RadixRadioRoot } from '@radix-ui/react-radio-group';
import { useIds } from '../../hooks/use-ids';
import { mergeIds } from '../../helpers/merge-ids';
import { Fieldset } from '../Fieldset/Fieldset';
import { Flex } from '../Flex/Flex';
import { FieldsetLegend } from '../FieldsetLegend/FieldsetLegend';
import { HelperText } from '../HelperText/HelperText';
import { RadioGroupBaseProvider } from './RadioGroupBase.context';
import { RadioGroupBaseProps } from './RadioGroupBase.props';

const componentName = 'RadioGroupBase';

type RadioGroupBaseElement = ElementRef<'div'>;

export const RadioGroupBase = React.forwardRef<RadioGroupBaseElement, RadioGroupBaseProps>(
  (
    {
      id: providedId,
      children,
      label,
      helperText,
      helperTextPosition = 'top',
      showHelperTextIcon,
      error,
      errorMessage,
      showErrorMessageIcon,
      disabled,
      'aria-labelledby': ariaLabelledby,
      'aria-describedby': ariaDescribedby,
      'aria-errormessage': ariaErrorMessage,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId, errorMessageId } = useIds({
      providedId,
      componentPrefix: 'radiogroup',
    });
    const showErrorMessage = Boolean(error && errorMessage);
    const showTopHelperText = helperText && helperTextPosition === 'top';
    const showBottomHelperText = helperText && helperTextPosition === 'bottom';

    const ariaDescribedbyValue = mergeIds(
      ariaDescribedby || !!helperText ? helperTextId : undefined,
      ariaErrorMessage || showErrorMessage ? errorMessageId : undefined
    );
    const value = {
      hasGroupHelperText: !!helperText,
      'aria-describedby': ariaDescribedbyValue,
    };

    return (
      <RadixRadioRoot
        ref={ref}
        asChild
        {...props}
        disabled={disabled}
        id={id}
        aria-errormessage={ariaErrorMessage || showErrorMessage ? errorMessageId : undefined}
        aria-labelledby={ariaLabelledby || !!label ? labelId : undefined}
        aria-invalid={showErrorMessage}
        aria-describedby={ariaDescribedbyValue}
      >
        <Fieldset>
          {label || showTopHelperText ? (
            <Flex direction="column" gap="4px">
              {label ? (
                <FieldsetLegend id={labelId} disabled={disabled}>
                  {label}
                </FieldsetLegend>
              ) : null}
              {showTopHelperText ? (
                <HelperText id={helperTextId} disabled={disabled} showIcon={showHelperTextIcon}>
                  {helperText}
                </HelperText>
              ) : null}
            </Flex>
          ) : null}

          <RadioGroupBaseProvider value={value}>{children}</RadioGroupBaseProvider>

          {showBottomHelperText || showErrorMessage ? (
            <Flex direction="column" gap="8px">
              {showBottomHelperText ? (
                <HelperText id={helperTextId} disabled={disabled} showIcon={showHelperTextIcon}>
                  {helperText}
                </HelperText>
              ) : null}
              {showErrorMessage ? (
                <HelperText
                  validationStatus="invalid"
                  showIcon={showErrorMessageIcon}
                  id={errorMessageId}
                >
                  {errorMessage}
                </HelperText>
              ) : null}
            </Flex>
          ) : null}
        </Fieldset>
      </RadixRadioRoot>
    );
  }
);

RadioGroupBase.displayName = componentName;
