import type { ComponentPropsWithRef } from 'react';
import { MarginProps } from '../../props/margin.props';
import { CardProps } from '../Card/Card.props';

export interface HighlightBannerProps
  extends ComponentPropsWithRef<'div'>, Pick<CardProps, 'shadowColor'>, MarginProps {
  /**
   * The background colour scheme of the banner.
   */
  colorScheme?: 'neutralStrong' | 'neutralSubtle';
  /**
   * The heading text shown at the top of the banner.
   */
  heading: string;
  /**
   * The colour of the heading, typically matched to the product or category
   * the banner relates to (e.g. use a Pig colour with Pig content).
   */
  headingColor: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
}
