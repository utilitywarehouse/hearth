import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableBodyProps } from './Table.props';

const COMPONENT_NAME = 'TableBody';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableBodyElement = ComponentRef<'tbody'>;

export const TableBody = forwardRef<TableBodyElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody ref={ref} className={cn(componentClassName, className)} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = COMPONENT_NAME;
