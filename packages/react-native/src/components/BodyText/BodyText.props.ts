import type { CommonTextProps } from '../../types';

interface BodyTextProps extends CommonTextProps {
  /** Text size variant. */
  size?: 'sm' | 'md' | 'lg' | 'xl';
  /** Font weight variant. */
  weight?: 'regular' | 'semibold' | 'bold';
}

export default BodyTextProps;
