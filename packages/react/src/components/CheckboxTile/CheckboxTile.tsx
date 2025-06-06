import * as React from 'react';

import clsx from 'clsx';

import { CheckboxTileProps } from './CheckboxTile.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import * as RadixCheckbox from '@radix-ui/react-checkbox';
import { useIds } from '../../hooks/use-ids';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useCheckboxGroupBase } from '../CheckboxGroupBase/CheckboxGroupBase.context';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { useFieldset } from '../Fieldset/Fieldset.context';

const componentName = 'CheckboxTile';
const componentClassName = withGlobalPrefix(componentName);

type CheckboxTileElement = ElementRef<'button'>;

export const CheckboxTile = React.forwardRef<CheckboxTileElement, CheckboxTileProps>(
  (
    {
      className,
      id: providedId,
      disabled,
      value = 'on',
      onCheckedChange,
      label,
      helperText,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'radio' });
    const context = useFieldset();
    const checkboxContext = useCheckboxGroupBase();
    const checked = checkboxContext?.value?.includes(value);
    const hasGroupHelperText = context?.hasGroupHelperText;
    const ariaDescribedby = context ? context['aria-describedby'] : '';
    const showHelperText = !hasGroupHelperText && !!helperText;
    const showLabel = !!label;
    return (
      <label
        className={clsx(componentClassName, className)}
        data-disabled={disabled ? '' : undefined}
      >
        <RadixCheckbox.Root
          ref={ref}
          className="hearth-CheckboxRoot"
          name={checkboxContext?.name}
          checked={checked}
          value={value}
          {...props}
          id={id}
          disabled={disabled}
          aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
          aria-labelledby={ariaLabelledby || showLabel ? labelId : undefined}
          onCheckedChange={(checked: boolean) => {
            if (context) {
              if (checked) {
                checkboxContext?.onItemCheck(value);
              } else {
                checkboxContext?.onItemUncheck(value);
              }
            }
            if (onCheckedChange) {
              onCheckedChange(checked);
            }
          }}
        >
          <RadixCheckbox.Indicator asChild className="hearth-CheckboxIndicator">
            <TickSmallIcon />
          </RadixCheckbox.Indicator>
        </RadixCheckbox.Root>
        <Flex direction="column">
          <Label id={labelId} htmlFor={id} disableUserSelect>
            {label}
          </Label>
          {showHelperText ? (
            <HelperText id={helperTextId} disableUserSelect>
              {helperText}
            </HelperText>
          ) : null}
        </Flex>
      </label>
    );
  }
);

CheckboxTile.displayName = componentName;
