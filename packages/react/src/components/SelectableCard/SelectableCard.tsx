import * as React from 'react';

import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Card } from '../Card/Card';
import type { CardProps } from '../Card/Card.props';
import { SelectableCardProps } from './SelectableCard.props';

const componentName = 'SelectableCard';
const componentClassName = withGlobalPrefix(componentName);

type SelectableCardElement = ElementRef<'button'>;

export const SelectableCard = React.forwardRef<SelectableCardElement, SelectableCardProps>(
  ({ className, children, selected, ...selectableCardProps }) => {
    const dataAttributeProps = { 'data-selected': selected ? '' : undefined };
    return (
      <Card
        // ref={ref} TODO: I think we'll have to make this available via context?
        className={clsx(componentClassName, className)}
        variant="subtle"
        colorScheme="white"
        {...(selectableCardProps as CardProps)}
        {...dataAttributeProps}
      >
        {children}
      </Card>
    );
  }
);

SelectableCard.displayName = componentName;
