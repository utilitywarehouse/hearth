import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import type { TableHeaderCellProps } from './Table.props';

const COMPONENT_NAME = 'TableHeaderCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableHeaderCellElement = ElementRef<'th'>;

export const TableHeaderCell = React.forwardRef<TableHeaderCellElement, TableHeaderCellProps>(
  ({ className, children, row, ...props }, ref) => {
    const rowProps = row ? { scope: 'row' } : undefined;
    return (
      <BodyText asChild>
        <th ref={ref} className={clsx(componentClassName, className)} {...rowProps} {...props}>
          {children}
        </th>
      </BodyText>
    );
  }
);

TableHeaderCell.displayName = COMPONENT_NAME;
