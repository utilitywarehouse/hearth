import * as React from 'react';
import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Pagination } from '../Pagination/Pagination';
import type { TablePaginationProps } from './TablePagination.props';

const COMPONENT_NAME = 'TablePagination';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TablePagination: React.FC<TablePaginationProps> = ({ className, ...props }) => {
  return <Pagination as="div" className={clsx(componentClassName, className)} {...props} />;
};

TablePagination.displayName = COMPONENT_NAME;
