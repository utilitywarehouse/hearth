import { MarginProps } from '../../props/margin.props';
import { PaginationProps } from '../Pagination/Pagination.props';

type ElementProps = React.ComponentPropsWithRef<'div'>;
export type TablePaginationProps = ElementProps &
  Omit<PaginationProps, 'as' | keyof MarginProps | keyof ElementProps>;
