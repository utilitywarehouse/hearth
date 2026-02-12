import type { CommonTextProps } from '../../types';

interface HeadingProps extends CommonTextProps {
  /** Heading size variant. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export default HeadingProps;
