import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableBodyProps } from './Table.props';

const COMPONENT_NAME = 'TableBody';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TableBody = ({ className, children, ...props }: TableBodyProps) => {
  return (
    <tbody className={clsx(componentClassName, className)} {...props}>
      {children}
    </tbody>
  );
};

TableBody.displayName = COMPONENT_NAME;
