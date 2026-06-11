import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { CardProps } from '../Card/Card.props';

export interface HighlightBannerProps
  extends ComponentPropsWithRef<'div'>, Pick<CardProps, 'shadowColor'>, MarginProps {
  colorScheme?: 'neutralStrong' | 'neutralSubtle';
  heading: string;
  headingColor: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
}
