import * as React from 'react';

import clsx from 'clsx';

import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import type { RadioGridGroupProps, RadioGridGroupRootProps } from './RadioGridGroup.props';
import { FormFieldGroup } from '../FormFieldGroup/FormFieldGroup';
import { extractProps } from '../../helpers/extract-props';
import { columnsPropDefs } from '../../props/columns.props';
import { Root } from '@radix-ui/react-radio-group';
import { Box } from '../Box/Box';

const rootComponentName = 'RadioGridGroupRoot';
const rootComponentClassName = withGlobalPrefix(rootComponentName);

type RadioGridGroupRootElement = ElementRef<'div'>;

export const RadioGridGroupRoot = React.forwardRef<
  RadioGridGroupRootElement,
  RadioGridGroupRootProps
>((props, ref) => {
  const { className, width, children, ...radioGridGroupProps } = extractProps(
    props,
    columnsPropDefs
  );

  return (
    <Root
      ref={ref}
      asChild
      {...radioGridGroupProps}
      className={clsx(rootComponentClassName, className)}
    >
      <Box width={width}>{children}</Box>
    </Root>
  );
});

RadioGridGroupRoot.displayName = rootComponentName;

const componentName = 'RadioGridGroup';
const componentClassName = withGlobalPrefix(componentName);

type RadioGridGroupElement = ElementRef<'fieldset'>;

/**
 * The `RadioGridGroup` provides an accessible way to group and control a set
 * of `Radio` or `RadioTile` components, displayed in a grid layout, allowing
 * the user to select one option from a set. For displaying radios in a column
 * or row, please use the `RadioGroup` component. The `RadioGridGroup` is
 * responsible for handling the value, helper text, error state, error message,
 * and disabled state, as well as determining the presentation and selection of
 * the items in the list. Follows the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for radio groups not contained in a toolbar.
 */
export const RadioGridGroup = React.forwardRef<RadioGridGroupElement, RadioGridGroupProps>(
  (
    {
      children,
      contentWidth = 'fit-content',
      className,
      label,
      helperText,
      validationText,
      validationStatus,
      required,
      disabled,
      loop,
      defaultValue,
      value,
      onValueChange,
      name,
      columns,
      ...props
    },
    ref
  ) => {
    const formFieldGroupProps = {
      ...props,
      disabled,
      required,
      label,
      helperText,
      validationText,
      validationStatus,
    };
    const radioGridGroupRootProps = {
      width: contentWidth,
      name,
      required,
      disabled,
      loop,
      defaultValue,
      value,
      onValueChange,
      columns,
    };
    return (
      <FormFieldGroup
        ref={ref}
        className={clsx(componentClassName, className)}
        {...formFieldGroupProps}
      >
        <RadioGridGroupRoot {...radioGridGroupRootProps}>{children}</RadioGridGroupRoot>
      </FormFieldGroup>
    );
  }
);

RadioGridGroup.displayName = componentName;
