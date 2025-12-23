import { cn } from '../../helpers/cn';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableCellProps } from './Table.props';

const COMPONENT_NAME = 'TableCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TableCell = ({ className, children, ...props }: TableCellProps) => {
  return (
    <td className={cn(componentClassName, className)} {...props}>
      {children}
    </td>
  );
};

TableCell.displayName = COMPONENT_NAME;
