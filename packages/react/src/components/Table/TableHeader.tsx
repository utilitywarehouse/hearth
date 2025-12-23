import { cn } from '../../helpers/cn';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TableHeaderProps } from './Table.props';

const COMPONENT_NAME = 'TableHeader';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TableHeader = ({ className, children, ...props }: TableHeaderProps) => {
  return (
    <thead className={cn(componentClassName, className)} {...props}>
      <tr>{children}</tr>
    </thead>
  );
};

TableHeader.displayName = COMPONENT_NAME;
