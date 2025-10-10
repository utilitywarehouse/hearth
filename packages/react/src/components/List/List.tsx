import * as React from 'react';
import clsx from 'clsx';
import type { ListProps } from './List.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Card } from '../Card/Card';
import { Box } from '../Box/Box';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SectionHeader } from '../SectionHeader/SectionHeader';

const COMPONENT_NAME = 'List';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListElement = ElementRef<'ol'>;

export const List = React.forwardRef<ListElement, ListProps>((props, ref) => {
  const {
    as: Tag = 'ul',
    className,
    colorScheme = undefined,
    variant,
    heading,
    headingElement,
    helperText,
    link,
    children,
    ...listProps
  } = extractProps(props, marginPropDefs);

  const headerProps = {
    heading,
    headingElement,
    helperText,
    link,
  };

  return (
    <div className={clsx(componentClassName, className)}>
      {heading ? <SectionHeader {...headerProps} /> : null}
      {variant === undefined || colorScheme === undefined ? (
        <Box asChild className="hearth-ListContainer" role="list">
          <Tag ref={ref} {...listProps}>
            {children}
          </Tag>
        </Box>
      ) : (
        <Card
          className="hearth-ListContainer"
          paddingNone
          variant={variant}
          colorScheme={colorScheme}
        >
          <Tag ref={ref} role="list" {...listProps}>
            {children}
          </Tag>
        </Card>
      )}
    </div>
  );
});

List.displayName = COMPONENT_NAME;
