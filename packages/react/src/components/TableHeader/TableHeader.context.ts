import { createContext, useContext } from 'react';
import { SortDirection } from './TableHeader.props';

export const TableHeaderContext = createContext<{
  sortColumn?: string | null;
  sortDirection?: SortDirection;
  onSort?: (sortKey: string) => void;
}>({});

export const useTableHeaderContext = () => {
  const context = useContext(TableHeaderContext);

  return context;
};
