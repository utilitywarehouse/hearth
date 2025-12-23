import { cn } from '../../helpers/cn';

import type { TableProps } from './Table.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { Card } from '../Card/Card';

const COMPONENT_NAME = 'Table';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Table = (props: TableProps) => {
  const { className, style, children, variant, pagination, ...tableProps } = extractProps(
    props,
    marginPropDefs
  );

  if (variant === undefined) {
    return (
      <div className={cn(componentClassName, className)} style={style}>
        <table {...tableProps}>{children}</table>
        {pagination}
      </div>
    );
  }

  return (
    <Card
      className={cn(componentClassName, className)}
      style={style}
      variant={variant}
      colorScheme="neutralStrong"
      paddingNone
    >
      <table {...tableProps}>{children}</table>
      {pagination}
    </Card>
  );
};

Table.displayName = COMPONENT_NAME;
