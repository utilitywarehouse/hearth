import { Select as SelectPrimitive } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';
import { ComponentPropsWithoutRef } from 'react';

type SharedProps = 'dir';
export type SelectProps = Omit<
  React.ComponentPropsWithRef<typeof SelectPrimitive.Trigger>,
  'value' | 'defaultValue' | SharedProps
> &
  Omit<ComponentPropsWithoutRef<typeof SelectPrimitive.Root>, 'asChild' | SharedProps> &
  Omit<FormFieldProps, 'hideLabel' | SharedProps> &
  MarginProps & {
    placeholder?: string;
  };
