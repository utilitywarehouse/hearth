import * as React from 'react';
import clsx from 'clsx';

import type { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Card } from '../Card/Card';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = React.ComponentRef<'table'>;

export const Table = React.forwardRef<TableElement, TableProps>((props, ref) => {
  const { className, children, variant, pagination, ...tableProps } = extractProps(
    props,
    marginPropDefs
  );

  if (variant === undefined) {
    return (
      <div className={clsx(componentClassName, className)}>
        <table ref={ref} {...tableProps}>
          {children}
        </table>
        {pagination}
      </div>
    );
  }

  return (
    <Card
      className={clsx(componentClassName, className)}
      variant={variant}
      colorScheme="neutralStrong"
      paddingNone
    >
      <table ref={ref} {...tableProps}>
        {children}
      </table>
      {pagination}
    </Card>
  );
});

Table.displayName = COMPONENT_NAME;
