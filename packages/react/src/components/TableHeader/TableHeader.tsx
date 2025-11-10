import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TableHeaderProps } from './TableHeader.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useTableContext } from '../Table/Table.context';

const COMPONENT_NAME = 'TableHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableHeaderElement = ElementRef<'thead'>;

export const TableHeader = React.forwardRef<TableHeaderElement, TableHeaderProps>(
  ({ className, children, ...props }, ref) => {
    const { containerVariant } = useTableContext();

    return (
      <thead
        ref={ref}
        className={clsx(componentClassName, className)}
        data-container-variant={containerVariant}
        {...props}
      >
        <tr>{children}</tr>
      </thead>
    );
  }
);

TableHeader.displayName = COMPONENT_NAME;
