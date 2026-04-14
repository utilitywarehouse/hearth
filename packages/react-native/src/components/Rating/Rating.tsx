import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import type RatingProps from './Rating.props';
import type { RatingLabels, RatingValue } from './Rating.props';
import RatingStarEmpty from './RatingStarEmpty';
import RatingStarFilled from './RatingStarFilled';

const MAX_RATING: RatingValue = 5;
const STAR_WIDTH = 32;
const STAR_HEIGHT = 30;
const STAR_CONTAINER_SIZE = 40;

const DEFAULT_LABELS: Record<RatingValue, string> = {
  0: 'Select a rating',
  1: 'Awful',
  2: 'Bad',
  3: 'Okay',
  4: 'Good',
  5: 'Great!',
};

const clampRating = (value: number) =>
  Math.min(MAX_RATING, Math.max(0, Math.round(value))) as RatingValue;

const Rating = ({
  value,
  defaultValue = 0,
  onChange,
  disabled = false,
  labels,
  hideLabel = false,
  style,
  accessibilityLabel,
  ...props
}: RatingProps) => {
  const isControlled = value !== undefined;
  const [internalValue, setInternalValue] = useState<RatingValue>(clampRating(defaultValue));

  useEffect(() => {
    if (!isControlled) {
      setInternalValue(clampRating(defaultValue));
    }
  }, [defaultValue, isControlled]);

  const resolvedLabels = useMemo<RatingLabels>(() => ({ ...DEFAULT_LABELS, ...labels }), [labels]);

  const resolvedValue = clampRating(isControlled ? value : internalValue);
  const currentLabel = resolvedLabels[resolvedValue] ?? DEFAULT_LABELS[resolvedValue];
  const labelColor = resolvedValue === 0 ? 'secondary' : 'primary';

  const handlePress = useCallback(
    (nextValue: RatingValue) => {
      if (disabled) return;

      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onChange?.(nextValue);
    },
    [disabled, isControlled, onChange]
  );

  styles.useVariants({ disabled });

  return (
    <View
      {...props}
      accessibilityRole="radiogroup"
      accessibilityLabel={accessibilityLabel ?? currentLabel}
      style={[styles.container, style]}
    >
      <View style={styles.stars}>
        {([1, 2, 3, 4, 5] as RatingValue[]).map(starValue => {
          const isFilled = starValue <= resolvedValue;
          const starLabel = resolvedLabels[starValue] ?? DEFAULT_LABELS[starValue];

          return (
            <Pressable
              key={starValue}
              accessibilityRole="radio"
              accessibilityState={{ selected: resolvedValue === starValue, disabled }}
              accessibilityLabel={`Rate ${starLabel}`}
              disabled={disabled}
              hitSlop={8}
              onPress={() => handlePress(starValue)}
              style={styles.star}
            >
              {isFilled ? (
                <RatingStarFilled width={STAR_WIDTH} height={STAR_HEIGHT} />
              ) : (
                <RatingStarEmpty width={STAR_WIDTH} height={STAR_HEIGHT} />
              )}
            </Pressable>
          );
        })}
      </View>
      {!hideLabel ? (
        <BodyText size="md" color={labelColor} style={styles.label}>
          {currentLabel}
        </BodyText>
      ) : null}
    </View>
  );
};

Rating.displayName = 'Rating';

const styles = StyleSheet.create(theme => ({
  container: {
    alignItems: 'center',
    gap: theme.components.rating.gap,
    variants: {
      disabled: {
        true: {
          opacity: theme.opacity.disabled,
        },
      },
    },
  },
  stars: {
    flexDirection: 'row',
    gap: theme.components.rating.gap,
  },
  star: {
    width: STAR_CONTAINER_SIZE,
    height: STAR_CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.components.rating.borderWidth,
  },
  label: {
    textAlign: 'center',
  },
}));

export default Rating;
