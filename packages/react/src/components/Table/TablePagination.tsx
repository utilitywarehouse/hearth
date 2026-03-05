import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Pagination } from '../Pagination/Pagination';
import type { TablePaginationProps } from './TablePagination.props';

const COMPONENT_NAME = 'TablePagination';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TablePaginationElement = ComponentRef<'div'>;

export const TablePagination = forwardRef<TablePaginationElement, TablePaginationProps>(
  ({ className, ...props }, ref) => {
    return (
      <Pagination ref={ref} className={cn(componentClassName, className)} {...props} as="div" />
    );
  }
);

TablePagination.displayName = COMPONENT_NAME;
