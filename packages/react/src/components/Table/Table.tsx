import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TableContext } from './Table.context';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = ElementRef<'div'>;

export const Table = React.forwardRef<TableElement, TableProps>(
  ({ className, children, containerVariant = 'subtle', ...props }, ref) => {
    return (
      <TableContext.Provider value={{ containerVariant }}>
        <div
          ref={ref}
          className={clsx(componentClassName, className)}
          data-container-variant={containerVariant}
          {...props}
        >
          <div className={`${componentClassName}ScrollContainer`}>
            <table className={`${componentClassName}Element`}>{children}</table>
          </div>
        </div>
      </TableContext.Provider>
    );
  }
);

Table.displayName = COMPONENT_NAME;
