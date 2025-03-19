import type { ElementRef } from 'react';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { TextFieldProps } from './TextField.props';
import { extractProps } from '../../helpers/extract-props';
import clsx from 'clsx';
import React from 'react';

const componentName = 'TextField';
const componentClassName = withGlobalPrefix(componentName);

type TextFieldElement = ElementRef<'input'>;

export const TextField = React.forwardRef<TextFieldElement, TextFieldProps>((props, ref) => {
  const { className, validationStatus, ...inputProps } = extractProps(props);
  return (
    <div
      ref={ref}
      className={clsx(componentClassName, className)}
      data-validation-status={validationStatus ? validationStatus : undefined}
    >
      <input spellCheck="false" {...inputProps} />
    </div>
  );
});

TextField.displayName = componentName;
