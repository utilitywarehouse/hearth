import { Responsive, Union } from '../types/responsive';
import { PropDef } from './prop-def';

const gapTokens = [
  '0',
  '25',
  '50',
  '75',
  '100',
  '150',
  '175',
  '200',
  '250',
  '300',
  '350',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '1000',
] as const;

const gapPropDefs = {
  gap: { className: 'gap', tokens: gapTokens, responsive: true },
  rowGap: { className: 'row-gap', tokens: gapTokens, responsive: true },
  columnGap: { className: 'column-gap', tokens: gapTokens, responsive: true },
} satisfies {
  gap: PropDef<(typeof gapTokens)[number]>;
  rowGap: PropDef<(typeof gapTokens)[number]>;
  columnGap: PropDef<(typeof gapTokens)[number]>;
};

interface GapProps {
  gap?: Responsive<Union<string, (typeof gapTokens)[number]>>;
  rowGap?: Responsive<Union<string, (typeof gapTokens)[number]>>;
  columnGap?: Responsive<Union<string, (typeof gapTokens)[number]>>;
}

export { gapPropDefs, gapTokens };
export type { GapProps };
