import * as React from 'react';
import type { ElementRef } from 'react';
import clsx from 'clsx';
import { CardContentProps } from './CardContent.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'CardContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardContentElement = ElementRef<'div'>;

export const CardContent = React.forwardRef<CardContentElement, CardContentProps>(
  ({ className, ...props }, ref) => {
    return <Flex ref={ref} className={clsx(componentClassName, className)} {...props} />;
  }
);

CardContent.displayName = COMPONENT_NAME;
