import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TableHeaderContext } from './TableHeader.context';
import { TableHeaderProps } from './TableHeader.props';

const COMPONENT_NAME = 'TableHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableHeaderElement = ElementRef<'thead'>;

export const TableHeader = React.forwardRef<TableHeaderElement, TableHeaderProps>(
  ({ className, children, sortColumn, sortDirection, onSort, ...props }, ref) => {
    return (
      <TableHeaderContext.Provider value={{ sortColumn, sortDirection, onSort }}>
        <thead ref={ref} className={clsx(componentClassName, className)} {...props}>
          <tr>{children}</tr>
        </thead>
      </TableHeaderContext.Provider>
    );
  }
);

TableHeader.displayName = COMPONENT_NAME;
