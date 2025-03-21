import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const textAlignValues = ['left', 'center', 'right'] as const;

const textAlignPropDefs = {
  textAlign: { className: 'text-align', tokens: textAlignValues, responsive: true },
} satisfies {
  textAlign: PropDef<(typeof textAlignValues)[number]>;
};

interface TextAlignProps {
  /**
   * Set the text-align on the component.
   */
  textAlign?: Responsive<(typeof textAlignValues)[number]>;
}

export { textAlignPropDefs };
export type { TextAlignProps };
