import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { ListActionButtonProps } from './ListActionButton.props';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'ListActionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ListActionButtonElement = ElementRef<'button'>;

export const ListActionButton = React.forwardRef<ListActionButtonElement, ListActionButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <BodyText size="md" weight="semibold" asChild>
        <button ref={ref} className={clsx(componentClassName, className)} {...props}>
          {children}
          <ChevronRightSmallIcon />
        </button>
      </BodyText>
    );
  }
);

ListActionButton.displayName = COMPONENT_NAME;
