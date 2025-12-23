import { cn } from '../../helpers/cn';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import type { TableHeaderCellProps } from './Table.props';

const COMPONENT_NAME = 'TableHeaderCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TableHeaderCell = ({ className, children, row, ...props }: TableHeaderCellProps) => {
  const rowProps = row ? { scope: 'row' } : undefined;
  return (
    <BodyText asChild>
      <th className={cn(componentClassName, className)} {...rowProps} {...props}>
        {children}
      </th>
    </BodyText>
  );
};

TableHeaderCell.displayName = COMPONENT_NAME;
