import { MarginProps } from '../../props/margin.props';

export interface BreadcrumbsProps extends React.ComponentPropsWithRef<'nav'>, MarginProps {
  /**
   * Invert component colours, for use on darker surface colours.
   */
  inverted?: boolean;
}
