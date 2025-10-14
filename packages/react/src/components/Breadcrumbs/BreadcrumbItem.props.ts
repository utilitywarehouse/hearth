import { MarginProps } from '../../props/margin.props';
import { LinkProps } from '../Link/Link.props';

export interface BreadcrumbItemProps extends Omit<LinkProps, keyof MarginProps> {
  /*
   * Indicate the current page
   */
  currentPage?: boolean;
}
