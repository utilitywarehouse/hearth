import * as React from 'react';

export interface PromoBannerProps {
  /** Main label text, e.g. "Free delivery on all orders" */
  label: string;
  className?: string;
}

/**
 * PromoBanner
 *
 * Row layout: icon + label, separated by a "large" layout spacing token.
 *
 * Spacing note: the Figma frame's gap is bound to a single variable
 * (layout/spacing/lg) that resolves to 24px on desktop and 16px on mobile.
 * Since it's one variable with breakpoint-dependent values, it's modelled
 * here as a CSS custom property with a media-query override, rather than
 * two separate hardcoded numbers. See notes.md.
 */
export function PromoBanner({ label, className }: PromoBannerProps) {
  return (
    <div className={['promo-banner', className].filter(Boolean).join(' ')}>
      <style>{`
        .promo-banner {
          --spacing-lg: 24px;
          display: flex;
          flex-direction: row;
          align-items: center;
          gap: var(--spacing-lg);
        }
        @media (max-width: 767px) {
          .promo-banner {
            --spacing-lg: 16px;
          }
        }
        .promo-banner__label {
          margin: 0;
          font-size: 1rem;
          line-height: 1.5;
          font-weight: 400;
        }
      `}</style>
      <StarMediumIcon aria-hidden="true" focusable="false" />
      <span className="promo-banner__label">{label}</span>
    </div>
  );
}

/**
 * Placeholder for the "StarMediumIcon" component instance referenced in the
 * Figma frame. Swap this for the real icon import from your icon set
 * (e.g. `import { StarMediumIcon } from '<your-icon-library>'`).
 */
function StarMediumIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" {...props}>
      <path d="M10 1.5l2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6L1.3 7.7l6.1-.6z" />
    </svg>
  );
}
