import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { SelectProps } from './Select.props';
import { Select as RadixSelect } from 'radix-ui';
import { ExpandSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { useIds } from '../../hooks/use-ids';
import { Flex } from '../Flex/Flex';
import { Label } from '../Label/Label';
import { BodyText } from '../BodyText/BodyText';
import { HelperText } from '../HelperText/HelperText';
import { ValidationText } from '../ValidationText/ValidationText';

const COMPONENT_NAME = 'Select';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type SelectElement = ElementRef<'button'>;

export const Select = React.forwardRef<SelectElement, SelectProps>((props, ref) => {
  const {
    className,
    children,
    placeholder,
    validationStatus,
    validationText,
    label,
    helperText,
    id: providedId,
    disabled,
    required,
    ...selectProps
  } = extractProps(props, marginPropDefs);

  const { id, labelId, helperTextId, validationTextId } = useIds({
    providedId,
    prefix: 'select',
  });
  const showValidationText = Boolean(
    !disabled && validationStatus !== undefined && validationText !== undefined
  );

  return (
    <div className={clsx(componentClassName, className)}>
      <Flex direction="column">
        <Label htmlFor={id} id={labelId} disableUserSelect fontWeight="semibold">
          {label}
          {required ? null : (
            <BodyText as="span" marginLeft="50">
              (optional)
            </BodyText>
          )}
        </Label>
        {helperText ? (
          <HelperText id={helperTextId} disableUserSelect>
            {helperText}
          </HelperText>
        ) : null}
      </Flex>
      <RadixSelect.Root {...selectProps}>
        <RadixSelect.Trigger
          id={id}
          ref={ref}
          className={`${componentClassName}Trigger`}
          disabled={disabled}
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
      {showValidationText ? (
        <ValidationText status={validationStatus} disableUserSelect id={validationTextId}>
          {validationText}
        </ValidationText>
      ) : null}
    </div>
  );
});

Select.displayName = COMPONENT_NAME;
