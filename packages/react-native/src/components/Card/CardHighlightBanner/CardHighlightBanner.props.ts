import { ReactElement } from 'react';
import { ImageProps, ViewProps } from 'react-native';

interface CardHighlightBannerProps extends ViewProps {
  heading?: string;
  headingColor?: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
  image?: ImageProps;
  imageContainerHeight?: number;
  description?: string;
  link?: ReactElement;
  button?: ReactElement;
}

export default CardHighlightBannerProps;
