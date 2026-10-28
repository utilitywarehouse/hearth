import type { ComponentPropsWithRef, CSSProperties, ReactNode } from 'react';
import { Checkbox as CheckboxPrimitive } from '@base-ui/react/checkbox';
import { MarginProps } from '../../props/margin.props';

export interface CheckboxProps
  extends
    Omit<
      ComponentPropsWithRef<typeof CheckboxPrimitive.Root>,
      | 'render'
      | 'nativeButton'
      | 'parent'
      | 'uncheckedValue'
      | 'indeterminate'
      | 'readOnly'
      | 'className'
      | 'style'
      | 'value'
      | 'onCheckedChange'
      | 'defaultChecked'
      | 'defaultValue'
    >,
    MarginProps {
  className?: string;
  style?: CSSProperties;
  /** The value given as data when submitted with a `name`. */
  value?: string;
  /** The value given as data when submitted with a `name`, when the checkbox is initially rendered uncontrolled. */
  defaultValue?: string;
  /**
   * The label for the Checkbox. If not using please properly associate the
   * checkbox with a label using the `aria-label` or `aria-labelledby` props.
   */
  label?: ReactNode;
  /** Helper text for the Checkbox. Will not display if the checkbox group has `helperText` set. */
  helperText?: ReactNode;
  /** Optional image to show between the check indicator and label. */
  image?: ReactNode;
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
