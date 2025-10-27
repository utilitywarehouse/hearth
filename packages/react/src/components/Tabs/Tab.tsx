import * as React from 'react';
import clsx from 'clsx';
import { Tabs as RadixTabs } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabProps } from './Tab.props';

const COMPONENT_NAME = 'Tab';
const triggerClassName = withGlobalPrefix(COMPONENT_NAME);

export const Tab: React.FC<TabProps> = ({ className, value, ...rest }) => (
  <RadixTabs.Trigger className={clsx(triggerClassName, className)} value={value} {...rest} />
);

Tab.displayName = COMPONENT_NAME;
