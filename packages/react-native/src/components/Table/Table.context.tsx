import { createContext, useContext } from 'react';
import type { TableProps } from './Table.props';

type TableContainer = TableProps['container'];
type TableColumnWidths = NonNullable<TableProps['columnWidths']>;

interface TableContextValue {
  columnWidths: TableColumnWidths;
  container: TableContainer;
  columnCount: number;
  hasPagination: boolean;
}

const TableContext = createContext<TableContextValue>({
  columnWidths: [],
  container: 'none',
  columnCount: 1,
  hasPagination: false,
});

export const TableContextProvider = TableContext.Provider;

export const useTableContext = () => useContext(TableContext);
