import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableCellProps } from './Table.props';

const COMPONENT_NAME = 'TableCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableCellElement = ComponentRef<'td'>;

export const TableCell = forwardRef<TableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td ref={ref} className={cn(componentClassName, className)} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = COMPONENT_NAME;
