import { BodyTextProps } from '../BodyText/BodyText.props';
import { FlexProps } from '../Flex/Flex.props';

export interface CardBannerContentProps extends Omit<FlexProps, 'direction' | 'spacing' | 'as'> {
  heading: string;
  description?: string;
  textAlign?: BodyTextProps['textAlign'];
}
