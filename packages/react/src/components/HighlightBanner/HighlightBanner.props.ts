import { MarginProps } from '../../props/margin.props';
import type { ComponentPropsWithout, RemovedProps } from '../../types/component-props';

export interface HighlightBannerProps
  extends ComponentPropsWithout<'div', RemovedProps>,
    MarginProps {
  colorScheme?: 'neutralStrong' | 'neutralSubtle';
  heading: string;
  headingColor: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
}
