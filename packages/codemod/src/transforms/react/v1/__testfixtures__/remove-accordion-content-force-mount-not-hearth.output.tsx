import { AccordionContent } from '@mui/material';
import { AccordionContent as Local } from './Local';

const Component = () => (
  <>
    <AccordionContent forceMount>Other library</AccordionContent>
    <Local forceMount>Local file</Local>
  </>
);

export default Component;
