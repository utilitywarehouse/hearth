import { PropDef } from './prop-def';

const textTransformValues = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;

const textTransformPropDefs = {
  textTransform: { className: 'tt', tokens: textTransformValues, responsive: false },
} satisfies {
  textTransform: PropDef<(typeof textTransformValues)[number]>;
};

interface TextTransformProps {
  /**
   * Set the text-transform on the component.
   */
  textTransform?: (typeof textTransformValues)[number];
}

export { textTransformPropDefs };
export type { TextTransformProps };
