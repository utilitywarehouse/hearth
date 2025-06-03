import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import type { RadioTileProps } from './RadioTile.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import {
  Indicator as RadixRadioIndicator,
  Item as RadixRadioItem,
} from '@radix-ui/react-radio-group';
import { useIds } from '../../hooks/use-ids';
import { useFormFieldGroup } from '../FormFieldGroup/FormFieldGroup.context';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';

const componentName = 'RadioTile';
const componentClassName = withGlobalPrefix(componentName);

type RadioTileElement = ElementRef<'button'>;

export const RadioTile = React.forwardRef<RadioTileElement, RadioTileProps>(
  (
    { className, id: providedId, label, helperText, 'aria-labelledby': ariaLabelledby, ...props },
    ref
  ) => {
    const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'radio' });
    const { hasGroupHelperText, 'aria-describedby': ariaDescribedby } = useFormFieldGroup();
    const showHelperText = Boolean(!hasGroupHelperText && helperText !== undefined);
    return (
      <RadixRadioItem
        ref={ref}
        className={clsx(componentClassName, className)}
        {...props}
        id={id}
        aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
        aria-labelledby={ariaLabelledby ? ariaLabelledby : label ? labelId : undefined}
      >
        <div className="hearth-RadioContainer">
          <div className="hearth-RadioItem">
            <RadixRadioIndicator className="hearth-RadioIndicator" />
          </div>
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
        </div>
      </RadixRadioItem>
    );
  }
);

RadioTile.displayName = componentName;
