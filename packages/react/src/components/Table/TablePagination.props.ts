import { MarginProps } from '../../props/margin.props';
import { PaginationProps } from '../Pagination/Pagination.props';

export type TablePaginationProps = Omit<PaginationProps, keyof MarginProps>;
