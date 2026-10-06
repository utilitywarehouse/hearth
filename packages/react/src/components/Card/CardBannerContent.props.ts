import { BodyTextProps } from '../BodyText/BodyText.props';
import { FlexProps } from '../Flex/Flex.props';

export interface CardBannerContentProps extends Omit<FlexProps, 'direction' | 'spacing' | 'as'> {
  /**
   * The banner's heading text.
   */
  heading: string;
  /**
   * Supporting text shown below the heading.
   */
  description?: string;
  textAlign?: BodyTextProps['textAlign'];
}
