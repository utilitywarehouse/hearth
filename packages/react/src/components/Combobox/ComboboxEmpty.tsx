'use client';

import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Combobox as BaseUICombobox } from '@base-ui-components/react/combobox';
import { ComboboxEmptyProps } from './ComboboxEmpty.props';

const COMPONENT_NAME = 'ComboboxEmpty';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const ComboboxEmpty = ({
  className,
  children = 'No options found',
  ...props
}: ComboboxEmptyProps) => {
  return (
    <BaseUICombobox.Empty className={clsx(componentClassName, className)} {...props}>
      {children}
    </BaseUICombobox.Empty>
  );
};

ComboboxEmpty.displayName = COMPONENT_NAME;
