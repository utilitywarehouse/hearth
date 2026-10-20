import type FlexProps from '../Flex/Flex.props';

interface ToggleGroupSingleProps {
  /** Only one item can be selected. Pressing the selected item again clears the value. */
  type: 'single';
  /** The controlled value of the selected item. `''` when nothing is selected. */
  value?: string;
  /** The value of the item selected on first render, when uncontrolled. */
  defaultValue?: string;
  /** Called with the new value when the selection changes. */
  onValueChange?: (value: string) => void;
}

interface ToggleGroupMultipleProps {
  /**
   * Any number of items can be selected.
   * @default 'multiple'
   */
  type?: 'multiple';
  /** The controlled values of the selected items. */
  value?: string[];
  /** The values of the items selected on first render, when uncontrolled. */
  defaultValue?: string[];
  /** Called with the new values when the selection changes. */
  onValueChange?: (value: string[]) => void;
}

export type ToggleGroupProps = Omit<FlexProps, 'display'> &
  (ToggleGroupSingleProps | ToggleGroupMultipleProps);

export default ToggleGroupProps;
