import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { DescriptionListItemProps } from './DescriptionListItem.props';
import { DescriptionListContext } from '../DescriptionList/DescriptionList.context';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'DescriptionListItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type DescriptionListItemElement = ElementRef<'div'>;

export const DescriptionListItem = React.forwardRef<
  DescriptionListItemElement,
  DescriptionListItemProps
>(({ className, heading, description, link, ...props }, ref) => {
  const { direction } = React.useContext(DescriptionListContext);
  return (
    <Flex
      ref={ref}
      {...props}
      className={clsx(componentClassName, className)}
      direction={direction}
    >
      <dt>{heading}</dt>
      <dd>{description}</dd>
      {link}
    </Flex>
  );
});

DescriptionListItem.displayName = COMPONENT_NAME;
