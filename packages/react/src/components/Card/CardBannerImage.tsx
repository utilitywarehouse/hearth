import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { BannerImage } from '../BannerImage/BannerImage';
import type { BannerImageProps } from '../BannerImage/BannerImage.props';

const COMPONENT_NAME = 'CardBannerImage';

type CardBannerImageElement = ComponentRef<'div'>;

/**
 * @deprecated Use `BannerImage` instead. `CardBannerImage` will be removed in v1.
 */
export const CardBannerImage = forwardRef<CardBannerImageElement, BannerImageProps>(
  (props, ref) => <BannerImage ref={ref} {...props} />
);

CardBannerImage.displayName = COMPONENT_NAME;
