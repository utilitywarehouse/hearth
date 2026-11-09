import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { Flex } from '../Flex/Flex';
import type { BannerImageProps } from './BannerImage.props';

const COMPONENT_NAME = 'BannerImage';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type BannerImageElement = ComponentRef<'div'>;

/**
 * Wraps a photographic or banner image with a border, rounded corners and
 * clipped overflow. Use it in the `image` prop of `Modal`, or alongside
 * `CardBannerContent` in a `Card`. Give the image `width: 100%`,
 * `height: 100%` and `object-fit: cover` to fill the wrapper.
 *
 * @summary A bordered, rounded wrapper for banner images.
 */
export const BannerImage = forwardRef<BannerImageElement, BannerImageProps>(
  ({ className, ...props }, ref) => (
    <Flex ref={ref} className={cn(componentClassName, className)} {...props} />
  )
);

BannerImage.displayName = COMPONENT_NAME;
