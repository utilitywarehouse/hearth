import { createIcon } from '@gluestack-ui/icon';
import { useMemo } from 'react';
import { Svg } from 'react-native-svg';
import { withUnistyles } from 'react-native-unistyles';
import { useTheme } from '../../hooks';
import type { ColorValue } from '../../types';
import { getFlattenedColorValue } from '../../utils';
import type IconProps from './Icon.props';

const PrimitiveIcon = withUnistyles(
  ({ height, width, fill, color, size, stroke, as: AsComp, ...props }: IconProps) => {
    const sizeProps = useMemo(() => {
      if (size) return { size };
      if (height && width) return { height, width };
      if (height) return { height };
      if (width) return { width };
      return {};
    }, [size, height, width]);

    const { color: themeColor, colorMode } = useTheme();
    const colorValue: ColorValue = useMemo(
      () => getFlattenedColorValue(color, themeColor),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [color, colorMode]
    );

    let colorProps = {};
    if (color) {
      colorProps = { ...colorProps, color: colorValue };
    }
    if (stroke) {
      colorProps = { ...colorProps, stroke };
    }
    if (fill) {
      colorProps = { ...colorProps, fill: fill };
    }
    if (AsComp) {
      const Component = AsComp;
      return <Component {...sizeProps} {...colorProps} strokeWidth={0} {...props} />;
    }
    return <Svg height={height} width={width} strokeWidth={0} {...colorProps} {...props} />;
  }
);

PrimitiveIcon.displayName = 'PrimitiveIcon';

export const Icon = createIcon({
  Root: PrimitiveIcon,
});

export default Icon;
