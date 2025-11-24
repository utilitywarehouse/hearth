import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = ElementRef<'table'>;

export const Table = React.forwardRef<TableElement, TableProps>(
  ({ className, children, variant, ...props }, ref) => {
    return (
      <div className={clsx(componentClassName, className)} data-variant={variant}>
        {variant === undefined ? (
          <Box className={`${componentClassName}ScrollContainer`}>
            <table className={`${componentClassName}Element`} ref={ref} {...props}>
              {children}
            </table>
          </Box>
        ) : (
          <Card
            className={`${componentClassName}ScrollContainer`}
            paddingNone
            variant={variant}
            colorScheme="neutralStrong"
          >
            <table className={`${componentClassName}Element`} ref={ref} {...props}>
              {children}
            </table>
          </Card>
        )}
      </div>
    );
  }
);

Table.displayName = COMPONENT_NAME;
