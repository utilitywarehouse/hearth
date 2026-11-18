import { createContext, useContext } from 'react';
import type { ToggleGroupType } from './ToggleGroup.utils';

export interface IToggleGroupContext {
  type: ToggleGroupType;
  /** Whether the item with this value is selected. */
  isSelected: (itemValue: string) => boolean;
  /** Toggles the item with this value in the group's selection. */
  toggle: (itemValue: string) => void;
  /**
   * Web only: the value of the item that is the group's single Tab stop (the last one
   * focused). `undefined` until an item is focused; the group itself is the Tab stop then.
   */
  tabStop?: string;
  /** Web only: makes the item with this value the group's Tab stop. */
  setTabStop: (itemValue: string) => void;
  /** Web only: hands the Tab stop back to the group if this item holds it. */
  releaseTabStop: (itemValue: string) => void;
}

/** `null` outside a `ToggleGroup`, so items can fall back to their standalone behaviour. */
export const ToggleGroupContext = createContext<IToggleGroupContext | null>(null);

export const useToggleGroupContext = () => useContext(ToggleGroupContext);
