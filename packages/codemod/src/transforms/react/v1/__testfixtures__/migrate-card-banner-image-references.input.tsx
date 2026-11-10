import { CardBannerImage } from '@utilitywarehouse/hearth-react';

const registry = { [CardBannerImage as any]: 1, CardBannerImage, other: CardBannerImage };
const lookup = registry[CardBannerImage as any];
const unrelated = { CardBannerImage: 1 };
const read = unrelated.CardBannerImage;

export type Props = React.ComponentProps<typeof CardBannerImage>;
