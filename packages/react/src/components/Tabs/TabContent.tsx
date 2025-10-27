import * as React from 'react';
import clsx from 'clsx';
import { Tabs as RadixTabs } from 'radix-ui';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { TabContentProps } from './TabContent.props';

const COMPONENT_NAME = 'TabPanel';
const contentClassName = withGlobalPrefix(COMPONENT_NAME);

export const TabContent = React.forwardRef<HTMLDivElement, TabContentProps>((props, ref) => {
  const { className, keepMounted, ...rest } = props;
  return (
    <RadixTabs.Content
      ref={ref}
      className={clsx(contentClassName, className)}
      forceMount={keepMounted ? true : undefined}
      {...(rest as React.ComponentProps<typeof RadixTabs.Content>)}
    />
  );
});

TabContent.displayName = 'TabContent';
