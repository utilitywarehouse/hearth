'use client';

import * as React from 'react';

import clsx from 'clsx';

import type { BreadcrumbsProps } from './Breadcrumbs.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { BreadcrumbsContext } from './Breadcrumbs.context';

const COMPONENT_NAME = 'Breadcrumbs';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Breadcrumbs: React.FC<BreadcrumbsProps> = props => {
  const { className, children, inverted, ...breadcrumbsProps } = extractProps(
    props,
    marginPropDefs
  );
  return (
    <nav
      aria-label="breadcrumbs"
      className={clsx(componentClassName, className)}
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
