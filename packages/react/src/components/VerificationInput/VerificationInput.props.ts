import type { ComponentPropsWithoutRef, RefAttributes } from 'react';
import { unstable_OneTimePasswordField as OneTimePasswordFieldPrimitive } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';

export type VerificationInputProps = Omit<
  ComponentPropsWithoutRef<typeof OneTimePasswordFieldPrimitive.Root>,
  'asChild' | 'dir' | 'orientation'
> &
  RefAttributes<HTMLInputElement> &
  Omit<FormFieldProps, 'hideLabel' | 'dir'> &
  MarginProps;
