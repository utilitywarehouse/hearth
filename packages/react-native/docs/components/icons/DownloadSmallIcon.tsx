import * as React from 'react';
import Svg, { Path } from 'react-native-svg';
import { IconProps } from './types';
const SvgDownloadSmallIcon = ({ color = 'currentColor', ...props }: IconProps) => (
  <Svg width={16} height={16} fill="none" viewBox="0 0 16 16" {...props}>
    <Path
      fill={color}
      fillRule="evenodd"
      d="M1 7.182v-.14c.064-.889.87-1.562 1.87-1.562h1.868c.34.018.614.364.596.71-.019.346-.33.646-.67.646H2.797c-.266 0-.458.15-.467.336v6.191c0 .225.229.272.53.272h10.336c.266 0 .467-.122.467-.337V7.107c-.036-.187-.265-.271-.531-.271h-1.87c-.402-.038-.604-.421-.595-.748.01-.356.33-.608.67-.608h1.932c.935.065 1.732.748 1.732 1.702v6.256c-.064.889-.87 1.562-1.87 1.562H2.733C1.797 14.934 1 14.252 1 13.298V7.172v.01Z"
      clipRule="evenodd"
    />
    <Path
      fill={color}
      fillRule="evenodd"
      d="m11.867 9.576-3.4 3.47c-.265.27-.595.27-.87.065l-3.4-3.47a.67.67 0 0 1 0-.954c.266-.27.596-.27.871-.065L8 11.615l1.732-1.768H8.669c-.733 0-1.265-.542-1.338-1.29V1.682C7.331 1.27 7.597 1 8 1c.33 0 .596.271.669.608v6.874h2.666c.596 0 .87.682.531 1.084v.01Z"
      clipRule="evenodd"
    />
  </Svg>
);
export default SvgDownloadSmallIcon;
