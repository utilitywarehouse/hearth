import { unstable_OneTimePasswordField as RadixOneTimePasswordField } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';

export type VerificationInputProps = Omit<
  React.ComponentPropsWithoutRef<typeof RadixOneTimePasswordField.Root>,
  'asChild' | 'dir' | 'orientation'
> &
  React.RefAttributes<HTMLInputElement> &
  Omit<FormFieldProps, 'hideLabel'> &
  MarginProps;
