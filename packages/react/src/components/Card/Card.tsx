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
import { forwardRef } from 'react';
import type { ComponentRef } from 'react';

type CardElement = ComponentRef<'div'>;

const COMPONENT_NAME = 'Card';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

/**
 * Use Card as a container for concise information about a single subject —
 * featured information, related content, or navigational choices. In groups,
 * cards present collections of similar content and should be rendered as list
 * items. Cards are static by default; wrap an interactive child (a link or
 * button) in `CardInteraction` to make the whole card clickable. For
 * highlighting key marketing messaging, use HighlightBanner instead.
 *
 * @summary A container for concise information about a single subject.
 */
export const Card = forwardRef<CardElement, CardProps>((props, ref) => {
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
      ref={ref}
      className={cn(componentClassName, className)}
      data-colorscheme={kebabCase(colorScheme)}
      data-shadowcolor={shadowColor}
      data-card-variant={props.variant}
      data-testid={componentClassName}
      {...cardProps}
      as="div"
    >
      {children}
    </Flex>
  );
});

Card.displayName = COMPONENT_NAME;
