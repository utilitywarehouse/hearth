import { cn } from '../../helpers/cn';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Pagination } from '../Pagination/Pagination';
import type { TablePaginationProps } from './TablePagination.props';

const COMPONENT_NAME = 'TablePagination';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TablePagination = ({ className, ...props }: TablePaginationProps) => {
  return <Pagination className={cn(componentClassName, className)} {...props} as="div" />;
};

TablePagination.displayName = COMPONENT_NAME;
