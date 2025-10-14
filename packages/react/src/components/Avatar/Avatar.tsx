import * as React from 'react';
import clsx from 'clsx';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import { avatarPropDefs, AvatarProps } from './Avatar.props';
import { Avatar as RadixAvatar } from 'radix-ui';
import { UserMediumIcon, UserSmallIcon } from '@utilitywarehouse/hearth-react-icons';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'Avatar';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

function getInitials(name?: string) {
  if (!name) return;
  return name
    .replace(/\s+/, ' ')
    .split(' ') // Repeated spaces results in empty strings
    .slice(0, 2)
    .map((v: string) => v && v[0]?.toUpperCase()) // Watch out for empty strings
    .join('');
}

export const Avatar: React.FC<AvatarProps> = props => {
  const {
    className,
    src,
    name,
    delayMs = 0,
    ...avatarProps
  } = extractProps(props, avatarPropDefs, marginPropDefs);
  const initials = getInitials(name);
  return (
    <RadixAvatar.Root className={clsx(componentClassName, className)}>
      <RadixAvatar.Image
        className={`${componentClassName}Image`}
        src={src}
        alt={name}
        {...avatarProps}
      />
      <RadixAvatar.Fallback className={`${componentClassName}Fallback`} delayMs={delayMs}>
        {name ? (
          <BodyText as="span" weight="semibold" size={props.size === 'md' ? 'lg' : 'md'}>
            {initials}
          </BodyText>
        ) : props.size === 'md' ? (
          <UserMediumIcon />
        ) : (
          <UserSmallIcon />
        )}
      </RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
};

Avatar.displayName = COMPONENT_NAME;
