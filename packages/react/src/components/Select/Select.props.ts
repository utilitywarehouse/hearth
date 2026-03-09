import { Select as SelectPrimitive } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';
import type { ComponentPropsWithoutRef, ComponentPropsWithRef } from 'react';

export type SelectProps = Omit<
  ComponentPropsWithRef<typeof SelectPrimitive.Trigger>,
  'value' | 'defaultValue' | 'dir'
> &
  Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'asChild' | 'dir'> &
  Omit<FormFieldProps, 'hideLabel' | 'dir'> &
  MarginProps & {
    placeholder?: string;
  };

export type SelectItemProps = Omit<
  ComponentPropsWithRef<typeof SelectPrimitive.SelectItem>,
  'textValue' | 'asChild'
>;
