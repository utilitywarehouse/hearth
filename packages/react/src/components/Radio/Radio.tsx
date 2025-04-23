import * as React from 'react';

import clsx from 'clsx';

import {
  Indicator as RadixRadioIndicator,
  Item as RadixRadioItem,
} from '@radix-ui/react-radio-group';

import type { RadioProps } from './Radio.props';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useIds } from '../../hooks/use-ids';
import { HelperText } from '../HelperText/HelperText';
import type { ElementRef } from 'react';
import { useFormFieldGroup } from '../FormFieldGroup/FormFieldGroup.context';
import { ValidationText } from '../ValidationText/ValidationText';

const componentName = 'Radio';
const componentClassName = withGlobalPrefix(componentName);

type RadioElement = ElementRef<'button'>;

/**
 * `Radio` can be used to choose between a set of more than two options.
 *
 * `Radio` should always be used with a `RadioGroup` or `RadioGridGroup` to
 * handle the state control and layout.
 *
 * `Radio` is, by default, appropriately labelled when using
 * the `label` prop, if you do not provide a label, you must specify an
 * `aria-label` or `aria-labelledby` for accessibility.
 *
 * > This component does not need to be wrapped in a `ThemeProvider` and can be used standalone with other component libraries.
 */
export const Radio = React.forwardRef<RadioElement, RadioProps>(
  (
    {
      id: providedId,
      label,
      helperText,
      invalid,
      validationText,
      disabled,
      className,
      labelFontWeight,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId, validationTextId } = useIds({ providedId, prefix: 'radio' });
    const {
      hasGroupHelperText,
      hasGroupValidationText,
      'aria-describedby': ariaDescribedby,
    } = useFormFieldGroup();
    const showHelperText = Boolean(!hasGroupHelperText && helperText !== undefined);
    const showLabel = !!label;
    const showValidationText = Boolean(
      !disabled && !hasGroupValidationText && invalid && validationText !== undefined
    );
    return (
      <Flex
        gap="100"
        className={clsx(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
      >
        <Flex align="center" justify="center" className="hearth-RadioContainer">
          <RadixRadioItem
            ref={ref}
            {...props}
            id={id}
            disabled={disabled}
            aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
            aria-labelledby={ariaLabelledby || !!label ? labelId : undefined}
            className="hearth-RadioItem"
          >
            <RadixRadioIndicator className="hearth-RadioIndicator" />
          </RadixRadioItem>
        </Flex>
        {showLabel ? (
          <Flex direction="column" gap="50">
            <Label
              id={labelId}
              htmlFor={id}
              disableUserSelect
              fontWeight={labelFontWeight}
              className="hearth-RadioLabel"
            >
              {label}
            </Label>
            {showHelperText ? (
              <HelperText id={helperTextId} disableUserSelect>
                {helperText}
              </HelperText>
            ) : null}
            {showValidationText ? (
              <ValidationText status="invalid" disableUserSelect id={validationTextId}>
                {validationText}
              </ValidationText>
            ) : null}
          </Flex>
        ) : null}
      </Flex>
    );
  }
);

Radio.displayName = componentName;
