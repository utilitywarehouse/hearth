import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useTableContext } from '../Table/Table.context';

const COMPONENT_NAME = 'TableRow';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableRowElement = ElementRef<'tr'>;

export const TableRow = React.forwardRef<TableRowElement, React.ComponentProps<'tr'>>(
  ({ className, children, ...props }, ref) => {
    const { containerVariant } = useTableContext();

    return (
      <tr
        ref={ref}
        className={clsx(componentClassName, className)}
        data-container-variant={containerVariant}
        {...props}
      >
        {children}
      </tr>
    );
  }
);

TableRow.displayName = COMPONENT_NAME;
