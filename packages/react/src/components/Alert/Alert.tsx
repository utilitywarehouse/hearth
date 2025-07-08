import type { ElementRef } from 'react';
import * as React from 'react';

import clsx from 'clsx';

import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { AlertProps } from './Alert.props';

import {
  CloseSmallIcon,
  InfoMediumIcon,
  TickCircleMediumIcon,
  WarningMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';

import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import { DetailText } from '../DetailText/DetailText';
import { Flex } from '../Flex/Flex';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';
import { AlertIconButton } from './AlertIconButton';
import { AlertLink } from './AlertLink';

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
    onClose,
    text,
    title,
    ...alertProps
  } = extractProps(props, marginPropDefs);

  const AlertIcon = icons[colorScheme];

  // Analyse children to separate AlertLink, AlertIconButton, and other content
  const childrenArray = React.Children.toArray(children);
  let alertLink: React.ReactNode = null;
  let alertButton: React.ReactNode = null;
  const otherChildren: Array<React.ReactNode> = [];

  childrenArray.forEach(child => {
    if (React.isValidElement(child)) {
      if (child.type === AlertLink) {
        /* eslint-disable-next-line @typescript-eslint/no-unsafe-member-access */
        if (React.Children.count(child?.props?.children ?? null) > 0) {
          alertLink = child;
        } else {
          alertButton = child;
        }
      } else if (child.type === AlertIconButton) {
        alertButton = child;
      } else {
        otherChildren.push(child);
      }
    } else {
      otherChildren.push(child);
    }
  });

  const hasAlertIconButton = !!alertButton;
  const hasStaticContent = !onClose;

  const dataAttributeProps = {
    'data-colorscheme': colorScheme,
    'data-has-alert-button': hasAlertIconButton,
  };

  return (
    <Flex
      ref={ref}
      className={clsx(componentClassName, className)}
      role="alert"
      aria-live={hasStaticContent ? 'polite' : 'assertive'}
      aria-atomic="true"
      alignItems="start"
      direction="row"
      {...dataAttributeProps}
      {...alertProps}
    >
      <AlertIcon aria-hidden="true" />
      <Flex direction="column" className={clsx(`${componentClassName}Content`)}>
        {title ? <DetailText>{title}</DetailText> : null}
        {text ? <BodyText>{text}</BodyText> : null}
        {otherChildren}
        {alertLink}
      </Flex>
      {alertButton}
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
