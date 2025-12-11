import { MarginProps } from '../../props/margin.props';

export interface HighlightBannerProps extends React.ComponentPropsWithRef<'div'>, MarginProps {
  colorScheme?: 'neutralStrong' | 'neutralSubtle';
  heading: string;
  headingColor: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
}
