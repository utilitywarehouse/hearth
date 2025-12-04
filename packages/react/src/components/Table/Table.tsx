import * as React from 'react';
import clsx from 'clsx';

import type { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = React.ComponentRef<'table'>;

export const Table = React.forwardRef<TableElement, TableProps>((props, ref) => {
  const { className, children, ...tableProps } = extractProps(props, marginPropDefs);
  return (
    <div className={clsx(componentClassName, className)}>
      <table ref={ref} className={`${componentClassName}Element`} {...tableProps}>
        {children}
      </table>
    </div>
  );
});

Table.displayName = COMPONENT_NAME;
