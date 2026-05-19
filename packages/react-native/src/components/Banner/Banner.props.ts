import type { ComponentType, ReactElement, ReactNode } from 'react';
import type { StyleProp, ViewStyle } from 'react-native';
import type CardProps from '../Card/Card.props';

export type BannerDirection = 'horizontal' | 'vertical';

export interface BannerProps extends Omit<
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
  illustration?: ReactNode;
  /**
   * Image to display in the banner
   * Mutually exclusive with icon and illustration
   */
  image?: ReactNode;
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
   * Chevron alignment for horizontal layout
   * @default 'center'
   */
  alignChevron?: 'center' | 'start' | 'end';
  style?: StyleProp<ViewStyle>;
}

export default BannerProps;
