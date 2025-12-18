import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

const flexItemPropDefs = {
  flexBasis: { className: 'f-basis', responsive: true },
  flexShrink: { className: 'f-shrink', responsive: true },
  flexGrow: { className: 'f-grow', responsive: true },
  flex: { className: 'f', responsive: true },
} satisfies {
  flexBasis: PropDef<string>;
  flexShrink: PropDef<string>;
  flexGrow: PropDef<string>;
  flex: PropDef<string>;
};

interface FlexItemProps {
  flexBasis?: Responsive<string>;
  flexShrink?: Responsive<string>;
  flexGrow?: Responsive<string>;
  flex?: Responsive<string>;
}

export { flexItemPropDefs };
export type { FlexItemProps };
