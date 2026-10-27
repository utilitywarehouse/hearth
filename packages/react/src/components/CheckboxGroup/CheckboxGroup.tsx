'use client';

import { forwardRef, useCallback } from 'react';
import { cn } from '../../helpers/cn';
import type { CheckboxGroupProps } from './CheckboxGroup.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';
import { useControlled } from '@base-ui/utils/useControlled';
import { CheckboxGroupProvider } from './CheckboxGroup.context';
import type { ComponentRef } from 'react';

type CheckboxGroupElement = ComponentRef<'fieldset'>;

const COMPONENT_NAME = 'CheckboxGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

/**
 * Use CheckboxGroup to present a set of `Checkbox` controls where multiple
 * options can be selected at once. It groups related checkboxes in a
 * `fieldset` and handles their shared label, helper text, validation, and
 * disabled state, as well as their layout. For single-select options, use
 * RadioGroup instead.
 *
 * @summary A fieldset grouping multiple related checkboxes that can each be selected independently.
 */
export const CheckboxGroup = forwardRef<CheckboxGroupElement, CheckboxGroupProps>((props, ref) => {
  const {
    disabled,
    required,
    label,
    labelVariant,
    helperText,
    validationText,
    validationStatus,
    value: valueProp,
    contentWidth = 'fit-content',
    direction = 'column',
    defaultValue,
    onValueChange,
    children,
    className,
    name,
    ...restProps
  } = props;

  const formGroupBaseProps = {
    ...restProps,
    disabled,
    required,
    label,
    labelVariant,
    helperText,
    validationText,
    validationStatus,
  };

  const checkboxGroupProps = {
    width: contentWidth,
    direction,
    name,
    required,
    disabled,
    defaultValue,
    value: valueProp,
    onValueChange,
    children,
  };

  // useControlled will handle whether controlled or uncontrolled
  const [value, setValue] = useControlled({
    controlled: valueProp,
    default: defaultValue || ([] as Array<string>),
    name: COMPONENT_NAME,
    state: 'value',
  });

  // Unlike useControllableState, useControlled does not call a change callback, so notify here
  const updateValue = useCallback(
    (nextValue: Array<string>) => {
      setValue(nextValue);
      onValueChange?.(nextValue);
    },
    [setValue, onValueChange]
  );

  const handleItemCheck = useCallback(
    (itemValue: string) => updateValue([...value, itemValue]),
    [updateValue, value]
  );

  const handleItemUncheck = useCallback(
    (itemValue: string) => updateValue(value.filter(checkedValue => checkedValue !== itemValue)),
    [updateValue, value]
  );

  const providerValue = {
    name,
    value,
    onItemCheck: handleItemCheck,
    onItemUncheck: handleItemUncheck,
  };

  return (
    <FormGroupBase
      ref={ref}
      className={cn(componentClassName, className)}
      data-testid={componentClassName}
      {...formGroupBaseProps}
    >
      <Flex
        {...checkboxGroupProps}
        className={`${componentClassName}Content`}
        data-orientation={direction === 'column' ? 'vertical' : 'horizontal'}
        data-disabled={disabled ? '' : undefined}
        width={contentWidth}
      >
        <CheckboxGroupProvider value={providerValue}>{children}</CheckboxGroupProvider>
      </Flex>
    </FormGroupBase>
  );
});

CheckboxGroup.displayName = COMPONENT_NAME;
