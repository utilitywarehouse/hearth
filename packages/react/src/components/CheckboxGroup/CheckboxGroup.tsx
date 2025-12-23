'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import type { CheckboxGroupProps } from './CheckboxGroup.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { CheckboxGroupProvider } from './CheckboxGroup.context';

const COMPONENT_NAME = 'CheckboxGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CheckboxGroup = ({
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
  ...props
}: CheckboxGroupProps) => {
  const formGroupBaseProps = {
    ...props,
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

  // useControllableState will handle whether controlled or uncontrolled
  const [value = [], setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValue || ([] as Array<string>),
    onChange: onValueChange,
  });

  const handleItemCheck = React.useCallback(
    (itemValue: string) => setValue((prevValue = []) => [...prevValue, itemValue]),
    [setValue]
  );

  const handleItemUncheck = React.useCallback(
    (itemValue: string) =>
      setValue((prevValue = []) => prevValue.filter(value => value !== itemValue)),
    [setValue]
  );

  const providerValue = {
    name,
    value,
    onItemCheck: handleItemCheck,
    onItemUncheck: handleItemUncheck,
  };

  return (
    <FormGroupBase className={cn(componentClassName, className)} {...formGroupBaseProps}>
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
};

CheckboxGroup.displayName = COMPONENT_NAME;
