import { MarginProps } from '../../props/margin.props';
import type { ReactNode } from 'react';
import { ValidationTextProps } from '../ValidationText/ValidationText.props';

export interface FormGroupBaseProps extends React.ComponentPropsWithRef<'fieldset'>, MarginProps {
  /**
   * The label for the formfield group. This should contain the question being
   * answered by the formfield group.
   *
   * If you don't include a label you need to ensure you use the `aria-label`
   * or `aria-labelledby` prop to properly associate a label with the formfield
   * group.
   */
  label?: ReactNode;
  /**
   * Helper text for the formfield group. Provides a hint such as specific
   * requirements for what to choose. When displayed, child
   * components should not display their own `helperText`.
   */
  helperText?: ReactNode;
  validationText?: ReactNode;
  validationStatus?: ValidationTextProps['status'];
  validationPlacement?: 'top' | 'bottom';
}
