import * as React from 'react';

import clsx from 'clsx';

import { CheckboxTileProps } from './CheckboxTile.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { SelectableCard } from '../SelectableCard/SelectableCard';
import { CardAction } from '../Card/CardAction';
import { Checkbox } from '../Checkbox/Checkbox';

const componentName = 'CheckboxTile';
const componentClassName = withGlobalPrefix(componentName);

type CheckboxTileElement = ElementRef<'button'>;

export const CheckboxTile = React.forwardRef<CheckboxTileElement, CheckboxTileProps>(
  ({ className, ...props }, ref) => {
    return (
      <SelectableCard className={clsx(componentClassName, className)} compact>
        <CardAction>
          <Checkbox ref={ref} {...props} />
        </CardAction>
      </SelectableCard>
    );
  }
);

CheckboxTile.displayName = componentName;
