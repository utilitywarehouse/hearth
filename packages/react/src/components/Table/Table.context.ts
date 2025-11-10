import { createContext, useContext } from 'react';
import type { TableProps } from './Table.props';

export const TableContext = createContext<{
  containerVariant?: TableProps['containerVariant'];
}>({});

export const useTableContext = () => {
  const context = useContext(TableContext);

  return context;
};
