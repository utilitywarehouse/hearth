import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import type { RadioTileProps } from './RadioTile.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { RadioGroup as RadixRadioGroup } from 'radix-ui';
import { useIds } from '../../hooks/use-ids';
import { Label } from '../Label/Label';
import { HelperText } from '../HelperText/HelperText';
import { Flex } from '../Flex/Flex';
import { useFormGroupBase } from '../FormGroupBase/FormGroupBase.context';

const componentName = 'RadioTile';
const componentClassName = withGlobalPrefix(componentName);

type RadioTileElement = ElementRef<'button'>;

export const RadioTile = React.forwardRef<RadioTileElement, RadioTileProps>(
  (
    {
      className,
      id: providedId,
      label,
      helperText,
      image: RadioImage,
      'aria-labelledby': ariaLabelledby,
      ...props
    },
    ref
  ) => {
    const { id, labelId, helperTextId } = useIds({ providedId, prefix: 'radio' });
    const { hasGroupHelperText, 'aria-describedby': ariaDescribedby } = useFormGroupBase();
    const showHelperText = Boolean(!hasGroupHelperText && helperText !== undefined);
    const showImage = !!RadioImage;
    return (
      <RadixRadioGroup.Item
        ref={ref}
        className={clsx(componentClassName, className)}
        {...props}
        id={id}
        aria-describedby={showHelperText ? helperTextId : ariaDescribedby}
        aria-labelledby={ariaLabelledby ? ariaLabelledby : label ? labelId : undefined}
      >
        <div className="hearth-RadioContainer">
          <div className="hearth-RadioItem">
            <RadixRadioGroup.Indicator className="hearth-RadioIndicator" />
          </div>
          <Flex direction="column">
            <Flex direction="row" className="hearth-RadioLabel">
              {showImage ?<RadioImage /> : null}
              <Label id={labelId} htmlFor={id} disableUserSelect>
                {label}
              </Label>
            </Flex>
            {showHelperText ? (
              <HelperText id={helperTextId} disableUserSelect>
                {helperText}
              </HelperText>
            ) : null}
          </Flex>
        </div>
      </RadixRadioGroup.Item>
    );
  }
);

RadioTile.displayName = componentName;
