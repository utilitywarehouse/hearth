import * as React from 'react';

import clsx from 'clsx';

import type { CheckboxProps } from './Checkbox.props';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { useFormFieldGroup } from '../FormFieldGroup/FormFieldGroup.context';
import { HelperText } from '../HelperText/HelperText';
import type { ElementRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useCheckboxGroupBase } from '../CheckboxGroupBase/CheckboxGroupBase.context';
import { useIds } from '../../hooks/use-ids';

const componentName = 'Checkbox';
const componentClassName = withGlobalPrefix(componentName);

export type CheckboxElement = ElementRef<'button'>;

export const Checkbox = React.forwardRef<CheckboxElement, CheckboxProps>(
  (
    {
      id: providedId,
      label,
      helperText,
      className,
      disabled,
      onCheckedChange,
      value = 'on',
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'checkbox' });
    const context = useFormFieldGroup();
    const checkboxContext = useCheckboxGroupBase();
    const checked = checkboxContext?.value?.includes(value);
    const hasGroupHelperText = context?.hasGroupHelperText;
    const ariaDescribedby = context ? context['aria-describedby'] : '';
    const showHelperText = !hasGroupHelperText && !!helperText;
    const showLabel = !!label;

    return (
      <Flex
        className={clsx(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
        gap="100"
      >
        <RadixCheckbox.Root
          ref={ref}
          className="hearth-CheckboxRoot"
          name={checkboxContext?.name}
          checked={checked}
          value={value}
          {...props}
          id={id}
          disabled={disabled}
          aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
          aria-labelledby={ariaLabelledby || showLabel ? labelId : undefined}
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
          <RadixCheckbox.Indicator asChild className="hearth-CheckboxIndicator">
            <TickSmallIcon />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        {showLabel ? (
          <Flex direction="column" gap="50">
            <Label id={labelId} htmlFor={id} nested disableUserSelect>
              {label}
            </Label>
            {showHelperText ? (
              <HelperText id={helperTextId} disableUserSelect>
                {helperText}
              </HelperText>
            ) : null}
          </Flex>
        ) : null}
      </Flex>
    );
  }
);

Checkbox.displayName = componentName;
