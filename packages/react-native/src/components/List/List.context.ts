import { createContext, useContext } from 'react';
import type ListProps from './List.props';

export const ListContext = createContext<{
  loading?: ListProps['loading'];
  disabled?: ListProps['disabled'];
  divider?: ListProps['divider'];
  container?: ListProps['container'];
}>({});

export const useListContext = () => {
  const context = useContext(ListContext);

  return context;
};
