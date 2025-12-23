'use client';

import * as React from 'react';
import { cn } from '../../helpers/cn';
import { extractProps } from '../../helpers/extract-props';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { AlertProps } from './Alert.props';
import {
  CloseSmallIcon,
  InfoMediumIcon,
  TickCircleMediumIcon,
  WarningMediumIcon,
} from '@utilitywarehouse/hearth-react-icons';
import { marginPropDefs } from '../../props/margin.props';
import { BodyText } from '../BodyText/BodyText';
import { Flex } from '../Flex/Flex';
import { UnstyledIconButton } from '../UnstyledIconButton/UnstyledIconButton';

const COMPONENT_NAME = 'Alert';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

export const Alert = (props: AlertProps) => {
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
      className={cn(componentClassName, className)}
      role="alert" // Adding role for dynamic alerts
      aria-live="assertive" // Making it announced immediately
      aria-atomic="true" // Ensuring the entire alert is read as a whole
      data-colorScheme={colorScheme}
      {...alertProps}
    >
      <AlertIcon aria-hidden="true" />
      <div className={`${componentClassName}Content`}>
        <Flex direction="column">
          {title ? (
            <BodyText as="span" size="md" weight="semibold">
              {title}
            </BodyText>
          ) : null}
          {text ? <BodyText as="div">{text}</BodyText> : null}
        </Flex>
        {children}
      </div>
      {onClose ? (
        <UnstyledIconButton
          onClick={onClose}
          className={`${componentClassName}CloseButton`}
          title="Close"
          label="Close alert"
        >
          <CloseSmallIcon />
        </UnstyledIconButton>
      ) : null}
    </div>
  );
};

Alert.displayName = COMPONENT_NAME;
