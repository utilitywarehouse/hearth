import * as React from 'react';

import clsx from 'clsx';

import { CheckboxGroupProps, CheckboxGroupRootProps } from './CheckboxGroup.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { FormFieldGroup } from '../FormFieldGroup/FormFieldGroup';
import { Flex } from '../Flex/Flex';
import { CheckboxGroupBase } from '../CheckboxGroupBase/CheckboxGroupBase';

const rootComponentName = 'CheckboxGroupRoot';
const rootComponentClassName = withGlobalPrefix(rootComponentName);

type CheckboxGroupRootElement = ElementRef<'div'>;

export const CheckboxGroupRoot = React.forwardRef<CheckboxGroupRootElement, CheckboxGroupRootProps>(
  (
    {
      name,
      disabled,
      value,
      defaultValue,
      onValueChange,
      width = 'fit-content',
      direction = 'column',
      children,
      className,
      ...props
    },
    ref
  ) => {
    const checkboxGroupBaseProps = { name, value, defaultValue, onValueChange, children };
    return (
      <Flex
        ref={ref}
        {...props}
        className={clsx(rootComponentClassName, className)}
        data-orientation={direction === 'column' ? 'vertical' : 'horizontal'}
        data-disabled={disabled ? '' : undefined}
        width={width}
      >
        <CheckboxGroupBase {...checkboxGroupBaseProps} />
      </Flex>
    );
  }
);

CheckboxGroupRoot.displayName = rootComponentName;

const componentName = 'CheckboxGroup';
const componentClassName = withGlobalPrefix(componentName);

type CheckboxGroupElement = ElementRef<'fieldset'>;

/**
 * Set of interactive buttons where multiple options can be selected at a time.
 * The `CheckboxGroup` uses a fieldset to group related `Checkbox` controls.
 * The `CheckboxGroup` is responsible for handling the value, label, helper
 * text, error state, error message, and disabled state, as well as determining
 * the presentation and selection of the items in the list.
 */
export const CheckboxGroup = React.forwardRef<CheckboxGroupElement, CheckboxGroupProps>(
  (
    {
      contentWidth,
      disabled,
      required,
      label,
      helperText,
      validationText,
      validationStatus,
      direction,
      value,
      defaultValue,
      onValueChange,
      children,
      className,
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
    const checkboxGroupRootProps = {
      width: contentWidth,
      direction,
      name,
      required,
      disabled,
      defaultValue,
      value,
      onValueChange,
      children,
    };
    return (
      <FormFieldGroup
        ref={ref}
        className={clsx(componentClassName, className)}
        {...formFieldGroupProps}
      >
        <CheckboxGroupRoot {...checkboxGroupRootProps} />
      </FormFieldGroup>
    );
  }
);

CheckboxGroup.displayName = componentName;
