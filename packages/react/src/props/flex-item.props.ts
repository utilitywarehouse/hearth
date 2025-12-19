import { Responsive } from '../types/responsive';
import { PropDef } from './prop-def';

export const flexItemPropDefs = {
  flex: { className: 'flex', responsive: true },
  flexBasis: { className: 'flex-b', responsive: true },
  flexShrink: { className: 'flex-s', responsive: true },
  flexGrow: { className: 'flex-g', responsive: true },
} satisfies {
  flex: PropDef<string>;
  flexBasis: PropDef<string>;
  flexShrink: PropDef<string>;
  flexGrow: PropDef<string>;
};

export interface FlexItemProps {
  flex?: Responsive<string>;
  flexBasis?: Responsive<string>;
  flexShrink?: Responsive<string>;
  flexGrow?: Responsive<string>;
}
