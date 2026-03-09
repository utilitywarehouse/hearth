import { createContext } from 'react';
import { BreadcrumbsProps } from './Breadcrumbs.props';

export type BreadcrumbsContextOptions = {
  inverted: BreadcrumbsProps['inverted'];
};

export const BreadcrumbsContext = createContext<BreadcrumbsContextOptions>({
  inverted: false,
});
