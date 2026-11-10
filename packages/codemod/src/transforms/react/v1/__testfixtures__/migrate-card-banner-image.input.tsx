import { Card, CardBannerImage } from '@utilitywarehouse/hearth-react';

export const A = () => (
  <Card>
    <CardBannerImage src="a.png" alt="" />
    <CardBannerImage src="b.png" alt="">child</CardBannerImage>
  </Card>
);
