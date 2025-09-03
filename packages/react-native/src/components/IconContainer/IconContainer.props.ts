import type { ComponentType } from 'react';
import type { ViewProps } from 'react-native';

export interface IconContainerProps extends ViewProps {
  /** Icon component to render inside the container */
  icon: ComponentType;
  /** Size of the container */
  size?: 'sm' | 'md' | 'lg';
  /** If true, removes border radius from the container */
  radiusNone?: boolean;
  /** Background style of the container */
  variant?: 'subtle' | 'emphasis';
  /** Background color token of the container */
  color?: 'pig' | 'energy' | 'broadband' | 'mobile' | 'insurance' | 'cashback' | 'highlight';
}

export default IconContainerProps;
