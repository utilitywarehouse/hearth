import { CardAccordion as Steps } from '@utilitywarehouse/hearth-react';
import { CardAccordion } from './local';

const Component = () => (
  <>
    <Steps value={['step-1']} />
    <CardAccordion value="step-1" />
  </>
);

export default Component;
