'use client';

import { cn } from '../../helpers/cn';
import type { BreadcrumbsProps } from './Breadcrumbs.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BreadcrumbsContext } from './Breadcrumbs.context';

const COMPONENT_NAME = 'Breadcrumbs';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Breadcrumbs = (props: BreadcrumbsProps) => {
  const { className, children, inverted, ...breadcrumbsProps } = extractProps(
    props,
    marginPropDefs
  );
  return (
    <nav
      aria-label="breadcrumbs"
      className={cn(componentClassName, className)}
      data-inverted={inverted ? '' : undefined}
      {...breadcrumbsProps}
    >
      <ol role="list">
        <BreadcrumbsContext.Provider value={{ inverted }}>{children}</BreadcrumbsContext.Provider>
      </ol>
    </nav>
  );
};

Breadcrumbs.displayName = COMPONENT_NAME;
