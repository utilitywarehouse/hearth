import React from 'react';

import { getStoryHref, navigateToStory } from './storybookLinks';

type StorybookLinkBaseProps = {
  to: string;
  defaultToDocs?: boolean;
  raw?: boolean;
  onPress?: (...args: Array<unknown>) => void;
};

export type StorybookLinkProps = StorybookLinkBaseProps & {
  as?: React.ElementType;
  onClick?: React.MouseEventHandler;
} & Record<string, unknown>;

export const StorybookLink = (props: StorybookLinkProps) => {
  const { as, to, defaultToDocs = true, raw = false, onClick, onPress, ...rest } = props;

  const Component = as ?? 'a';
  const href = raw ? to : getStoryHref(to, { defaultToDocs });

  const handleActivate = (...args: Array<unknown>) => {
    const event = args[0] as
      | { defaultPrevented?: boolean; preventDefault?: () => void }
      | undefined;
    onClick?.(event as React.MouseEvent);
    onPress?.(...args);
    if (event?.defaultPrevented) {
      return;
    }
    event?.preventDefault?.();
    if (raw) {
      const topWindow = typeof window !== 'undefined' ? (window.top ?? window) : null;
      topWindow?.location.assign(to);
    } else {
      navigateToStory(to, { defaultToDocs });
    }
  };

  if (Component === 'a') {
    return <a {...rest} href={href} onClick={(event: React.MouseEvent) => handleActivate(event)} />;
  }

  const pressProps = {
    onPress: (...args: Array<unknown>) => handleActivate(...args),
  };

  return (
    <Component
      {...(rest as Record<string, unknown>)}
      {...pressProps}
      onClick={(event: React.MouseEvent) => handleActivate(event)}
    />
  );
};

export default StorybookLink;
