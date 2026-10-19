import * as React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
} from '@utilitywarehouse/hearth-react';

const Component = ({ items, spread, mode, selected }) => (
  <>
    <Accordion type="single" collapsible defaultValue="item-1">
      <AccordionItem value="item-1">
        <AccordionContent forceMount>Content</AccordionContent>
      </AccordionItem>
    </Accordion>
    <Accordion type="multiple" value={['a', 'b']} />
    <Accordion type={'single'} collapsible={false} value="" />
    <Accordion type="single" value={selected} />
    <Accordion type="single" onValueChange={() => {}} />
    <Accordion type={mode} />
    <Accordion />
    <Accordion {...spread} />
    <Accordion multiple defaultValue={['a']} />
    <AccordionContent forceMount={false} />
  </>
);

export default Component;
