import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableCellProps } from './Table.props';

const COMPONENT_NAME = 'TableCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TableCell = ({ className, children, ...props }: TableCellProps) => {
  return (
    <td className={clsx(componentClassName, className)} {...props}>
      {children}
    </td>
  );
};

TableCell.displayName = COMPONENT_NAME;
