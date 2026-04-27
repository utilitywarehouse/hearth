import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import type { TableHeaderCellProps } from './Table.props';
import { extractProps } from '../../helpers/extract-props';
import { textAlignPropDefs } from '../../props/text-align.props';

const COMPONENT_NAME = 'TableHeaderCell';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableHeaderCellElement = ComponentRef<'th'>;

export const TableHeaderCell = forwardRef<TableHeaderCellElement, TableHeaderCellProps>(
  (props, ref) => {
    const { className, children, row, ...thProps } = extractProps(props, textAlignPropDefs);
    const rowProps = row ? { scope: 'row' } : undefined;
    return (
      <BodyText asChild>
        <th ref={ref} className={cn(componentClassName, className)} {...rowProps} {...thProps}>
          {children}
        </th>
      </BodyText>
    );
  }
);

TableHeaderCell.displayName = COMPONENT_NAME;
