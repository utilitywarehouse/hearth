import * as React from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableRowProps } from './Table.props';

const COMPONENT_NAME = 'TableRow';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableRowElement = ComponentRef<'tr'>;

export const TableRow = React.forwardRef<TableRowElement, TableRowProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr ref={ref} className={cn(componentClassName, className)} {...props}>
        {children}
      </tr>
    );
  }
);

TableRow.displayName = COMPONENT_NAME;
