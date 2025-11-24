import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'TableHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableHeaderElement = ElementRef<'thead'>;

export const TableHeader = React.forwardRef<TableHeaderElement, React.ComponentProps<'thead'>>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead ref={ref} className={clsx(componentClassName, className)} {...props}>
        <tr>{children}</tr>
      </thead>
    );
  }
);

TableHeader.displayName = COMPONENT_NAME;
