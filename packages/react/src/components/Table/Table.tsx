import { cn } from '../../helpers/cn';

import type { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Card } from '../Card/Card';
import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = ComponentRef<'table'>;

/**
 * Use Table to arrange data in rows and columns, to communicate relationships
 * between content and to display references, comparisons, and choices. Compose
 * it with TableHeader, TableBody, TableRow, TableHeaderCell, and TableCell.
 * Pass `variant` to wrap the table in a Card container; omit it for a minimal,
 * unwrapped table.
 *
 * @summary A component for arranging data in rows and columns.
 */
export const Table = forwardRef<TableElement, TableProps>((props, ref) => {
  const { className, style, children, variant, pagination, ...tableProps } = extractProps(
    props,
    marginPropDefs
  );

  if (variant === undefined) {
    return (
      <div
        className={cn(componentClassName, className)}
        data-testid={componentClassName}
        style={style}
      >
        <table {...tableProps}>{children}</table>
        {pagination}
      </div>
    );
  }

  return (
    <Card
      className={cn(componentClassName, className)}
      data-table-container="card"
      data-testid={componentClassName}
      style={style}
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
