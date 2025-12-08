import { ComponentPropsWithoutRef } from 'react';
import { unstable_OneTimePasswordField as OneTimePasswordField } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';
import { FormFieldProps } from '../FormField/FormField.props';

export const verificationInputPropDefs = {};

type OneTimePasswordRootProps = ComponentPropsWithoutRef<typeof OneTimePasswordField.Root>;

export type VerificationInputProps = Omit<
  OneTimePasswordRootProps,
  'onChange' | 'onValueChange' | 'asChild'
> &
  MarginProps &
  Pick<
    FormFieldProps,
    'label' | 'helperText' | 'validationText' | 'validationStatus' | 'hideLabel' | 'required'
  > & {
    onChange?: (value: string) => void;
  };
