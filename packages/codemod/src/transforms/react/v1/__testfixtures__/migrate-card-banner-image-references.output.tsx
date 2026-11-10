import { BannerImage } from '@utilitywarehouse/hearth-react';

const registry = { [BannerImage as any]: 1, CardBannerImage: BannerImage, other: BannerImage };
const lookup = registry[BannerImage as any];
const unrelated = { CardBannerImage: 1 };
const read = unrelated.CardBannerImage;

export type Props = React.ComponentProps<typeof BannerImage>;
