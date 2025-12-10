import clsx from 'clsx';

import { badgePropDefs } from './Badge.props';
import type { BadgeProps } from './Badge.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { textTransformPropDefs } from '../../props/text-transform.props';
import { marginPropDefs } from '../../props/margin.props';

const COMPONENT_NAME = 'Badge';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Badge = (props: BadgeProps) => {
  const {
    className,
    colorScheme = 'info',
    flatBase,
    ...badgeProps
  } = extractProps(props, badgePropDefs, marginPropDefs, textTransformPropDefs);
  return (
    <span
      className={clsx(componentClassName, className)}
      data-colorscheme={colorScheme}
      data-bottom-radius-zero={flatBase ? '' : undefined}
      {...badgeProps}
    />
  );
};

Badge.displayName = COMPONENT_NAME;
