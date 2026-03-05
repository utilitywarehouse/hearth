import { forwardRef } from 'react';
import type { ComponentRef } from 'react';
import { cn } from '../../helpers/cn';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import { extractProps } from '../../helpers/extract-props';
import { marginPropDefs } from '../../props/margin.props';
import type { HighlightBannerProps } from './HighlightBanner.props';
import { Card } from '../Card/Card';
import { BodyText } from '../BodyText/BodyText';

const COMPONENT_NAME = 'HighlightBanner';
const componentClassName = withGlobalPrefix(COMPONENT_NAME);

type HighlightBannerElement = ComponentRef<'div'>;

export const HighlightBanner = forwardRef<HighlightBannerElement, HighlightBannerProps>(
  (props, ref) => {
    const { children, className, colorScheme, heading, headingColor, ...highlightBannerProps } =
      extractProps(props, marginPropDefs);

    return (
      <Card
        ref={ref}
        className={cn(componentClassName, className)}
        {...highlightBannerProps}
        colorScheme={colorScheme}
        direction="column"
        paddingNone
      >
        <div className={`${componentClassName}Heading`} data-colorscheme={headingColor}>
          <BodyText size="md" weight="semibold" textAlign="center">
            {heading}
          </BodyText>
        </div>
        {children}
      </Card>
    );
  }
);

HighlightBanner.displayName = COMPONENT_NAME;
