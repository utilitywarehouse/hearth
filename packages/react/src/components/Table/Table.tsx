import * as React from 'react';
import clsx from 'clsx';

import type { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type TableElement = React.ComponentRef<'table'>;

export const Table = React.forwardRef<TableElement, TableProps>((props, ref) => {
  const { className, children, variant, pagination, ...componentProps } = extractProps(
    props,
    marginPropDefs
  );

  const {
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginInline,
    marginBlock,
    ...tableProps
  } = componentProps;
  const marginProps = {
    margin,
    marginTop,
    marginRight,
    marginBottom,
    marginLeft,
    marginInline,
    marginBlock,
  };

  if (variant === undefined) {
    return (
      <Flex direction="column" className={clsx(componentClassName, className)} {...marginProps}>
        <table ref={ref} className={`${componentClassName}Table`} {...tableProps}>
          {children}
        </table>
        {pagination}
      </Flex>
    );
  }

  return (
    <Card
      className={clsx(componentClassName, className)}
      variant={variant}
      colorScheme="neutralStrong"
      paddingNone
      direction="column"
    >
      <table ref={ref} className={`${componentClassName}Table`} {...tableProps}>
        {children}
      </table>
      {pagination}
    </Card>
  );
});

Table.displayName = COMPONENT_NAME;
