import * as React from 'react';

import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { Card } from '../Card/Card';
import type { CardProps } from '../Card/Card.props';
import { selectableCardPropDefs, SelectableCardProps } from './SelectableCard.props';
import { extractProps } from '../../helpers/extract-props';

const componentName = 'SelectableCard';
const componentClassName = withGlobalPrefix(componentName);

type SelectableCardElement = ElementRef<'div'>;

export const SelectableCard = React.forwardRef<SelectableCardElement, SelectableCardProps>(
  (props, ref) => {
    const { className, children, selected, compact, ...selectableCardProps } = extractProps(
      props,
      selectableCardPropDefs
    );
    return (
      <Card
        ref={ref}
        className={clsx(componentClassName, className)}
        data-selected={selected ? '' : undefined}
        data-compact={compact ? '' : undefined}
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
