'use client';

import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { RadioGroup as RadioGroupPrimitive } from '@base-ui/react/radio-group';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { RadioGroupProps } from './RadioGroup.props';
import { Flex } from '../Flex/Flex';
import { FormGroupBase } from '../FormGroupBase/FormGroupBase';

const COMPONENT_NAME = 'RadioGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type RadioGroupElement = ComponentRef<'fieldset'>;

/**
 * Use RadioGroup to group a set of Radio, RadioTile, or RadioCard components
 * so a user can select a single option from a set. It manages the shared
 * value, label, helper text, and validation state for its children, and
 * follows the WAI-ARIA Radio Group pattern for groups not contained in a
 * toolbar. For multi-select options, use CheckboxGroup instead.
 *
 * @summary Groups Radio, RadioTile, or RadioCard options for single selection.
 */
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
      defaultValue,
      value,
      onValueChange,
    };

    return (
      <FormGroupBase ref={ref} data-testid={componentClassName} {...formGroupBaseProps}>
        <RadioGroupPrimitive
          className={cn(componentClassName, className)}
          {...radioGroupRootProps}
          render={<Flex>{children}</Flex>}
        />
      </FormGroupBase>
    );
  }
);

RadioGroup.displayName = COMPONENT_NAME;
