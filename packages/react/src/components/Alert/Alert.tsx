import type { ElementRef } from 'react';
import * as React from 'react';

import clsx from 'clsx';

import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AlertProps } from './Alert.props';

import {
  ChevronRightSmallIcon,
  CloseSmallIcon,
  InfoMediumIcon,
  TickCircleMediumIcon,
  WarningMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { BodyText, Link, UnstyledIconButton } from '../..';
import { DetailText } from '../DetailText/DetailText';
import { Flex } from '../Flex/Flex';

const componentName = 'Alert';
const componentClassName = withGlobalPrefix(componentName);

type AlertElement = ElementRef<'div'>;

export const Alert = React.forwardRef<AlertElement, AlertProps>((props, ref) => {
  const icons = {
    blue: InfoMediumIcon,
    green: TickCircleMediumIcon,
    orange: WarningMediumIcon,
    red: WarningMediumIcon,
  };
  const {
    children,
    className,
    colorScheme = 'blue',
    linkHref,
    linkText,
    onClose,
    onClick,
    text,
    title,
    ...alertProps
  } = extractProps(props);
  const AlertIcon = icons[colorScheme];
  const dataAttributeProps = {
    'data-colorscheme': colorScheme,
    'data-clickable': !!onClick,
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (onClick && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault();
      onClick();
    }
  };

  const alertContent = title || (typeof text === 'string' ? text : '');
  const isClickable = !!onClick;
  const hasStaticContent = !isClickable && !onClose;

  return (
    <Flex
      ref={ref}
      className={clsx(componentClassName, className)}
      role={isClickable ? 'button' : 'alert'}
      aria-live={hasStaticContent ? 'polite' : 'assertive'}
      aria-atomic="true"
      aria-label={isClickable ? `${alertContent} - clickable alert` : undefined}
      onClick={onClick}
      onKeyDown={onClick ? handleKeyDown : undefined}
      tabIndex={onClick ? 0 : undefined}
      alignItems="start"
      direction="row"
      {...dataAttributeProps}
      {...alertProps}
    >
      <AlertIcon aria-hidden="true" />
      <Flex direction="column" className={clsx(`${componentClassName}-Content`)}>
        {children ?? (
          <>
            {title ? <DetailText>{title}</DetailText> : null}
            {text ? <BodyText>{text}</BodyText> : null}
            {linkText ? (
              <Link href={linkHref}>
                {linkText}
                <ChevronRightSmallIcon />
              </Link>
            ) : null}
          </>
        )}
      </Flex>
      {!linkHref && !linkText && onClick ? (
        <UnstyledIconButton
          onClick={onClick}
          className={clsx(`${componentClassName}-ActionButton`)}
          title="Alert action"
          label="Alert action"
        >
          <ChevronRightSmallIcon />
        </UnstyledIconButton>
      ) : null}
      {onClose ? (
        <UnstyledIconButton
          onClick={onClose}
          className={clsx(`${componentClassName}-CloseButton`)}
          title="Close"
          label="Close alert"
        >
          <CloseSmallIcon />
        </UnstyledIconButton>
      ) : null}
    </Flex>
  );
});

Alert.displayName = componentName;
