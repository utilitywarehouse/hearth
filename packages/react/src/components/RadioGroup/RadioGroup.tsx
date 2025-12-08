'use client';

import * as React from 'react';

import clsx from 'clsx';

import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { RadioGroupProps } from './RadioGroup.props';
import { Flex } from '../Flex/Flex';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';

const COMPONENT_NAME = 'RadioGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

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
      <FormGroupBase ref={ref} {...fieldsetProps}>
        <RadixRadioGroup.Root
          asChild
          className={clsx(componentClassName, className)}
          {...radioGroupRootProps}
          orientation={direction === 'column' ? 'vertical' : 'horizontal'}
        >
          <Flex width={contentWidth}>{children}</Flex>
        </RadixRadioGroup.Root>
      </FormGroupBase>
    );
  }
);

RadioGroup.displayName = COMPONENT_NAME;
