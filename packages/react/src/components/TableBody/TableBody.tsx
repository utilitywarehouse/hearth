import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';

import { TableBodyProps } from './TableBody.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';

const COMPONENT_NAME = 'TableBody';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableBodyElement = ElementRef<'tbody'>;

export const TableBody = React.forwardRef<TableBodyElement, TableBodyProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <tbody ref={ref} className={clsx(componentClassName, className)} {...props}>
        {children}
      </tbody>
    );
  }
);

TableBody.displayName = COMPONENT_NAME;
