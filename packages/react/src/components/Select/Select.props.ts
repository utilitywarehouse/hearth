import { Select as RadixSelect } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';

export type SelectProps = Omit<RadixSelect.SelectTriggerProps, 'dir' | 'value' | 'defaultValue'> &
  Pick<React.ComponentProps<'button'>, 'className'> &
  Pick<RadixSelect.SelectValueProps, 'placeholder'> &
  Omit<RadixSelect.SelectProps, 'orientation' | 'asChild' | 'dir'> &
  MarginProps & {
    /**
     * The label for the Select, describing its purpose.
     */
    label: string;
    /**
     * Optional helper text to provide additional context or instructions.
     */
    helperText?: string;
    /**
     * Indicates the validation state of the Select.
     */
    validationStatus?: 'valid' | 'invalid';
    /**
     * Text to display when the `validationStatus` is set.
     */
    validationText?: string;
  };
