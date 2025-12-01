import * as React from 'react';
import clsx from 'clsx';

import { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = React.ComponentRef<'table'>;

export const Table = React.forwardRef<TableElement, TableProps>(
  ({ className, children, variant, footer, ...props }, ref) => {
    const TableFooter = () => <div className={`${componentClassName}Footer`}>{footer}</div>;

    return (
      <div className={clsx(componentClassName, className)} data-variant={variant}>
        {variant === undefined ? (
          <>
            <Box className={`${componentClassName}ScrollContainer`}>
              <table className={`${componentClassName}Element`} ref={ref} {...props}>
                {children}
              </table>
            </Box>
            {footer ? <TableFooter /> : null}
          </>
        ) : (
          <Card paddingNone variant={variant} colorScheme="neutralStrong" direction="column">
            <Box className={`${componentClassName}ScrollContainer`}>
              <table className={`${componentClassName}Element`} ref={ref} {...props}>
                {children}
              </table>
            </Box>
            {footer ? <TableFooter /> : null}
          </Card>
        )}
      </div>
    );
  }
);

Table.displayName = COMPONENT_NAME;
