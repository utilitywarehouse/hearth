import { Checkbox as CheckboxPrimitive } from 'radix-ui';
import { MarginProps } from '../../props/margin.props';

export interface CheckboxProps
  extends
    Omit<
      React.ComponentPropsWithRef<typeof CheckboxPrimitive.Checkbox>,
      'asChild' | 'value' | 'onCheckedChange' | 'defaultChecked' | 'defaultValue'
    >,
    MarginProps {
  /** The value given as data when submitted with a `name`. */
  value?: string;
  defaultValue?: string;
  /**
   * The label for the Checkbox. If not using please properly associate the
   * checkbox with a label using the `aria-label` or `aria-labelledby` props.
   */
  label?: React.ReactNode;
  /** Helper text for the Checkbox. Will not display if the checkbox group has `helperText` set. */
  helperText?: React.ReactNode;
  /** Optional image to show between the check indicator and label. */
  image?: React.ReactNode;
  /** The controlled checked state of the checkbox. Must be used in conjunction with onCheckedChange. */
  checked?: boolean;
  /** Event handler called when the checked state of the checkbox changes. */
  onCheckedChange?: (checked: boolean) => void;
  /** The checked state of the checkbox when it is initially rendered. Use when you do not need to control its checked state. */
  defaultChecked?: boolean;
  /**
   * Indicates the validation state
   */
  validationStatus?: 'invalid';
  /**
   * Text to display when the `validationStatus` is set.
   */
  validationText?: string;
}
