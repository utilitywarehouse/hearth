import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import clsx from 'clsx';
import React from 'react';
import { TextInput } from '../TextInput/TextInput';
import { TextInputSlot } from '../TextInputSlot/TextInputSlot';
import { CurrencyInputProps } from './CurrencyInput.props';
import { DetailText } from '../DetailText/DetailText';

const COMPONENT_NAME = 'CurrencyInput';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CurrencyInputElement = ElementRef<'input'>;

export const CurrencyInput = React.forwardRef<CurrencyInputElement, CurrencyInputProps>(
  ({ className, disabled, value, placeholder = '0.00', ...props }, ref) => {
    return (
      <TextInput
        ref={ref}
        className={clsx(componentClassName, className)}
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        disabled={disabled}
        value={value}
        placeholder={placeholder}
        {...props}
      >
        <TextInputSlot placement="prefix">
          <DetailText size="3xl">£</DetailText>
        </TextInputSlot>
      </TextInput>
    );
  }
);

CurrencyInput.displayName = COMPONENT_NAME;
