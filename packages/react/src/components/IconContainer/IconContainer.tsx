import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { iconContainerPropDefs, IconContainerProps } from './IconContainer.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { borderRadiusPropDefs } from '../../props/border-radius.props';
import { sizePropDefs } from '../../props/size.props';

const COMPONENT_NAME = 'IconContainer';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type IconContainerElement = ElementRef<'span'>;

export const IconContainer = React.forwardRef<IconContainerElement, IconContainerProps>(
  (props, ref) => {
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
    const dataAttributeProps = {
      'data-colorscheme': colorScheme,
      'data-fill': fill,
    };
    return (
      <span
        ref={ref}
        className={clsx(componentClassName, className)}
        {...dataAttributeProps}
        {...iconContainerProps}
      />
    );
  }
);

IconContainer.displayName = COMPONENT_NAME;
