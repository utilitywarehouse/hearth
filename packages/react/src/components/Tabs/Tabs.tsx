import * as React from 'react';
import clsx from 'clsx';
import type { ElementRef } from 'react';
import { Tabs as RadixTabs } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { TabsProps } from './Tabs.props';
import type { TabsListProps } from './TabsList.props';
import type { TabProps } from './Tab.props';

const COMPONENT_NAME = 'Tabs';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);
const listClassName = withGlobalPrefix('TabsList');
const triggerClassName = withGlobalPrefix('Tab');

type TabsElement = ElementRef<'div'>;

export const Tabs = React.forwardRef<TabsElement, TabsProps>((props, ref) => {
  const { className, size = 'md', ...tabsProps } = extractProps(props, marginPropDefs);
  const RTabsRoot = RadixTabs.Root as unknown as React.ComponentType<Record<string, unknown>>;

  return (
    <RTabsRoot
      ref={ref}
      className={clsx(componentClassName, className)}
      data-size={size}
      {...(tabsProps as unknown as Record<string, unknown>)}
    />
  );
});

Tabs.displayName = COMPONENT_NAME;

export const TabsList: React.FC<TabsListProps> = ({ className, children, ...rest }) => {
  const RTabsList = RadixTabs.List as unknown as React.ComponentType<Record<string, unknown>>;
  return (
    <RTabsList
      className={clsx(listClassName, className)}
      {...(rest as unknown as Record<string, unknown>)}
    >
      {children}
    </RTabsList>
  );
};

TabsList.displayName = 'TabsList';

export const Tab: React.FC<TabProps> = ({ className, value, ...rest }) => {
  const RTabsTrigger = RadixTabs.Trigger as unknown as React.ComponentType<Record<string, unknown>>;
  return (
    <RTabsTrigger
      className={clsx(triggerClassName, className)}
      value={value}
      {...(rest as unknown as Record<string, unknown>)}
    />
  );
};

Tab.displayName = 'Tab';
