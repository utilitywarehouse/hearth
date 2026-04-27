import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableCellProps } from './Table.props';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';

const COMPONENT_NAME = 'TableCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableCellElement = ComponentRef<'td'>;

export const TableCell = forwardRef<TableCellElement, TableCellProps>((props, ref) => {
  const { className, children, ...tdProps } = extractProps(props, textAlignPropDefs);
  return (
    <td ref={ref} className={cn(componentClassName, className)} {...tdProps}>
      {children}
    </td>
  );
});

TableCell.displayName = COMPONENT_NAME;
