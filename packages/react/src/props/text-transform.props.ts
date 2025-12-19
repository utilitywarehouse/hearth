import { PropDef } from './prop-def';

const values = ['none', 'uppercase', 'lowercase', 'capitalize'] as const;

export const textTransformPropDefs = {
  textTransform: { className: 'tt', tokens: values, responsive: false },
} satisfies {
  textTransform: PropDef<(typeof values)[number]>;
};

export interface TextTransformProps {
  /**
   * Set the text-transform on the component.
   */
  textTransform?: (typeof values)[number];
}
