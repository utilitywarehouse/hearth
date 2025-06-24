import * as React from 'react';

import clsx from 'clsx';

import { CheckboxGroupProps } from './CheckboxGroup.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Flex } from '../Flex/Flex';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';
import { useControllableState } from '@radix-ui/react-use-controllable-state';
import { CheckboxGroupProvider } from './CheckboxGroup.context';

const componentName = 'CheckboxGroup';
const componentClassName = withGlobalPrefix(componentName);

type CheckboxGroupElement = ElementRef<'fieldset'>;

export const CheckboxGroup = React.forwardRef<CheckboxGroupElement, CheckboxGroupProps>(
  (
    {
      disabled,
      required,
      label,
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
    },
    ref
  ) => {
    const formGroupBaseProps = {
      ...props,
      disabled,
      required,
      label,
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
      <FormGroupBase
        ref={ref}
        className={clsx(componentClassName, className)}
        {...formGroupBaseProps}
      >
        <Flex
          {...checkboxGroupProps}
          className="hearth-CheckboxGroupContent"
          data-orientation={direction === 'column' ? 'vertical' : 'horizontal'}
          data-disabled={disabled ? '' : undefined}
          width={contentWidth}
        >
          <CheckboxGroupProvider value={providerValue}>{children}</CheckboxGroupProvider>
        </Flex>
      </FormGroupBase>
    );
  }
);

CheckboxGroup.displayName = componentName;
