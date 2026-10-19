import { useCallback, useMemo, useState } from 'react';
import { Platform } from 'react-native';
import Flex from '../Flex/Flex';
import { ToggleGroupContext } from './ToggleGroup.context';
import type { ToggleGroupProps } from './ToggleGroup.props';
import {
  getNextToggleGroupValue,
  getRovingFocusIndex,
  isToggleGroupItemSelected,
  type ToggleGroupValue,
} from './ToggleGroup.utils';

/** Items set `data-toggle-group-item` to their value on web, so the group can find them. */
const getEnabledItems = (group: HTMLElement) =>
  Array.from(group.querySelectorAll<HTMLElement>('[data-toggle-group-item]')).filter(
    item => item.getAttribute('aria-disabled') !== 'true'
  );

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
  onFocus,
  children,
  ...props
}: ToggleGroupProps) => {
  const [uncontrolledValue, setUncontrolledValue] = useState<ToggleGroupValue>(defaultValue);
  const groupValue = value !== undefined ? value : uncontrolledValue;
  const [tabStop, setTabStop] = useState<string>();

  const releaseTabStop = useCallback(
    (itemValue: string) => setTabStop(current => (current === itemValue ? undefined : current)),
    []
  );

  const contextValue = useMemo(
    () => ({
      type,
      isSelected: (itemValue: string) => isToggleGroupItemSelected(groupValue, itemValue),
      toggle: (itemValue: string) => {
        const nextValue = getNextToggleGroupValue(type, groupValue, itemValue);
        if (value === undefined) setUncontrolledValue(nextValue);
        (onValueChange as ((nextValue: string | string[]) => void) | undefined)?.(nextValue);
      },
      tabStop,
      setTabStop,
      releaseTabStop,
    }),
    [type, groupValue, value, onValueChange, tabStop, releaseTabStop]
  );

  // Web keyboard support, matching Radix's roving focus in the React package: the group is a
  // single Tab stop, and arrow keys, Home and End move focus between enabled items.
  // Selection changes only on Space or Enter, as in Radix. Native platforms move focus with
  // their own screen reader and keyboard navigation, so this is web only.
  const webProps =
    Platform.OS === 'web'
      ? {
          tabIndex: (tabStop === undefined ? 0 : -1) as 0 | -1,
          onFocus: (event: Parameters<NonNullable<typeof onFocus>>[0]) => {
            onFocus?.(event);
            const group = event.currentTarget as unknown as HTMLElement;
            // Focus that lands on the group itself (Tab before any item has been focused)
            // moves on to the selected item, or the first enabled one.
            if ((event.target as unknown) !== group) return;
            const items = getEnabledItems(group);
            const target =
              items.find(item =>
                isToggleGroupItemSelected(groupValue, item.dataset.toggleGroupItem ?? '')
              ) ?? items[0];
            target?.focus();
          },
          onKeyDown: (event: KeyboardEvent) => {
            const group = event.currentTarget as HTMLElement;
            const items = getEnabledItems(group);
            const current = (event.target as HTMLElement).closest<HTMLElement>(
              '[data-toggle-group-item]'
            );
            // react-native-web only presses `button` roles on Space, so press radio items
            // ourselves. A click runs the item's `onPress`.
            if (
              (event.key === ' ' || event.key === 'Spacebar') &&
              current?.getAttribute('role') === 'radio'
            ) {
              event.preventDefault();
              current.click();
              return;
            }
            const nextIndex = getRovingFocusIndex(
              event.key,
              items.findIndex(item => item === current),
              items.length
            );
            if (nextIndex === null || current === null) return;
            event.preventDefault();
            items[nextIndex].focus();
          },
        }
      : null;

  return (
    <ToggleGroupContext.Provider value={contextValue}>
      <Flex
        role={type === 'single' ? 'radiogroup' : 'group'}
        direction={direction}
        onFocus={onFocus}
        {...props}
        {...(webProps as object)}
      >
        {children}
      </Flex>
    </ToggleGroupContext.Provider>
  );
};

ToggleGroup.displayName = 'ToggleGroup';

export default ToggleGroup;
