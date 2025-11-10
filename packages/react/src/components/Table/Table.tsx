import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = ElementRef<'div'>;

export const Table = React.forwardRef<TableElement, TableProps>(
  ({ className, children, variant = 'subtle', ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={clsx(componentClassName, className)}
        data-variant={variant}
        {...props}
      >
        {variant === 'none' ? (
          <Box className={`${componentClassName}ScrollContainer`}>
            <table className={`${componentClassName}Element`}>{children}</table>
          </Box>
        ) : (
          <Card
            className={`${componentClassName}ScrollContainer`}
            paddingNone
            variant={variant}
            colorScheme="neutralStrong"
          >
            <table className={`${componentClassName}Element`}>{children}</table>
          </Card>
        )}
      </div>
    );
  }
);

Table.displayName = COMPONENT_NAME;
