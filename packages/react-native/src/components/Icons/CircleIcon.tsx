import { createIcon } from '@gluestack-ui/icon';
import type React from 'react';
import { Path, Svg } from 'react-native-svg';

const CircleIcon: React.ComponentType<React.ComponentProps<typeof Svg>> = createIcon({
  Root: Svg,
  viewBox: '0 0 24 24',
  path: (
    <Path
      d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
}) as unknown as React.ComponentType<React.ComponentProps<typeof Svg>>;

CircleIcon.displayName = 'CircleIcon';

export default CircleIcon;
