import type { ComponentType, ReactElement } from 'react';
import { ImageProps } from 'react-native';
import type CardProps from '../Card/Card.props';
import { ThemedImageProps } from '../ThemedImage';

export type BannerDirection = 'horizontal' | 'vertical';

export interface BannerProps
  extends Omit<
    CardProps,
    | 'noPadding'
    | 'variant'
    | 'colorScheme'
    | 'space'
    | 'gap'
    | 'rowGap'
    | 'columnGap'
    | 'flexDirection'
    | 'flexWrap'
    | 'alignItems'
    | 'justifyContent'
  > {
  /**
   * Icon component to display in the banner
   * Mutually exclusive with image
   */
  icon?: ComponentType;
  /**
   * Icon container variant
   * @default 'subtle'
   */
  iconContainerVariant?: 'subtle' | 'emphasis';
  /**
   * Icon container size
   * @default 'md'
   */
  iconContainerSize?: 'sm' | 'md' | 'lg';
  /**
   * Icon container color
   * @default 'pig'
   */
  iconContainerColor?:
    | 'pig'
    | 'energy'
    | 'broadband'
    | 'mobile'
    | 'insurance'
    | 'cashback'
    | 'highlight';
  /**
   * Illustration to display in the banner
   * Mutually exclusive with icon and image
   */
  illustration?: ThemedImageProps & ImageProps;
  /**
   * Image to display in the banner
   * Mutually exclusive with icon and illustration
   */
  image?: ThemedImageProps & ImageProps;
  /**
   * Heading text
   */
  heading: string;
  /**
   * Description text
   */
  description: string;
  /**
   * Layout direction for icon/image and content
   * @default 'horizontal'
   */
  direction?: BannerDirection;
  /**
   * Link element to display
   */
  link?: ReactElement;
  /**
   * Button element to display
   */
  button?: ReactElement;
  /**
   * Makes the entire banner pressable
   */
  onPress?: () => void;
  /**
   * Close button handler
   */
  onClose?: () => void;
  /**
   * Card variant
   * @default 'subtle'
   */
  variant?: 'subtle' | 'emphasis';
  /**
   * Color scheme for the banner
   * @default 'pig'
   */
  colorScheme?: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
}

export default BannerProps;
