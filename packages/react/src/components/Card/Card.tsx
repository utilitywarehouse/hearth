import { cn } from '../../helpers/cn';
import { cardPropDefs } from './Card.props';
import type { CardProps } from './Card.props';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';
import { sizePropDefs } from '../../props/size.props';
import { gridItemPropDefs } from '../../props/grid-item.props';
import { flexItemPropDefs } from '../../props/flex-item.props';
import { Flex } from '../Flex/Flex';
import { flexPropDefs } from '../Flex/Flex.props';
import { kebabCase } from '../../helpers/kebab-case';
import { gapPropDefs } from '../../props/gap.props';

const COMPONENT_NAME = 'Card';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Card = (props: CardProps) => {
  const {
    className,
    children,
    colorScheme = 'neutralStrong',
    shadowColor,
    ...cardProps
  } = extractProps(
    props,
    flexPropDefs,
    gapPropDefs,
    cardPropDefs,
    marginPropDefs,
    sizePropDefs,
    gridItemPropDefs,
    flexItemPropDefs
  );

  return (
    <Flex
      className={cn(componentClassName, className)}
      data-colorscheme={kebabCase(colorScheme)}
      data-shadowcolor={shadowColor}
      data-card-variant={props.variant}
      {...cardProps}
      as="div"
    >
      {children}
    </Flex>
  );
};

Card.displayName = COMPONENT_NAME;
