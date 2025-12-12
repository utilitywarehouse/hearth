'use client';

import clsx from 'clsx';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { RadioGroupProps } from './RadioGroup.props';
import { Flex } from '../Flex/Flex';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';

const COMPONENT_NAME = 'RadioGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const RadioGroup = ({
  children,
  contentWidth,
  direction = 'column',
  className,
  label,
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
}: RadioGroupProps) => {
  const fieldsetProps = {
    ...props,
    disabled,
    required,
    label,
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
    <FormGroupBase {...fieldsetProps}>
      <RadioGroupPrimitive.Root
        asChild
        className={clsx(componentClassName, className)}
        {...radioGroupRootProps}
        orientation={direction === 'column' ? 'vertical' : 'horizontal'}
      >
        <Flex width={contentWidth}>{children}</Flex>
      </RadioGroupPrimitive.Root>
    </FormGroupBase>
  );
};

RadioGroup.displayName = COMPONENT_NAME;
