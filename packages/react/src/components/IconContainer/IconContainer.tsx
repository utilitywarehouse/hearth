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

export const IconContainer = (props: IconContainerProps) => {
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
      className={cn(componentClassName, className)}
      data-colorscheme={colorScheme}
      data-fill={fill}
      {...iconContainerProps}
    />
  );
};

IconContainer.displayName = COMPONENT_NAME;
