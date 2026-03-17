import { Pagination } from '../Pagination';
import type { TablePaginationProps } from './Table.props';

const TablePagination = (props: TablePaginationProps) => {
  return <Pagination {...props} />;
};

TablePagination.displayName = 'TablePagination';

export default TablePagination;
