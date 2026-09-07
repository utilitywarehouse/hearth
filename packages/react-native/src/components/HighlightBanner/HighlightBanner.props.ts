import { ReactElement, ReactNode } from 'react';
import CardProps from '../Card/Card.props';

interface HighlightBannerProps
  extends Omit<
    CardProps,
    | 'noPadding'
    | 'variant'
    | 'space'
    | 'gap'
    | 'rowGap'
    | 'columnGap'
    | 'flexDirection'
    | 'flexWrap'
    | 'alignItems'
    | 'justifyContent'
    | 'colorScheme'
  > {
  /** The heading text displayed at the top with a coloured background. */
  heading?: string;
  /** The semantic colour scheme for the heading background. */
  headingColor?: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
  /**
   * Visual style variant with strong or subtle borders.
   * @default 'emphasis'
   */
  variant?: 'emphasis' | 'subtle';
  /** The image component to be displayed in the banner. */
  image?: ReactNode;
  /**
   * Height of the image container in pixels.
   * @default 200
   */
  imageContainerHeight?: number;
  /** Description text displayed below the image. */
  description?: string;
  /** Optional Link component displayed below the description. */
  link?: ReactElement;
  /** Optional Button component displayed below the description. */
  button?: ReactElement;
}

export default HighlightBannerProps;
