import * as React from 'react';

import clsx from 'clsx';

import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { RadioGroupProps, RadioGroupRootProps } from './RadioGroup.props';
import { Flex } from '../Flex/Flex';
import { FormFieldGroup } from '../FormFieldGroup/FormFieldGroup';

const rootComponentName = 'RadioGroupRoot';
const rootComponentClassName = withGlobalPrefix(rootComponentName);

type RadioGroupRootElement = ElementRef<'div'>;

export const RadioGroupRoot = React.forwardRef<RadioGroupRootElement, RadioGroupRootProps>(
  ({ children, direction = 'column', width, className, ...props }, ref) => {
    return (
      <RadixRadioGroup.Root
        ref={ref}
        asChild
        {...props}
        orientation={direction === 'column' ? 'vertical' : 'horizontal'}
        className={clsx(rootComponentClassName, className)}
      >
        <Flex width={width}>{children}</Flex>
      </RadixRadioGroup.Root>
    );
  }
);

RadioGroupRoot.displayName = rootComponentName;

const componentName = 'RadioGroup';
const componentClassName = withGlobalPrefix(componentName);

type RadioGroupElement = ElementRef<'fieldset'>;

export const RadioGroup = React.forwardRef<RadioGroupElement, RadioGroupProps>(
  (
    {
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
    },
    ref
  ) => {
    const formFieldGroupProps = {
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
      <FormFieldGroup
        ref={ref}
        className={clsx(componentClassName, className)}
        {...formFieldGroupProps}
      >
        <RadioGroupRoot {...radioGroupRootProps}>{children}</RadioGroupRoot>
      </FormFieldGroup>
    );
  }
);

RadioGroup.displayName = componentName;
