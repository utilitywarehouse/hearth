import * as React from 'react';
import clsx from 'clsx';
import type { CardActionButtonProps } from './CardActionButton.props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { ChevronRightSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { CardActionContent } from './CardActionContent';

const COMPONENT_NAME = 'CardActionButton';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type CardActionButtonElement = ElementRef<'button'>;

export const CardActionButton = React.forwardRef<CardActionButtonElement, CardActionButtonProps>(
  (
    {
      className,
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      trailingIcon,
      badge,
      badgePlacement,
      children,
      ...props
    },
    ref
  ) => {
    const contentProps = {
      heading,
      helperText,
      leadingIcon,
      leadingIconContainerColorScheme,
      badge,
      badgePlacement,
    };
    return (
      <button ref={ref} className={clsx(componentClassName, className)} {...props}>
        <CardActionContent
          trailingIcon={trailingIcon ? trailingIcon : <ChevronRightSmallIcon />}
          {...contentProps}
        >
          {children}
        </CardActionContent>
      </button>
    );
  }
);

CardActionButton.displayName = COMPONENT_NAME;
