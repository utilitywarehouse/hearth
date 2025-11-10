import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { iconContainerPropDefs, IconContainerProps } from './IconContainer.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { borderRadiusPropDefs } from '../../props/border-radius.props';

const COMPONENT_NAME = 'IconContainer';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type IconContainerElement = ElementRef<'span'>;

export const IconContainer = React.forwardRef<IconContainerElement, IconContainerProps>(
  (props, ref) => {
    const {
      className,
      colorScheme = 'pig',
      radiusNone,
      fill,
      ...iconContainerProps
    } = extractProps(props, iconContainerPropDefs, marginPropDefs, borderRadiusPropDefs);
    const dataAttributeProps = {
      'data-colorscheme': colorScheme,
      'data-radius-zero': radiusNone ? '' : undefined,
      'data-fill': fill ? '' : undefined,
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
