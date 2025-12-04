import * as React from 'react';
import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Card } from '../Card/Card';
import type { TableContainerProps } from './TableContainer.props';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'TableContainer';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TableContainer: React.FC<TableContainerProps> = props => {
  const { className, children, variant, ...tableContainerProps } = extractProps(
    props,
    marginPropDefs
  );

  if (variant === undefined) {
    return (
      <Flex
        className={clsx(componentClassName, className)}
        direction="column"
        {...tableContainerProps}
      >
        {children}
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
      {...tableContainerProps}
    >
      {children}
    </Card>
  );
};

TableContainer.displayName = COMPONENT_NAME;
