import { MarginProps } from '../../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

interface CommonLabelProps extends MarginProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * Cannot be used in combination with `asChild`.
   * @default label
   */
  as?: 'label' | 'span';
  fontWeight?: 'regular' | 'semibold';
  /** Set the label appearance to disabled */
  disabled?: boolean;
  /** Make the text unselectable, for use when associated with input elements. */
  disableUserSelect?: boolean;
}
type LabelSpanProps = { as?: 'span' } & ComponentPropsWithout<'span', RemovedProps>;
type LabelLabelProps = { as: 'label' } & ComponentPropsWithout<'label', RemovedProps>;
export type LabelProps = CommonLabelProps & (LabelSpanProps | LabelLabelProps);
