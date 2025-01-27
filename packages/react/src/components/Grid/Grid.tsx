<<<<<<< HEAD
import * as React from 'react';
import clsx from 'clsx';

import { gridPropDefs, type GridProps } from './Grid.props';

import type { ElementRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../helpers/extract-props';
import { paddingPropDefs } from '../../props/padding.props';
import { colorPropDefs } from '../../props/color.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';
import { gapPropDefs } from '../../props/gap.props';
import { sizePropDefs } from '../../props/size.props';

const componentName = 'Grid';
const componentClassName = withGlobalPrefix(componentName);

type GridElement = ElementRef<'div'>;

export const Grid = React.forwardRef<GridElement, GridProps>((props, ref) => {
  const {
    className,
    asChild,
    container,
    as: Tag = 'div',
    ...gridProps
  } = extractProps(
    props,
    gridPropDefs,
    paddingPropDefs,
    marginPropDefs,
    colorPropDefs,
    gapPropDefs,
    sizePropDefs
  );

  const Component = asChild ? Slot : Tag;
  const dataAttributeProps = {
    'data-container': container ? '' : undefined,
  };

  return (
    <Component
      ref={ref}
      className={clsx(componentClassName, className)}
      {...gridProps}
      {...dataAttributeProps}
    />
  );
});

Grid.displayName = componentName;
||||||| parent of edb494f (add `Grid` component)
=======
import * as React from 'react';
import clsx from 'clsx';

import { gridPropDefs, type GridProps } from './Grid.props';

import type { ElementRef } from 'react';
import { Slot } from '@radix-ui/react-slot';
import { extractProps } from '../../helpers/extract-props';
import { paddingPropDefs } from '../../props/padding.props';
import { colorPropDefs } from '../../props/color.props';
import { sizePropDefs } from '../../props/size.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { marginPropDefs } from '../../props/margin.props';

const componentName = 'Grid';
const componentClassName = withGlobalPrefix(componentName);

type GridElement = ElementRef<'div'>;

export const Grid = React.forwardRef<GridElement, GridProps>((props, ref) => {
  const {
    className,
    asChild,
    container,
    as: Tag = 'div',
    ...gridProps
  } = extractProps(
    props,
    gridPropDefs,
    paddingPropDefs,
    marginPropDefs,
    colorPropDefs,
    sizePropDefs
  );

  const Component = asChild ? Slot : Tag;
  const dataAttributeProps = {
    'data-container': container ? '' : undefined,
  };

  return (
    <Component
      ref={ref}
      className={clsx(componentClassName, className)}
      {...gridProps}
      {...dataAttributeProps}
    />
  );
});

Grid.displayName = componentName;
>>>>>>> edb494f (add `Grid` component)
