import * as React from 'react';
import clsx from 'clsx';
import type { ListItemProps } from './ListItem.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { BodyText } from '../BodyText/BodyText';
import { extractProps } from '../../helpers/extract-props';
import { flexPropDefs } from '../Flex/Flex.props';
import { gapPropDefs } from '../../props/gap.props';

const COMPONENT_NAME = 'ListItem';
const { displayName, componentClassName } = withGlobalPrefix(COMPONENT_NAME);

type ListItemElement = ElementRef<'li'>;

export const ListItem = React.forwardRef<ListItemElement, ListItemProps>((props, ref) => {
  const { className, children, ...listItemProps } = extractProps(props, flexPropDefs, gapPropDefs);
  return (
    <BodyText size="lg" asChild className={clsx(componentClassName, className)}>
      <li ref={ref} {...listItemProps}>
        {children}
      </li>
    </BodyText>
  );
});

ListItem.displayName = displayName;
