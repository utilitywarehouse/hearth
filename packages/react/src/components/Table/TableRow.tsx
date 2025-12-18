import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableRowProps } from './Table.props';

const COMPONENT_NAME = 'TableRow';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TableRow = ({ className, children, ...props }: TableRowProps) => {
  return (
    <tr className={clsx(componentClassName, className)} {...props}>
      {children}
    </tr>
  );
};

TableRow.displayName = COMPONENT_NAME;
