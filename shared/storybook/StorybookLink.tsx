import React from 'react';

import { getStoryHref, navigateToStory } from './storybookLinks';

type StorybookLinkBaseProps = {
  to: string;
  defaultToDocs?: boolean;
  onPress?: (...args: Array<unknown>) => void;
};

type StorybookLinkProps = StorybookLinkBaseProps & {
  as?: React.ElementType;
  onClick?: React.MouseEventHandler;
} & Record<string, unknown>;

const StorybookLink = (props: StorybookLinkProps) => {
  const { as, to, defaultToDocs = true, onClick, onPress, ...rest } = props;

  const Component = as ?? 'a';
  const href = getStoryHref(to, { defaultToDocs });

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
    navigateToStory(to, { defaultToDocs });
  };

  if (Component === 'a') {
    return (
      <a
        {...(rest as React.AnchorHTMLAttributes<HTMLAnchorElement>)}
        href={href}
        onClick={(event: React.MouseEvent) => handleActivate(event)}
      />
    );
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
