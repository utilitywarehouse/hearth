import type { ReactNode } from 'react';
import { RadioGroup as RadioGroupPrimitive } from 'radix-ui';
import { LabelProps } from '../Label/Label.props';

export interface RadioProps extends Omit<
  React.ComponentPropsWithRef<typeof RadioGroupPrimitive.RadioGroupItem>,
  'disabled'
> {
  /**
   * The label for the Radio. If not using please properly associate the
   * Radio with a label using the `aria-label` or `aria-labelledby` props.
   */
  label?: ReactNode;
  labelFontWeight?: LabelProps['fontWeight'];
  /** Helper text for the Radio. Will not display if the radio group has `helperText` set. */
  helperText?: ReactNode;
  /** Optional image to show between the radio indicator and label. */
  image?: ReactNode;
}
