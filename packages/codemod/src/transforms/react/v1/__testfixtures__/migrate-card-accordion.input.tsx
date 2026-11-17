import * as React from 'react';
import type { CardAccordion as CardAccordionType } from '@utilitywarehouse/hearth-react';
import { CardAccordion, CardAccordionItem } from '@utilitywarehouse/hearth-react';

const Component = ({ spread, selected }) => (
  <>
    <CardAccordion value="step-1">
      <CardAccordionItem value="step-1" />
    </CardAccordion>
    <CardAccordion value={'step-2'} />
    <CardAccordion value="" />
    <CardAccordion value={['step-1']} />
    <CardAccordion value={selected} />
    <CardAccordion onValueChange={() => {}} />
    <CardAccordion />
    <CardAccordion value="step-1" {...spread} />
  </>
);

const Shadowed = ({ CardAccordion }) => <CardAccordion value="x" />;

export default Component;
