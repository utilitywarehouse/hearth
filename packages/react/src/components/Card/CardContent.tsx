import { cn } from '../../helpers/cn';
import type { CardContentProps } from './CardContent.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'CardContent';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardContent = ({ className, paddingBottomNone, ...props }: CardContentProps) => {
  return (
    <Flex
      className={cn(componentClassName, className)}
      {...props}
      data-padding-bottom-none={paddingBottomNone}
    />
  );
};

CardContent.displayName = COMPONENT_NAME;
