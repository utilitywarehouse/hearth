import clsx from 'clsx';
import type { CardContentProps } from './CardContent.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'CardContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardContent = ({ className, ...props }: CardContentProps) => {
  return <Flex className={clsx(componentClassName, className)} {...props} />;
};

CardContent.displayName = COMPONENT_NAME;
