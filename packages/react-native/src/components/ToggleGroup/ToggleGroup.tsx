import { useMemo, useState } from 'react';
import Flex from '../Flex/Flex';
import { ToggleGroupContext } from './ToggleGroup.context';
import type { ToggleGroupProps } from './ToggleGroup.props';
import {
  getNextToggleGroupValue,
  isToggleGroupItemSelected,
  type ToggleGroupValue,
} from './ToggleGroup.utils';

/**
 * Use ToggleGroup to wrap a set of `ToggleButton` or `ToggleButtonCard` components, managing
 * selection state between them. Set `type="single"` when only one option can be selected at a
 * time, or `type="multiple"` (the default) to allow selecting any number of options. Each child
 * needs a unique `value`.
 */
const ToggleGroup = ({
  type = 'multiple',
  value,
  defaultValue,
  onValueChange,
  direction = 'row',
  children,
  ...props
}: ToggleGroupProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<ToggleGroupValue>(defaultValue);
  const groupValue = value !== undefined ? value : uncontrolledValue;

  const contextValue = useMemo(
    () => ({
      type,
      isSelected: (itemValue: string) => isToggleGroupItemSelected(groupValue, itemValue),
      toggle: (itemValue: string) => {
        const nextValue = getNextToggleGroupValue(type, groupValue, itemValue);
        if (value === undefined) setUncontrolledValue(nextValue);
        (onValueChange as ((nextValue: string | string[]) => void) | undefined)?.(nextValue);
      },
    }),
    [type, groupValue, value, onValueChange]
  );

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <Flex role={type === 'single' ? 'radiogroup' : 'group'} direction={direction} {...props}>
        {children}
      </Flex>
    </ToggleGroupContext.Provider>
  );
};

ToggleGroup.displayName = 'ToggleGroup';

export default ToggleGroup;
