import { createContext, useContext } from 'react';
import type { ToggleGroupType } from './ToggleGroup.utils';

export interface IToggleGroupContext {
  type: ToggleGroupType;
  /** Whether the item with this value is selected. */
  isSelected: (itemValue: string) => boolean;
  /** Toggles the item with this value in the group's selection. */
  toggle: (itemValue: string) => void;
}

/** `null` outside a `ToggleGroup`, so items can fall back to their standalone behaviour. */
export const ToggleGroupContext = createContext<IToggleGroupContext | null>(null);

export const useToggleGroupContext = () => useContext(ToggleGroupContext);
