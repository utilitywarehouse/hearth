import { PropDef } from './prop-def';

const textColorValues = ['primary', 'secondary', 'brand', 'affirmative', 'inverted'] as const;
const foregroundColorValues = [
  'feedbackDanger',
  'feedbackDangerSubtle',
  'feedbackFunctional',
  'feedbackFunctionalSubtle',
  'feedbackInfo',
  'feedbackInfoSubtle',
  'feedbackPositive',
  'feedbackPositiveSubtle',
  'feedbackWarning',
  'feedbackWarningSubtle',
  'interactiveAffirmativeStrong',
  'interactiveAffirmativeSubtle',
  'interactiveBrandStrong',
  'interactiveDestructiveStrong',
  'interactiveDestructiveSubtle',
  'interactiveFunctionalStrong',
  'interactiveFunctionalSubtle',
  'interactiveFunctionalInverted',
  'interactiveHighlightStrong',
  'interactiveNeutralSubtle',
] as const;
const colorValues = [...textColorValues, ...foregroundColorValues] as const;

const colorPropDefs = {
  color: { className: 'color', tokens: colorValues, responsive: false },
} satisfies {
  color: PropDef<(typeof colorValues)[number]>;
};

interface ColorProps {
  /**
   * Set the foreground colour.
   */
  color?: (typeof colorValues)[number];
}

export { colorPropDefs, colorValues };
export type { ColorProps };
