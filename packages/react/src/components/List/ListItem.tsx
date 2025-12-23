import { cn } from '../../helpers/cn';
import type { ListItemProps } from './ListItem.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';

const COMPONENT_NAME = 'ListItem';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ListItem = ({
  className,
  children,
  direction,
  alignItems,
  alignContent,
  justifyContent,
  wrap,
  width,
  maxWidth,
  minWidth,
  height,
  maxHeight,
  minHeight,
  gap,
  rowGap,
  columnGap,
  ...props
}: ListItemProps) => {
  const flexProps = {
    direction,
    alignItems,
    alignContent,
    justifyContent,
    wrap,
    width,
    maxWidth,
    minWidth,
    height,
    maxHeight,
    minHeight,
    gap,
    rowGap,
    columnGap,
  };

  return (
    <Flex asChild {...flexProps}>
      <BodyText size="lg" asChild className={cn(componentClassName, className)}>
        <li {...props}>{children}</li>
      </BodyText>
    </Flex>
  );
};

ListItem.displayName = COMPONENT_NAME;
