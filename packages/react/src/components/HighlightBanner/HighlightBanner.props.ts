import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';

export interface HighlightBannerProps extends ComponentPropsWithRef<'div'>, MarginProps {
  colorScheme?: 'neutralStrong' | 'neutralSubtle';
  heading: string;
  headingColor: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
}
