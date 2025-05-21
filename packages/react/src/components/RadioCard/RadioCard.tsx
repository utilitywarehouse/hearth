import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import type { RadioCardProps } from './RadioCard.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { SelectableCard } from '../SelectableCard/SelectableCard';
import { Radio } from '../Radio/Radio';
import { CardAction } from '../Card/CardAction';

const componentName = 'RadioCard';
const componentClassName = withGlobalPrefix(componentName);

type RadioCardElement = ElementRef<'button'>;

export const RadioCard = React.forwardRef<RadioCardElement, RadioCardProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <SelectableCard
        className={clsx(componentClassName, className)}
        borderRadius="xl"
        direction="column"
        gap="150"
      >
        <CardAction>
          <Radio ref={ref} {...props} labelFontWeight="semibold" />
        </CardAction>
        {children}
      </SelectableCard>
    );
  }
);

RadioCard.displayName = componentName;
