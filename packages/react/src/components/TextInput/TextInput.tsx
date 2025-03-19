import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TextInputProps } from './TextInput.props';
import { extractProps } from '../../helpers/extract-props';
import clsx from 'clsx';
import React from 'react';

const componentName = 'TextInput';
const componentClassName = withGlobalPrefix(componentName);

type TextInputElement = ElementRef<'input'>;

export const TextInput = React.forwardRef<TextInputElement, TextInputProps>((props, ref) => {
  const { className, validationStatus, children, ...textInputProps } = extractProps(props);
  return (
    <div
      ref={ref}
      className={clsx(componentClassName, className)}
      data-validation-status={validationStatus ? validationStatus : undefined}
    >
      {children}
      <input spellCheck="false" {...textInputProps} />
    </div>
  );
});

TextInput.displayName = componentName;
