import BeamingFace from '@utilitywarehouse/hearth-svg-assets/lib/beaming-face.svg';
import BeamingFaceGrey from '@utilitywarehouse/hearth-svg-assets/lib/beaming-face-grey.svg';
import DissapointedFace from '@utilitywarehouse/hearth-svg-assets/lib/dissapointed-face.svg';
import DissapointedFaceGrey from '@utilitywarehouse/hearth-svg-assets/lib/dissapointed-face-grey.svg';
import FrowningFace from '@utilitywarehouse/hearth-svg-assets/lib/frowning-face.svg';
import FrowningFaceGrey from '@utilitywarehouse/hearth-svg-assets/lib/frowning-face-grey.svg';
import NeutralFace from '@utilitywarehouse/hearth-svg-assets/lib/neutral-face.svg';
import NeutralFaceGrey from '@utilitywarehouse/hearth-svg-assets/lib/neutral-face-grey.svg';
import SlightlySmilingFace from '@utilitywarehouse/hearth-svg-assets/lib/slightly-smiling-face.svg';
import SlightlySmilingFaceGrey from '@utilitywarehouse/hearth-svg-assets/lib/slightly-smiling-face-grey.svg';
import type { FC } from 'react';
import type { SvgProps } from 'react-native-svg';

type RatingEmojiProps = {
  emoji: 1 | 2 | 3 | 4 | 5;
  grayscale?: boolean;
  size: number;
};

// SVG imports are typed as `string` by vite/client but transformed to components at runtime
const EMOJI_ASSETS = {
  1: { color: DissapointedFace, grey: DissapointedFaceGrey },
  2: { color: FrowningFace, grey: FrowningFaceGrey },
  3: { color: NeutralFace, grey: NeutralFaceGrey },
  4: { color: SlightlySmilingFace, grey: SlightlySmilingFaceGrey },
  5: { color: BeamingFace, grey: BeamingFaceGrey },
} as unknown as Record<1 | 2 | 3 | 4 | 5, { color: FC<SvgProps>; grey: FC<SvgProps> }>;

const RatingEmoji = ({ emoji, grayscale = false, size }: RatingEmojiProps) => {
  const assets = EMOJI_ASSETS[emoji];
  const EmojiComponent = grayscale ? assets.grey : assets.color;

  return <EmojiComponent width={size} height={size} />;
};

export default RatingEmoji;
