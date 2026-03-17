import { ViewProps } from 'react-native';

export type SafeAreaEdge = 'top' | 'right' | 'bottom' | 'left';

interface SafeAreaViewProps extends ViewProps {
  /**
   * Which edges should receive safe area compensation.
   *
   * @default ['top', 'right', 'bottom', 'left']
   */
  edges?: SafeAreaEdge[];
  /**
   * Whether safe area compensation should be applied as padding or margin.
   *
   * @default 'padding'
   */
  mode?: 'padding' | 'margin';
}

export default SafeAreaViewProps;
