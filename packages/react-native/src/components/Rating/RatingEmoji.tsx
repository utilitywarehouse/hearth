import { useId } from 'react';
import { Defs, FeColorMatrix, Filter, Svg, Text as SvgText } from 'react-native-svg';

type RatingEmojiProps = {
  emoji: string;
  grayscale?: boolean;
  size: number;
};

const RatingEmoji = ({ emoji, grayscale = false, size }: RatingEmojiProps) => {
  const fontSize = size * 0.75;
  const filterId = useId();

  return (
    <Svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
      {grayscale ? (
        <Defs>
          <Filter id={filterId}>
            <FeColorMatrix type="saturate" values="0" />
          </Filter>
        </Defs>
      ) : null}
      <SvgText
        x={size / 2}
        y={size / 2}
        textAnchor="middle"
        alignmentBaseline="central"
        fontSize={fontSize}
        filter={grayscale ? `url(#${filterId})` : undefined}
      >
        {emoji}
      </SvgText>
    </Svg>
  );
};

export default RatingEmoji;
