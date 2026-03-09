'use client';

import { cn } from '../../helpers/cn';
import type { CardActionLinkProps } from './CardActionLink.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { CardActionContent } from './CardActionContent';
import type { ComponentRef } from 'react';
import { forwardRef } from 'react';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';

type CardActionLinkElement = ComponentRef<'a'>;

const COMPONENT_NAME = 'CardActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const CardActionLink = forwardRef<CardActionLinkElement, CardActionLinkProps>(
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
      asChild,
      children,
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

    const Component = asChild ? Slot.Root : 'a';

    return (
      <Component ref={ref} className={cn(componentClassName, className)} {...restProps}>
        {getSubtree({ asChild, children }, children => (
          <CardActionContent
            trailingIcon={trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
            {...contentProps}
          >
            {children}
          </CardActionContent>
        ))}
      </Component>
    );
  }
);

CardActionLink.displayName = COMPONENT_NAME;
