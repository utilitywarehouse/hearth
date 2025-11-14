import * as React from 'react';
import { ToggleGroup as RadixToggleGroup } from 'radix-ui';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { useMemo, type ElementRef } from 'react';
import { ToggleGroupProps } from './ToggleGroup.props';
import { Flex } from '../Flex/Flex';
import { useMediaQuery } from '../../hooks/use-media-query';
import { media } from '../../utils/media';
import { Breakpoints } from '../../types/responsive';
import { getResponsiveTranslation } from '../../helpers/get-responsive-translation';
import { isResponsiveObject } from '../../helpers/is-responsive-object';
import { Orientation } from '../../types/orientation';

const COMPONENT_NAME = 'ToggleGroup';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type ToggleGroupElement = ElementRef<'div'>;

function useActiveBreakpoint(): Breakpoints | undefined {
  const isMobile = useMediaQuery(media.only('mobile'));
  const isTablet = useMediaQuery(media.only('tablet'));
  const isDesktop = useMediaQuery(media.only('desktop'));
  const isWide = useMediaQuery(media.only('wide'));

  if (isMobile) return 'mobile';
  if (isTablet) return 'tablet';
  if (isDesktop) return 'desktop';
  if (isWide) return 'wide';
}

export const ToggleGroup = React.forwardRef<ToggleGroupElement, ToggleGroupProps>(
  (
    { className, type = 'multiple', value, defaultValue, onValueChange, children, ...flexProps },
    ref
  ) => {
    const toggleGroupProps = {
      type,
      value,
      defaultValue,
      onValueChange,
      children,
    };

    const activeBreakpoint = useActiveBreakpoint();
    const orientation = useMemo(() => {
      const directionTranslation = {
        column: 'vertical',
        row: 'horizontal',
      };
      const defaultDirection = 'row';
      const direction = flexProps.direction || defaultDirection;
      const responsiveOrientation = getResponsiveTranslation<Orientation>(
        direction,
        directionTranslation
      );
      if (typeof responsiveOrientation === 'string') {
        return responsiveOrientation as Orientation;
      }
      if (isResponsiveObject(responsiveOrientation) && activeBreakpoint) {
        return responsiveOrientation[activeBreakpoint] as Orientation;
      }
    }, [activeBreakpoint, flexProps.direction]);

    return (
      <Flex asChild {...flexProps}>
        <RadixToggleGroup.Root
          ref={ref}
          className={clsx(componentClassName, className)}
          {...(toggleGroupProps as React.ComponentProps<typeof RadixToggleGroup.Root>)}
          orientation={orientation}
        />
      </Flex>
    );
  }
);

ToggleGroup.displayName = COMPONENT_NAME;
