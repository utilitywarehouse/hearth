import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableHeaderProps } from './Table.props';

const COMPONENT_NAME = 'TableHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableHeaderElement = ComponentRef<'thead'>;

export const TableHeader = forwardRef<TableHeaderElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <thead ref={ref} className={cn(componentClassName, className)} {...props}>
        <tr>{children}</tr>
      </thead>
    );
  }
);

TableHeader.displayName = COMPONENT_NAME;
