'use client';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useIds } from '../../hooks/use-ids';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { useCheckboxGroup } from '../CheckboxGroup/CheckboxGroup.context';
import { useFormGroupBase } from '../FormGroupBase/FormGroupBase.context';
import type { CheckboxProps } from '../Checkbox/Checkbox.props';
import { ValidationText } from '../ValidationText/ValidationText';
import { mergeIds } from '../../helpers/merge-ids';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

type CheckboxTileElement = ComponentRef<'button'>;

const COMPONENT_NAME = 'CheckboxTile';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CheckboxTile = forwardRef<CheckboxTileElement, CheckboxProps>((props, ref) => {
  const {
    className,
    id: providedId,
    disabled,
    value = 'on',
    onCheckedChange,
    label,
    helperText,
    image,
    'aria-labelledby': ariaLabelledby,
    validationStatus,
    validationText,
    ...restProps
  } = props;

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'checkboxtile',
  });
  const context = useFormGroupBase();
  const checkboxContext = useCheckboxGroup();
  const checked = checkboxContext?.value?.includes(value);
  const hasGroupHelperText = context?.hasGroupHelperText;
  const hasGroupValidationText = context?.hasGroupValidationText;
  const ariaDescribedby = context ? context['aria-describedby'] : '';
  const showHelperText = !hasGroupHelperText && !!helperText;
  const showLabel = !!label;
  const showValidation =
    !hasGroupValidationText && validationStatus !== undefined && validationText !== undefined;
  const ariaDescribedbyValue = mergeIds(
    ariaDescribedby,
    !!helperText ? helperTextId : undefined,
    showValidation && validationText !== undefined ? validationTextId : undefined
  );

  return (
    <label className={cn(componentClassName, className)} data-testid={componentClassName} data-disabled={disabled ? '' : undefined}>
      <CheckboxPrimitive.Root
        ref={ref}
        className="h-CheckboxRoot"
        name={checkboxContext?.name}
        checked={checked}
        value={value}
        {...restProps}
        id={id}
        disabled={disabled}
        aria-describedby={ariaDescribedbyValue}
        aria-labelledby={ariaLabelledby || showLabel ? labelId : undefined}
        aria-errormessage={validationStatus === 'invalid' ? validationTextId : undefined}
        onCheckedChange={(checked: boolean) => {
          if (context) {
            if (checked) {
              checkboxContext?.onItemCheck(value);
            } else {
              checkboxContext?.onItemUncheck(value);
            }
          }
          if (onCheckedChange) {
            onCheckedChange(checked);
          }
        }}
      >
        <CheckboxPrimitive.Indicator asChild className={`${componentClassName}Indicator`}>
          <TickSmallIcon />
        </CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      <Flex direction="column">
        <Label id={labelId} htmlFor={id} disableUserSelect>
          {image}
          {label}
        </Label>
        {showHelperText ? (
          <HelperText id={helperTextId} disableUserSelect>
            {helperText}
          </HelperText>
        ) : null}
        {showValidation ? (
          <ValidationText id={validationTextId} status={validationStatus} disableUserSelect>
            {validationText}
          </ValidationText>
        ) : null}
      </Flex>
    </label>
  );
});

CheckboxTile.displayName = COMPONENT_NAME;
