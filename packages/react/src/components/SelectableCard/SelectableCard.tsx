import * as React from 'react';

import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Card } from '../Card/Card';
import type { CardProps } from '../Card/Card.props';
import { SelectableCardProps } from './SelectableCard.props';

const componentName = 'SelectableCard';
const componentClassName = withGlobalPrefix(componentName);

type SelectableCardElement = ElementRef<'div'>;

export const SelectableCard = React.forwardRef<SelectableCardElement, SelectableCardProps>(
  ({ className, children, selected, ...selectableCardProps }, ref) => {
    return (
      <Card
        ref={ref}
        className={clsx(componentClassName, className)}
        data-selected={selected ? '' : undefined}
        {...(selectableCardProps as CardProps)}
        variant="subtle"
        colorScheme="white"
      >
        {children}
      </Card>
    );
  }
);

SelectableCard.displayName = componentName;
