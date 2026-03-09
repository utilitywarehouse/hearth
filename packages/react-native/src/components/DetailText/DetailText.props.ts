import type { CommonTextProps } from '../../types';

interface DetailTextProps extends CommonTextProps {
  /** Text size variant. */
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl';
}

export default DetailTextProps;
