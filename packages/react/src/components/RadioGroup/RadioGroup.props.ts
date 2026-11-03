import { SizeProps } from '../../props/size.props';
import { FormGroupBaseProps } from '../FormGroupBase/FormGroupBase.props';
import { FlexProps } from '../Flex/Flex.props';

export interface RadioGroupProps extends Omit<FormGroupBaseProps, 'defaultValue'> {
  /**
   * Merges the component's props onto its immediate child instead of
   * rendering its own DOM element, so the child determines the rendered tag.
   *
   * @default false
   */
  asChild?: boolean;
  /**
   * The layout direction of the radio items within the group.
   * @default column
   */
  direction?: FlexProps['direction'];
  /**
   * Set the container width of the RadioGroup children, independent to the width of the
   * parent RadioGroup.
   */
  contentWidth?: SizeProps['width'];
  /** Identifies the field when a form is submitted. */
  name?: string;
  /** Whether the user must choose a value before submitting a form. */
  required?: boolean;
  /** Whether the group should ignore user interaction. */
  disabled?: boolean;
  /** Whether keyboard navigation wraps around from the last item to the first. */
  loop?: boolean;
  /** The uncontrolled value of the radio item that should be initially selected. */
  defaultValue?: string;
  /** The controlled value of the radio item that should be currently selected. */
  value?: string;
  /** Callback fired when the selected value changes. */
  onValueChange?: (value: string) => void;
}
