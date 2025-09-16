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

const componentName = 'Alert';
const componentClassName = withGlobalPrefix(componentName);

type AlertElement = ElementRef<'div'>;

export const Alert = React.forwardRef<AlertElement, AlertProps>((props, ref) => {
  const icons = {
    info: InfoMediumIcon,
    positive: TickCircleMediumIcon,
    warning: WarningMediumIcon,
    danger: WarningMediumIcon,
  };
  const {
    children,
    className,
    colorScheme = 'info',
    onClose,
    text,
    title,
    ...alertProps
  } = extractProps(props, marginPropDefs);

  const AlertIcon = icons[colorScheme];

  return (
    <div
      ref={ref}
      className={clsx(componentClassName, className)}
      role="alert" // Adding role for dynamic alerts
      aria-live="assertive" // Making it announced immediately
      aria-atomic="true" // Ensuring the entire alert is read as a whole
      data-colorScheme={colorScheme}
      {...alertProps}
    >
      <AlertIcon aria-hidden="true" />
      <div className={clsx(`${componentClassName}Content`)}>
        <Flex direction="column">
          {title ? <DetailText>{title}</DetailText> : null}
          {text ? <BodyText>{text}</BodyText> : null}
        </Flex>
        {children}
      </div>
      {onClose ? (
        <UnstyledIconButton
          onClick={onClose}
          className={clsx(`${componentClassName}CloseButton`)}
          title="Close"
          label="Close alert"
        >
          <CloseSmallIcon />
        </UnstyledIconButton>
      ) : null}
    </div>
  );
});

Alert.displayName = componentName;
