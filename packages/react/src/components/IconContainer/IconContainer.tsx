import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { iconContainerPropDefs, IconContainerProps } from './IconContainer.props';
import { withClassnameGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'IconContainer';
const componentClassName = withClassnameGlobalPrefix(componentName);

type IconContainerElement = ElementRef<'span'>;

export const IconContainer = React.forwardRef<IconContainerElement, IconContainerProps>(
  (props, ref) => {
    const {
      className,
      colorScheme = 'pig',
      radiusNone,
      ...iconContainerProps
    } = extractProps(props, iconContainerPropDefs, marginPropDefs);
    const dataAttributeProps = {
      'data-colorscheme': colorScheme,
      'data-radius-zero': radiusNone ? '' : undefined,
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

IconContainer.displayName = componentName;
