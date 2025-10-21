import { MarginProps } from '../../props/margin.props';

export interface BreadcrumbsProps extends React.ComponentProps<'nav'>, MarginProps {
  /** Inverts the component colours, for use on darker surface colours. */
  inverted?: boolean;
}
