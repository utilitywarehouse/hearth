import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'TableRow';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableRowElement = ElementRef<'tr'>;

export const TableRow = React.forwardRef<TableRowElement, React.ComponentProps<'tr'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <tr ref={ref} className={clsx(componentClassName, className)} {...props}>
        {children}
      </tr>
    );
  }
);

TableRow.displayName = COMPONENT_NAME;
