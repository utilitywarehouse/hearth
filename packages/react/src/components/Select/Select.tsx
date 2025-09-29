import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SelectProps } from './Select.props';
import { Select as RadixSelect } from 'radix-ui';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';

const COMPONENT_NAME = 'Select';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SelectElement = ElementRef<'button'>;

export const Select = React.forwardRef<SelectElement, SelectProps>((props, ref) => {
  const {
    className,
    children,
    placeholder,
    validationStatus,
    ...selectProps
  } = extractProps(props, marginPropDefs);

  return (
    <RadixSelect.Root {...selectProps}>
      <RadixSelect.Trigger
        ref={ref}
        className={clsx(componentClassName, className)}
        data-validation-status={validationStatus ? validationStatus : undefined}
      >
        <RadixSelect.Value className={`${componentClassName}Value`} placeholder={placeholder} />
        <RadixSelect.Icon className={`${componentClassName}TriggerIcon`}>
          <ExpandSmallIcon />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content
          className={`${componentClassName}Dropdown`}
          position="popper"
          side="bottom"
          sideOffset={4}
        >
          <RadixSelect.Viewport className={`${componentClassName}Viewport`}>
            {children}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
});

Select.displayName = COMPONENT_NAME;
