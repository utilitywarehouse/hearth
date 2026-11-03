import { Select as SelectPrimitive } from '@base-ui/react/select';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';
import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';

type SelectRootProps = ComponentPropsWithoutRef<typeof SelectPrimitive.Root>;

export type SelectProps = Omit<
  ComponentPropsWithRef<typeof SelectPrimitive.Trigger>,
  'value' | 'defaultValue' | 'dir' | 'render' | 'nativeButton' | 'className'
> &
  Omit<
    SelectRootProps,
    | 'dir'
    | 'value'
    | 'defaultValue'
    | 'onValueChange'
    | 'id'
    | 'form'
    | 'items'
    | 'multiple'
    | 'modal'
    | 'readOnly'
    | 'highlightItemOnHover'
    | 'actionsRef'
    | 'inputRef'
    | 'isItemEqualToValue'
    | 'itemToStringLabel'
    | 'itemToStringValue'
    | 'onOpenChangeComplete'
  > &
  Omit<FormFieldProps, 'hideLabel' | 'dir'> &
  MarginProps & {
    className?: string;
    /** Placeholder text shown when no value is selected. */
    placeholder?: string;
    /**
     * The controlled value of the selected option. Must be used with an `onValueChange` handler.
     */
    value?: SelectRootProps['value'];
    /**
     * The initial value of the selected option when rendered, for uncontrolled usage.
     */
    defaultValue?: SelectRootProps['defaultValue'];
    /**
     * Callback fired when the selected value changes.
     */
    onValueChange?: SelectRootProps['onValueChange'];
  };

export type SelectItemProps = Omit<
  ComponentPropsWithRef<typeof SelectPrimitive.Item>,
  'label' | 'render' | 'nativeButton' | 'className'
> & {
  className?: string;
};
