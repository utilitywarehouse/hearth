import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TableCellProps } from './TableCell.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'TableCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableCellElement = ElementRef<'td'>;

export const TableCell = React.forwardRef<TableCellElement, TableCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <td ref={ref} className={clsx(componentClassName, className)} {...props}>
        {children}
      </td>
    );
  }
);

TableCell.displayName = COMPONENT_NAME;
