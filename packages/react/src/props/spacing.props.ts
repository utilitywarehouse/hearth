import { PropDef } from './prop-def';

const spacingValues = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

const spacingPropDefs = {
  spacing: { className: 'spacing', tokens: spacingValues, responsive: false },
} satisfies {
  spacing: PropDef<(typeof spacingValues)[number]>;
};

interface SpacingProps {
  spacing?: (typeof spacingValues)[number];
}

export type { SpacingProps };
export { spacingPropDefs };
