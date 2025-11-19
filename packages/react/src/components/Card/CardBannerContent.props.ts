import { BodyTextProps } from '../BodyText/BodyText.props';
import { FlexProps } from '../Flex/Flex.props';

export type CardBannerContentProps = Omit<FlexProps, 'direction' | 'spacing'> & {
  heading: string;
  description?: string;
  textAlign?: BodyTextProps['textAlign'];
};
