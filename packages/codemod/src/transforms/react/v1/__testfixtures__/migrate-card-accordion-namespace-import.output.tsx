import * as H from '@utilitywarehouse/hearth-react';

const Component = () => (
  <>
    <H.CardAccordion value={['step-1']} />
    <H.CardAccordion value={['step-1']} />
  </>
);

const Shadowed = ({ H }) => <H.CardAccordion value="x" />;

export default Component;
