import * as React from 'react';
import clsx from 'clsx';
import type { BreadcrumbItemProps } from './BreadcrumbItem.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Link } from '../Link/Link';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'BreadcrumbItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type BreadcrumbItemElement = ElementRef<'a'>;

export const BreadcrumbItem = React.forwardRef<BreadcrumbItemElement, BreadcrumbItemProps>(
  ({ className, children, currentPage, ...props }, ref) => {
    if (currentPage) {
      return (
        <BodyText
          as="span"
          aria-current="page"
          size="md"
          color="primary"
          textAlign="center"
          asChild
          {...props}
        >
          <li className={clsx(componentClassName, className)}>{children}</li>
        </BodyText>
      );
    }

    return (
      <>
        <li className={clsx(componentClassName, className)}>
          <Link ref={ref} {...props}>
            {children}
          </Link>
        </li>
        <li aria-hidden>
          <span>/</span>
        </li>
      </>
    );
  }
);

BreadcrumbItem.displayName = COMPONENT_NAME;
