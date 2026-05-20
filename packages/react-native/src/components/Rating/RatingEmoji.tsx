import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native-unistyles';

type RatingEmojiProps = {
  emoji: string;
  grayscale?: boolean;
  size: number;
};

const RatingEmoji = ({ emoji, grayscale = false, size }: RatingEmojiProps) => {
  const fontSize = size * 0.75;

  styles.useVariants({ grayscale });

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <Text style={{ fontSize, lineHeight: size }}>{emoji}</Text>
    </View>
  );
};

const styles = StyleSheet.create(() => ({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    variants: {
      grayscale: {
        true: {
          filter: [{ grayscale: 1 }],
        },
      },
    },
  },
}));

export default RatingEmoji;
