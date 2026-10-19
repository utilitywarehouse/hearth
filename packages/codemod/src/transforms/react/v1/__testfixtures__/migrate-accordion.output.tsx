import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@utilitywarehouse/hearth-react';

const Component = ({ items, spread, mode, selected }) => (
  <>
    <Accordion defaultValue={['item-1']}>
      <AccordionItem value="item-1">
        <AccordionContent keepMounted>Content</AccordionContent>
      </AccordionItem>
    </Accordion>
    <Accordion multiple value={['a', 'b']} />
    <Accordion value={[]} />
    <Accordion value={selected} />
    <Accordion onValueChange={() => {}} />
    <Accordion type={mode} />
    <Accordion />
    <Accordion {...spread} />
    <Accordion multiple defaultValue={['a']} />
    <AccordionContent keepMounted={false} />
  </>
);

export default Component;

