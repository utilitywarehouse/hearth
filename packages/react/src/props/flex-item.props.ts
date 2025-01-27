import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const flexItemPropDefs = {
  flexBasis: { className: 'flex-basis', responsive: true },
  flexShrink: { className: 'flex-shrink', responsive: true },
  flexGrow: { className: 'flex-grow', responsive: true },
} satisfies {
  flexBasis: PropDef<string>;
  flexShrink: PropDef<string>;
  flexGrow: PropDef<string>;
};

interface FlexItemProps {
  flexBasis?: Responsive<string>;
  flexShrink?: Responsive<string>;
  flexGrow?: Responsive<string>;
}

export { flexItemPropDefs };
export type { FlexItemProps };
