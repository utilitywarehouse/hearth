import { MarginProps } from '../../props/margin.props';
import { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

interface CommonPaginationProps extends MarginProps {
  /**
   * Shorthand for changing the default rendered element into a semantically appropriate alternative.
   * @default div
   */
  as?: 'div' | 'nav';
  /**
   * The current active page number (1-indexed)
   */
  currentPage: number;
  /**
   * The total number of pages
   */
  totalPages: number;
  /**
   * Callback when page changes
   */
  onPageChange: (page: number) => void;
  /**
   * Whether to show condensed version with only "Page X of Y" text
   * @default false
   */
  condensed?: boolean;
  /**
   * Whether to hide the skip to first/last page buttons
   * @default false
   */
  hideSkipButtons?: boolean;
}

type PaginationDivProps = { as?: 'div' } & ComponentPropsWithout<'div', RemovedProps>;
type PaginationNavProps = { as: 'nav' } & ComponentPropsWithout<'nav', RemovedProps>;

export type PaginationProps = CommonPaginationProps & (PaginationDivProps | PaginationNavProps);
