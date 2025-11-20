import type { ImageSourcePropType, ViewProps } from 'react-native';

export type AvatarLoadingStatus = 'idle' | 'loading' | 'loaded' | 'error';

interface AvatarProps extends ViewProps {
  /**
   * The image source to display.
   */
  src?: ImageSourcePropType;
  /**
   * The name associated with the avatar, used for creating initials and accessibility label.
   */
  name?: string;
  /**
   * Sets the avatar size.
   * @default md
   */
  size?: 'sm' | 'md';
  /**
   * Delay in milliseconds before the image is rendered.
   * Useful to prevent flickering when the image loads very quickly.
   * @default 0
   */
  delayMs?: number;
  /**
   * Callback fired when the loading status of the image changes.
   */
  onLoadingStatusChange?: (status: AvatarLoadingStatus) => void;
}

export default AvatarProps;
