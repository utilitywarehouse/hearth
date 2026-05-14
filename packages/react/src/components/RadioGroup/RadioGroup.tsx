'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { RadioGroupProps } from './RadioGroup.props';
import { Flex } from '../Flex/Flex';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';

const COMPONENT_NAME = 'RadioGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type RadioGroupElement = ComponentRef<'fieldset'>;

export const RadioGroup = forwardRef<RadioGroupElement, RadioGroupProps>(
  (
    {
      children,
      contentWidth,
      direction = 'column',
      className,
      label,
      labelVariant,
      helperText,
      validationText,
      validationStatus,
      required,
      disabled,
      loop,
      defaultValue,
      value,
      onValueChange,
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
      labelVariant,
      helperText,
      validationText,
      validationStatus,
    };
    const radioGroupRootProps = {
      width: contentWidth,
      direction,
      name,
      required,
      disabled,
      loop,
      defaultValue,
      value,
      onValueChange,
    };

    return (
      <FormGroupBase ref={ref} data-testid={componentClassName} {...formGroupBaseProps}>
        <RadioGroupPrimitive.Root
          asChild
          className={cn(componentClassName, className)}
          {...radioGroupRootProps}
        >
          <Flex>{children}</Flex>
        </RadioGroupPrimitive.Root>
      </FormGroupBase>
    );
  }
);

RadioGroup.displayName = COMPONENT_NAME;
