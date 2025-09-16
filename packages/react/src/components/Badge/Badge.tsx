import * as React from 'react';
import type { ElementRef } from 'react';

import clsx from 'clsx';

import { badgePropDefs, BadgeProps } from './Badge.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { textTransformPropDefs } from '../../props/text-transform.props';

const componentName = 'Badge';
const componentClassName = withGlobalPrefix(componentName);

type BadgeElement = ElementRef<'span'>;

export const Badge = React.forwardRef<BadgeElement, BadgeProps>((props, ref) => {
  const {
    className,
    colorScheme = 'info',
    flatBase,
    ...badgeProps
  } = extractProps(props, badgePropDefs, textTransformPropDefs);
  const dataAttributeProps = {
    'data-colorscheme': colorScheme,
    'data-bottom-radius-zero': flatBase ? '' : undefined,
  };
  return (
    <span
      ref={ref}
      className={clsx(componentClassName, className)}
      {...dataAttributeProps}
      {...badgeProps}
    />
  );
});

Badge.displayName = componentName;
