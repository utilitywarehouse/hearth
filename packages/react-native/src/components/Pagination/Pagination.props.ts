import type { ViewProps } from 'react-native';

export interface PaginationProps extends ViewProps {
  /**
   * The current active page number (1-indexed).
   */
  currentPage: number;
  /**
   * The total number of pages.
   */
  totalPages: number;
  /**
   * Callback fired when the page changes.
   */
  onPageChange: (page: number) => void;
  /**
   * Whether to show condensed copy instead of individual page items.
   * @default false
   */
  condensed?: boolean;
  /**
   * Whether to hide the first and last page controls.
   * @default false
   */
  hideSkipButtons?: boolean;
}

export default PaginationProps;
