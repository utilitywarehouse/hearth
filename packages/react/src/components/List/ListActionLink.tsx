'use client';

import { forwardRef } from 'react';
import { cn } from '../../helpers/cn';
import type { ComponentRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';
import { Slot } from 'radix-ui';
import { getSubtree } from '../../helpers/get-subtree';
import { ListActionLinkProps } from './ListActionLink.props';

const COMPONENT_NAME = 'ListActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListActionLinkElement = ComponentRef<'a'>;

export const ListActionLink = forwardRef<ListActionLinkElement, ListActionLinkProps>(
  ({ className, children, asChild, ...props }, ref) => {
    const Component = asChild ? Slot.Root : 'a';
    return (
      <BodyText ref={ref} size="md" weight="semibold" asChild>
        <Component className={cn(componentClassName, className)} {...props}>
          {getSubtree({ asChild, children }, children => (
            <>
              {children}
              <ChevronRightSmallIcon />
            </>
          ))}
        </Component>
      </BodyText>
    );
  }
);

ListActionLink.displayName = COMPONENT_NAME;
