import { MarginProps } from '../../props/margin.props';

export interface BreadcrumbsProps extends React.ComponentPropsWithRef<'nav'>, MarginProps {
  /**
   * Invert the component colours, for use on darker surface colours.
   **/
  inverted?: boolean;
}
