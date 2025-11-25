import * as React from 'react';
import clsx from 'clsx';

import { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';
import { Pagination, PaginationProps } from '../..';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = React.ComponentRef<'table'>;

export const Table = React.forwardRef<TableElement, TableProps>(
  ({ className, children, variant, ...props }, ref) => {
    const tableContent: Array<React.ReactNode> = [];
    let paginationElement: React.ReactElement<PaginationProps> | null = null;

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) {
        return;
      }

      if (child.type === Pagination) {
        paginationElement = child as React.ReactElement<PaginationProps>;
      } else {
        tableContent.push(child);
      }
    });

    const renderPagination = paginationElement ? (
      <div className={`${componentClassName}Pagination`}>{paginationElement}</div>
    ) : null;

    return (
      <div className={clsx(componentClassName, className)} data-variant={variant}>
        {variant === undefined ? (
          <>
            <Box className={`${componentClassName}ScrollContainer`}>
              <table className={`${componentClassName}Element`} ref={ref} {...props}>
                {tableContent}
              </table>
            </Box>
            {renderPagination}
          </>
        ) : (
          <Card paddingNone variant={variant} colorScheme="neutralStrong" direction="column">
            <Box className={`${componentClassName}ScrollContainer`}>
              <table className={`${componentClassName}Element`} ref={ref} {...props}>
                {tableContent}
              </table>
            </Box>
            {renderPagination}
          </Card>
        )}
      </div>
    );
  }
);

Table.displayName = COMPONENT_NAME;
