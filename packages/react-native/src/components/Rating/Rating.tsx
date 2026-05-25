import { useCallback, useEffect, useMemo, useState } from 'react';
import { Pressable, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';
import { BodyText } from '../BodyText';
import type RatingProps from './Rating.props';
import type { RatingLabels, RatingValue } from './Rating.props';
import { getEmojiSvg } from './RatingEmoji';
import RatingStarEmpty from './RatingStarEmpty';
import RatingStarFilled from './RatingStarFilled';
import { EMOJI_LIST } from './Rating.utils';

const MAX_RATING: RatingValue = 5;
const STAR_WIDTH = 32;
const STAR_HEIGHT = 30;
const STAR_CONTAINER_SIZE = 40;
const EMOJI_SIZE_DEFAULT = 32;
const EMOJI_SIZE_SELECTED = 40;
const EMOJI_CONTAINER_SIZE = 44;

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
  variant = 'stars',
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

  const isEmojis = variant === 'emojis';
  const hasSelection = resolvedValue > 0;

  const startLabel = labels?.[1] ?? EMOJI_LIST[0].accessibilityLabel;
  const endLabel = labels?.[5] ?? EMOJI_LIST[EMOJI_LIST.length - 1].accessibilityLabel;

  return (
    <View
      {...props}
      accessibilityRole="radiogroup"
      accessibilityState={{ disabled }}
      accessibilityLabel={accessibilityLabel ?? (isEmojis ? 'Rate your experience' : currentLabel)}
      style={[styles.container, style]}
    >
      <View style={styles.items}>
        {isEmojis
          ? EMOJI_LIST.map(entry => {
              const isSelected = resolvedValue === entry.value;
              const size = isSelected ? EMOJI_SIZE_SELECTED : EMOJI_SIZE_DEFAULT;
              const EmojiSvg = getEmojiSvg(entry.value, hasSelection && !isSelected);

              return (
                <Pressable
                  key={entry.value}
                  accessibilityRole="radio"
                  accessibilityState={{ selected: isSelected, disabled }}
                  accessibilityLabel={`Rate ${entry.accessibilityLabel}`}
                  disabled={disabled}
                  hitSlop={8}
                  onPress={() => handlePress(entry.value)}
                  style={styles.emojiItem}
                >
                  <EmojiSvg width={size} height={size} />
                </Pressable>
              );
            })
          : ([1, 2, 3, 4, 5] as RatingValue[]).map(starValue => {
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
                  style={styles.starItem}
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
      {isEmojis ? (
        !hideLabel ? (
          <View style={styles.emojiLabels}>
            <BodyText size="md" color="secondary">{startLabel}</BodyText>
            <BodyText size="md" color="secondary">{endLabel}</BodyText>
          </View>
        ) : null
      ) : !hideLabel ? (
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
  items: {
    flexDirection: 'row',
    gap: theme.components.rating.gap,
  },
  starItem: {
    width: STAR_CONTAINER_SIZE,
    height: STAR_CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.components.rating.borderWidth,
  },
  emojiItem: {
    width: EMOJI_CONTAINER_SIZE,
    height: EMOJI_CONTAINER_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.components.rating.borderWidth,
  },
  label: {
    textAlign: 'center',
  },
  emojiLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
}));

export default Rating;
