import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { iconContainerPropDefs } from './IconContainer.props';
import type { IconContainerProps } from './IconContainer.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { borderRadiusPropDefs } from '../../props/border-radius.props';
import { sizePropDefs } from '../../props/size.props';

const COMPONENT_NAME = 'IconContainer';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type IconContainerElement = ComponentRef<'span'>;

export const IconContainer = forwardRef<IconContainerElement, IconContainerProps>((props, ref) => {
  const {
    className,
    colorScheme = 'pig',
    fill,
    ...iconContainerProps
  } = extractProps(
    props,
    iconContainerPropDefs,
    marginPropDefs,
    sizePropDefs,
    borderRadiusPropDefs
  );

  return (
    <span
      ref={ref}
      className={cn(componentClassName, className)}
      data-colorscheme={colorScheme}
      data-fill={fill}
      data-testid={componentClassName}
      {...iconContainerProps}
    />
  );
});

IconContainer.displayName = COMPONENT_NAME;
