import { createContext, useContext } from 'react';
import type ListProps from './List.props';

export const ListContext = createContext<{
  loading?: ListProps['loading'];
  disabled?: ListProps['disabled'];
  container?: ListProps['container'];
  /** Whether the items wrapper has the `list` role, so items should be exposed as list items. */
  isList?: boolean;
  firstItemId?: string;
  registerItem?: (id: string) => () => void;
}>({});

export const useListContext = () => {
  const context = useContext(ListContext);

  return context;
};
