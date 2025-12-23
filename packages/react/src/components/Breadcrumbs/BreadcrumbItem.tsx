'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import type { BreadcrumbItemProps } from './BreadcrumbItem.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Link } from '../Link/Link';
import { BodyText } from '../BodyText/BodyText';
import { BreadcrumbsContext } from './Breadcrumbs.context';

const COMPONENT_NAME = 'BreadcrumbItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const BreadcrumbItem = ({
  className,
  children,
  currentPage,
  ...props
}: BreadcrumbItemProps) => {
  const { inverted } = React.useContext(BreadcrumbsContext);

  if (currentPage) {
    return (
      <BodyText
        aria-current="page"
        size="md"
        color={inverted ? 'inverted' : 'primary'}
        textAlign="center"
        asChild
      >
        <li className={cn(componentClassName, className)}>{children}</li>
      </BodyText>
    );
  }

  return (
    <>
      <li className={cn(componentClassName, className)}>
        <Link {...props} inverted={inverted}>
          {children}
        </Link>
      </li>
      <BodyText asChild size="md" color={inverted ? 'inverted' : 'primary'} textAlign="center">
        <li aria-hidden>/</li>
      </BodyText>
    </>
  );
};

BreadcrumbItem.displayName = COMPONENT_NAME;
