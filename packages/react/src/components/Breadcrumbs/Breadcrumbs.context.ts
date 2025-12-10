import React from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.props';

export type BreadcrumbsContextOptions = {
  inverted: BreadcrumbsProps['inverted'];
};

export const BreadcrumbsContext = React.createContext<BreadcrumbsContextOptions>({
  inverted: false,
});
