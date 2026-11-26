import React, { forwardRef } from 'react';
import { G, Path } from 'react-native-svg';

interface CreateIconConfig {
  Root: React.ComponentType<any>;
  path?: React.ReactElement | React.ReactElement[];
  d?: string;
  [key: string]: unknown;
}

/**
 * Replaces `@gluestack-ui/icon`'s `createIcon` — a thin factory that renders
 * `Root` with a resolved `stroke`/`color`, `role="img"`, and (if `path`/`d`
 * was given at creation time) a hardcoded set of path children wrapped in a
 * `<G>`. Used both for the public `Icon` component (no `path`/`d`, driven by
 * the `as` prop instead) and for standalone icons like `CircleIcon`.
 */
export function createIcon({ Root, path, d, ...initialProps }: CreateIconConfig) {
  return forwardRef<unknown, Record<string, unknown>>((props, ref) => {
    const pathChildren = React.Children.toArray(
      path ?? (d ? <Path fill="currentColor" d={d} /> : null)
    );
    const { stroke = 'currentColor', color, ...resolvedProps } = { ...initialProps, ...props };
    const colorProps: Record<string, unknown> = {};
    if (color) colorProps.color = color;
    if (stroke) colorProps.stroke = stroke;
    return (
      <Root {...resolvedProps} {...colorProps} role="img" ref={ref}>
        {pathChildren.length > 0 ? <G>{pathChildren}</G> : null}
      </Root>
    );
  });
}
