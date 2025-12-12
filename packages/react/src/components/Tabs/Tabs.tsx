'use client';

import clsx from 'clsx';
import { Tabs as RadixTabs } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { tabsPropDefs } from './Tabs.props';
import type { TabsProps } from './Tabs.props';

const COMPONENT_NAME = 'Tabs';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Tabs = (props: TabsProps) => {
  const {
    className,
    activationMode = 'automatic',
    ...tabsProps
  } = extractProps(props, tabsPropDefs);

  return (
    <RadixTabs.Root
      className={clsx(componentClassName, className)}
      activationMode={activationMode}
      {...tabsProps}
    />
  );
};

Tabs.displayName = COMPONENT_NAME;
