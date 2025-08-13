import { useMemo } from 'react';
import { useTheme } from '../../hooks';
import { ColorValue } from '../../types';
import type { SpinnerProps } from '../Spinner';
import { Spinner } from '../Spinner';
import { useButtonContext } from './Button.context';

const ButtonSpinner = ({ color, ...props }: Omit<SpinnerProps, 'size'>) => {
  const { colorScheme, variant, disabled, inverted } = useButtonContext();
  const { color: themeColor, colorMode } = useTheme();

  const colorProp = useMemo(() => {
    if (variant === 'emphasis' && colorScheme === 'highlight') {
      return themeColor.interactive.highlight.foreground.strong;
    }
    if (variant === 'solid' && colorScheme === 'highlight') {
      return themeColor.interactive.highlight.foreground.strong;
    }
    if (variant === 'solid' && colorScheme === 'destructive') {
      return themeColor.interactive.destructive.foreground.strong;
    }
    if (variant === 'solid' && colorScheme === 'affirmative') {
      return themeColor.interactive.affirmative.foreground.strong;
    }
    if (variant === 'outline' && colorScheme === 'destructive') {
      return themeColor.interactive.destructive.foreground.subtle;
    }
    if (variant === 'outline' && colorScheme === 'affirmative') {
      return themeColor.interactive.affirmative.foreground.subtle;
    }
    if (variant === 'outline' && colorScheme === 'functional' && inverted) {
      return themeColor.interactive.functional.foreground.strong;
    }
    if (variant === 'outline' && colorScheme === 'functional') {
      return themeColor.interactive.functional.foreground.subtle;
    }
    if (variant === 'ghost' && colorScheme === 'destructive') {
      return themeColor.interactive.destructive.foreground.subtle;
    }
    if (variant === 'ghost' && colorScheme === 'affirmative') {
      return themeColor.interactive.affirmative.foreground.subtle;
    }
    if (variant === 'ghost' && colorScheme === 'functional' && inverted) {
      return themeColor.interactive.functional.foreground.strong;
    }
    if (variant === 'ghost' && colorScheme === 'functional') {
      return themeColor.interactive.functional.foreground.subtle;
    }
    if (variant === 'ghost' && colorScheme === 'destructive') {
      return themeColor.interactive.destructive.foreground.subtle;
    }
    return color;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [color, colorMode, variant, inverted, colorScheme]);

  return <Spinner {...props} aria-disabled={disabled} size="xs" color={colorProp as ColorValue} />;
};
ButtonSpinner.displayName = 'ButtonSpinner';

export default ButtonSpinner;
