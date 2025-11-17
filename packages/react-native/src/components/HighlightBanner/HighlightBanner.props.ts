import { ReactElement } from 'react';
import { ImageProps } from 'react-native';
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
  heading?: string;
  headingColor?: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
  variant?: 'emphasis' | 'subtle';
  image?: ImageProps;
  imageContainerHeight?: number;
  description?: string;
  link?: ReactElement;
  button?: ReactElement;
}

export default HighlightBannerProps;
