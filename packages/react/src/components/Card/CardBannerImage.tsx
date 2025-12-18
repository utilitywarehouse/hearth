import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import type { FlexProps } from '../Flex/Flex.props';

const COMPONENT_NAME = 'CardBannerImage';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardBannerImage = ({ className, ...props }: FlexProps) => {
  return <Flex className={clsx(componentClassName, className)} {...props} />;
};

CardBannerImage.displayName = COMPONENT_NAME;
