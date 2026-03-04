'use client';

import { cn } from '../../helpers/cn';
import type { CardActionLinkProps } from './CardActionLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { CardActionContent } from './CardActionContent';
import type { ComponentRef } from 'react';

type CardActionLinkElement = ComponentRef<'a'>;

const COMPONENT_NAME = 'CardActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardActionLink = React.forwardRef<CardActionLinkElement, CardActionLinkProps>(
  (props, ref) => {
    const {
      className,
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      trailingIcon,
      badge,
      badgePlacement,
      ...restProps
    } = props;

    const contentProps = {
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      badge,
      badgePlacement,
    };

    return (
      <a ref={ref} className={cn(componentClassName, className)} {...restProps}>
        <CardActionContent
          trailingIcon={trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
          {...contentProps}
        />
      </a>
    );
  }
);

CardActionLink.displayName = COMPONENT_NAME;
