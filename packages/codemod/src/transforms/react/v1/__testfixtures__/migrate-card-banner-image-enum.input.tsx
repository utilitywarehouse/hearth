import { CardBannerImage } from '@utilitywarehouse/hearth-react';

enum Kind {
  CardBannerImage,
  Other = 1,
}

export const A = () => <CardBannerImage data-kind={Kind.CardBannerImage} />;
