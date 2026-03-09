import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { PaginationProps } from '../Pagination/Pagination.props';

type ElementProps = ComponentPropsWithRef<'div'>;
export type TablePaginationProps = ElementProps &
  Omit<PaginationProps, 'as' | keyof MarginProps | keyof ElementProps>;
