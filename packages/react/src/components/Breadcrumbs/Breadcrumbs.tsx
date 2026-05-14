'use client';

import { cn } from '../../helpers/cn';
import type { BreadcrumbsProps } from './Breadcrumbs.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BreadcrumbsContext } from './Breadcrumbs.context';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';

const COMPONENT_NAME = 'Breadcrumbs';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type BreadcrumbsElement = ComponentRef<'nav'>;

export const Breadcrumbs = forwardRef<BreadcrumbsElement, BreadcrumbsProps>((props, ref) => {
  const { className, children, inverted, ...breadcrumbsProps } = extractProps(
    props,
    marginPropDefs
  );
  return (
    <nav
      ref={ref}
      aria-label="breadcrumbs"
      className={cn(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      data-testid={componentClassName}
      {...breadcrumbsProps}
    >
      <ol role="list">
        <BreadcrumbsContext.Provider value={{ inverted }}>{children}</BreadcrumbsContext.Provider>
      </ol>
    </nav>
  );
});

Breadcrumbs.displayName = COMPONENT_NAME;
