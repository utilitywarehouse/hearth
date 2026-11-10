import { BannerImage } from '@utilitywarehouse/hearth-react';

enum Kind {
  CardBannerImage,
  Other = 1,
}

export const A = () => <BannerImage data-kind={Kind.CardBannerImage} />;
