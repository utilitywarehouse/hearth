import * as React from 'react';
import clsx from 'clsx';
import type { BreadcrumbItemProps } from './BreadcrumbItem.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Link } from '../Link/Link';
import { BodyText } from '../BodyText/BodyText';
import { BreadcrumbsContext } from './Breadcrumbs.context';

const COMPONENT_NAME = 'BreadcrumbItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type BreadcrumbItemElement = ElementRef<'a'>;

export const BreadcrumbItem = React.forwardRef<BreadcrumbItemElement, BreadcrumbItemProps>(
  ({ className, children, currentPage, ...props }, ref) => {
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
          <li className={clsx(componentClassName, className)}>{children}</li>
        </BodyText>
      );
    }

    return (
      <>
        <li className={clsx(componentClassName, className)}>
          <Link ref={ref} {...props} inverted={inverted}>
            {children}
          </Link>
        </li>
        <BodyText asChild size="md" color={inverted ? 'inverted' : 'primary'} textAlign="center">
          <li aria-hidden>/</li>
        </BodyText>
      </>
    );
  }
);

BreadcrumbItem.displayName = COMPONENT_NAME;
