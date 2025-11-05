import * as React from 'react';
import clsx from 'clsx';
import type { CardActionLinkProps } from './CardActionLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { CardActionContent } from './CardActionContent';

const COMPONENT_NAME = 'CardActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardActionLinkElement = ElementRef<'a'>;

export const CardActionLink = React.forwardRef<CardActionLinkElement, CardActionLinkProps>(
  (
    {
      className,
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      trailingIcon,
      badge,
      badgePlacement,
      children,
      ...props
    },
    ref
  ) => {
    const contentProps = {
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      badge,
      badgePlacement,
    };
    return (
      <a ref={ref} className={clsx(componentClassName, className)} {...props}>
        <CardActionContent
          trailingIcon={trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
          {...contentProps}
        >
          {children}
        </CardActionContent>
      </a>
    );
  }
);

CardActionLink.displayName = COMPONENT_NAME;
