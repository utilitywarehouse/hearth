import React from 'react';
import { View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { TickSmallIcon } from '@utilitywarehouse/hearth-react-native-icons';
import { Icon } from '../Icon';
import { BodyText } from '../BodyText';
import { ProgressStepProps } from './ProgressStepper.props';

interface ProgressStepInternalProps extends ProgressStepProps {
  index?: number;
  isLast?: boolean;
}

const ProgressStep = ({ state, index = 0, isLast = false, ...rest }: ProgressStepInternalProps) => {
  styles.useVariants({ state, isLast });

  const renderStepNumber = () => {
    return (
      <BodyText size="md" weight="semibold" style={styles.text}>
        {index + 1}
      </BodyText>
    );
  };

  return (
    <View
      style={styles.container}
      accessible
      aria-label={`Step ${index + 1}, ${rest.id}, ${state}`}
      {...rest}
    >
      <View style={styles.step}>
        {state === 'completed' ? (
          <Icon as={TickSmallIcon} width={20} height={20} style={styles.text} />
        ) : state === 'active' ? (
          <View style={styles.inner}>{renderStepNumber()}</View>
        ) : (
          renderStepNumber()
        )}
      </View>
      {!isLast && <View style={styles.connector} />}
    </View>
  );
};

ProgressStep.displayName = 'ProgressStep';

const styles = StyleSheet.create(theme => ({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    variants: {
      isLast: {
        true: {
          flex: 0,
          _web: {
            flex: 'none',
          },
        },
        false: {
          flex: 1,
        },
      },
    },
  },
  step: {
    width: theme.components.progressStepper.indicator.width,
    height: theme.components.progressStepper.indicator.height,
    borderRadius: theme.borderRadius.full,
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      state: {
        completed: {
          backgroundColor: theme.color.surface.brand.default,
        },
        active: {
          backgroundColor: theme.color.surface.brand.default,
          padding: theme.borderWidth[2],
        },
        uncompleted: {
          borderWidth: theme.components.progressStepper.indicator.future.borderWidth,
          borderColor: theme.color.border.subtle,
        },
      },
    },
  },
  inner: {
    width: theme.components.progressStepper.indicator.width - theme.borderWidth[2] * 2,
    height: theme.components.progressStepper.indicator.height - theme.borderWidth[2] * 2,
    borderRadius: theme.borderRadius.full,
    backgroundColor: theme.color.surface.brand.default,
    borderWidth: theme.borderWidth[2],
    borderColor: theme.color.surface.neutral.subtle,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    variants: {
      state: {
        completed: {
          color: theme.color.text.inverted,
        },
        active: {
          color: theme.color.text.inverted,
          // NOTE: Adjust lineHeight to vertically center the text within the smaller inner circle
          lineHeight: theme.lineHeight[500] - theme.borderWidth[2] * 2,
        },
        uncompleted: {
          color: theme.color.text.primary,
        },
      },
    },
  },
  connector: {
    flex: 1,
    height: theme.components.progressStepper.bar.height,
    variants: {
      state: {
        completed: {
          backgroundColor: theme.components.progressStepper.bar.complete.backgroundColor,
        },
        active: {
          backgroundColor: theme.color.border.subtle,
        },
        uncompleted: {
          backgroundColor: theme.color.border.subtle,
        },
      },
    },
  },
}));

export default ProgressStep;
