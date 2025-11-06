import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { Icon } from '../Icon';
import type IconContainerProps from './IconContainer.props';

const IconContainer = ({
  icon: IconComp,
  size = 'md',
  radiusNone = false,
  variant = 'subtle',
  color = 'pig',
  style,
  ...props
}: IconContainerProps) => {
  styles.useVariants({ size, radiusNone, variant, color });

  return (
    <View style={[styles.container, style]} {...props}>
      {IconComp ? <Icon as={IconComp} style={styles.icon} /> : null}
    </View>
  );
};

IconContainer.displayName = 'IconContainer';

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    variants: {
      size: {
        sm: {
          width: theme.components.iconContainer.sm.width,
          height: theme.components.iconContainer.sm.height,
          padding: theme.components.iconContainer.sm.padding,
          borderRadius: theme.components.iconContainer.sm.borderRadiusRounded,
        },
        md: {
          width: theme.components.iconContainer.md.width,
          height: theme.components.iconContainer.md.height,
          padding: theme.components.iconContainer.md.padding,
          borderRadius: theme.components.iconContainer.md.borderRadiusRounded,
        },
        lg: {
          width: theme.components.iconContainer.lg.width,
          height: theme.components.iconContainer.lg.height,
          padding: theme.components.iconContainer.lg.padding,
          borderRadius: theme.components.iconContainer.lg.borderRadiusRounded,
        },
      },
      radiusNone: {
        true: {
          borderRadius: 0,
        },
        false: {},
      },
      variant: {
        subtle: {},
        emphasis: {},
      },
      color: {
        pig: {},
        energy: {},
        broadband: {},
        mobile: {},
        insurance: {},
        cashback: {},
        highlight: {},
      },
    },
    compoundVariants: [
      {
        variant: 'emphasis',
        color: 'pig',
        styles: {
          backgroundColor: theme.color.surface.pig.default,
        },
      },
      {
        variant: 'subtle',
        color: 'pig',
        styles: {
          backgroundColor: theme.color.surface.pig.subtle,
        },
      },
      {
        variant: 'emphasis',
        color: 'energy',
        styles: {
          backgroundColor: theme.color.surface.energy.default,
        },
      },
      {
        variant: 'subtle',
        color: 'energy',
        styles: {
          backgroundColor: theme.color.surface.energy.subtle,
        },
      },
      {
        variant: 'emphasis',
        color: 'broadband',
        styles: {
          backgroundColor: theme.color.surface.broadband.default,
        },
      },
      {
        variant: 'subtle',
        color: 'broadband',
        styles: {
          backgroundColor: theme.color.surface.broadband.subtle,
        },
      },
      {
        variant: 'emphasis',
        color: 'mobile',
        styles: {
          backgroundColor: theme.color.surface.mobile.default,
        },
      },
      {
        variant: 'subtle',
        color: 'mobile',
        styles: {
          backgroundColor: theme.color.surface.mobile.subtle,
        },
      },
      {
        variant: 'emphasis',
        color: 'insurance',
        styles: {
          backgroundColor: theme.color.surface.insurance.default,
        },
      },
      {
        variant: 'subtle',
        color: 'insurance',
        styles: {
          backgroundColor: theme.color.surface.insurance.subtle,
        },
      },
      {
        variant: 'emphasis',
        color: 'cashback',
        styles: {
          backgroundColor: theme.color.surface.cashback.default,
        },
      },
      {
        variant: 'subtle',
        color: 'cashback',
        styles: {
          backgroundColor: theme.color.surface.cashback.subtle,
        },
      },
      {
        variant: 'emphasis',
        color: 'highlight',
        styles: {
          backgroundColor: theme.color.surface.highlight.default,
        },
      },
      {
        variant: 'subtle',
        color: 'highlight',
        styles: {
          backgroundColor: theme.color.surface.highlight.subtle,
        },
      },
    ],
  },
  icon: {
    color: theme.color.icon.primary,
  },
}));

export default IconContainer;
