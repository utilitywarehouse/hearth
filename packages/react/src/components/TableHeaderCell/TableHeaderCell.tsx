import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TableHeaderCellProps } from './TableHeaderCell.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'TableHeaderCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableHeaderCellElement = ElementRef<'th'>;

export const TableHeaderCell = React.forwardRef<TableHeaderCellElement, TableHeaderCellProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <th ref={ref} className={clsx(componentClassName, className)} {...props}>
        <BodyText weight="semibold">
          {children}
        </BodyText>
      </th>
    );
  }
);

TableHeaderCell.displayName = COMPONENT_NAME;
