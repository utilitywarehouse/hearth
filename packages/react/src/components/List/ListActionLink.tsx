import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListActionLinkProps } from './ListActionLink.props';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ListActionLink';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListActionLinkElement = ElementRef<'a'>;

export const ListActionLink = React.forwardRef<ListActionLinkElement, ListActionLinkProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BodyText size="md" weight="semibold" asChild>
        <a ref={ref} className={clsx(componentClassName, className)} {...props}>
          {children}
          <ChevronRightSmallIcon />
        </a>
      </BodyText>
    );
  }
);

ListActionLink.displayName = COMPONENT_NAME;
